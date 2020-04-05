import { FieldFilterState as State } from "./model";

export default class Selector {
  private readonly state: State;

  public constructor(state: State) {
    this.state = state;
  }
}
