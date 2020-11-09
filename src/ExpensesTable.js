import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountDownAlt, faSortAmountDown, faSortAlphaDownAlt, faSortAlphaDown, faSortNumericDownAlt, faSortNumericDown } from '@fortawesome/free-solid-svg-icons'
import { actionTypes, AppStateContext } from './app-state';
import { filterExpenses } from './utils';

export default function ExpensesTable() {
    
    const [filteredAndSortedExpenses, setFilteredAndSortedExpenses] = useState([]);

    const {state, dispatch} = useContext(AppStateContext);
    const {expenses, filters, sorts} = state;

    useEffect(() => {
        const filteredExpenses = filterExpenses(expenses, filters);
        /*
         * assuming a pair of expenses, e.g.: 
         * {date: 02/11/2020, location: London, amount: 20, category: Food}
         * {date: 02/11/2020, location: London, amount: 10, category: Fuel}
         * assuming a sorts array, e.g.:
         * [{key: date, order: asc}, {key: amount, order: asc}]
         * reduce the sorts array to a number:
         * 0 = the expenses are equivalent
         * neg. # = the first expense is < than the second
         * pos. # = the first expense is > than the second
         * start the reduce with a retVal of 0 (the order of the expenses need not be changed)
         * compare the dates (they are the same) so retVal is set to 0 || 0 (0)
         * compare the amounts (they are different) so retVal is set to 0 || 10 (10)
         * reduce returns 10
         * the first expense is > than the second so the order of the expenses must be changed
         * if the first comparison performed in reduce returns a non-zero number... 
         * ...then the subsequent ones are inconsequential, e.g. 10 || 100 === 10 
         */
        filteredExpenses.sort((exp1, exp2) => {
            return sorts.reduce((retVal, {key, order}) => {
                if (key === 'date' || key === 'amount') {
                    if (order === 'asc') {
                        return retVal || exp1[key] - exp2[key];
                    } else {
                        return retVal || exp2[key] - exp1[key];
                    }
                } else {
                    if (order === 'asc') {
                        return retVal || exp1[key].localeCompare(exp2[key]);
                    } else {
                        return retVal || exp2[key].localeCompare(exp1[key]);
                    }
                }
            }, 0);
        });
        setFilteredAndSortedExpenses(filteredExpenses);
    }, [expenses, filters, sorts]);

    const sortOrder = key => {
        const sortTarget = sorts.find(sort => sort.key === key);
        return sortTarget ? sortTarget.order : null;
    }

    return (
        <>
            {filteredAndSortedExpenses.length ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <button onClick={() => dispatch({type: actionTypes.SET_SORT, payload: 'date'})}>
                                    Date&nbsp;
                                    {sortOrder('date') === 'asc' && <FontAwesomeIcon icon={faSortAmountDownAlt} />}
                                    {sortOrder('date') === 'desc' && <FontAwesomeIcon icon={faSortAmountDown} />}
                                </button>
                            </th>
                            <th>
                                <button onClick={() => dispatch({type: actionTypes.SET_SORT, payload: 'location'})}>
                                    Location&nbsp;
                                    {sortOrder('location') === 'asc' && <FontAwesomeIcon icon={faSortAlphaDown} />}
                                    {sortOrder('location') === 'desc' && <FontAwesomeIcon icon={faSortAlphaDownAlt} />}
                                </button>
                            </th>
                            <th>
                                <button onClick={() => dispatch({type: actionTypes.SET_SORT, payload: 'amount'})}>
                                    Amount&nbsp;
                                    {sortOrder('amount') === 'asc' && <FontAwesomeIcon icon={faSortNumericDown} />}
                                    {sortOrder('amount') === 'desc' && <FontAwesomeIcon icon={faSortNumericDownAlt} />}
                                </button>
                            </th>
                            <th>
                                <button onClick={() => dispatch({type: actionTypes.SET_SORT, payload: 'category'})}>
                                    Category&nbsp;
                                    {sortOrder('category') === 'asc' && <FontAwesomeIcon icon={faSortAlphaDown} />}
                                    {sortOrder('category') === 'desc' && <FontAwesomeIcon icon={faSortAlphaDownAlt} />}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedExpenses.map(({date, location, amount, category}, index) => (
                            <tr key={index}>
                                <td>{new Date(date).toLocaleDateString()}</td>
                                <td>{location}</td>
                                <td>{amount}</td>
                                <td>{category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <p className="alert alert-warning">There are no expenses to table</p>}
        </>
    );
}