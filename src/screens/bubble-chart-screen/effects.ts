import * as _ from 'lodash';
import { Dispatch } from 'react-redux';
import { IBubblePoint } from '@components/bubble-chart';
import { BubblePointsGenerationStartedAction, BubblePointsGenerationSucceededAction } from './actions';

type IGenerateBubblePointsEffect = () => (dipatch: Dispatch<void>) => void;

const randomBubblePoints = (): IBubblePoint[] => {
  const result: IBubblePoint[] = [];
  const colors = ['red', 'blue', 'green', 'orange', 'violet', 'gray', 'yellow'];
  _.times(_.random(100, 1000), () => {
    result.push({
      x: _.random(-1000, 1000),
      y: _.random(-1000, 1000),
      r: _.random(2, 25),
      color: colors[_.random(0, colors.length - 1)],
    } as IBubblePoint);
  });
  return result;
};

const generateBubbulePoints: IGenerateBubblePointsEffect = () => (dispatch: Dispatch<void>) => {
  dispatch(_.toPlainObject(new BubblePointsGenerationStartedAction()));
  new Promise((resolve, reject) =>
    setTimeout(() => resolve(randomBubblePoints()), 1500))
  .then((points: IBubblePoint[]) =>
    dispatch(_.toPlainObject(new BubblePointsGenerationSucceededAction(points))));
};

export {
  generateBubbulePoints,
  IGenerateBubblePointsEffect,
};