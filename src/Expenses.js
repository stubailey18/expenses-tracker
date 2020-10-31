import React from 'react';
import ExpensesFilterForm from './ExpensesFilterForm';
import ExpensesTable from './ExpensesTable';

export default function Expenses() {
    return (
        <>
            <ExpensesFilterForm />
            <ExpensesTable />
        </>
    );
}