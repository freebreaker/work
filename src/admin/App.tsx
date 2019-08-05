import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { LoginPage } from './pages/login/index';
import { AdminHome } from './pages/home/index';

const AdminPage: React.FC = () => {
  return (
    <div className="App">
      <div className="center w85">
        <div className="ph3 pv1 background-gray">
          <BrowserRouter>
            <Switch>
              <Route exact={true} path="/admin" component={LoginPage} />
              <Route exact={true} path="/login" component={LoginPage} />
              <Route exact={false} path="/admin/home" component={AdminHome} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
