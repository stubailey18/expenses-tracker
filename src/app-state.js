import React from 'react';

const initialAppState = {
    expenses: [], 
    filters: []
};

const actionTypes = {
    NEW_EXPENSE: 'NEW_EXPENSE',
    NEW_FILTER: 'NEW_FILTER',
    CLEAR_FILTERS: 'CLEAR_FILTERS'
};

const reducer = (prevState, action) => {
    switch (action.type) {
      case actionTypes.NEW_EXPENSE:
        return {...prevState, expenses: [...prevState.expenses, action.payload]};
      case actionTypes.NEW_FILTER:
        return {...prevState, filters: [...prevState.filters, action.payload]};
      case actionTypes.CLEAR_FILTERS:
        return {...prevState, filters: []};
      default:
        return prevState;
    }
}

const AppStateContext = React.createContext();

export { initialAppState, actionTypes, reducer, AppStateContext };