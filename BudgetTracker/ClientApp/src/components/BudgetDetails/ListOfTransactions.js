import React from 'react';

const ListOfTransactions = (props) => {
    return (
        <div>
             {(props.listOfTransactions !== 0 ? 
            <div>
            {props.listOfTransactions.map(function(item){
                return <div>
                    <p>{item.category}</p>
                    <p>{item.name}</p>
                    <p>{item.value}</p>
                </div>
            })}
        </div>
        : null)
        }
        </div>
        )
    }

export default ListOfTransactions;