import { Dispatch } from 'redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as React from 'react';
import { SelectedGraph } from '../models/model';

interface MainScreenProps {
  selectedGraph: SelectedGraph;
  dispatch: Dispatch<{}>;
}

export class MainScreen extends React.Component<MainScreenProps, void> {
  render() {
    const { selectedGraph, dispatch } = this.props;

    return (
      <DropdownButton bsStyle="success" title="Select a type of chart">
        <MenuItem id="1" key="1">Linear chart</MenuItem>
        <MenuItem id="2" key="2">Bubble chart</MenuItem>
      </DropdownButton>
    );
  }
}