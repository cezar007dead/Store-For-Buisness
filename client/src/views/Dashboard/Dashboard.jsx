import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table
} from "reactstrap";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// function that returns a color based on an interval of numbers

import { Icon } from "semantic-ui-react";

import { PanelHeader, Stats, CardCategory, Tasks } from "components";

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart
} from "variables/charts.jsx";

import { tasks } from "variables/general.jsx";

import { connect } from "react-redux";
import { getCurrencyActionAsnc } from "../../redux/actions/curencyActions";

import { withRouter } from "react-router-dom";

import * as currencyService from "../../service/CurrencyService";

class Dashboard extends React.Component {
  componentDidMount() {
    debugger;
    this.props.getCurrencyActionAsnc("USD");
  }
  render() {
    return (
      <div>
        <PanelHeader
          size="lg"
          content={
            <Line
              data={dashboardPanelChart.data}
              options={dashboardPanelChart.options}
            />
          }
        />
        <div className="content">
          <Row>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>Currency Rates</CardCategory>
                  <CardTitle tag="h4">Shipped Products</CardTitle>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-round btn-simple btn-icon"
                      color="default"
                    >
                      {" "}
                      <i className="now-ui-icons loader_gear" />
                    </DropdownToggle>

                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem className="text-danger">
                        Remove data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Row>
                      <Col xs={1}>
                        <Icon
                          name="dollar sign"
                          style={{ marginLeft: "10px" }}
                          size="big"
                          color="orange"
                        />
                      </Col>{" "}
                      <Col>
                        <p
                          style={{
                            color: "#f2711c",
                            fontSize: "23px",
                            marginLeft: "10px"
                          }}
                        >
                          Based By 1 Dollar
                        </p>
                      </Col>
                    </Row>
                    <Row style={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Col md={1}>
                        <Icon name="euro sign" size="large" />
                      </Col>
                      <Col>
                        <p
                          style={{
                            fontSize: "17px"
                          }}
                        >
                          {this.props.currency !== null
                            ? `= ${this.props.currency.rates.EUR}`
                            : ""}
                        </p>
                      </Col>
                    </Row>
                    <Row style={{ marginLeft: "10px" }}>
                      <Col md={1}>
                        <Icon name="lira sign" size="large" />
                      </Col>
                      <Col>
                        <p
                          style={{
                            fontSize: "17px"
                          }}
                        >
                          {this.props.currency !== null
                            ? `= ${this.props.currency.rates.TRY}`
                            : ""}
                        </p>
                      </Col>
                    </Row>
                    <Row style={{ marginLeft: "10px" }}>
                      <Col md={1}>
                        <Icon name="pound sign" size="large" />
                      </Col>
                      <Col>
                        <p
                          style={{
                            fontSize: "17px"
                          }}
                        >
                          {this.props.currency !== null
                            ? `= ${this.props.currency.rates.GBP}`
                            : ""}
                        </p>
                      </Col>
                    </Row>
                    <Row style={{ marginLeft: "10px" }}>
                      <Col md={1}>
                        <Icon name="ruble sign" size="large" />
                      </Col>
                      <Col>
                        <p
                          style={{
                            fontSize: "17px"
                          }}
                        >
                          {this.props.currency !== null
                            ? `= ${this.props.currency.rates.RUB}`
                            : ""}
                        </p>
                      </Col>
                    </Row>
                    <Row style={{ marginLeft: "10px" }}>
                      <Col md={1}>
                        <Icon name="yen sign" size="large" />
                      </Col>
                      <Col>
                        <p
                          style={{
                            fontSize: "17px"
                          }}
                        >
                          {this.props.currency !== null
                            ? `= ${this.props.currency.rates.JPY}`
                            : ""}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
                <CardFooter>
                  <Stats>
                    {[
                      {
                        i: "now-ui-icons arrows-1_refresh-69",
                        t: "Just Updated"
                      }
                    ]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col>
            {/* <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>
                    Global Sales
                  </CardCategory>
                  <CardTitle tag="h4">Shipped Products</CardTitle>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-round btn-simple btn-icon"
                      color="default"
                    >
                      <i className="now-ui-icons loader_gear" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem className="text-danger">
                        Remove data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={dashboardShippedProductsChart.data}
                      options={dashboardShippedProductsChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <Stats>
                    {[
                      {
                        i: "now-ui-icons arrows-1_refresh-69",
                        t: "Just Updated"
                      }
                    ]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col> */}
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>2018 Sales</CardCategory>
                  <CardTitle tag="h4">All products</CardTitle>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-round btn-simple btn-icon"
                      color="default"
                    >
                      <i className="now-ui-icons loader_gear" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem className="text-danger">
                        Remove data
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={dashboardAllProductsChart.data}
                      options={dashboardAllProductsChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <Stats>
                    {[
                      {
                        i: "now-ui-icons arrows-1_refresh-69",
                        t: "Just Updated"
                      }
                    ]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>Email Statistics</CardCategory>
                  <CardTitle tag="h4">24 Hours Performance</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={dashboard24HoursPerformanceChart.data}
                      options={dashboard24HoursPerformanceChart.options}
                    />
                  </div>
                </CardBody>
                <CardFooter>
                  <Stats>
                    {[{ i: "now-ui-icons ui-2_time-alarm", t: "Last 7 days" }]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <Card className="card-tasks">
                <CardHeader>
                  <CardCategory>Backend Development</CardCategory>
                  <CardTitle tag="h4">Tasks</CardTitle>
                </CardHeader>
                <CardBody>
                  <Tasks tasks={tasks} />
                </CardBody>
                <CardFooter>
                  <hr />
                  <Stats>
                    {[
                      {
                        i: "now-ui-icons loader_refresh spin",
                        t: "Updated 3 minutes ago"
                      }
                    ]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card>
                <CardHeader>
                  <CardCategory>All Persons List</CardCategory>
                  <CardTitle tag="h4">Employees Stats</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className=" text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th className="text-right">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-right">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-right">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-right">$56,142</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-right">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-right">$78,615</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state
});

// const mapStateToProps = state => {
//   debugger;
//   return {
//     weatherData: state.weatherData
//   };
// };

const mapDispatchToProps = dispatch => ({
  getCurrencyActionAsnc: val => {
    debugger;
    dispatch(getCurrencyActionAsnc(val));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);

//export default Dashboard;
