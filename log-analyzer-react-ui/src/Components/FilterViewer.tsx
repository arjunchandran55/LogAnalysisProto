import React from 'react';
import { IFieldFilter, FiledNameMapper, SignMapper } from '../FieldFilter/model';
import { Button } from 'semantic-ui-react';

interface FilterViewerProps {
    filters: Map<string, IFieldFilter>;
    removeFilters: (filterKey: string) => void;
}

function FilterViewer(props: FilterViewerProps) {
  return (
    <div key="filterViewer">{ 
            Array.from(props.filters.keys()).map((filterKey: string) => {
                const filterData = props.filters.get(filterKey);
                let filterField = FiledNameMapper.filterFieldNames().get(filterKey) ?? "";
                const filterSign = filterData ? SignMapper.operationSigns().get(filterData?.filterOperation) : "";
                if(filterData?.filterValue) {
                    return(
                        <Button 
                            className="tiny red" 
                            content={
                                filterField + " " +
                                filterSign + " " +
                                filterData?.filterValue
                            }
                            key={"filterView" + filterKey}
                            icon='trash' labelPosition='right'
                            onClick={() => props.removeFilters(filterKey)}
                            inverted
                        />);
                }
                else {
                    return(<div key={"filterView" + filterKey}></div>);
                }
            })
        }
    </div>);
}
export default FilterViewer;