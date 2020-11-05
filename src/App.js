import React, { useReducer } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Expenses from './Expenses';
import ExpenseForm from './ExpenseForm';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'newExpense':
      return {...prevState, expenses: [...prevState.expenses, action.payload]};
    case 'newFilter':
      return {...prevState, filters: [...prevState.filters, action.payload]};
    case 'clearFilters':
      return {...prevState, filters: []};
    default:
      return prevState;
  }
}

const initialAppState = {
  expenses: [], 
  filters: []
}

export const AppStateContext = React.createContext();

export default function App() {

  const [state, dispatch] = useReducer(reducer, initialAppState);
  
  return (
    <div className="container">
      <h1 className="display-4 pt-4 pb-4">My Expenses</h1>
      <nav className="row navbar navbar-expand-sm bg-light mb-3">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">My expenses</Link>
          </li>
          <li className="nav-item">
            <Link to="/addexpense" className="nav-link">Add expense</Link>
          </li>
        </ul>
      </nav> 
      <Switch>
        <AppStateContext.Provider value={{state, dispatch}}>
          <Route exact path="/"><Expenses /></Route>  
          <Route path="/addexpense"><ExpenseForm /></Route> 
        </AppStateContext.Provider> 
      </Switch>     
    </div>
  );
}
