import React from "react";

import { Router, Route, Switch } from "react-router-dom";

import indexRoutes from "../../routes/index.jsx";
import * as service from "../../service/AuthenticationService";

import Login from "../../components/Authentication/Login";
import Register from "../../components/Authentication/Register";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null };
  }
  componentDidMount = () => {
    service
      .current()
      .then(this.getCurrentSuccsess)
      .catch(this.getCurrentError);
  };
  getCurrentSuccsess = response => {
    this.setState({ currentUser: response.data });
  };
  getCurrentError = response => {};
  render() {
    return this.state.currentUser !== null ? (
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route
              path={prop.path}
              key={key}
              render={props => {
                return (
                  <prop.component
                    {...props}
                    currentUser={this.state.currentUser}
                  />
                );
              }}
              //currentUser={this.state.currentUser}
              // component={prop.component}
              // component={props => {
              //   debugger;
              //   return (
              //     <prop.component
              //       {...props}
              //       currentUser={this.state.currentUser}
              //     />
              //   );
              // }}
            />
          );
        })}
      </Switch>
    ) : (
      <Switch>
        <Route path={"/register"} exact key={0} component={Register} />
        <Route path={"/"} key={1} component={Login} />
      </Switch>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

export default withRouter(connect(mapStateToProps)(App));
