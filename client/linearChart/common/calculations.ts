import * as moment from 'Moment';
import * as _ from 'lodash';
import { DateTimePoint } from '../models/dateTimePoint';

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
  return _.map(rFactorLevels, el => el.low);
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
