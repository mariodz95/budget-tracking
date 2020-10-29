import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import {budgetService} from "./../services/budgetService";


export class Budgets extends Component {
  static displayName = Budgets.name;

  constructor(props) {
    super(props);
    this.state = { walletList: [], loading: true };
  }

  componentDidMount() {
    budgetService.getAll().then((data) => {
      if(data.length !== 0){
        this.setState({walletList: data});
      }
  });
  }

  render() {
    return (
      <div className="wallet-list">
        {console.log("walletList", this.state.walletList)}
        <p className="no-wallet-p">Take control of your expenses and save more money with budgets!</p>
        <Button variant="secondary"><Link to="/wallet-form" style={{ textDecoration: 'none', color: 'white' }}>Create a New Budget</Link></Button>{' '}
      </div>
    );
  }
}
