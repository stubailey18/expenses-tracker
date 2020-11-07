import React, { useContext, useState } from 'react';
import { actionTypes, AppStateContext } from './app-state';

export default function ExpensesFilterForm() {

    const [field, setField] = useState('date');
    const [operator, setOperator] = useState('=');
    const [value, setValue] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const {dispatch} = useContext(AppStateContext);

    const handleApply = () => {
        setFormSubmitted(true);
        if (field && operator && value) {
            dispatch({
                type: actionTypes.NEW_FILTER, 
                payload: {field, operator, value: field === 'date' ? Date.parse(value) : value}
            });
            setFormSubmitted(false);
            setField('date');
            setOperator('=');
            setValue('');
        }
    }

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
                type={field === 'date' ? 'date' : 'text'}
                value={value}
                onChange={e => setValue(e.target.value)}
                className={`form-control ${!value && formSubmitted && 'invalidField'}`} />&nbsp;
            <div className="mt-3 mt-md-0">
                <button 
                    type="button"
                    onClick={handleApply}
                    className="btn btn-primary">
                    Apply
                </button>&nbsp;
                <button 
                    type="button"
                    onClick={() => dispatch({type: actionTypes.CLEAR_FILTERS})}
                    className="btn btn-primary">
                    Clear
                </button>
            </div>
        </form>
    );
}