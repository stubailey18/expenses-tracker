import React from 'react';
import AppliedFilters from './AppliedFilters';
import ExpensesFilterForm from './ExpensesFilterForm';
import ExpensesTable from './ExpensesTable';

export default function Expenses() {
    return (
        <>
            <ExpensesFilterForm />
            <AppliedFilters />
            <ExpensesTable />
        </>
    );
}