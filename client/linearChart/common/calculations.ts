import * as moment from 'Moment';
import * as _ from 'lodash';
import { IDateTimePointSeriesCache, IChartZoomSettings } from './interfaces';
import { EnumZoomSelected } from '../components/enums';
import { DateTimePoint } from '../models/dateTimePoint';
import { GraphScreenState } from '../../graphScreen/model';

const calculationsDebugging: boolean = true;

/**
 * The distance in pixels (in horizontal, x-scale) between pixels highlighted as centres of two consecutive points
 */
export var getHorizontalSampleDistancePx = (samplesCount: number, widthPx: number) => {
  return samplesCount > 1 ? (widthPx / (samplesCount-1)) : widthPx;
}

/**
 * How to resample raw data array in order to display data efficiently on screen.
 * 
 * The returned result describes how many samples from raw data array should be skipped-out in order to make sense to display them.
 * 
 * E.g. if canvas width size is 1024px and there are 1M samples, it definitely doesn't makes sense to display them all,
 * because more than a thousand samples from data will be represented by the same pixel on screen.
 * 
 * resampleFactor equal to N means that for given function parameters only every Nth sample from raw data array
 * should be taken to display on screen
 * 
 * rawDataSecondsPerSample holds declared density in the RAW data sample array
 */
var resampleFactor = (rawDataSecondsPerSample: number, widthPx: number, momentFrom: moment.Moment, momentTo: moment.Moment) => {
  let numberOfSecondsInDateRange = momentTo.diff(momentFrom, "second");
  let rawDataNumberOfSamplesInDateRange = numberOfSecondsInDateRange / rawDataSecondsPerSample;
  let samplesPerPixel = rawDataNumberOfSamplesInDateRange / widthPx;
  return samplesPerPixel < 1 ? 1 : _.ceil(samplesPerPixel);
}

var rFactorLevels = [
  { low: 1, high: 1, resampleEveryTimeZoomLevelChanged: true },
  { low: 2, high: 3, resampleEveryTimeZoomLevelChanged: true },
  { low: 4, high: 5, resampleEveryTimeZoomLevelChanged: true },
  { low: 6, high: 8, resampleEveryTimeZoomLevelChanged: true },
  { low: 9, high: 10, resampleEveryTimeZoomLevelChanged: true },
  { low: 11, high: 25, resampleEveryTimeZoomLevelChanged: false },
  { low: 26, high: 50, resampleEveryTimeZoomLevelChanged: false },
  { low: 51, high: 200, resampleEveryTimeZoomLevelChanged: false },
  { low: 201, high: 500, resampleEveryTimeZoomLevelChanged: false },
  { low: 501, high: 1000, resampleEveryTimeZoomLevelChanged: false },
  { low: 1001, high: 2000, resampleEveryTimeZoomLevelChanged: false },
  { low: 2001, high: 5000, resampleEveryTimeZoomLevelChanged: false }
];

var resampleFactorApproximation = (rFactor: number) => {
  let rFactorBelowLowestPossible = (rFactor < rFactorLevels[0].low);
  let rFactorAboveHighestPossible = !(_.isObject(_.find(rFactorLevels, el => rFactor < el.high)));
  if (rFactorBelowLowestPossible) {    
    calculationsDebugging ? console.log("There is no available approximation for rFactor", rFactor) : null;
    return rFactor;
  }
  if (rFactorAboveHighestPossible)
    return rFactorLevels[rFactorLevels.length-1].high;
  return _.find(rFactorLevels, el => rFactor >= el.low && rFactor <= el.high).high;
}

var rFactorLevelsNotRequiringResamplingEveryTimeZoomLevelChanged = (): number[] => {
  return _.map(_.filter(rFactorLevels, el => (!el.resampleEveryTimeZoomLevelChanged)), el => el.high);
}

var rFactorLevelsRequiringResamplingEveryTimeZoomLevelChanged = (): number[] => {
  return _.map(_.filter(rFactorLevels, el => (el.resampleEveryTimeZoomLevelChanged)), el => el.high);
}

export var prepareInitialCache = (allSamples: DateTimePoint[]): IDateTimePointSeriesCache[] => {
  var result = new Array<IDateTimePointSeriesCache>();
  calculationsDebugging ? console.log("building rFactor cache...") : null;
  _.each(rFactorLevelsRequiringResamplingEveryTimeZoomLevelChanged(), rFactor => {
    (calculationsDebugging ? console.log(`rFactor: ${rFactor}`) : null);
    result.push({
      rFactor: rFactor,
      resampleEveryTimeZoomLevelChanged: true,
      allSamples: allSamples, //since we need to make resampling every time zoom level changes, 
                              //it doesn't make sense to make it all, since it will take lots of time
                              //for all allSamples longer than 1M
      zoomLvlSamples: [] //leaving for now... until someone clicks on zoom level other than EnumZoomSelected.NoZoom
    });
  });
  _.each(rFactorLevelsNotRequiringResamplingEveryTimeZoomLevelChanged(), rFactor => {
    calculationsDebugging ? console.log(`rFactor: ${rFactor}`) : null;
    result.push({
      rFactor: rFactor,
      resampleEveryTimeZoomLevelChanged: false,
      allSamples: getDataResampled(allSamples, rFactor),
      zoomLvlSamples: [] //leaving for now... until someone clicks on zoom level other than EnumZoomSelected.NoZoom
    });
  });
  calculationsDebugging ? console.log("built rFactor cache !") : null;
  _.each(result, el => console.log(el.allSamples.length));
  return result;
}

var getDataResampled = (data: DateTimePoint[], rFactor: number): DateTimePoint[]  => {
  let resampledSum = 0;
  let result = [];
  for (let i=0; i < data.length; i++) {
    resampledSum += data[i].value;
    if (i % rFactor == 0) {
      result.push({
        time: data[i].time.clone(),
        unix: data[i].time.unix(),
        value: resampledSum / rFactor
      });
      resampledSum = 0;
    }
  }
  return result;
}

/**
 * Returns DateTimePoint[] array from a selected sample cache selected.
 * That Selection is based on rFactor (resample factor), after a proper cache is chosen, samples are filtered by date from / to range.
 * Quite an important function in regards to performance aspect.
 */
export var getDataFiltered = (state: GraphScreenState, canvasWidth: number): DateTimePoint[] => {  
  let result = new Array<DateTimePoint>();
  let unixFrom = state.windowDateFrom.unix();
  let unixTo = state.windowDateTo.unix();
  let rFactorExact = resampleFactor(state.secondsPerSample, canvasWidth, state.windowDateFrom.clone(), state.windowDateTo.clone());
  let rFactorApproximation = resampleFactorApproximation(rFactorExact);
  let rFactorCacheElement = _.find(state.rFactorSampleCache, el => el.rFactor == rFactorApproximation);
  if (_.isObject(rFactorCacheElement)) {
    switch (state.chartZoomSettings.zoomSelected) {
      case EnumZoomSelected.NoZoom:
        result = _.filter(rFactorCacheElement.allSamples, el => el.unix >= unixFrom && el.unix <= unixTo);
        break;
      case EnumZoomSelected.ZoomLevel1:
      case EnumZoomSelected.ZoomLevel2:
        result = _.filter(rFactorCacheElement.zoomLvlSamples, el => el.unix >= unixFrom && el.unix <= unixTo);
        calculationsDebugging ? console.log('[Cache] rFactorExact', rFactorExact, 'rFactorApproximation', rFactorApproximation, 'source', rFactorCacheElement.zoomLvlSamples.length, 'result', result.length) : null;
        break;
    }
  } else {
    result = _.filter(state.allPoints, el => el.unix >= unixFrom && el.unix <= unixTo);
    calculationsDebugging ? console.log('[NoCache] rFactorExact', rFactorExact, 'rFactorApproximation', rFactorApproximation, 'source', state.allPoints.length, 'result', result.length) : null;
  }
  return result;
}

var getUnixTimeStampLimitationsFromTo = (chartZoomSettings: IChartZoomSettings) => {
  let result = { unixFrom: 0, unixTo: 0 };
  switch (chartZoomSettings.zoomSelected) {
    case EnumZoomSelected.ZoomLevel1:
      result.unixFrom = chartZoomSettings.zoomLevel1PointsFrom.unix();
      result.unixTo = chartZoomSettings.zoomLevel1PointsTo.unix();
      break;
    case EnumZoomSelected.ZoomLevel2:
      result.unixFrom = chartZoomSettings.zoomLevel2PointsFrom.unix();
      result.unixTo = chartZoomSettings.zoomLevel2PointsTo.unix();
      break;
  }
  return result;
}

export var rebuildSampleCacheAdjustedToCurrentZoomLevel = (rFactorSampleCache: IDateTimePointSeriesCache[], chartZoomSettings: IChartZoomSettings):IDateTimePointSeriesCache[] => {
  var result = new Array<IDateTimePointSeriesCache>();  
  var limitations = getUnixTimeStampLimitationsFromTo(chartZoomSettings);
  _.each(rFactorSampleCache, el => {
    (calculationsDebugging ? console.log(`building resample cache for ${el.rFactor}`, "el.allSamples", el.allSamples.length) : null);
    if (el.resampleEveryTimeZoomLevelChanged) {
      var filteredByDate = _.filter(el.allSamples, (sample: DateTimePoint) => (sample.unix >= limitations.unixFrom) && (sample.unix <= limitations.unixTo));
      var resampled = getDataResampled(filteredByDate, el.rFactor);
      el.zoomLvlSamples = resampled;
    }
    else {
      el.zoomLvlSamples = _.filter(el.allSamples, (sample: DateTimePoint) => 
        (sample.unix >= limitations.unixFrom) && (sample.unix <= limitations.unixTo));
    }
    result.push(el);
  });
  return result;
}