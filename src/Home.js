import React from 'react';

export default function Home() {
    return (
        <div className="container">
            <p>Welcome to Expenses Tracker!</p>
            <div className="alert alert-warning">
                <p><strong>Warning!</strong></p>
                <p>This app is for demonstration purposes only. It is pre-configured with dummy data (in localStorage) for the first three months of 2020.</p>
                <p>The table of data under My Expenses may be sorted by clicking on the headers. Click once to sort ascending; again to sort descending; and a third time to remove the sort. Sorting may be nested, e.g. sort by category and then by date.</p>
                <p>The filters you apply affect the table and the plots.</p>
                <p>Note that the charts are responsive and so are tough to read on mobile phones in portrait mode.</p>
            </div>
        </div>
    );
}