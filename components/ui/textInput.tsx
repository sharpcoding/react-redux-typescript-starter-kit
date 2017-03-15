import { FormControl  } from 'react-bootstrap';
import * as React from 'react';

interface TextInputProps {
  value: string;
  changed: Function;
}

interface TextInputState {
  text: string;
}

export const TextInput = React.createClass<TextInputProps, TextInputState>({
  getInitialState() {
    return {
      text: this.props.value
    };
  },
  
  handleChange(e) {
    this.setState({ text: e.target.value });
  },

  handleBlur(e) {
    this.props.changed(this.state.text);
  },

  render() {    
    return <FormControl type="text" 
      value={this.state.text}
      onChange={this.handleChange}
      onBlur={this.handleBlur} />
  }
});

export default TextInput;
