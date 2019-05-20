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

import * as companyService from "../../service/CompanyService";
import * as productService from "../../service/ProductService";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataForCompany: {
        time: ["12pm,", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"],
        count: [40, 500, 650, 700, 1200, 1250, 1300, 1900]
      },
      dataForProducts: {
        time: ["12pm,", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"],
        count: [40, 500, 650, 700, 1200, 1250, 1300, 1900]
      },
      products: {
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          tooltips: {
            bodySpacing: 4,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
            xPadding: 10,
            yPadding: 10,
            caretPadding: 10
          },
          responsive: 1,
          scales: {
            yAxes: [
              {
                gridLines: {
                  zeroLineColor: "transparent",
                  drawBorder: false
                }
              }
            ],
            xAxes: [
              {
                display: 0,
                ticks: {
                  display: false
                },
                gridLines: {
                  zeroLineColor: "transparent",
                  drawTicks: false,
                  display: false,
                  drawBorder: false
                }
              }
            ]
          },
          layout: {
            padding: { left: 0, right: 0, top: 15, bottom: 15 }
          }
        }
      }
    };
  }
  buildGraph = (canvas, time, count, color) => {
    debugger;
    var ctx = canvas.getContext("2d");
    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, color);
    gradientStroke.addColorStop(1, "#FFFFFF");
    var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, this.hexToRGB(color, 0.4));
    return {
      labels: time,
      datasets: [
        {
          label: "Count",
          borderColor: color,
          pointBorderColor: "#FFF",
          pointBackgroundColor: color,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: count
        }
      ]
    };
  };

  hexToRGB = (hex, alpha) => {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  };
  componentDidMount() {
    this.props.getCurrencyActionAsnc("USD");
    companyService
      .getByUserId(this.props.currentUser.id)
      .then(response => {
        this.getItemsData(response, "dataForCompany");
      })
      .catch();
    productService
      .getByUserId(this.props.currentUser.id)
      .then(response => {
        this.getItemsData(response, "dataForProducts");
      })
      .catch();
  }
  getItemsData = (response, type) => {
    debugger;
    let items = response.data.item;
    let itemsTime = [];
    let itemsCount = [];
    let lastItemDate = null;
    for (let i = 0; i < items.length; i++) {
      // counting the companies
      if (i == 0) {
        itemsCount.push(1);
        lastItemDate = items[i].dateCreate.slice(0, 10);
      } else {
        if (lastItemDate !== items[i].dateCreate.slice(0, 10)) {
          itemsCount.push(1 + itemsCount[itemsCount.length - 1]);
          lastItemDate = items[i].dateCreate.slice(0, 10);
        } else {
          itemsCount[itemsCount.length - 1]++;
        }
      }
      // time duration
      items[i].dateCreate = items[i].dateCreate.slice(0, 10);
      let flagTime = false;
      for (let j = 0; j < itemsTime.length; j++) {
        if (itemsTime[j] == items[i].dateCreate) {
          flagTime = true;
        }
      }
      if (flagTime === false) {
        itemsTime.push(items[i].dateCreate);
      }
    }
    console.log(itemsTime);
    console.log(itemsCount);
    switch (type) {
      case "dataForCompany":
        this.setState({
          dataForCompany: { time: itemsTime, count: itemsCount }
        });
        break;
      case "dataForProducts":
        this.setState({
          dataForProducts: { time: itemsTime, count: itemsCount }
        });
        break;
      default:
    }

    // this.setState({
    //   products: {
    //     data: { labels: companiesTime, datasets: [{ data: companyCount }] }
    //   }
    // });
  };
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
                  <CardCategory>Rates</CardCategory>
                  <CardTitle tag="h4">Currency Rates</CardTitle>
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
                  <CardCategory>Statistics</CardCategory>
                  <CardTitle tag="h4">Your Companies</CardTitle>
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
                      data={canvas =>
                        this.buildGraph(
                          canvas,
                          this.state.dataForCompany.time,
                          this.state.dataForCompany.count,
                          "#18ce0f"
                        )
                      }
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
            {/* <Col xs={12} md={4}>
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
            </Col> */}
            <Col xs={12} md={4}>
              <Card className="card-chart">
                <CardHeader>
                  <CardCategory>Statistics</CardCategory>
                  <CardTitle tag="h4">Your Products</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={canvas =>
                        this.buildGraph(
                          canvas,
                          this.state.dataForProducts.time,
                          this.state.dataForProducts.count,
                          "#0066ff"
                        )
                      }
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

const mapDispatchToProps = dispatch => ({
  getCurrencyActionAsnc: val => {
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
