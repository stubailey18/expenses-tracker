const isNum = str => !!str && !isNaN(str);

// const toUkDate = usDate => {
//     const regex = /(\d+)-(\d+)-(\d+)/g;
//     const [_, y, m, d] = regex.exec(usDate);
//     return `${d}/${m}/${y}`;
// }

// const toUsDate = ukDate => {
//     const regex = /(\d+)\/(\d+)\/(\d+)/g;
//     const [_, d, m, y] = regex.exec(ukDate);
//     return `${y}-${m}-${d}`;
// }

const filterExpenses = (expenses, filters) => {
    let filteredExpenses = [...expenses];
    filters.forEach(({field, operator, value}) => {
        filteredExpenses = filteredExpenses.filter(expense => {
            switch (operator) {
                case '=':
                    return expense[field] === value;
                case '≥':
                    return expense[field] >= value;
                case '≤':
                    return expense[field] <= value;
                default:
                    return false;
            }
        });
    });
    return filteredExpenses;
}

function* nextPlotColourGenerator() {
    const colours = [
        '#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba'
    ];
    for (let colour of colours) {
        yield colour;
    }
}

const loadDemoData = () => {
    let expenses = [
        {
            "date": "1584307667000",
            "location": "Chichester",
            "amount": 21.4,
            "category": "Housing"
        }, 
        {
            "date": "1581398332000",
            "location": "Arundel",
            "amount": 14.93,
            "category": "Education"
        }, 
        {
            "date": "1580356101000",
            "location": "Arundel",
            "amount": 25.51,
            "category": "Housing"
        }, 
        {
            "date": "1584340461000",
            "location": "Chichester",
            "amount": 56.16,
            "category": "Transportation"
        }, 
        {
            "date": "1583606740000",
            "location": "Lymington",
            "amount": 43.4,
            "category": "Housing"
        }, 
        {
            "date": "1582756883000",
            "location": "Portsmouth",
            "amount": 67.7,
            "category": "Food"
        }, 
        {
            "date": "1578319006000",
            "location": "Portsmouth",
            "amount": 30.39,
            "category": "Food"
        }, 
        {
            "date": "1581572685000",
            "location": "Southampton",
            "amount": 23.29,
            "category": "Food"
        }, 
        {
            "date": "1581871625000",
            "location": "Arundel",
            "amount": 80.99,
            "category": "Housing"
        }, 
        {
            "date": "1581515480000",
            "location": "Lymington",
            "amount": 76.8,
            "category": "Other"
        }, 
        {
            "date": "1578929088000",
            "location": "Chichester",
            "amount": 19.74,
            "category": "Housing"
        }, 
        {
            "date": "1579317702000",
            "location": "Arundel",
            "amount": 74.56,
            "category": "Housing"
        }, 
        {
            "date": "1584642464000",
            "location": "Arundel",
            "amount": 41.61,
            "category": "Education"
        }, 
        {
            "date": "1582581239000",
            "location": "Portsmouth",
            "amount": 46.31,
            "category": "Utilities"
        }, 
        {
            "date": "1578685235000",
            "location": "Lymington",
            "amount": 16.93,
            "category": "Entertainment"
        }, 
        {
            "date": "1579863424000",
            "location": "Portsmouth",
            "amount": 74.32,
            "category": "Entertainment"
        }, 
        {
            "date": "1585440519000",
            "location": "Portsmouth",
            "amount": 37.57,
            "category": "Transportation"
        }, 
        {
            "date": "1578072291000",
            "location": "Lymington",
            "amount": 32.01,
            "category": "Food"
        }, 
        {
            "date": "1583974744000",
            "location": "Arundel",
            "amount": 53.29,
            "category": "Food"
        }, 
        {
            "date": "1578949953000",
            "location": "Lymington",
            "amount": 4.47,
            "category": "Food"
        }, 
        {
            "date": "1581090903000",
            "location": "Lymington",
            "amount": 37.54,
            "category": "Utilities"
        }, 
        {
            "date": "1584916323000",
            "location": "Lymington",
            "amount": 51.86,
            "category": "Utilities"
        }, 
        {
            "date": "1585420902000",
            "location": "Arundel",
            "amount": 47.2,
            "category": "Transportation"
        }, 
        {
            "date": "1584900671000",
            "location": "Chichester",
            "amount": 60.21,
            "category": "Transportation"
        }, 
        {
            "date": "1582134600000",
            "location": "Southampton",
            "amount": 77.93,
            "category": "Healthcare"
        }, 
        {
            "date": "1583566024000",
            "location": "Lymington",
            "amount": 18.58,
            "category": "Food"
        }, 
        {
            "date": "1578492728000",
            "location": "Arundel",
            "amount": 90.43,
            "category": "Food"
        }, 
        {
            "date": "1578534775000",
            "location": "Southampton",
            "amount": 61.8,
            "category": "Food"
        }, 
        {
            "date": "1584247317000",
            "location": "Arundel",
            "amount": 59.63,
            "category": "Food"
        }, 
        {
            "date": "1580964333000",
            "location": "Arundel",
            "amount": 31.53,
            "category": "Housing"
        }, 
        {
            "date": "1584636266000",
            "location": "Southampton",
            "amount": 9.06,
            "category": "Food"
        }, 
        {
            "date": "1585078726000",
            "location": "Arundel",
            "amount": 49.32,
            "category": "Food"
        }, 
        {
            "date": "1584905046000",
            "location": "Portsmouth",
            "amount": 50.07,
            "category": "Other"
        }, 
        {
            "date": "1581818511000",
            "location": "Arundel",
            "amount": 53.55,
            "category": "Housing"
        }, 
        {
            "date": "1583634000000",
            "location": "Chichester",
            "amount": 54.22,
            "category": "Transportation"
        }, 
        {
            "date": "1585008129000",
            "location": "Portsmouth",
            "amount": 6.08,
            "category": "Education"
        }, 
        {
            "date": "1585338956000",
            "location": "Lymington",
            "amount": 63.09,
            "category": "Food"
        }, 
        {
            "date": "1584551123000",
            "location": "Lymington",
            "amount": 57.5,
            "category": "Transportation"
        }, 
        {
            "date": "1585200205000",
            "location": "Arundel",
            "amount": 97.4,
            "category": "Food"
        }, 
        {
            "date": "1581900895000",
            "location": "Lymington",
            "amount": 74.75,
            "category": "Food"
        }, 
        {
            "date": "1584667567000",
            "location": "Southampton",
            "amount": 26.27,
            "category": "Other"
        }, 
        {
            "date": "1580993931000",
            "location": "Chichester",
            "amount": 47.36,
            "category": "Housing"
        }, 
        {
            "date": "1580688334000",
            "location": "Portsmouth",
            "amount": 49.69,
            "category": "Food"
        }, 
        {
            "date": "1581299954000",
            "location": "Portsmouth",
            "amount": 88.12,
            "category": "Entertainment"
        }, 
        {
            "date": "1581495792000",
            "location": "Chichester",
            "amount": 51.08,
            "category": "Education"
        }, 
        {
            "date": "1583296137000",
            "location": "Lymington",
            "amount": 77.92,
            "category": "Housing"
        }, 
        {
            "date": "1583502306000",
            "location": "Southampton",
            "amount": 76.84,
            "category": "Education"
        }, 
        {
            "date": "1583101651000",
            "location": "Lymington",
            "amount": 55.59,
            "category": "Education"
        }, 
        {
            "date": "1580505737000",
            "location": "Southampton",
            "amount": 81.83,
            "category": "Housing"
        }, 
        {
            "date": "1579661512000",
            "location": "Southampton",
            "amount": 27.12,
            "category": "Food"
        }, 
        {
            "date": "1583884342000",
            "location": "Chichester",
            "amount": 73.77,
            "category": "Entertainment"
        }, 
        {
            "date": "1582631795000",
            "location": "Southampton",
            "amount": 82.5,
            "category": "Food"
        }, 
        {
            "date": "1583811178000",
            "location": "Lymington",
            "amount": 57.04,
            "category": "Transportation"
        }, 
        {
            "date": "1585326816000",
            "location": "Arundel",
            "amount": 54.18,
            "category": "Education"
        }, 
        {
            "date": "1581381786000",
            "location": "Southampton",
            "amount": 13.97,
            "category": "Entertainment"
        }, 
        {
            "date": "1580276637000",
            "location": "Arundel",
            "amount": 86.82,
            "category": "Utilities"
        }, 
        {
            "date": "1581641171000",
            "location": "Portsmouth",
            "amount": 22.33,
            "category": "Food"
        }, 
        {
            "date": "1580527641000",
            "location": "Southampton",
            "amount": 66.59,
            "category": "Food"
        }, 
        {
            "date": "1577946054000",
            "location": "Southampton",
            "amount": 32.87,
            "category": "Entertainment"
        }, 
        {
            "date": "1580644704000",
            "location": "Lymington",
            "amount": 55.15,
            "category": "Transportation"
        }, 
        {
            "date": "1578429605000",
            "location": "Arundel",
            "amount": 45.78,
            "category": "Education"
        }, 
        {
            "date": "1579839169000",
            "location": "Lymington",
            "amount": 32.73,
            "category": "Housing"
        }, 
        {
            "date": "1578812268000",
            "location": "Portsmouth",
            "amount": 93.05,
            "category": "Housing"
        }, 
        {
            "date": "1585095340000",
            "location": "Chichester",
            "amount": 34.78,
            "category": "Housing"
        }, 
        {
            "date": "1580818346000",
            "location": "Portsmouth",
            "amount": 20.71,
            "category": "Entertainment"
        }, 
        {
            "date": "1577885343000",
            "location": "Southampton",
            "amount": 93.7,
            "category": "Food"
        }, 
        {
            "date": "1584742807000",
            "location": "Portsmouth",
            "amount": 89.3,
            "category": "Housing"
        }, 
        {
            "date": "1580125923000",
            "location": "Southampton",
            "amount": 70.51,
            "category": "Entertainment"
        }, 
        {
            "date": "1582130377000",
            "location": "Portsmouth",
            "amount": 65.06,
            "category": "Education"
        }, 
        {
            "date": "1584528055000",
            "location": "Arundel",
            "amount": 87.29,
            "category": "Other"
        }, 
        {
            "date": "1580679026000",
            "location": "Portsmouth",
            "amount": 63.1,
            "category": "Transportation"
        }, 
        {
            "date": "1584593906000",
            "location": "Chichester",
            "amount": 28.84,
            "category": "Transportation"
        }, 
        {
            "date": "1580040315000",
            "location": "Southampton",
            "amount": 64.3,
            "category": "Food"
        }, 
        {
            "date": "1578138043000",
            "location": "Arundel",
            "amount": 78.85,
            "category": "Food"
        }, 
        {
            "date": "1585491276000",
            "location": "Arundel",
            "amount": 9.26,
            "category": "Entertainment"
        }, 
        {
            "date": "1580321061000",
            "location": "Arundel",
            "amount": 60.95,
            "category": "Food"
        }, 
        {
            "date": "1580194343000",
            "location": "Southampton",
            "amount": 93.45,
            "category": "Housing"
        }, 
        {
            "date": "1578737970000",
            "location": "Arundel",
            "amount": 89.86,
            "category": "Housing"
        }, 
        {
            "date": "1577914979000",
            "location": "Arundel",
            "amount": 1.61,
            "category": "Housing"
        }, 
        {
            "date": "1584407603000",
            "location": "Arundel",
            "amount": 52.2,
            "category": "Utilities"
        }, 
        {
            "date": "1579386275000",
            "location": "Southampton",
            "amount": 2.01,
            "category": "Education"
        }, 
        {
            "date": "1581679994000",
            "location": "Chichester",
            "amount": 81.68,
            "category": "Housing"
        }, 
        {
            "date": "1583846943000",
            "location": "Chichester",
            "amount": 5.32,
            "category": "Entertainment"
        }, 
        {
            "date": "1584059880000",
            "location": "Chichester",
            "amount": 34.9,
            "category": "Food"
        }, 
        {
            "date": "1579346889000",
            "location": "Southampton",
            "amount": 46.93,
            "category": "Housing"
        }, 
        {
            "date": "1579234065000",
            "location": "Lymington",
            "amount": 78.44,
            "category": "Housing"
        }, 
        {
            "date": "1583496451000",
            "location": "Lymington",
            "amount": 55.69,
            "category": "Food"
        }, 
        {
            "date": "1580454238000",
            "location": "Southampton",
            "amount": 67.73,
            "category": "Healthcare"
        }, 
        {
            "date": "1581661558000",
            "location": "Arundel",
            "amount": 32.88,
            "category": "Entertainment"
        }, 
        {
            "date": "1583497244000",
            "location": "Lymington",
            "amount": 5.04,
            "category": "Entertainment"
        }, 
        {
            "date": "1585591246000",
            "location": "Southampton",
            "amount": 37.42,
            "category": "Education"
        }, 
        {
            "date": "1581086959000",
            "location": "Arundel",
            "amount": 57.31,
            "category": "Transportation"
        }, 
        {
            "date": "1582845787000",
            "location": "Lymington",
            "amount": 45.87,
            "category": "Healthcare"
        }, 
        {
            "date": "1581712146000",
            "location": "Chichester",
            "amount": 48.04,
            "category": "Food"
        }, 
        {
            "date": "1578823569000",
            "location": "Southampton",
            "amount": 12.03,
            "category": "Housing"
        }, 
        {
            "date": "1583689383000",
            "location": "Lymington",
            "amount": 23.96,
            "category": "Food"
        }, 
        {
            "date": "1582093891000",
            "location": "Portsmouth",
            "amount": 14.58,
            "category": "Entertainment"
        }, 
        {
            "date": "1577850076000",
            "location": "Arundel",
            "amount": 37.99,
            "category": "Transportation"
        }, 
        {
            "date": "1581571353000",
            "location": "Chichester",
            "amount": 6.04,
            "category": "Entertainment"
        }, 
        {
            "date": "1583568652000",
            "location": "Chichester",
            "amount": 84.69,
            "category": "Food"
        }
    ];
    expenses = expenses.map(e => ({...e, date: +e.date}));
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

export { isNum, filterExpenses, nextPlotColourGenerator, loadDemoData };