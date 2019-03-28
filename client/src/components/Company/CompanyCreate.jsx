import React from "react";
import { Formik } from "formik";
import {
  Row,
  Button,
  Label,
  Input,
  Col,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import * as service from "../../service/CompanyService";
import * as schemas from "../../Shcemas/companySchemas";
import { PanelHeader } from "components";
import { height } from "window-size";

class CompanyCreate extends React.Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getCompanySchemas;
    this.state = {
      submitButtomText: "Create Company",
      checked: false,
      dataTypes: [],
      keys: []
    };
    this.state.product = this.validation.initialValues;
  }
  componentDidMount = () => {
    // if (this.props.match.params.uid !== undefined) {
    //   service
    //     .getById(this.props.match.params.uid)
    //     .then(this.onGetProductSucsses)
    //     .catch(this.onGetProductError);
    // }
  };
  onGetProductSucsses = response => {
    this.setState({
      product: {
        title: response.data.item.title,
        body: response.data.item.body,
        price: response.data.item.price,
        contactPerson: response.data.item.contactPerson,
        companyUrl: response.data.item.companyUrl,
        phoneNumber: response.data.item.phoneNumber
      },
      submitButtomText: "Update Product"
    });
  };
  onGetProductError = response => {
    console.log("ERROR!");
  };

  handleSubmit = (values, obj) => {
    var data = {
      CompanyName: values.companyName,
      Url: values.companyUrl,
      Description: values.description,
      PhotoUrl: values.photoUrl,
      PhoneNumber: values.phoneNumber
    };
    if (this.props.match.params.uid === undefined) {
      service
        .add(data)
        .then(this.onAddCompanySuccses)
        .catch(this.onAddCompanyError);
    } else {
      //   data.id = this.props.match.params.uid;
      //   service
      //     .update(data)
      //     .then(this.onUpdateCompanySucsses)
      //     .catch(this.onUpdateCompanyError);
    }
  };
  onUpdateCompanySucsses = () => {
    this.props.history.push({
      pathname: "/dashboard"
    });
  };
  onUpdateCompanyError = () => {};

  onAddCompanySuccses = () => {
    this.props.history.push({
      pathname: "/dashboard"
    });
  };
  onAddCompanyError = () => {};

  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>Add Company</CardHeader>
                <CardBody>
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
                              <Label className=" col-form-label">
                                CompanyName
                              </Label>
                              <Input
                                type="text"
                                id="companyName"
                                placeholder="Enter the CompanyName"
                                value={values.companyName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.companyName && touched.companyName
                                    ? "form-control is-invalid"
                                    : ""
                                }
                              />
                              {errors.companyName && touched.companyName && (
                                <label className="text-danger">
                                  {errors.companyName}
                                </label>
                              )}
                            </fieldset>
                            <fieldset>
                              <Label className="col-form-label">
                                Company WebSite
                              </Label>
                              <div>
                                <Input
                                  type="text"
                                  id="companyUrl"
                                  placeholder="Enter the link to website"
                                  value={values.companyUrl}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.companyUrl && touched.companyUrl
                                      ? "form-control is-invalid"
                                      : ""
                                  }
                                />
                                {errors.companyUrl && touched.companyUrl && (
                                  <label className="text-danger">
                                    {errors.companyUrl}
                                  </label>
                                )}
                              </div>
                            </fieldset>
                            <fieldset>
                              <Label className=" col-form-label">
                                Description
                              </Label>
                              <div>
                                <Input
                                  type="textarea"
                                  id="description"
                                  style={{
                                    height: "100px",
                                    backgroundColor: "#D1D1D1"
                                  }}
                                  placeholder="Enter some info about your company"
                                  value={values.description}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.description && touched.description
                                      ? "form-control is-invalid"
                                      : ""
                                  }
                                />
                                {errors.description && touched.description && (
                                  <label className="text-danger">
                                    {errors.description}
                                  </label>
                                )}
                              </div>
                            </fieldset>
                            <fieldset>
                              <Label className="col-form-label">PhotoUrl</Label>
                              <div>
                                <Input
                                  type="text"
                                  id="photoUrl"
                                  placeholder="Enter the Photo Url"
                                  value={values.photoUrl}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.photoUrl && touched.photoUrl
                                      ? "form-control is-invalid"
                                      : ""
                                  }
                                />
                                {errors.photoUrl && touched.photoUrl && (
                                  <label className="text-danger">
                                    {errors.photoUrl}
                                  </label>
                                )}
                              </div>
                            </fieldset>
                            <fieldset>
                              <Label className="col-form-label">
                                Phone Number
                              </Label>
                              <div>
                                <Input
                                  type="tel"
                                  id="phoneNumber"
                                  placeholder="Enter the Phone Number"
                                  value={values.phoneNumber}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.phoneNumber && touched.phoneNumber
                                      ? "form-control is-invalid"
                                      : ""
                                  }
                                />
                                {errors.phoneNumber && touched.phoneNumber && (
                                  <label className="text-danger">
                                    {errors.phoneNumber}
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default CompanyCreate;
