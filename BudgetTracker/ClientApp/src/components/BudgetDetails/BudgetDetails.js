import React, { useEffect, useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Filters from "./../Filters/Filters";
import { IoIosAddCircleOutline } from "react-icons/io";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { DisplayModal } from "./DisplayModal";
import { transactionService } from "./../../services/transactionService";
import { categories } from "./../../helpers/categories";
import ListOfTransactions from "./ListOfTransactions";

let date = new Date();

const BudgetDetails = (props) => {
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [transactionNote, setTransactionNote] = useState(0);
  const [incomeValue, setIncomeValue] = useState(0);
  const [listOfTransactions, setListOfTransactions] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalPeriodIncome, setTotalPeriodIncome] = useState(0);
  const [totalPeriodExpenses, setTotalPeriodExpenses] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState(null);
  const [endDate, setEndDate] = useState(
    new Date(date.getFullYear(), date.getMonth() + 1, 0)
  );
  const [startDate, setStartDate] = useState(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );
  const [lowestNumber, setLowestNumber] = useState(0);
  const [highestNumber, setHighestNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updatedTransaction, setUpdatedTransaction] = useState(0);

  const handleClose = () => {
    setShow(false);
    setUpdatedTransaction(0);
  };
  const handleShow = () => setShow(true);

  const handleCallback = (start, end, label) => {
    transactionService
      .getAll(props.budget[0].id, start._d, end._d)
      .then(function (data) {
        setListOfTransactions(data);
        calculate(data);
      });
  };

  const handleUpdate = (item) => {
    setShow(true);
    setSelectedOption(
      categories.find((element) => {
        return element.value === item.category;
      })
    );
    setUpdatedTransaction(item);
  };

  const createTransaction = () => {
    if (updatedTransaction === 0) {
      transactionService
        .create({
          name: transactionNote,
          category: selectedOption.label,
          value: Number(incomeValue),
          budgetId: props.budget[0].id,
        })
        .then(function (data) {
          setListOfTransactions([data, ...listOfTransactions]);
          calculate([data, ...listOfTransactions]);
          handleClose();
        });
    } else {
      transactionService
        .update({
          name:
            transactionNote === 0 ? updatedTransaction.name : transactionNote,
          category: selectedOption.label,
          value:
            incomeValue === 0 ? updatedTransaction.value : Number(incomeValue),
          budgetId: props.budget[0].id,
          dateCreated: updatedTransaction.dateCreated,
          id: updatedTransaction.id,
          userId: updatedTransaction.userId,
        })
        .then(function (data) {
          setListOfTransactions(
            listOfTransactions.map((element) => {
              return data.id === element.id ? data : element;
            })
          );

          calculate([data, ...listOfTransactions]);
          handleClose();
        });
    }
  };

  const handleCategoryChange = (selected) => {
    setSelectedCategory(selected);
    transactionService
      .getAll(
        props.budget[0].id,
        startDate,
        endDate,
        filterKeyword == "" ? null : filterKeyword,
        selected !== null ? selected.value : null
      )
      .then(function (data) {
        setListOfTransactions(data);
        calculate(data);
      });
  };

  const calculate = (data) => {
    setTotalBalance(
      data.reduce((totalBalance, item) => totalBalance + item.value, 0)
    );
    setTotalPeriodIncome(
      data.reduce(function (totalIncome, item) {
        return item.value > 0 ? totalIncome + item.value : totalIncome;
      }, 0)
    );
    setTotalPeriodExpenses(
      data.reduce(function (totalIncome, item) {
        return item.value < 0 ? totalIncome + item.value : totalIncome;
      }, 0)
    );
    setLowestNumber(
      Math.min.apply(
        Math,
        data.map(function (o) {
          return o.value;
        })
      )
    );
    setHighestNumber(
      Math.max.apply(
        Math,
        data.map(function (o) {
          return o.value;
        })
      )
    );
  };

  const handleChange = (event) => {
    setFilterKeyword(event.target.value);
    transactionService
      .getAll(
        props.budget[0].id,
        startDate,
        endDate,
        event.target.value == "" ? null : event.target.value,
        selectedCategory !== null ? selectedCategory.value : null
      )
      .then(function (data) {
        setListOfTransactions(data);
        calculate(data);
      });
  };

  const handleDelete = (item) => {
    transactionService
      ._delete(item.id)
      .then(
        setListOfTransactions(
          listOfTransactions.filter((x) => x.id !== item.id)
        )
      );
    calculate(listOfTransactions.filter((x) => x.id !== item.id));
  };

  useEffect(() => {
    transactionService
      .getAll(props.budget[0].id, startDate, endDate, null, null)
      .then(function (data) {
        setListOfTransactions(data);
        calculate(data);
        setLoading(false);
      });
  }, [props]);

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
        updatedTransaction={updatedTransaction}
      />

      <Row>
        <Col sm={8}>
          <Button variant="success" onClick={handleShow}>
            <IoIosAddCircleOutline /> Add Transaction
          </Button>
        </Col>
        <Col sm={4}>
          <div className="date">
            <DateRangePicker
              onCallback={handleCallback}
              initialSettings={{ startDate: startDate, endDate: endDate }}
            >
              <input type="text" className="form-control" />
            </DateRangePicker>
          </div>
        </Col>
      </Row>
      {loading === true ? null : (
        <React.Fragment>
          <Filters
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
            lowestNumber={lowestNumber}
            highestNumber={highestNumber}
          />
        </React.Fragment>
      )}
      <div className="status">
        <Row>
          <Col xs={3}>
            <p>Current Wallet Balance</p>
            <p
              style={{
                color: Math.sign(totalBalance) === -1 ? "red" : "green",
                fontSize: 25,
              }}
            >
              {totalBalance}
            </p>
          </Col>
          <Col xs={3}>
            <p>Total Period Change</p>
            <p
              style={{
                color:
                  Math.sign(
                    parseInt(totalPeriodIncome) + parseInt(totalPeriodExpenses)
                  ) === -1
                    ? "red"
                    : "green",
                fontSize: 25,
              }}
            >
              {parseInt(totalPeriodIncome) + parseInt(totalPeriodExpenses)}
            </p>
          </Col>
          <Col xs={3}>
            <p>Total Period Expenses</p>
            <p
              style={{
                color: Math.sign(totalPeriodExpenses) === -1 ? "red" : "green",
                fontSize: 25,
              }}
            >
              {totalPeriodExpenses}
            </p>
          </Col>
          <Col xs={3}>
            <p>Total Period Income</p>
            <p
              style={{
                color: Math.sign(totalPeriodIncome) === -1 ? "red" : "green",
                fontSize: 25,
              }}
            >
              {totalPeriodIncome}
            </p>
          </Col>
        </Row>
      </div>
      <ListOfTransactions
        listOfTransactions={listOfTransactions}
        currency={props.budget[0].currency}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </div>
  );
};

export default BudgetDetails;
