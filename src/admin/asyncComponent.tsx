import React, { Component } from "react";

export default function asyncComponent(importComponent:any) {
  class AsyncComponent extends Component<any,any> {
    constructor(props:any) {
      super(props);
      this.state = {
        component: null
      };
    }

     public async componentDidMount() {

      const { default: component } = await importComponent();

      console.log(importComponent)
      this.setState({
        component
      });
    }

    public render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}