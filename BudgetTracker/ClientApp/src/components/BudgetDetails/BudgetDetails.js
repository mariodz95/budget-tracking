import React, {useEffect} from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Filters from "./../Filters/Filters";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import {budgetService} from "./../../services/budgetService";

let date = new Date();

const BudgetDetails = (props) => {

    useEffect(() => {
        console.log("props", props);

      }, [props]);

    return (
        <div>
            <Row>
                <Col sm={8}>
                    <Button variant="success"><IoIosAddCircleOutline/> Cash incoming</Button >
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
        </div>
    );
};

export default BudgetDetails;