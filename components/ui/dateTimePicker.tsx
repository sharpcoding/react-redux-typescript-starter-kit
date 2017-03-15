/*import { Dispatch } from 'redux';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock  } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as React from 'react';
import * as moment from 'moment';
import { ScatterPlot } from '../scatterPlotWidget';
import { LinearChart } from '../LinearChart';
import { GraphScreenState } from './model';
import { changeDateFromValue, changeDateToValue } from './actions';

interface DateTimePickerProps {
  value: moment.Moment;
  dateChanged: (text: string) => void;
}

interface DateTimePickerState {
  text: string;
}

export const DateTimePicker = React.createClass<DateTimePickerProps, DateTimePickerState>({
  getInitialState() {
    return {
      text: this.props.value.format("YYYY-MM-DD HH:mm")
    };
  },
  
  handleChange(e) {
    if (Date.parse(e.target.value))
      this.setState({ text: e.target.value });
  },

  handleBlur(e) {
    this.props.dateChanged(this.state.text);
  },

  render() {    
    // if (!this.props.value.isSame(moment(this.state)))
    //   this.setState({ text: this.props.value.format("YYYY-MM-DD HH:mm") });
    return <FormControl type="text" 
      value={this.state.text}
      onChange={this.handleChange}
      onBlur={this.handleBlur} />
  }
});

export default DateTimePicker;*/
