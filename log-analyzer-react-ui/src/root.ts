import { combineReducers } from "redux";
import { enableBatching } from "redux-batched-actions";
import TimeFilter from "./TimeFilter";
import {TimeFilterState} from "./TimeFilter/model";
import { SearchState } from "./Search/model";
import Search from "./Search";
import { LogGridState } from "./LogGrid/model";
import LogGrid from "./LogGrid";
import { FieldFilterState } from "./FieldFilter/model";
import FieldFilter from "./FieldFilter";

export interface State {
  readonly SEARCH_STATE: SearchState;
  readonly TIME_FILTER_STATE: TimeFilterState;
  readonly LOG_GRID_STATE: LogGridState;
  readonly FIELD_FILTER_STATE: FieldFilterState;
}

// Use ES6 object literal shorthand syntax to define the object shape
export const reducer = enableBatching(
  combineReducers<State>({
    SEARCH_STATE: Search.reducer,
    TIME_FILTER_STATE: TimeFilter.reducer,
    LOG_GRID_STATE: LogGrid.reducer,
    FIELD_FILTER_STATE: FieldFilter.reducer,
  }),
);

const timeFilterState = (state: State) => new TimeFilter.selector(state.TIME_FILTER_STATE);
const searchState = (state: State) => new Search.selector(state.SEARCH_STATE);
const logGridState = (state: State) => new LogGrid.selector(state.LOG_GRID_STATE);
const fieldFilterState = (state: State) => new FieldFilter.selector(state.FIELD_FILTER_STATE);

export default {
  timeFilterState, searchState, logGridState, fieldFilterState
};
