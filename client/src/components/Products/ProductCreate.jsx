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
import * as service from "../../service/ProductService";
import * as companyService from "../../service/CompanyService";
import * as schemas from "../../Shcemas/productSchemas";
import { PanelHeader } from "components";
import { debuglog } from "util";

class ProductCreate extends React.Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getProductSchema;
    this.state = {
      submitButtomText: "Create Product",
      checked: false,
      dataTypes: [],
      companies: []
    };
    this.state.product = this.validation.initialValues;
  }
  componentDidMount = () => {
    if (this.props.uid !== undefined) {
      service
        .getById(this.props.uid)
        .then(this.onGetProductSucsses)
        .catch(this.onGetProductError);
    }
    companyService
      .getByUserId(this.props.currentUser.id)
      .then(this.onGetCompaniesSucsses)
      .catch(this.onGetCompaniesError);
  };
  onGetCompaniesSucsses = response => {
    this.setState({ companies: response.data.item });
  };
  onGetCompaniesError = response => {};
  onGetProductSucsses = response => {
    this.setState({
      product: {
        title: response.data.item.title,
        body: response.data.item.body,
        price: response.data.item.price,
        contactPerson: response.data.item.contactPerson,
        companyId: response.data.item.companyId,
        phoneNumber: response.data.item.phoneNumber,
        photoUrl: response.data.item.photoUrl
      },
      submitButtomText: "Update Product"
    });
  };
  onGetProductError = response => {
    console.log("ERROR!");
  };

  handleSubmit = (values, obj) => {
    var data = {
      Title: values.title,
      Body: values.body,
      Price: values.price,
      ContactPerson: values.contactPerson,
      CompanyId: values.companyId,
      PhoneNumber: values.phoneNumber,
      PhotoUrl: values.photoUrl
    };
    if (this.props.uid === undefined) {
      service
        .add(data)
        .then(this.onAddProductSucsses)
        .catch(this.onAddProductError);
    } else {
      data.id = this.props.uid;
      service
        .update(data)
        .then(this.onUpdateProductSucsses)
        .catch(this.onUpdateProductError);
    }
  };
  onUpdateProductSucsses = () => {
    this.props.history.push({
      pathname: "/product/list"
    });
  };
  onUpdateProductError = () => {};

  onAddProductSucsses = () => {
    this.props.history.push({
      pathname: "/product/list"
    });
  };
  onAddProductError = () => {};
  renderOptions = company => {
    return (
      <option key={company.id} value={company.id}>
        {company.companyName}
      </option>
    );
  };

  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>Create Product</CardHeader>
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
                              <Label className=" col-form-label">Title</Label>
                              <Input
                                type="text"
                                id="title"
                                placeholder="Enter the Title"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                  errors.title && touched.title
                                    ? "form-control is-invalid"
                                    : ""
                                }
                              />
                              {errors.title && touched.title && (
                                <label className="text-danger">
                                  {errors.title}
                                </label>
                              )}
                            </fieldset>
                            <fieldset>
                              <Label className=" col-form-label">Body</Label>
                              <div>
                                <Input
                                  type="text"
                                  id="body"
                                  placeholder="Enter the Body"
                                  value={values.body}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.body && touched.body
                                      ? "form-control is-invalid"
                                      : ""
                                  }
                                />
                                {errors.body && touched.body && (
                                  <label className="text-danger">
                                    {errors.body}
                                  </label>
                                )}
                              </div>
                            </fieldset>
                            <fieldset>
                              <Label className="col-form-label">Price</Label>
                              <div>
                                <Input
                                  type="number"
                                  id="price"
                                  placeholder="Enter Price"
                                  value={values.price}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.price && touched.price
                                      ? "form-control is-invalid"
                                      : ""
                                  }
                                />
                                {errors.price && touched.price && (
                                  <label className="text-danger">
                                    {errors.price}
                                  </label>
                                )}
                              </div>
                            </fieldset>
                            <fieldset>
                              <Label className="col-form-label">
                                Contact Person
                              </Label>
                              <div>
                                <Input
                                  type="text"
                                  id="contactPerson"
                                  placeholder="Name of Person"
                                  value={values.contactPerson}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.contactPerson &&
                                    touched.contactPerson
                                      ? "form-control is-invalid"
                                      : ""
                                  }
                                />
                                {errors.contactPerson &&
                                  touched.contactPerson && (
                                    <label className="text-danger">
                                      {errors.contactPerson}
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
                            <fieldset>
                              <Label className="col-form-label">PhotoUrl</Label>
                              <div>
                                <Input
                                  type="tel"
                                  id="photoUrl"
                                  placeholder="Enter the PhotoUrl"
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
                              <Label className=" col-form-label">Company</Label>
                              <select
                                className="form-control"
                                name="companyId"
                                value={values.companyId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{ display: "block" }}
                              >
                                <option value={0} label="Select Company" />
                                {this.state.companies.map(this.renderOptions)}
                              </select>
                              {errors.companyId && touched.companyId && (
                                <div className="text-danger">
                                  {errors.companyId}
                                </div>
                              )}
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

export default ProductCreate;
