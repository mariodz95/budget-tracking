import React from 'react';
import Table from 'react-bootstrap/Table';
import Moment from 'moment';

import "./ListOfTransactions.css";


const ListOfTransactions = (props) => {
    return (
        <div>
            {(props.listOfTransactions !== 0 ? 
                <Table responsive borderless className="transactions-table">
                    <thead>
                    <tr>
                        <th>Datum</th>
                    </tr>
                    </thead>
                    <tbody>
                        {props.listOfTransactions.map((item, index) => (
                            <tr key={index}>
                                <td>{item.category}</td>
                                <td>{item.name}</td>
                                <td>{Moment(item.dateCreated).format('DD-MM-YYYY')}</td>
                                <td>---</td>
                                <td><p style={{color: Math.sign(item.value) === -1 ? "red" : "green"}}>{item.value}</p></td>
                            </tr>         
                         ))} 
                    </tbody>
                </Table>
             : null)
            }   
        </div>
        )
    }

export default ListOfTransactions;