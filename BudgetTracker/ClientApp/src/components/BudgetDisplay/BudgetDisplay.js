import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { Link } from 'react-router-dom'
import {budgetService} from "./../../services/budgetService";
import {formatBudgetForSelect} from "./../../helpers/listOfCurrencies";
import Select from 'react-select';
import BudgetDetails from "./../BudgetDetails/BudgetDetails";

import "./BudgetDisplay.css"

let date = new Date();

const BudgetDisplay = () => {
  const [walletList, setWalletList] = useState(0);
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    budgetService.getAll().then(function(data){
        if(data.length !== 0){
        setWalletList(data);
        }
    });
  }, []);

  useEffect(() => {
    setSelectedOption(walletList === 0 ? 0 : formatBudgetForSelect(walletList)[0]);
  }, [walletList]);


    return (
        <div className="budget">
            {walletList === 0 || walletList === undefined ? 
            <React.Fragment>
                <div className="no-wallet">
                    <p className="no-wallet-p">Take control of your expenses and save more money with budgets!</p>
                    <Button variant="secondary"><Link to="/wallet-form" style={{ textDecoration: 'none', color: 'white' }}>Create a New Budget</Link></Button>{' '}
                </div>
            </React.Fragment>: 
            <React.Fragment>
                <Row className="budget-list">
                   <Col sm={4}>
                        <Select
                            value={selectedOption}
                            options={formatBudgetForSelect(walletList)}
                            onChange={selected => setSelectedOption(selected)}
                        />
                    </Col>
                </Row>
                <BudgetDetails budget={selectedOption} walletList={walletList} />
            </React.Fragment>
            }
        </div>
    );
};

export default BudgetDisplay;