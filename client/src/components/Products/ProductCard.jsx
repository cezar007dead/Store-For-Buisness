import React from "react";
import * as service from "../../service/ProductService";
import * as serviceCompany from "../../service/CompanyService";
import { CardFooter, Media, Col } from "reactstrap";
import Moment from "react-moment";
import moment from "moment";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        id: this.props.data.id,
        title: this.props.data.title,
        body: this.props.data.body,
        price: this.props.data.price,
        contactPerson: this.props.data.contactPerson,
        companyId: this.props.data.companyId,
        phoneNumber: this.props.data.phoneNumber,
        photoUrl: this.props.data.photoUrl,
        dateCreated: this.props.data.dateCreate,
        dateModified: this.props.data.dateModified,
        userId: this.props.data.userId
      },
      company: {}
    };

    Moment.globalMoment = moment;
  }
  handleEdit = () => {
    this.props.history.push({
      pathname: "/product/" + this.state.product.id + "/edit",
      userId: this.props.currentUser.id
    });
  };
  handleDelete = () => {
    service
      .remove(this.state.product.id)
      .then(this.onDeleteProductSucsses)
      .catch(this.onDeleteProductError);
  };

  componentDidMount() {
    serviceCompany
      .getById(this.props.data.companyId)
      .then(this.onGetCompaniesSucsses)
      .catch(this.onGetCompaniesError);
  }
  onGetCompaniesSucsses = response => {
    this.setState({ company: response.data.item });
  };
  onGetCompaniesError = response => {
    console.log("ERROR!");
  };
  onDeleteProductSucsses = response => {
    window.location.reload();
  };
  onDeleteProductError = response => {
    console.log("ERROR!");
  };
  formatPhoneNumber = phoneNumberString => {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return null;
  };

  render() {
    let toolTip = moment(this.state.product.dateCreated).format("LLL");
    let phone = {
      Fontsize: "15px"
    };
    return (
      <div className="col-lg-4 col-md-6">
        <div className="card card-default">
          <div className="card-body">
            <span className="ml-auto" />
            <div className="row">
              <div className="col">
                <p className="text-primary">{this.state.product.title}</p>

                <p className="">{this.state.product.body}</p>
              </div>
              <Col xs={6} md={4}>
                <img
                  height="100%"
                  width="100%"
                  src={`${this.state.product.photoUrl}`}
                  rounded
                />
              </Col>
            </div>
            <div className="row">
              <div className="col">
                {"Price: "}
                <span className="text-primary">
                  {this.state.product.price}
                </span>{" "}
                <span className="mr-2 fas fa-dollar-sign" />
              </div>
            </div>
            <div className="row">
              <div className="col-1">
                <em className="now-ui-icons users_single-02" />
              </div>
              <div className="col">{this.state.product.contactPerson}</div>
            </div>
            <div className="row">
              <div className="col-1">
                <em className="mr-2 fas fa-phone-volume" />
              </div>
              <div className="col">
                <a href={"tel:" + this.state.product.phoneNumber} style={phone}>
                  {this.formatPhoneNumber(this.state.product.phoneNumber)}
                </a>
              </div>
            </div>
            <div className="row ">
              <div className="col d-flex justify-content-end">
                <span>
                  <small className="mr-1">
                    By
                    <a className="ml-1 text-primary">
                      {this.state.company.companyName}
                    </a>{" "}
                    company
                  </small>
                  <small className="mr-1">
                    <Moment
                      data-toggle="tooltip"
                      data-placement="top"
                      title={toolTip}
                      format="MMMM Do YYYY"
                      date={this.state.product.dateCreated}
                    />
                  </small>
                </span>
              </div>
            </div>
          </div>
          {this.props.currentUser.id == this.props.data.userId ? (
            <CardFooter className="d-flex">
              <div>
                <button
                  type="button"
                  className="btn btn-info btn-dismissible fade show"
                  color="danger"
                  onClick={this.handleEdit}
                >
                  Edit
                </button>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="btn btn-danger btn-dismissible fade show"
                  onClick={this.handleDelete}
                >
                  Delete
                </button>
              </div>
            </CardFooter>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default ProductCard;
