import React from "react";
import { Formik } from "formik";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
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
import * as scrapingService from "../../service/ScrapingService";
import { PanelHeader } from "components";

class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = { info: "" };
  }
  componentDidMount = () => {
    scrapingService
      .get()
      .then(response => {
        this.setState({ info: response.data.item });
      })
      .catch();
  };

  render() {
    let content = { marginTop: "25px" };
    return (
      <div>
        <PanelHeader size="sm" />
        <h1>U.S. Import Requirements</h1>
        <div className="content" style={content}>
          {ReactHtmlParser(this.state.info)}
        </div>
      </div>
    );
  }
}

export default Information;
