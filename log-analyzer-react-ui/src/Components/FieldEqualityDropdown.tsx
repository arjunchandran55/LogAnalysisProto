import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { SignMapper } from '../FieldFilter/model';

const equalityDefinitions = [
  {"value": SignMapper.equalityOperations().equals, "text": "Equals"}, 
  {"value": SignMapper.equalityOperations().contains, "text": "Contains"},
  {"value": SignMapper.equalityOperations().not_contains, "text": "Not Contains"},
  {"value": SignMapper.equalityOperations().none, "text": ""},
];

interface IFieldEqualityProps {
    fieldKey: string;
    filterValue: string;
    fieldOperation: string;
    setOperation: (key: string, operation: string) => void
}

const FieldEqualityDropDown = (props: IFieldEqualityProps) => (
  <Dropdown placeholder='none' error={!props.filterValue && props.fieldOperation !== ""} value={props.fieldOperation} key={props.fieldKey+"_dropdown"} search selection options={ equalityDefinitions} onChange={(e, data) => { props.setOperation(props.fieldKey, data.value ? data.value as string : "") }} />
)

export default FieldEqualityDropDown;