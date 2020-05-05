import React from "react";
import p5 from "p5";

export default class P5Wrapper extends React.Component {
  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.wrapper);

    if (this.canvas.PropsHandler) {
      this.canvas.PropsHandler(this.props);
    }
  }

  UNSAFE_componentWillReceiveProps(newprops) {
    if (this.props.sketch !== newprops.sketch) {
      this.canvas.remove();
      this.canvas = new p5(newprops.sketch, this.wrapper);
    }
    if (this.canvas.PropsHandler) {
      this.canvas.PropsHandler(newprops);
    }
  }

  componentWillUnmount() {
    if (this.canvas) {
      this.canvas.remove();
    }
  }

  render() {
    if (this.props.divElement !== null) {
      return <div ref={(wrapper) => (this.wrapper = wrapper)}></div>;
    } else {
      return <div>Loading</div>;
    }
  }
}
