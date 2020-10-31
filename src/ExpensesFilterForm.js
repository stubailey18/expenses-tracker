import React, { useContext, useState } from 'react';
import { AppStateContext } from './App';

export default function ExpensesFilterForm() {

    const [field, setField] = useState('date');
    const [operator, setOperator] = useState('=');
    const [value, setValue] = useState(new Date().toLocaleTimeString());

    const {dispatch} = useContext(AppStateContext);

    return (
        <form className="form-inline mb-3">
            <label>Filter by</label>&nbsp;
            <select
                value={field}
                onChange={e => setField(e.target.value)}
                className="form-control">
                <option value="date">Date</option>
                <option value="location">Location</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
            </select>&nbsp;
            <select
                value={operator}
                onChange={e => setOperator(e.target.value)}
                className="form-control">
                <option>&#61;</option>
                <option>&gt;</option>
                <option>&lt;</option>
            </select>&nbsp;
            <input 
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                className="form-control" />&nbsp;
            <div className="mt-3 mt-md-0">
                <button 
                    type="button"
                    onClick={() => {
                        dispatch({
                            type: 'newFilter', 
                            payload: {field, operator, value}
                        });
                    }}
                    className="btn btn-primary">
                    Apply
                </button>&nbsp;
                <button 
                    type="button"
                    onClick={() => dispatch({type: 'clearFilters'})}
                    className="btn btn-primary">
                    Clear
                </button>
            </div>
        </form>
    );
}