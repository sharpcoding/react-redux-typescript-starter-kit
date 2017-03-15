import * as React from 'react';

interface BootstrapFormGroupStaticTextProps {
  text: string;
}

export const BootstrapFormGroupStaticText = React.createClass<BootstrapFormGroupStaticTextProps, void>({
  render() {    
    return <div className="form-control-static">{this.props.text}</div>
  }
});

export default BootstrapFormGroupStaticText;
