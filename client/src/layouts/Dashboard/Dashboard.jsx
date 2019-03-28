import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, Redirect } from "react-router-dom";

import { Header, Footer, Sidebar } from "components";

import Create from "../../components/Products/ProductCreate";
import dashboardRoutes from "routes/dashboard.jsx";

var ps;

class Dashboard extends React.Component {
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.refs.mainPanel.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
        <Sidebar {...this.props} routes={dashboardRoutes} />
        <div className="main-panel" ref="mainPanel">
          <Header {...this.props} />
          <Switch {...this.props}>
            {dashboardRoutes.map((prop, key) => {
              if (prop.collapse) {
                debugger;
                return prop.views.map((prop2, key2) => {
                  return (
                    <Route
                      path={prop2.path}
                      render={props => {
                        return <prop2.component {...props} {...this.props} />;
                      }}
                      key={key2}
                    />
                  );
                });
              }
              if (prop.redirect)
                return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
              return (
                <Route
                  path={prop.path}
                  render={props => {
                    return <prop.component {...props} {...this.props} />;
                  }}
                  key={key}
                />
              );
            })}

            <Route
              path={"/product/:uid/edit"}
              exact
              render={props => {
                return <Create {...this.props} uid={props.match.params.uid} />;
              }}
              key={dashboardRoutes.length + 1}
            />
            {/* <Route
              path={"/product/:uid/edit"}
              exact
              render={props => {
                return <Create {...this.props} />;
              }}
              key={dashboardRoutes.length + 1}
            /> */}
          </Switch>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default Dashboard;
