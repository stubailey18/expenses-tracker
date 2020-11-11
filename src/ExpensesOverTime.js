import React, { useContext, useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import { categories } from './app-data';
import { AppStateContext } from './app-state';
import { filterExpenses, nextPlotColourGenerator } from './utils';

export default function ExpensesOverTime(props) {

    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [plotLines, setPlotLines] = useState({});

    const {state} = useContext(AppStateContext);
    const {expenses, filters} = state;

    const canvasRef = useRef();

    useEffect(() => {
        const temp = {};
        const plotColours = Array.from(nextPlotColourGenerator());
        // the categories are imported from ./app-data.js
        ['All'].concat(categories).sort().forEach((category, index) => {
            if (props.categories && props.categories.includes(category)) {
                temp[category] = {on: true, colour: plotColours[index]};
            } else {
                temp[category] = {on: false, colour: plotColours[index]};
            }
        });
        setPlotLines(temp);
    }, []);

    useEffect(() => {
        setFilteredExpenses(filterExpenses(expenses, filters));
    }, [expenses, filters]);
    
    useEffect(() => {
        if (filteredExpenses.length) {
            const uniqueDates = new Set();
            const datasets = [];
            for (let category in plotLines) {
                if (plotLines[category].on) {
                    const data = [];
                    const categoryExpenses = filteredExpenses
                        .filter(e => category !== 'All' ? e.category === category : true);
                    // remove the time portion of the date so as to allow for summing of expenses by date
                    categoryExpenses.forEach(e => e.date = new Date(e.date).setHours(0, 0, 0, 0));
                    const categoryDates = categoryExpenses.map(e => e.date).sort((d1, d2) => d1 - d2);
                    categoryDates.forEach(date => {
                        uniqueDates.add(date);
                        data.push({
                            x: new Date(date).toLocaleDateString(),
                            y: categoryExpenses
                                .filter(e => e.date === date)
                                .map(e => e.amount)
                                .reduce((sum, amount) => sum + amount, 0)
                        });
                    });
                    datasets.push(
                        {
                            label: category,
                            data: data,
                            borderColor: plotLines[category].colour,
                            fill: false
                        }
                    );
                }
            }
            if (window.overTimeChart) {
                window.overTimeChart.destroy();
            }
            window.overTimeChart = new Chart(canvasRef.current, {
                type: 'line',
                data: {
                    labels: Array.from(uniqueDates).sort().map(date => new Date(date).toLocaleDateString()),
                    datasets
                },
                options: {
                    tooltips: {
                        // tooltips are currently buggy for as yet unknown reasons
                        enabled: false
                    }
                }
            });
        }
    }, [filteredExpenses, plotLines]);

    return (
        <>
            {filteredExpenses.length 
                ? (
                    <>
                        <form className="form-inline">
                            {Object.keys(plotLines).sort().map(category => (
                                <div key={category} className="form-check-inline">
                                    <label className="form-check-label">
                                        <input 
                                            type="checkbox" 
                                            checked={plotLines[category].on === true}
                                            onChange={e => setPlotLines(lines => 
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