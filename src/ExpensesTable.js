import React, { useContext, useEffect, useState } from 'react';
import { AppStateContext } from './App';

export default function ExpensesTable() {
    
    const {state} = useContext(AppStateContext);
    const {expenses, filters} = state;
    const [filteredExpenses, setFilteredExpenses] = useState([]);

    useEffect(() => {
        let temp = [...expenses];
        filters.forEach(({field, operator, value}) => {
            temp = temp.filter(expense => {
                switch (operator) {
                    case '=':
                        return expense[field] == value;
                    case '>':
                        return expense[field] > value;
                    case '<':
                        return expense[field] < value;
                    default:
                        return false;
                }
            });
        });
        setFilteredExpenses(temp);
    }, [expenses, filters]);

    return (
        <>
            {!!expenses && !!expenses.length ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Amount</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses.map(({date, location, amount, category}, index) => (
                            <tr key={index}>
                                <td>{date}</td>
                                <td>{location}</td>
                                <td>{amount}</td>
                                <td>{category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <p>There are no expenses to show</p>}
        </>
    );
}