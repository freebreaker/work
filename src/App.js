import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from "react-router-dom";
import { enquireScreen } from 'enquire-js';
import AdminPage from './admin/App.tsx';

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      ShowMsgBoxTitle: false
    };
  }
  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
  }

  render() {
    return (
      <Router>
          <Route path="/" component={AdminPage} />
      </Router>
    );
  }
}


export default App;