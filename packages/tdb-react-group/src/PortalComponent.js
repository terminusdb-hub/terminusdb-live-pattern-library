import React from "react"
import ReactDOM from "react-dom"

export class PortalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.querySelector(`#${props.component}`);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}