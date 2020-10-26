import React, {useEffect, useState} from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Filters from "./../Filters/Filters";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import {DisplayModal} from "./DisplayModal";
import {transactionService} from "./../../services/transactionService";
import ListOfTransactions from "./ListOfTransactions";

let date = new Date();

const BudgetDetails = (props) => {
    const [show, setShow] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);
    const [transactionNote, setTransactionNote] = useState(0);
    const [incomeValue, setIncomeValue] = useState(0);
    const [newTransaction, setNewTransaction] = useState(0);
    const [listOfTransactions, setListOfTransactions] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createTransaction = () => {
        transactionService.create({name: transactionNote, category: selectedOption.label, value: Number(incomeValue), budgetId: props.budget.value}).then(
            function(data){
                setNewTransaction(data);
            });
    }

    useEffect(() => {
        transactionService.getAll(props.walletList[0].id).then(function(data){
            setListOfTransactions(data);
        });
      }, []);

    return (
        <div>
            {console.log("props", props)}
            <DisplayModal 
                show={show} 
                handleClose={handleClose} đ
                selectedOption={selectedOption} 
                setSelectedOption={setSelectedOption}
                setTransactionNote={setTransactionNote}
                createTransaction={createTransaction}
                setIncomeValue={setIncomeValue}
                />

            <Row>
                <Col sm={8}>
                    <Button variant="success" onClick={handleShow}><IoIosAddCircleOutline/> Cash incoming</Button >
                    <Button variant="danger"><AiOutlineMinusCircle /> Cash outgoing</Button >
                </Col>
                 <Col sm={4}>
                    <div className="date">
                        <DateRangePicker
                            initialSettings={{ startDate: new Date(date.getFullYear(), date.getMonth(), 1), endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0) }}>
                            <input type="text" className="form-control" />
                        </DateRangePicker>
                    </div>
                    </Col>
            </Row>
            <Filters/>
            <div className="status">
                <Row>
                    <Col xs={3}>
                        <p>Current Wallet Balance</p>
                    </Col>
                    <Col xs={3}>
                        <p>Total Period Change</p>
                    </Col>
                    <Col xs={3}>
                        <p>Total Period Expenses</p>
                    </Col>
                    <Col xs={3}>
                        <p>Total Period Income</p>
                    </Col>
                </Row>
            </div>
            <ListOfTransactions listOfTransactions={listOfTransactions}/>
        </div>
    );
};

export default BudgetDetails;