import React from "react";
import { Formik } from "formik";
import Particles from "react-particles-js";

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

import * as schemas from "../../Shcemas/registerSchemas";
import { PanelHeader } from "components";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.validation = schemas.registerSchemas;
    this.state = {
      showErrorLogin: "d-none",
      showErrorServer: "d-none",
      submitButtomText: "Register"
    };
    this.state.user = this.validation.initialValues;
  }
  componentDidMount = () => {};
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (values, obj) => {
    debugger;
    var data = {
      Email: values.email,
      Password: values.password,
      ConfirmPassword: values.confirmPassword
    };
    service
      .register(data)
      .then(() => {
        this.props.history.push({
          pathname: "/"
        });
      })
      .catch();
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
              backgroundColor: "powderblue"
            }}
          />
        </div>
        <Row className="justify-content-center" style={{ marginTop: "10px" }}>
          <Col md={5}>
            <div>
              <Card>
                <CardTitle className="d-flex justify-content-center">
                  EZBUISNESS
                </CardTitle>
                <CardHeader>Register</CardHeader>
                <CardBody>
                  <div className="content" style={content}>
                    <div>
                      <Formik
                        enableReinitialize={true}
                        initialValues={this.state.product}
                        onSubmit={this.handleSubmit}
                        validationSchema={this.validation()}
                        onChange={this.handleChange}
                      >
                        {props => {
                          const {
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit
                          } = props;
                          return (
                            <div
                              onChange={handleChange}
                              onSubmit={handleSubmit}
                              className="form-horizontal"
                              action="#"
                              data-parsley-validate=""
                              noValidate=""
                            >
                              <fieldset>
                                <Label className=" col-form-label">Email</Label>
                                <Input
                                  type="text"
                                  id="email"
                                  placeholder="Enter your email Address"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.email && touched.email
                                      ? "form-control is-invalid"
                                      : ""
                                  }
                                />
                                {errors.email && touched.email && (
                                  <label className="text-danger">
                                    {errors.email}
                                  </label>
                                )}
                              </fieldset>
                              <fieldset>
                                <Label className=" col-form-label">
                                  Password
                                </Label>
                                <div>
                                  <Input
                                    type="text"
                                    id="password"
                                    placeholder="Enter the Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                      errors.password && touched.password
                                        ? "form-control is-invalid"
                                        : ""
                                    }
                                  />
                                  {errors.password && touched.password && (
                                    <label className="text-danger">
                                      {errors.password}ds
                                    </label>
                                  )}
                                </div>
                              </fieldset>
                              <fieldset>
                                <Label className="col-form-label">
                                  Confirm Password
                                </Label>
                                <div>
                                  <Input
                                    type="text"
                                    id="confirmPassword"
                                    placeholder="Confirm the Password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                      errors.confirmPassword &&
                                      touched.confirmPassword
                                        ? "form-control is-invalid"
                                        : ""
                                    }
                                  />
                                  {errors.confirmPassword &&
                                    touched.confirmPassword && (
                                      <label className="text-danger">
                                        {errors.confirmPassword}
                                      </label>
                                    )}
                                </div>
                              </fieldset>

                              <div className="card-footer text-center">
                                <Button
                                  color="primary"
                                  type="button"
                                  onClick={handleSubmit}
                                  className="submitForm"
                                >
                                  {this.state.submitButtomText}
                                </Button>
                              </div>
                            </div>
                          );
                        }}
                      </Formik>
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

export default Register;
