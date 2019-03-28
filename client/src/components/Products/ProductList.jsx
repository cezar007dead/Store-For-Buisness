import React from "react";
import * as service from "../../service/ProductService";
import Pagination from "react-js-pagination";
import ProductCard from "../Products/ProductCard";
import { PanelHeader } from "components";

import {
  InputGroup,
  InputGroupAddon,
  Col,
  Row,
  Input,
  Button
} from "reactstrap";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      activePage: 0,
      totalProductsCount: null,
      itemsCountPerPage: 4,
      query: ""
    };
  }
  handleQueryChange = event => {
    this.setState({ query: event.target.value });
  };

  handlePageChange = pageNumber => {
    this.GetProducts(
      pageNumber,
      this.state.itemsCountPerPage,
      this.state.query
    );
  };

  GetProducts(pageNumber, pageSize, query) {
    service
      .getByPIndexSizeSearch(pageNumber - 1, pageSize, query) //get by page
      .then(this.onGetProductsSucsses)
      .catch(this.onGetProductsError);
  }

  componentDidMount() {
    this.GetProducts(1, this.state.itemsCountPerPage, this.state.query);
  }
  onGetProductsSucsses = response => {
    if (response.data.item == null) {
      this.setState({
        activePage: 0,
        products: [],
        totalProductsCount: 0
      });
    } else {
      this.setState({
        activePage: response.data.item.pageIndex,
        products: response.data.item.pagedItems,
        totalProductsCount: response.data.item.totalCount
      });
    }
  };
  onGetProductsError = response => {
    console.log("error");
  };

  renderBlockProduct = (product, index) => {
    return <ProductCard {...this.props} key={product.id} data={product} />;
  };

  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="container-fluid pt-3">
          <Row>
            <Col>
              <InputGroup>
                <Input
                  style={{ marginTop: "9px", backgroundColor: "#FFFFFF" }}
                  value={this.state.query}
                  onChange={this.handleQueryChange}
                />
                <InputGroupAddon
                  addonType="append"
                  style={{ marginTop: "9px" }}
                >
                  {this.state.query !== "" ? (
                    <button
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "2px solid #F96332",
                        color: "black",
                        padding: "8px 22px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "10px",
                        borderRadius: "2px"
                      }}
                      onClick={() => {
                        this.setState({ query: "" });
                        this.GetProducts(1, this.state.itemsCountPerPage, "");
                      }}
                    >
                      CLEARE
                    </button>
                  ) : (
                    ""
                  )}
                </InputGroupAddon>
              </InputGroup>
            </Col>
            <Col className="d-flex justify-content-start">
              <Button
                color="primary"
                size={"sm"}
                onClick={() => {
                  this.GetProducts(
                    1,
                    this.state.itemsCountPerPage,
                    this.state.query
                  );
                }}
              >
                Search
              </Button>
            </Col>
          </Row>
          <div className="text-center mb-3 pb-3 ">
            {/* <div className="h2 text-bold">{this.state.sponsorType}</div> */}
          </div>
          <div className="d-flex justify-content-end">
            <Pagination
              activePage={this.state.activePage + 1}
              itemsCountPerPage={this.state.itemsCountPerPage}
              totalItemsCount={this.state.totalProductsCount}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
          <div className="row">
            {this.state.products.map(this.renderBlockProduct)}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
