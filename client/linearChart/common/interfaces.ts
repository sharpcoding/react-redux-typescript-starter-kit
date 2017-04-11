import * as moment from 'Moment';
import { EnumZoomSelected } from '../components/enums';

/**
 * Different read-only dimensions provided in creation time 
 */
export interface IChartDimensions {
  canvasWidth: number;
  canvasHeight: number;
  paddingBottom: number;
  paddingTop: number;
  paddingLeft: number;
  paddingRight: number;
}

export interface IChartZoomSettings {
  zoomSelected: EnumZoomSelected;
  zoomLevel1PointsFrom: moment.Moment;
  zoomLevel1PointsTo: moment.Moment;
  zoomLevel2PointsFrom: moment.Moment;
  zoomLevel2PointsTo: moment.Moment;
}