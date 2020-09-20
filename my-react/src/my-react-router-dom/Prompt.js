import React, { Component } from "react";
import { RouterContext } from "./Context";

export default function Prompt({ message, when = true }) {
  return (
    <RouterContext.Consumer>
      {(context) => {
        if (!when) return null;
        let method = context.history.block;
        console.log(method);
        return (
          <LifeCycle
            onMount={(self) => {
              self.release = method(message);
            }}
            onUpdate={(self, prevProps) => {
              if (prevProps.message !== message) {
                self.release();
                self.release = method(message);
              }
            }}
            onUnmount={(self) => {
              self.release();
            }}
            message={message}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}
// 暗号 ：
class LifeCycle extends Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount.call(this, this);
    }
  }
  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount.call(this, this);
    }
  }
  render() {
    return null;
  }
}
