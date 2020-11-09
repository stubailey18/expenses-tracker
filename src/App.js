import React, { useEffect, useReducer } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { actionTypes, AppStateContext, initialAppState, reducer } from './app-state';
import ExpenseForm from './ExpenseForm';
import ExpensesFilterForm from './ExpensesFilterForm';
import AppliedFilters from './AppliedFilters';
import ExpensesTable from './ExpensesTable';
import ExpensesOverTime from './ExpensesOverTime';
import ExpensesByCategory from './ExpensesByCategory';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { loadDemoData } from './utils';

export default function App() {

  const [state, dispatch] = useReducer(reducer, initialAppState);
  const {expenses, filters} = state;

  useEffect(() => {
    // FOR DEMO ONLY
    // -------------
    loadDemoData();
    // -------------
    dispatch({
      type: actionTypes.EXPENSES_FROM_STORAGE, 
      payload: JSON.parse(localStorage.getItem('expenses')) || []
    });
    dispatch({
      type: actionTypes.FILTERS_FROM_STORAGE, 
      payload: JSON.parse(localStorage.getItem('filters')) || []
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);
  
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
          <li className="nav-item">
            <Link to="/expensesovertime" className="nav-link">Expenses over time</Link>
          </li>
          <li className="nav-item">
            <Link to="/expensesbycategory" className="nav-link">Expenses by category</Link>
          </li>
        </ul>
      </nav> 
      <Switch>
        <AppStateContext.Provider value={{state, dispatch}}>
          <Route exact path="/">
            <>
              <ExpensesFilterForm />
              <AppliedFilters />
              <ExpensesTable />
            </>
          </Route>  
          <Route path="/addexpense"><ExpenseForm /></Route> 
          <Route path="/expensesovertime">
            <>
              <ExpensesFilterForm />
              <AppliedFilters />
              <ExpensesOverTime />
            </>
          </Route> 
          <Route path="/expensesbycategory">
            <>
              <ExpensesFilterForm />
              <AppliedFilters />
              <ExpensesByCategory />
            </>
          </Route>
        </AppStateContext.Provider> 
      </Switch>     
    </div>
  );
}
