import { IBubblePoint } from '@components/bubble-chart';

export interface IBubbleChartScreenState {
  width: number;
  height: number;
  backgroundColor: string;
  bubblePoints: IBubblePoint[];
}