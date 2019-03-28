import React from "react";
import { Formik } from "formik";
import Particles from "react-particles-js";

import userBackground from "assets/img/bg5.jpg";

import {
  Row,
  Button,
  Label,
  Input,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardLink,
  CardFooter
} from "reactstrap";
import * as service from "../../service/AuthenticationService";
import { PanelHeader } from "components";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "mr.gura19981972@dispostable.com",
      password: "Sabiodtla65!",
      showErrorLogin: "d-none",
      showErrorServer: "d-none"
    };
  }
  componentDidMount = () => {};
  handleChange = event => {
    if (this.state.showErrorServer === "" || this.state.showErrorLogin === "") {
      this.setState({ showErrorServer: "d-none", showErrorLogin: "d-none" });
    }

    this.setState({ [event.target.name]: event.target.value });
  };
  login = () => {
    var data = {
      EmailAddress: this.state.email,
      password: this.state.password
    };
    service
      .login(data)
      .then(() => {
        this.props.history.push({
          pathname: "/dashboard"
        });
        window.location.reload();
      })
      .catch(r => {
        debugger;
        if (r.response === undefined) {
          this.setState({ showErrorServer: "" });
        } else {
          if (r.response.status === 400) {
            this.setState({ showErrorLogin: "" });
          }
        }
      });
  };
  register = () => {
    this.props.history.push({
      pathname: "/register"
    });
  };
  check = () => {
    service
      .logout()
      .then(() => {
        debugger;
      })
      .catch(() => {
        debugger;
      });
  };

  render() {
    let content = { marginTop: "25px" };
    return (
      <div>
        <PanelHeader size="sm" />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            marginTop: "100px"
          }}
        >
          <Particles
            canvasClassName="justify-content-center"
            width="100%"
            height="1000px"
            params={{
              particles: {
                number: {
                  value: 400,
                  density: { enable: true, value_area: 800 }
                },
                color: { value: "#fff" },
                shape: {
                  type: "circle",
                  stroke: { width: 0, color: "#000000" },
                  polygon: { nb_sides: 5 },
                  image: { src: "img/github.svg", width: 100, height: 100 }
                },
                opacity: {
                  value: 0.5,
                  random: true,
                  anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                  }
                },
                size: {
                  value: 10,
                  random: true,
                  anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
                },
                line_linked: {
                  enable: false,
                  distance: 500,
                  color: "#ffffff",
                  opacity: 0.4,
                  width: 2
                },
                move: {
                  enable: true,
                  speed: 6,
                  direction: "bottom",
                  random: false,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: { enable: false, rotateX: 600, rotateY: 1200 }
                }
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: { enable: true, mode: "bubble" },
                  onclick: { enable: true, mode: "repulse" },
                  resize: true
                },
                modes: {
                  grab: { distance: 400, line_linked: { opacity: 0.5 } },
                  bubble: {
                    distance: 400,
                    size: 4,
                    duration: 0.3,
                    opacity: 1,
                    speed: 3
                  },
                  repulse: { distance: 200, duration: 0.4 },
                  push: { particles_nb: 4 },
                  remove: { particles_nb: 2 }
                }
              },
              retina_detect: true
            }}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#DC9F4E"
              // background: {
              //   image: "assets/img/bg5.jpg",
              //   position: "bottom",
              //   repeat: "no-repeat",
              //   color: "black",
              //   size: "cover"
              // }
            }}
          />
        </div>
        {/* <div className="image">
          <img src={userBackground} alt="..." />
        </div> */}
        <Row className="justify-content-center" style={{ marginTop: "10px" }}>
          <Col md={5}>
            <div>
              <Card>
                <CardTitle className="d-flex justify-content-center">
                  EZBUISNESS
                </CardTitle>
                <CardHeader>Login</CardHeader>
                <CardBody>
                  <div className="content" style={content}>
                    <Label>Email</Label>
                    <Input
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <Label>Password </Label>
                    <Input
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <div className="d-flex justify-content-center">
                      <Label
                        className={`text-danger ${this.state.showErrorServer}`}
                      >
                        Server is not answering
                      </Label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <Label
                        className={`text-danger ${this.state.showErrorLogin}`}
                      >
                        Email or password is not valid
                      </Label>
                    </div>
                    <CardFooter className="d-flex">
                      <div>
                        <Label>Click Register if dont have an account</Label>
                      </div>
                      <div className="ml-auto">
                        <Button color="info" size="sm" onClick={this.register}>
                          Register
                        </Button>
                      </div>
                    </CardFooter>
                    <div className="d-flex justify-content-center">
                      <Button
                        color="success"
                        onClick={this.login}
                        size="sm"
                        block
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
