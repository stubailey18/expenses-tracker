import React from 'react';

const initialAppState = {
    expenses: [], 
    filters: []
};

const actionTypes = {
    EXPENSES_FROM_STORAGE: 'EXPENSES_FROM_STORAGE',
    FILTERS_FROM_STORAGE: 'FILTERS_FROM_STORAGE',
    NEW_EXPENSE: 'NEW_EXPENSE',
    NEW_FILTER: 'NEW_FILTER',
    CLEAR_FILTERS: 'CLEAR_FILTERS'
};

const reducer = (prevState, action) => {
    switch (action.type) {
        case actionTypes.EXPENSES_FROM_STORAGE:
            return {...prevState, expenses: action.payload};
        case actionTypes.FILTERS_FROM_STORAGE:
            return {...prevState, filters: action.payload};
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