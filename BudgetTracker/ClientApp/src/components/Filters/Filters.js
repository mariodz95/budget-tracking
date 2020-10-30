import React, { useEffect, useState } from "react";
import Select from "react-select";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { categories } from "./../../helpers/categories";
import Form from "react-bootstrap/Form";
import "./Filters.css";

const Filters = (props) => {
  return (
    <div className="filters">
      <p className="filter-text">Filters</p>
      <Row>
        <Col xs={4}>
          <p>By category</p>
          <Select
            value={props.selectedCategory}
            options={categories}
            onChange={props.handleCategoryChange}
            isClearable={true}
          />
        </Col>
        <Col xs={4}>
          <p>By note</p>
          <Form.Control
            type="text"
            name="filter"
            placeholder="Filter by specific keyword"
            onChange={props.handleChange}
          ></Form.Control>
        </Col>
      </Row>
    </div>
  );
};

export default Filters;
