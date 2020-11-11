import React from 'react';

const initialAppState = {
    expenses: [], 
    filteredExpenses: [],
    filters: [],
    sorts: []
};

const actionTypes = {
    EXPENSES_FROM_STORAGE: 'EXPENSES_FROM_STORAGE',
    FILTERS_FROM_STORAGE: 'FILTERS_FROM_STORAGE',
    NEW_EXPENSE: 'NEW_EXPENSE',
    NEW_FILTER: 'NEW_FILTER',
    CLEAR_FILTERS: 'CLEAR_FILTERS',
    SET_SORT: 'SET_SORT'
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

        case actionTypes.SET_SORT:
            const sortKey = action.payload;
            const sortsCopy = [...prevState.sorts];
            const targetSort = sortsCopy.find(sort => sort.key === sortKey);
            /*
             * if the target sort (object comprising sort key and sort order) is existent in the sorts array
             *   if its order is asc then set its order to desc
             *   if its order is desc then remove the target sort from the sorts array
             *   i.e. scroll through asc -> desc -> non-existent
             * if the target sort is non-existent in the sorts array
             *   add it with an order of asc
             * NB: using an array for sorts maintains the order so as to enable sort by x, then by y etc.
             */
            if (targetSort) {
                if (targetSort.order === 'asc') {
                    targetSort.order = 'desc';
                } else {
                    sortsCopy.splice(sortsCopy.indexOf(targetSort), 1);
                }
            } else {
                sortsCopy.push({key: action.payload, order: 'asc'});
            }
            return {...prevState, sorts: sortsCopy};
        
        default:
            return prevState;
    }
}

const AppStateContext = React.createContext();

export { initialAppState, actionTypes, reducer, AppStateContext };