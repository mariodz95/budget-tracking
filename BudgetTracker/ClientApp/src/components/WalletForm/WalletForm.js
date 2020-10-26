import React, {useState} from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import {currencies} from "./../../helpers/listOfCurrencies";
import {budgetService} from "./../../services/budgetService";
import "./WalletForm.css"


const WalletForm = (props) => {
    const [selectedOption, setSelectedOption] = useState(0);
    const [budgetName, setBudgetName] = useState(0);

    const handleSubmit = (event) => {
        budgetService.create({name: budgetName, currency: selectedOption.value}).then(function(data){ props.history.push({pathname: "/", state: {budget: data}}) });
        event.preventDefault();
      }

    return (
        <div className="wallet-form">
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="formHorizontalName">
                    <Form.Label column sm={2}>
                    Name
                    </Form.Label>
                    <Col sm={5}>
                        <Form.Control type="text" placeholder="Name" onChange={e => setBudgetName(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalCurrency">
                    <Form.Label column sm={2}>
                    Currency
                    </Form.Label>
                    <Col sm={5}>
                        <Select
                            value={selectedOption}
                            onChange={selected => setSelectedOption(selected)}
                            options={currencies()}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                        <Button type="submit" className="create-wallet-button">Create New Wallet</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
};

export default WalletForm;