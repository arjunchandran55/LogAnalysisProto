import React from "react";
import {Action, Dispatch, Store} from 'redux';
import { connect } from 'react-redux'
import { State as RootState } from '../root';
import * as SearchActions from "../Search/actions";
import { SearchState } from "../Search/model";
import { searchLogData } from "../Api/LogInformationApi";
import { LogInformation } from "../Model/LogInformation";
import * as LogGridActions from "../LogGrid/actions";

export interface ISearchProps { searchTerm: string ; dispatch: Dispatch<Action> }
// export interface ISearchState { searchTerm: string ; }

class Search extends React.Component <ISearchProps> {
    state = { searchTerm: ""}
    constructor(
        props: ISearchProps,
        context: { store: Store<RootState> },
      ) {
        super(props, context);
    }
    render() {
        return (
            <div className="ui fluid icon input">
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.state.searchTerm}
                    onChange = { this.handleInputChange }
                    onKeyPress={ this.keyPressed } />
                <i aria-hidden="true"  className="search icon link" onClick={() => this.props.dispatch(SearchActions.setSearchTerm(this.state.searchTerm))}></i>
            </div>
        );
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            searchTerm: event.target.value.trim()
        });
    }

    keyPressed = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            this.initiateSearch();
        }
    }
    initiateSearch = () => {
        const successCallback = (response: any) => {
            const lstLogInformation = response.data as LogInformation[];
            this.props.dispatch(LogGridActions.SetLogInformation(lstLogInformation));
        }
        const errorCallback = () => {
            console.log("Error fetching data from Api");
        }
        if(this.state.searchTerm) {
            searchLogData(this.state.searchTerm, successCallback, errorCallback);
        }
    }
}

const mapStateToProps = (state: RootState): SearchState => {
    return { searchTerm: state.SEARCH_STATE.searchTerm };
};
  
const mapActionToProps = (dispatch: Dispatch<Action>) => {
  return {
    dispatch,
  };
};
  
export default connect(mapStateToProps, mapActionToProps)(Search);