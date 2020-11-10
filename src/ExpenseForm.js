import React, { useContext, useEffect, useState } from 'react';
import { categories } from './app-data';
import { actionTypes, AppStateContext } from './app-state';
import { isNum } from './utils';

export default function ExpenseForm() {

    const [expense, setExpense] = useState({date: '', location: '', amount: '', category: ''});
    const [progress, setProgress] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const {dispatch} = useContext(AppStateContext);

    useEffect(() => {
        setProgress(Object.values(expense)
            .filter(value => value)
            .map(value => 25)
            .reduce((sum, num) => sum + num, 0));
    }, [expense]);

    const handleSubmit = () => {
        const {date, location, amount, category} = expense;
        setFormSubmitted(true);
        if (date && location && isNum(amount) && category) {
            dispatch({
                type: actionTypes.NEW_EXPENSE, 
                payload: {
                    // store the date as a number so that it may be serialised and compared
                    date: Date.parse(date),
                    location: location,
                    amount: +amount,
                    category: category
                }
            });
            setFormSubmitted(false);
            setExpense({date: '', location: '', amount: '', category: ''});
        }
    }
    
    return (
        <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-6">
                <div className="progress mb-3">
                    <div className="progress-bar bg-success" style={{width: `${progress}%`}}></div>
                </div>
                <form>
                    <div className="form-group">
                        <label>Date *</label>
                        <input 
                            type="date" 
                            value={expense.date}
                            onChange={e => setExpense({...expense, date: e.target.value})}
                            className={`form-control ${!expense.date && formSubmitted && 'invalidField'}`} />
                        {!expense.date && formSubmitted && <span>The date is required</span>}
                    </div>
                    <div className="form-group">
                        <label>Location *</label>
                        <input 
                            type="text" 
                            value={expense.location}
                            onChange={e => setExpense({...expense, location: e.target.value})}
                            className={`form-control ${!expense.location && formSubmitted && 'invalidField'}`} />
                        {!expense.location && formSubmitted && <span>The location is required</span>}
                    </div>
                    <div className="form-group">
                        <label>Amount *</label>
                        <input 
                            type="text"
                            value={expense.amount}
                            onChange={e => setExpense({...expense, amount: e.target.value})} 
                            className={`form-control ${!isNum(expense.amount) && formSubmitted && 'invalidField'}`} />
                        {!isNum(expense.amount) && formSubmitted && <span>The amount is required and must be a valid number</span>}
                    </div>
                    <div className="form-group">
                        <label>Category *</label>
                        <select
                            value={expense.category}
                            onChange={e => setExpense({...expense, category: e.target.value})}
                            className={`form-control ${!expense.category && formSubmitted && 'invalidField'}`}>
                            <option value="">-- Select --</option>
                            {categories.sort().map((category, index) => <option key={index}>{category}</option>)}
                        </select>
                        {!expense.category && formSubmitted && <span>The category is required</span>}
                    </div>
                    <div className="form-group">
                        <button 
                            type="button"
                            onClick={handleSubmit}
                            className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}