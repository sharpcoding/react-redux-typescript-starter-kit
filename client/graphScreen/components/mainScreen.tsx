import { Dispatch } from 'redux';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as React from 'react';
import { GraphScreenState, EnumSelectedChartType } from '../model';
import { selectChartAction } from '../actions';

interface MainScreenProps {
  state: GraphScreenState;
  dispatch: Dispatch<{}>;
}

export class MainScreen extends React.Component<MainScreenProps, void> {
  handleSelectChartClick(type: EnumSelectedChartType) {
    //this is where RR dispatch function is called
    //see that dispatch function is "automagically" inserted into component "props"
    this.props.dispatch(selectChartAction(type));
  }

  render() {
    const { state, dispatch } = this.props;

    return (
      <div>
        <Button bsStyle="success" onClick={() => this.handleSelectChartClick(EnumSelectedChartType.Linear)}>
          Display Linear Chart
        </Button>
        <Button bsStyle="success" onClick={() => this.handleSelectChartClick(EnumSelectedChartType.Pie)}>
          Display Pie Chart
        </Button>
        <span>Selected chart: {this.props.state.chartTypeToDescriptionMapping[this.props.state.chartType]}</span>
      </div>
    );
  }
}

//function call every time re-render is happening,
//allows to transfer all application state to only 
//a fragment MainScreen component keeps interest in 
const mapStateToProps = state => {
  //console.log() only for demonstration purposes
  console.log('mapStateToProps', state);
  return  {
    state: state.graphScreenState
  }
};


export default connect(mapStateToProps)(MainScreen);