import * as t from "./actionTypes";
import {FieldFilterState, IFieldFilter } from "./model";

 const initialState: FieldFilterState = { filters: new Map<string, IFieldFilter>() } as FieldFilterState;

export default (state = initialState, action: t.IAddLogFilter): FieldFilterState => {
       switch (action.type) {
          case t.ADD_LOG_FILTER:
            return {...initialState, filters: action.filters};
          default:
            return initialState;
  }
};
