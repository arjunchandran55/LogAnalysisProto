import * as t from "./actionTypes";
import {SearchState } from "./model";

const initialState: SearchState = { searchTerm: "" } as SearchState;

export default (state = initialState, action: t.ISetSearchTermAction): SearchState => {
       switch (action.type) {
          case t.SET_SEARCH_TERM:
            return { ...initialState, searchTerm: action.searchTerm };
          default:
            return initialState;
  }
};
