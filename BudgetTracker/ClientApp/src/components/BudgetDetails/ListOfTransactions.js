import React from "react";
import Table from "react-bootstrap/Table";
import Moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { Button } from "react-bootstrap";

import "./ListOfTransactions.css";

const ListOfTransactions = (props) => {
  return (
    <div>
      {props.listOfTransactions !== 0 ? (
        <Table responsive borderless className="transactions-table">
          <tbody>
            {props.listOfTransactions.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>{item.name}</td>
                <td>{Moment(item.dateCreated).format("DD-MM-YYYY")}</td>
                <td>---</td>
                <td>
                  <p
                    style={{
                      color: Math.sign(item.value) === -1 ? "red" : "green",
                    }}
                  >
                    {item.value}
                  </p>
                </td>
                <td>
                  <p
                    style={{
                      color: Math.sign(item.value) === -1 ? "red" : "green",
                    }}
                  >
                    {props.currency}
                  </p>
                </td>
                <td>
                  <Button
                    className="delete-button"
                    variant="outline-danger"
                    size="sm"
                    onClick={(e) => props.handleDelete(item)}
                  >
                    <AiOutlineDelete />
                  </Button>
                  <Button variant="outline-info" size="sm">
                    <GrUpdate />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </div>
  );
};

export default ListOfTransactions;
