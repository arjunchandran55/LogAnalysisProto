import * as t from "./actionTypes";
import {TimeFilterState } from "./model";

const initialState: TimeFilterState = { filterKey: "", filterText: "", fromDateUtc: "", toDateUtc: "" } as TimeFilterState;

export default (state = initialState, action: t.ISetFilterAction): TimeFilterState => {
       switch (action.type) {
          case t.SET_FILTER:
            return { ...initialState, filterKey: action.filterKey,
              filterText: action.filterText,
              fromDateUtc: action.fromDateUtc,
              toDateUtc: action.toDateUtc
             };
          default:
            return initialState;
  }
};
