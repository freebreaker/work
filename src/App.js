import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from "react-router-dom";
import { enquireScreen } from 'enquire-js';
import Header from './Home/Nav0';
import Footer from './Home/Footer1';
import Home from './Home';
import Page2 from './page2';

import {
  Nav00DataSource,
  Footer10DataSource,
} from './Home/data.source.js';
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
    };
  }
  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
  }
  render() {
    const url = window.location.href;
    const ShowHeader = url.indexOf("admin") === -1;
    return (
      <Router>
        <div>
          {
            ShowHeader ?
              <Header dataSource={Nav00DataSource} isMobile={this.isMobile} />
              : ""
          }
          <Route exact path="/" component={Home} />
          <Route exact path="/page2" component={Page2} />
          <Route path="/admin" component={AdminPage} />
          <Footer dataSource={Footer10DataSource} isMobile={this.isMobile} />
        </div>
      </Router>
    );
  }
}

export default App;