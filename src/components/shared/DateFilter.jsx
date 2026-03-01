import React from 'react';
import { Calendar } from 'lucide-react';

const DateFilter = ({ startDate, endDate, onUpdate }) => {
    return (
        <div className="date-filter-container">
            <div className="date-filter-label">
                <Calendar size={14} />
                <span>Date Range:</span>
            </div>
            <div className="date-filter-inputs">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onUpdate({ startDate: e.target.value, endDate })}
                    className="date-input"
                />
                <span className="date-separator">to</span>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => onUpdate({ startDate, endDate: e.target.value })}
                    className="date-input"
                />
            </div>
        </div>
    );
};

export default DateFilter;
