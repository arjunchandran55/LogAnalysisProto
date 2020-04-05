import React, { Component } from "react";
import {Action, Dispatch, Store} from 'redux';
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { State as RootState } from '../root';
import { TimeFilterState } from '../TimeFilter/model';
import * as TimeFilterActions from "../TimeFilter/actions";
import * as LogGridActions from "../LogGrid/actions";
import { fetchLogData } from "../Api/LogInformationApi";
import { LogInformation } from "../Model/LogInformation";

interface TagOption {
    key: string;
    text: string;
    value: string;
    label: any;
}

const tagOptions: TagOption[] = [
  {
    key: '',
    text: 'No Filter',
    value: 'Important',
    label: { color: 'black', empty: true, circular: true },
  },
  {
    key: 'Last24Hours',
    text: 'Last 24 Hours',
    value: 'Important',
    label: { color: 'red', empty: true, circular: true },
  },
  {
    key: 'Last12Hours',
    text: 'Last 12 Hours',
    value: 'Important',
    label: { color: 'red', empty: true, circular: true },
  },
  {
    key: 'LastHour',
    text: 'Last Hour',
    value: 'Important',
    label: { color: 'red', empty: true, circular: true },
  },
  {
    key: 'Last15Mins',
    text: 'Last 15 Mins',
    value: 'Important',
    label: { color: 'red', empty: true, circular: true },
  },
]

interface IFilterProps {
  dispatch: Dispatch<Action>;
  filterKey: string;
  filterText: string;
  fromDateUtc: string;
  toDateUtc: string;
}

interface IFilterState {
  filterKey: string;
  filterText: string;
}

class TimeFilter extends Component<IFilterProps, IFilterState> {
  static initialState = {filterKey: "", filterText: "" }
  constructor(
    props: IFilterProps,
    context: { store: Store<RootState> },
  ) {
    super(props, context);
    this.state = TimeFilter.initialState;
  }

  public render() {
      return (
        <Dropdown
          text= { this.state.filterKey ? this.state.filterText : 'Filter Logs'}
          icon={ this.state.filterKey ? 'red filter' : 'filter'}
          floating
          labeled
          button
          className='blue icon'
        >
          <Dropdown.Menu>
            <Dropdown.Menu scrolling>
              {tagOptions.map((option) => (
                <Dropdown.Item key={option.value} {...option} selected={option.key === this.state.filterKey } onClick = { () => this.setupFilters(option)} />
              ))}
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
      );
  }

  setupFilters = (option: TagOption) => {
    const filterDates = { fromDateUtc: "", toDateUtc: ""}
    this.setState({ filterKey: option.key, filterText: option.text});
    const successCallback = (response: any) => {
      const lstLogInformation = response.data as LogInformation[];
      this.props.dispatch(LogGridActions.SetLogInformation(lstLogInformation));
    }
    const errorCallback = () => {
        console.log("Error fetching data from Api");
    }
    if(option.key) {
      const currentTime = new Date();
      var d = new Date();
      filterDates.toDateUtc = currentTime.toISOString();
      switch(option.key) {
        case "Last24Hours": filterDates.fromDateUtc = new Date(Date.now() - 86400 * 1000).toISOString();  break;
        case "Last12Hours": d.setHours(currentTime.getHours() - 12); filterDates.fromDateUtc = d.toISOString();  break;
        case "LastHour": d.setHours(currentTime.getHours() - 1); filterDates.fromDateUtc = d.toISOString(); break;
        case "Last15Mins": d.setMinutes(currentTime.getMinutes() - 15); filterDates.fromDateUtc = d.toISOString(); break;
      }
      this.props.dispatch(TimeFilterActions.setFilter(option.key, option.text, filterDates.fromDateUtc, filterDates.toDateUtc ));
      fetchLogData(filterDates.fromDateUtc, filterDates.toDateUtc, "", successCallback, errorCallback); 
    }
    else {
        // Fetch top 10 records when the component is loaded
        fetchLogData("", "", "10", successCallback, errorCallback); 
        this.props.dispatch(TimeFilterActions.setFilter(option.key, option.text, filterDates.fromDateUtc, filterDates.toDateUtc ));
    }
  }
}

const mapStateToProps = (state: RootState): TimeFilterState => {
  return {
    filterKey: state.TIME_FILTER_STATE.filterKey,
    filterText: state.TIME_FILTER_STATE.filterText,
    fromDateUtc: state.TIME_FILTER_STATE.fromDateUtc,
    toDateUtc: state.TIME_FILTER_STATE.toDateUtc,
  };
};

const mapActionToProps = (dispatch: Dispatch<Action>) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapActionToProps)(TimeFilter)

