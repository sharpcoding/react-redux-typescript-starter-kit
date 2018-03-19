import * as React from "react";

export interface ISvgGraphProps {
  width: number; 
  height: number;
  backgroundColor: string;
}

export const SvgGraph = (props: ISvgGraphProps) => {
  let getCssStyle = () => {
    return { backgroundColor: props.backgroundColor  };
  }
  
  return (
    <svg 
      width={props.width} 
      height={props.height}
      style={getCssStyle()} >
    </svg>
  );
}