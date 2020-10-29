import React, { Component } from "react";
import authService from "./api-authorization/AuthorizeService";
import BudgetDisplay from "./BudgetDisplay/BudgetDisplay";

import "./Home.css";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null,
      onChange: new Date(),
      value: new Date(),
      loading: true,
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser(),
    ]);
    this.setState({
      isAuthenticated,
      userName: user && user.name,
      loading: false,
    });
  }

  render() {
    const { isAuthenticated, userName } = this.state;

    return (
      <div>
        {this.state.loading ? null : (
          <React.Fragment>
            {isAuthenticated === false ? (
              <React.Fragment>
                <div className="title">
                  <h1>
                    Create an account or log in and track your home budget!
                  </h1>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <BudgetDisplay />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}
