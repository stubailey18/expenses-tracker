const isNum = str => !!str && !isNaN(str);

const toUkDate = usDate => {
    const regex = /(\d+)-(\d+)-(\d+)/g;
    const [_, y, m, d] = regex.exec(usDate);
    return `${d}/${m}/${y}`;
}

const toUsDate = ukDate => {
    const regex = /(\d+)\/(\d+)\/(\d+)/g;
    const [_, d, m, y] = regex.exec(ukDate);
    return `${y}-${m}-${d}`;
}

export { isNum, toUkDate, toUsDate };