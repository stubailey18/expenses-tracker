import React, { useContext, useEffect, useState } from 'react';
import { AppStateContext } from './App';
import './ExpenseForm.css';

const toUkDate = usDate => {
    const regex = /(\d+)-(\d+)-(\d+)/g;
    const [_, y, m, d] = regex.exec(usDate);
    return `${d}/${m}/${y}`;
}

const isNum = str => !!str && !isNaN(str);

export default function ExpenseForm() {

    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [progress, setProgress] = useState(25);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const {dispatch} = useContext(AppStateContext);

    useEffect(() => {
        setProgress([date, location, amount, category]
            .filter(field => field)
            .map(field => 25)
            .reduce((sum, num) => sum + num));
    }, [date, location, amount, category]);

    const handleSubmit = () => {
        setFormSubmitted(true);
        if (date && location && isNum(amount)) {
            dispatch({
                type: 'newExpense', 
                payload: {
                    date: toUkDate(date),
                    location: location,
                    amount: +amount,
                    category: category
                }
            });
            setFormSubmitted(false);
            setDate('');
            setLocation('');
            setAmount('');
            setCategory('Food');
        }
    }
    
    return (
        <div>
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
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className={`form-control ${!date && formSubmitted && 'invalidField'}`} />
                            {!date && formSubmitted && <span>The date is required</span>}
                        </div>
                        <div className="form-group">
                            <label>Location *</label>
                            <input 
                                type="text" 
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                className={`form-control ${!location && formSubmitted && 'invalidField'}`} />
                            {!location && formSubmitted && <span>The location is required</span>}
                        </div>
                        <div className="form-group">
                            <label>Amount *</label>
                            <input 
                                type="text"
                                value={amount}
                                onChange={e => setAmount(e.target.value)} 
                                className={`form-control ${!isNum(amount) && formSubmitted && 'invalidField'}`} />
                            {!isNum(amount) && formSubmitted && <span>The amount is required and must be a valid number</span>}
                        </div>
                        <div className="form-group">
                            <label>Category *</label>
                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className="form-control">
                                <option>Food</option>
                                <option>Fuel</option>
                                <option>Entertainment</option>
                            </select>
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
        </div>
    )
}