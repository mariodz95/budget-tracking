import React, { Component } from 'react';
import {

  Route,
} from "react-router-dom";
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Budgets } from './components/Budgets';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import WalletForm from './components/WalletForm/WalletForm';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <AuthorizeRoute path='/budgets' component={Budgets} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
        <AuthorizeRoute path='/wallet-form' component={WalletForm} />
      </Layout>
    );
  }
}
