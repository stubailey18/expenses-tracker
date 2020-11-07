import React, { useContext } from 'react';
import { AppStateContext } from './app-state';

export default function AppliedFilters() {

    const {state} = useContext(AppStateContext);
    const {filters} = state;

    return (
        <>
            {filters.length > 0 && (
                <>
                    <p className="mb-0">Applied filters:</p>
                    <ul>
                        {filters.map(({field, operator, value}, index) => {
                            if (field === 'date') {
                                value = new Date(value).toLocaleDateString();
                            }
                            return <li key={index}>{`${field} ${operator} ${value}`}</li>;
                        })}
                    </ul>
                </>
            )}
        </>
    );
}