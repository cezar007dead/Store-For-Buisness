import React from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import Pagination from "react-js-pagination";
import ProductCard from "../Products/ProductCard";
import { PanelHeader } from "components";

import * as scrapingService from "../../service/ScrapingService";

import {
  InputGroup,
  InputGroupAddon,
  Col,
  Row,
  Input,
  Button
} from "reactstrap";

class Aliexpress extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "", info: "" };
  }
  handleQueryChange = event => {
    this.setState({ query: event.target.value });
  };

  GetResult = query => {
    scrapingService
      .getAliexpress(query)
      .then(response => {
        this.setState({ info: response.data.item });
      })
      .catch();
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
                  this.GetResult(this.state.query);
                }}
              >
                Search
              </Button>
            </Col>
          </Row>
          <div>
            <ul>{ReactHtmlParser(this.state.info)}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Aliexpress;
