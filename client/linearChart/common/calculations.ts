import * as moment from 'Moment';
import * as _ from 'lodash';
import { IDateTimePointSeriesCache } from './interfaces';
import { EnumZoomSelected } from '../components/enums';
import { DateTimePoint } from '../models/dateTimePoint';
import { GraphScreenState } from '../../graphScreen/model';


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
export var resampleFactor = (rawDataSecondsPerSample: number, widthPx: number, momentFrom: moment.Moment, momentTo: moment.Moment) => {
  let numberOfSecondsInDateRange = momentTo.diff(momentFrom, "second");
  let rawDataNumberOfSamplesInDateRange = numberOfSecondsInDateRange / rawDataSecondsPerSample;
  let samplesPerPixel = rawDataNumberOfSamplesInDateRange / widthPx;
  return samplesPerPixel < 1 ? 1 : _.ceil(samplesPerPixel);
}

var rFactorLevels = [  
  { low: 10, high: 30 },
  { low: 30, high: 50 },
  { low: 50, high: 200 },
  { low: 200, high: 500 },
  { low: 500, high: 1000 },
  { low: 1000, high: 2000 },
  { low: 2000, high: 5000 }
];

export var resampleFactorApproximation = (rFactor: number) => {
  let rFactorBelowLowestPossible = (rFactor < rFactorLevels[0].low);
  let rFactorAboveHighestPossible = !(_.isObject(_.find(rFactorLevels, el => rFactor < el.high)));
  if (rFactorBelowLowestPossible)
    return rFactor;
  if (rFactorAboveHighestPossible)
    return rFactorLevels[rFactorLevels.length-1].high;
  return _.find(rFactorLevels, el => rFactor >= el.low && rFactor < el.high).high;
}

export var getAllApproximations = (): number[] => {
  return _.map(rFactorLevels, el => el.high);
}

export var prepareInitialCache = (allSamples: DateTimePoint[]): IDateTimePointSeriesCache[] => {
  var result = new Array<IDateTimePointSeriesCache>();
  console.log("building rFactor cache...");
  _.each(getAllApproximations(), rFactor => {
    console.log(`rFactor: ${rFactor}`);
    var resampledData = getDataResampled(allSamples, rFactor);
    result.push({
      rFactor: rFactor,
      allSamples: resampledData,
      zoomLvlSamples: [] //leaving for now... until someone clicks for level1 or level2 zoom
    });
  });
  console.log("built rFactor cache !");
  _.each(result, el => console.log(el.allSamples.length));
  return result;
}

export var getDataResampled = (data: DateTimePoint[], rFactor: number): DateTimePoint[]  => {
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
 * That Selection is based on rRactor (resample factor), after a proper cache is chosen, samples are filtered by date from / to range.
 * Quite an important function in regards to performance aspect.
 */
export var getDataFiltered = (state: GraphScreenState): DateTimePoint[] => {
  let result = new Array<DateTimePoint>();
  let unixFrom = state.windowDateFrom.unix();
  let unixTo = state.windowDateTo.unix();
  let rFactorExact = resampleFactor(this.props.secondsPerSample, this.props.chartDimensions.canvasWidth, this.props.windowDateFrom.clone(), this.props.windowDateTo.clone());
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
        break;
    }
    // console.log(`filteredInRange() rFactor: ${rFactor} rFactorApproximation: ${rFactorApproximation} allSamples: ${this.props.data.length} cacheSamples: ${rFactorCacheElement.samples.length} resultSamples: ${result.length}`);
  } else {
    result = _.filter(state.allPoints, el => el.unix >= unixFrom && el.unix <= unixTo);
    // console.log(`filteredInRange() rFactor: ${rFactor}  rFactorApproximation: ${rFactorApproximation} allSamples: ${this.props.data.length} resultSamples: ${result.length}`);
  }
  return result;
}

export var rebuildSampleCacheAdjustedToCurrentZoomLevel = (state: GraphScreenState):void => {
  _.each(this.state.rFactorSampleCache, el => {
    console.log(`building for ${el.rFactor}`);
    switch (state.chartZoomSettings.zoomSelected) {
      case EnumZoomSelected.ZoomLevel1:
        var unixFrom = this.props.zoomSettings.zoomLevel1PointsFrom.unix();
        var unixTo = this.props.zoomSettings.zoomLevel1PointsTo.unix();
        break;
      case EnumZoomSelected.ZoomLevel2:
        var unixFrom = this.props.zoomSettings.zoomLevel2PointsFrom.unix();
        var unixTo = this.props.zoomSettings.zoomLevel2PointsTo.unix();
        break;
    }
    // el.zoomLvlSamples = _.filter(el.allSamples, sample => (sample.unix >= unixFrom) && (sample.unix <= unixTo));
  });
}