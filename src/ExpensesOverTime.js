import React, { useContext, useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import { categories } from './app-data';
import { AppStateContext } from './app-state';
import { filterExpenses, nextPlotColourGenerator } from './utils';

export default function ExpensesOverTime() {

    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [categoryLines, setCategoryLines] = useState({});

    const {state} = useContext(AppStateContext);
    const {expenses, filters} = state;

    const canvasRef = useRef();

    useEffect(() => {
        const plotColours = Array.from(nextPlotColourGenerator());
        const temp = {};
        categories.sort().forEach((category, index) => 
            temp[category] = {on: true, colour: plotColours[index]});
        setCategoryLines(temp);
    }, []);

    useEffect(() => {
        setFilteredExpenses(filterExpenses(expenses, filters));
    }, [expenses, filters]);
    
    useEffect(() => {
        if (filteredExpenses.length) {

            let uniqueDates = new Set(filteredExpenses.map(expense => expense.date));
            uniqueDates = Array.from(uniqueDates).sort((d1, d2) => d1 - d2);
            const labels = uniqueDates.map(date => new Date(date).toLocaleDateString());

            const datasets = [];
            for (let line in categoryLines) {
                // if the plot line for the given category is turned on
                if (categoryLines[line].on) {
                    const map = new Map();
                    uniqueDates.forEach(date => {
                        map.set(date, filteredExpenses
                            .filter(expense => expense.date === date)
                            .filter(expense => expense.category === line)
                            .map(expense => expense.amount)
                            .reduce((sum, amount) => sum + amount, 0));
                    });
                    datasets.push(
                        {
                            label: line,
                            data: Array.from(map.values()),
                            backgroundColor: categoryLines[line].colour,
                            fill: false
                        }
                    );
                }
            }
            if (window.chart) {
                window.chart.destroy();
            }
            window.chart = new Chart(canvasRef.current, {
                type: 'bar',
                data: {
                    labels,
                    datasets
                },
                options: {
                    scales: {
						xAxes: [{
							stacked: true,
						}],
						yAxes: [{
							stacked: true
						}]
					}
                }
            });
        }
    }, [filteredExpenses, categoryLines]);

    return (
        <>
            {filteredExpenses.length 
                ? (
                    <>
                        <form className="form-inline">
                            Categories:&nbsp;
                            {Object.keys(categoryLines).sort().map(category => (
                                <div key={category} className="form-check-inline">
                                    <label className="form-check-label">
                                        <input 
                                            type="checkbox" 
                                            checked={categoryLines[category].on === true}
                                            onChange={e => setCategoryLines(lines => 
                                                ({...lines, [category]: {...lines[category], on: !lines[category].on}}))}
                                            className="form-check-input" />
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </form>
                        <canvas ref={canvasRef}></canvas>
                    </>
                )
                : <p className="alert alert-warning">There are no expenses to plot</p>
            }
        </>
    );
}