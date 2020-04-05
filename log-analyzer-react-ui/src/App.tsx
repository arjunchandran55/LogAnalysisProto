/* eslint-disable no-extend-native */
import React from 'react';
import { Provider } from "react-redux";
import { compose, createStore } from "redux";
import './App.css';
import { Container, Menu, Icon } from 'semantic-ui-react';
import { Divider, Grid, Segment } from 'semantic-ui-react'
import TimeFilter from './Components/TimeFilter';
import Search from './Components/Search';
import FieldFilter from './Components/FieldFilter';
import {State as RootState, reducer } from "./root";
import LogGrid from './Components/LogGrid';
import PaginationSection from './Components/PaginationSection';

export class App extends React.Component<{}, RootState> {

  render() {
    const allStoreEnhancers = compose(
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(),
    );
    const store = createStore(reducer, allStoreEnhancers);

    return <Provider store={store}>
        <div className="App">
            <Container>
              <Segment>
                <Menu
                  fixed={'top'}
                  fluid widths={1}
                  size='large'
                  inverted
                > <Menu.Item position='right' labelPosition='left' id="toplogo" ><Icon inverted name='bug' className="compact"/>LOG ANALYZER</Menu.Item> </Menu>
                <Grid columns={1} relaxed='very' textAlign={"right"}>
                  <Grid.Column ><TimeFilter></TimeFilter></Grid.Column>
                </Grid>
                <Grid columns={1} relaxed='very'>
                  <Grid.Column> 
                      <Search></Search>
                  </Grid.Column>
                </Grid>
                  <FieldFilter></FieldFilter>
                <Divider horizontal> Log Information </Divider>
                  <LogGrid></LogGrid>
                  {/* <PaginationSection></PaginationSection> */}
              </Segment>
            </Container>
      </div>
    </Provider>
  }
}

export default App;