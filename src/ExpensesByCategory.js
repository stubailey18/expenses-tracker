import React, { useContext, useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import { AppStateContext } from './app-state';
import { filterExpenses } from './utils';

export default function ExpensesByCategory() {

    const [filteredExpenses, setFilteredExpenses] = useState([]);

    const {state} = useContext(AppStateContext);
    const {expenses, filters} = state;

    const canvasRef = useRef();

    useEffect(() => {
        setFilteredExpenses(filterExpenses(expenses, filters));
    }, [expenses, filters]);
    
    useEffect(() => {
        if (filteredExpenses.length) {
            let uniqueCategories = new Set(filteredExpenses.map(expense => expense.category));
            const chartData = new Map();
            uniqueCategories.forEach(category => {
                chartData.set(category, filteredExpenses
                    .filter(expense => expense.category === category)
                    .map(expense => expense.amount)
                    .reduce((sum, amount) => sum + amount, 0)); 
            });
            new Chart(canvasRef.current, {
                type: 'doughnut',
                data: {
                    labels: Array.from(chartData.keys()),
                    datasets: [
                        {
                            label: 'Category',
                            data: Array.from(chartData.values()),
                            backgroundColor: [
                                '#003f5c',
                                '#58508d',
                                '#bc5090',
                                '#a05195',
                                '#d45087',
                                '#f95d6a',
                                '#ff7c43',
                                '#ffa600'
                            ]
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