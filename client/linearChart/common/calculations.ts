import * as moment from 'Moment';
import * as _ from 'lodash';

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