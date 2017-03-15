import { Moment } from 'moment';

export type DateTimePoint = {
  value: number;
  time: Moment;
  /**
   * The number of seconds since the Unix Epoch - effect of calling MomentJS unix() method on value
   */
  unix: number;
}

export default DateTimePoint;