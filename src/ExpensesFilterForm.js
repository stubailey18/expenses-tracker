import React, { useContext, useState } from 'react';
import { categories } from './app-data';
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
                <option>&ge;</option>
                <option>&le;</option>
            </select>&nbsp;
            {field !== 'category' && (
                <input 
                    type={field === 'date' ? 'date' : 'text'}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    className={`form-control ${!value && formSubmitted && 'invalidField'}`} />
            )}
            {field === 'category' && (
                <select
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    className={`form-control ${!value && formSubmitted && 'invalidField'}`}>
                    <option value=''>-- Select --</option>
                    {categories.sort().map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            )}
            &nbsp;
            <div className="mt-3 mt-sm-0">
                <button 
                    type="button"
                    onClick={handleApply}
                    className="btn btn-dark">
                    Apply
                </button>&nbsp;
                <button 
                    type="button"
                    onClick={() => dispatch({type: actionTypes.CLEAR_FILTERS})}
                    className="btn btn-dark">
                    Clear
                </button>
            </div>
        </form>
    );
}