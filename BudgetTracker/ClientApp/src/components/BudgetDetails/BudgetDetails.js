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
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalPeriodIncome, setTotalPeriodIncome] = useState(0);
    const [totalPeriodExpenses, setTotalPeriodExpenses] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filterKeyword, setFilterKeyword] = useState(null);
    const [endDate, setEndDate] = useState(new Date(date.getFullYear(), date.getMonth() + 1, 0));
    const [startDate, setStartDate] = useState(new Date(date.getFullYear(), date.getMonth(), 1));

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

      const handleCallback = (start, end, label) => {
        transactionService.getAll(props.walletList[0].id, start._d, end._d).then(function(data){
            setListOfTransactions(data);
        });
      }

    const createTransaction = () => {
        transactionService.create({
            name: transactionNote, 
            category: selectedOption.label, 
            value: Number(incomeValue), 
            budgetId: props.budget.value,

        }).then(
            function(data){
                setNewTransaction(data);
                setListOfTransactions([data, ...listOfTransactions]);
                handleClose();
        });
    }

    const handleCategoryChange = (selected) => {
        console.log(`Option selected:`, selected.Gifts);
        setSelectedCategory(selected);
        transactionService.getAll(props.walletList[0].id, startDate, endDate, filterKeyword == "" ? null : filterKeyword, selected.value).then(function(data){
            setListOfTransactions(data);
        });
        console.log("test", selectedCategory);

    }

    const handleChange = (event) =>{
        setFilterKeyword(event.target.value);
        transactionService.getAll(props.walletList[0].id, startDate, endDate, event.target.value == "" ? null :  event.target.value, selectedCategory !== null ? selectedCategory.value : null).then(function(data){
            setListOfTransactions(data);
        });
    }

    useEffect(() => {
        transactionService.getAll(props.walletList[0].id, startDate, endDate, null, null)
                            .then(function(data){
                            setListOfTransactions(data);
                            setTotalBalance(data.reduce((totalBalance, item) =>  totalBalance + item.value, 0));
                            setTotalPeriodIncome(data.reduce(function(totalIncome, item){return item.value > 0 ? totalIncome + item.value : totalIncome},0));
                            setTotalPeriodExpenses(data.reduce(function(totalIncome, item){return item.value < 0 ? totalIncome + item.value : totalIncome},0))
                });
      }, []);

    return (
        <div>
            <DisplayModal 
                show={show} 
                handleClose={handleClose} 
                selectedOption={selectedOption} 
                setSelectedOption={setSelectedOption}
                setTransactionNote={setTransactionNote}
                createTransaction={createTransaction}
                setIncomeValue={setIncomeValue}
                />

            <Row>
                <Col sm={8}>
                    <Button variant="success" onClick={handleShow}><IoIosAddCircleOutline/> Add Transaction</Button >
                </Col>
                 <Col sm={4}>
                    <div className="date">
                        <DateRangePicker
                            onCallback={handleCallback}
                            initialSettings={{ startDate: startDate, endDate: endDate }}>
                            <input type="text" className="form-control" />
                        </DateRangePicker>
                    </div>
                    </Col>
            </Row>
            <Filters 
                handleChange={handleChange}
                handleCategoryChange={handleCategoryChange}
                selectedCategory={selectedCategory}
                />
            <div className="status">
                <Row>
                    <Col xs={3}>
                        <p>Current Wallet Balance</p>
                         <p style={{color: Math.sign(totalBalance) === -1 ? "red" : "green", fontSize: 25}}>
                             {totalBalance}
                        </p>
                    </Col>
                    <Col xs={3}>
                        <p>Total Period Change</p>
                        <p style={{color: Math.sign(parseInt(totalPeriodIncome) + parseInt(totalPeriodExpenses)) === -1 ? "red" : "green", fontSize: 25}}>{parseInt(totalPeriodIncome) + parseInt(totalPeriodExpenses)}</p>
                    </Col>
                    <Col xs={3}>
                        <p>Total Period Expenses</p>
                        <p style={{color: Math.sign(totalPeriodExpenses) === -1 ? "red" : "green", fontSize: 25}}>
                             {totalPeriodExpenses}
                        </p>
                    </Col>
                    <Col xs={3}>
                        <p>Total Period Income</p>
                        <p style={{color: Math.sign(totalPeriodIncome) === -1 ? "red" : "green", fontSize: 25}}>
                             {totalPeriodIncome}
                        </p>
                    </Col>
                </Row>
            </div>
            <ListOfTransactions listOfTransactions={listOfTransactions}/>
        </div>
    );
};

export default BudgetDetails;