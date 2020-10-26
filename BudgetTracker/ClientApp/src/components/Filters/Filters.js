import React from 'react';
import Select from 'react-select';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import {categories} from "./../../helpers/categories";
import "./Filters.css"

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

const Filters = () => {
    return (
        <div className="filters">
            <p className="filter-text">Filters</p>
            <Row>
                <Col xs={3}>
                    <p>By category</p>
                    <Select
                        value={"selectedOption"}
                        options={categories}
                    />
                </Col>
                <Col xs={3}>
                    <p>By people</p>
                    <Select
                        value={"selectedOption"}
                        options={options}
                    />
                </Col>
                <Col xs={3}>
                    <p>By note</p>
                    <Select
                        value={"selectedOption"}
                        options={options}
                    />
                </Col>
                <Col xs={3}>
                    <p>By amount</p>
                    <Slider />
                </Col>
            </Row>
        </div>
    );
};

export default Filters;