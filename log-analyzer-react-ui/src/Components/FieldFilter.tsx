import React, { Component } from "react";
import {Action, Dispatch, Store} from 'redux';
import { Table, Form, Button, Input, Modal, Icon, FormComponent, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { State as RootState } from '../root';
import FieldEqualityDropDown from "./FieldEqualityDropdown";
import {IFieldFilter, FiledNameMapper} from "../FieldFilter/model";
import * as FieldFilterActions from "../FieldFilter/actions";
import FilterViewer from "./FilterViewer";
import * as LogGridActions from "../LogGrid/actions";
import { fetchFilteredLogData } from "../Api/LogInformationApi";
import { LogInformation } from "../Model/LogInformation";

interface IFieldFilterProps {
  dispatch?: Dispatch<Action>;
  filters: Map<string, IFieldFilter>;
}

interface IFieldFilterState {
  filters: Map<string, IFieldFilter>;
  modalOpen: boolean;
}

class FieldFilter extends Component<IFieldFilterProps, IFieldFilterState> {
  static initialState = { filters: new Map<string, IFieldFilter>(), modalOpen: false }
  myRef: React.RefObject<FormComponent>;

  constructor(
    props: IFieldFilterProps,
    context: { store: Store<RootState> },
  ) {
    super(props, context);
    this.state = FieldFilter.initialState;
    this.myRef = React.createRef();
  }

  public render() {
      return (
        <Table definition>
          <Table.Body>
            <Table.Row>
                <Table.Cell className="four wide column">
                <Modal
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                  trigger={
                    <Button icon='add' className="blue" onClick={this.handleOpen} content='Add Filter' />
                  } centered={false}>
                  <Modal.Header>Add Filters</Modal.Header>
                  <Modal.Content>
                    <Form>
                      <Grid columns={3} divided>
                        {Array.from(FiledNameMapper.filterFieldNames().keys()).map ((fieldKey, index) => {
                            return (
                              <Grid.Row id={fieldKey+"_form_"+index} key={fieldKey+"_form_"+index}>

                                    <Grid.Column><b>{ FiledNameMapper.filterFieldNames().get(fieldKey) }</b></Grid.Column>
                                    
                                    <Grid.Column><FieldEqualityDropDown 
                                      fieldKey={fieldKey}
                                      filterValue={this.state.filters.get(fieldKey)?.filterValue ?? ""}
                                      fieldOperation={this.state.filters.get(fieldKey)?.filterOperation ?? "" }
                                      setOperation={this.setFieldOperation}/>
                                    </Grid.Column>

                                    <Grid.Column>
                                    <Input placeholder={ FiledNameMapper.filterFieldNames().get(fieldKey) }
                                      key={fieldKey+"_input_"+index}
                                      value={this.state.filters.get(fieldKey)?.filterValue ?? "" }
                                      onChange={(e) => this.setFieldValue(fieldKey, e.target.value)}
                                      error={this.state.filters.get(fieldKey)?.filterOperation !== "" &&
                                        (this.state.filters.get(fieldKey)?.filterValue === "")
                                      }
                                      />
                                    </Grid.Column>

                              </Grid.Row>
                            )
                          })
                        }
                    </Grid>
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                      <Button color='red' onClick={(e) => { 
                          this.setState({ filters: new Map<string, IFieldFilter>() });
                        }}>
                        <Icon name='remove' /> Reset Filters
                      </Button>
                      <Button disabled={ this.disableAddFilters() } color='blue' onClick={() => {
                          if(this.props.dispatch) {
                            this.props.dispatch(FieldFilterActions.AddFilter(this.state.filters));
                            this.applyFieldFilters();
                          }
                          this.handleClose();
                        }
                      }>
                      <Icon name='checkmark' /> Add Filters
                    </Button>
                  </Modal.Actions>
                </Modal>
                </Table.Cell>
                <Table.Cell>
                  <FilterViewer filters={this.state.filters} removeFilters={this.removeFilter}></FilterViewer>
                </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      );
  }

  removeFilter = (key: string) => {
    const filters = this.state.filters;
    filters.delete(key);
    this.setState({ filters });
    this.applyFieldFilters();
  }
  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  setFieldOperation = (key: string, operation: string) => {
    const existingFilters = this.state.filters;
    if(existingFilters.get(key)) {
      const filter = existingFilters.get(key) as IFieldFilter;
      if(!operation && !filter.filterValue) {
        existingFilters.delete(key);
      }
      else {
        filter.filterOperation = operation;
        existingFilters.set(key, filter);
      }
    }
    else {
      existingFilters.set(key, {filterOperation: operation, filterValue: "", filterKey: key});
    }
    this.setState({ filters: existingFilters});
  }

  setFieldValue = (key: string, value: string) => {
    const existingFilters = this.state.filters;
    if(existingFilters.get(key)) {
      const filter = existingFilters.get(key) as IFieldFilter;
      if(!filter.filterOperation && !value) {
        existingFilters.delete(key);
      }
      else {
        filter.filterValue = value;
        existingFilters.set(key, filter);
      }
    }
    else {
      existingFilters.set(key, {filterOperation: "", filterValue: value, filterKey: key});
    }
    this.setState({ filters: existingFilters});
  }

  disableAddFilters = (): boolean => {
    let hasIncompleteFilters = false;
    const keys = Array.from(this.state.filters.keys());
    for(let k of keys){
      const filter = this.state.filters.get(k);
      if(filter?.filterOperation! === "" || filter?.filterValue! === "") {
        hasIncompleteFilters = true;
        break;
      }
    };
    return this.state.filters.size ===0 || hasIncompleteFilters
  }

  applyFieldFilters = () => {
      const successCallback = (response: any) => {
          const lstLogInformation = response.data as LogInformation[];
          (this.props.dispatch as Dispatch<Action>)(LogGridActions.SetLogInformation(lstLogInformation));
      }
      const errorCallback = () => {
          console.log("Error fetching data from Api");
      }
      fetchFilteredLogData(this.state.filters, successCallback, errorCallback); 
  }
}

const mapStateToProps = (state: RootState): IFieldFilterProps => {
  return {
    filters: state.FIELD_FILTER_STATE.filters,
  };
};

const mapActionToProps = (dispatch: Dispatch<Action>) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapActionToProps)(FieldFilter);

