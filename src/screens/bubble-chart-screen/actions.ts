// tslint:disable:max-classes-per-file

import { Action } from 'redux';
import { IBubblePoint } from '@components/bubble-chart';
import * as actionTypes from './action-types';

class SetWidthAction implements Action {
  public readonly type = actionTypes.BUBBLE_CHART_SCR_SET_WIDTH;
  constructor(public width: number) { }
}

class SetHeightAction implements Action {
  public readonly type = actionTypes.BUBBLE_CHART_SCR_SET_HEIGHT;
  constructor(public height: number) { }
}

class BubblePointsGenerationStartedAction implements Action {
  public readonly type = actionTypes.BUBBLE_CHART_SCR_POINTS_GENERATION_STARTED;
}

class BubblePointsGenerationSucceededAction implements Action {
  public readonly type = actionTypes.BUBBLE_CHART_SCR_POINTS_GENERATION_SUCCEEED;
  constructor(public bubblePoints: IBubblePoint[]) { }
}

class BubblePointsGenerationFailedAction implements Action {
  public readonly type = actionTypes.BUBBLE_CHART_SCR_POINTS_GENERATION_FAILED;
  constructor(public reason: any) { }
}

export {
  SetWidthAction,
  SetHeightAction,
  BubblePointsGenerationStartedAction,
  BubblePointsGenerationSucceededAction,
  BubblePointsGenerationFailedAction,
};
