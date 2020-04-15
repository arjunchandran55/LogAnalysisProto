import React from "react";
import {Action, Dispatch, Store} from 'redux';
import { connect } from 'react-redux'
import { State as RootState } from '../root';
import * as LogGridActions from "../LogGrid/actions";
import { Grid, List, Divider } from "semantic-ui-react";
import { LogInformation } from "../Model/LogInformation";
import { LogGridState } from "../LogGrid/model";
import { fetchLogData } from "../Api/LogInformationApi";
import { staticData } from "../staticApi/data";

export interface ILogGridProps { lstLogInformation: LogInformation[] ; dispatch: Dispatch<Action> }

class LogGrid extends React.Component <ILogGridProps> {
    state = { lstLogInformation: []}
    constructor(
        props: ILogGridProps,
        context: { store: Store<RootState> },
      ) {
        super(props, context);
    }
    componentDidMount() {
        // Fetch top 10 records when the component is loaded
        const successCallback = (response: any) => {
            const lstLogInformation = response.data as LogInformation[];
            this.props.dispatch(LogGridActions.SetLogInformation(lstLogInformation));
            this.setState({lstLogInformation: this.props.lstLogInformation});
        }
        const errorCallback = () => {
            const lstLogInformation = staticData as LogInformation[];
            this.props.dispatch(LogGridActions.SetLogInformation(lstLogInformation));
            this.setState({lstLogInformation: this.props.lstLogInformation});
            console.log("Error fetching data from Api");
        }
        fetchLogData("", "", "10", successCallback, errorCallback);        
    }

    render() {
        return (
            this.props.lstLogInformation.length > 0 ?
            <Grid columns={1} relaxed='very'>
                {
                    this.props.lstLogInformation.map((log, i) => {             
                        return (<Grid.Column key={i} >
                            <div className="ui message left-aligned-container">
                                <List>
                                    <div className="header">
                                        Logged Date : {log.loggedDate}
                                    </div>
                                        <List.Item><b>Ip Address :</b> {log.ipAddress}</List.Item>
                                        <List.Item><b>User Agent :</b> {log.userAgent}</List.Item>
                                        <List.Item><b>Status Code :</b> {log.statusCode}</List.Item>
                                        <List.Item><b>Request Type :</b> {log.requestType}</List.Item>
                                        <List.Item><b>Api :</b> {log.apiName}</List.Item>
                                        <List.Item><b>Enterprise Id :</b> {log.enterpriseId}</List.Item>
                                        <List.Item><b>Enterprise Name :</b> {log.enterpriseName}</List.Item>
                                        <List.Item><b>Email :</b> {log.email}</List.Item>
                                        {/* <List.Item><b>Auth Status :</b> {log.authStatus}</List.Item> */}
                                        {/* <List.Item><b>Raw Log :</b> {JSON.stringify(log.rawLog)}</List.Item> */}
                                </List>
                            </div>
                            <Divider horizontal> *** </Divider>
                        </Grid.Column>);
                    })
                }
            </Grid>
            :
            <Grid columns={1} relaxed='very'><Grid.Column key={1} ><Divider horizontal> *No Results* </Divider></Grid.Column></Grid>
        );
    }
}
const mapStateToProps = (state: RootState): LogGridState => {
    return { lstLogInformation: state.LOG_GRID_STATE.lstLogInformation };
};
  
const mapActionToProps = (dispatch: Dispatch<Action>) => {
  return {
    dispatch,
  };
};
  
export default connect(mapStateToProps, mapActionToProps)(LogGrid);