import React, { useContext, useState } from 'react';
import { AppStateContext } from './App';

const toUkDate = usDate => {
    const regex = /(\d+)-(\d+)-(\d+)/g;
    const [_, y, m, d] = regex.exec(usDate);
    return `${d}/${m}/${y}`;
}

export default function ExpenseForm() {

    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');

    const {dispatch} = useContext(AppStateContext);
    
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-10 col-md-8 col-lg-6">
                    <form>
                        <div className="form-group">
                            <label>Date</label>
                            <input 
                                type="date" 
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input 
                                type="text" 
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Amount</label>
                            <input 
                                type="text"
                                value={amount}
                                onChange={e => setAmount(e.target.value)} 
                                className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
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
                                onClick={() => {
                                    dispatch({
                                        type: 'newExpense', 
                                        payload: {
                                            date: toUkDate(date),
                                            location: location,
                                            amount: +amount,
                                            category: category
                                        }
                                    });
                                }}
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