import React, { useContext, useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import { AppStateContext } from './app-state';
import { filterExpenses } from './utils';

export default function ExpensesOverTime() {

    const [filteredExpenses, setFilteredExpenses] = useState([]);

    const {state} = useContext(AppStateContext);
    const {expenses, filters} = state;

    const canvasRef = useRef();

    useEffect(() => {
        setFilteredExpenses(filterExpenses(expenses, filters));
    }, [expenses, filters]);
    
    useEffect(() => {
        if (filteredExpenses.length) {
            let uniqueDates = new Set(filteredExpenses.map(expense => expense.date));
            uniqueDates = Array.from(uniqueDates).sort((d1, d2) => d1 - d2);
            const chartData = new Map();
            uniqueDates.forEach(date => {
                chartData.set(new Date(date).toLocaleDateString(), filteredExpenses
                    .filter(expense => expense.date === date)
                    .map(expense => expense.amount)
                    .reduce((sum, amount) => sum + amount, 0)); 
            });
            new Chart(canvasRef.current, {
                type: 'line',
                data: {
                    labels: Array.from(chartData.keys()),
                    datasets: [
                        {
                            label: 'Total amount',
                            data: Array.from(chartData.values()),
                            borderColor: '#003f5c',
                            fill: false
                        }
                    ]
                }
            });
        }
    }, [filteredExpenses]);

    return (
        <>
            {filteredExpenses.length 
                ? <canvas ref={canvasRef}></canvas>
                : <p className="alert alert-warning">There are no expenses to plot</p>
            }
        </>
    );
}