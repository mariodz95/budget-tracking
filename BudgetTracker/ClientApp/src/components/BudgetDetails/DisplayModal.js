import React, { useState } from "react";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import Select from "react-select";
import { categories } from "./../../helpers/categories";

export const DisplayModal = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add cash income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formHorizontalNote">
              <Form.Label column sm={2}>
                Note
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  placeholder="Note"
                  defaultValue={
                    props.updatedTransaction === 0
                      ? ""
                      : props.updatedTransaction.name
                  }
                  onChange={(e) => props.setTransactionNote(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalValue">
              <Form.Label column sm={2}>
                Value
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  placeholder="Value"
                  defaultValue={
                    props.updatedTransaction === 0
                      ? ""
                      : props.updatedTransaction.value
                  }
                  onChange={(e) => props.setIncomeValue(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalCurrency">
              <Form.Label column sm={2}>
                Category
              </Form.Label>
              <Col sm={5}>
                <Select
                  value={props.selectedOption}
                  onChange={(selected) => props.setSelectedOption(selected)}
                  options={categories}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            className="create-wallet-button"
            onClick={props.createTransaction}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
