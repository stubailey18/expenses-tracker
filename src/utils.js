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

export { isNum, filterExpenses };