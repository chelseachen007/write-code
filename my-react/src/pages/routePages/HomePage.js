import React, { Component } from "react";
// import {Redirect} from "../../my-react-router-dom/";
import { Redirect } from "react-router-dom";

export default class HomePage extends Component {
  render() {
    console.log("props", this.props); 
    return (
      <Redirect
        to={{
          pathname: "/welcome",
        }}
      />
    );
    return (
      <div>
        <h3>HomePage</h3>
      </div>
    );
  }
}
