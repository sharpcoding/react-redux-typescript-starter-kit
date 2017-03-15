import * as React from 'react';

export interface ReactSliderProps {
  className?: string;
  min?: number;
  max?: number;
  marks?: any;
  step?: number;
  range?: boolean;
  allowCross?: boolean;
  vertical?: boolean;
  defaultValue?: number|[number,number];
  value?: number|[number,number];
  handle?: any;
  included?: boolean;
  disabled?: boolean;
  tipTransitionName?: string;
  tipFormatter?: Function;
  dots?: boolean;
  onChange?: Function;
  onAfterChange?: Function;
  pearling: boolean;
}

export class ReactSlider extends React.Component<ReactSliderProps,any> { }
