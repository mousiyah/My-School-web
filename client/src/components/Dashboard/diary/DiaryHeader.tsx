import React, { useState, useRef } from 'react';
import { registerLocale } from 'react-datepicker';
import { useClickOutside } from 'hooks/useClickOutside';
import 'react-datepicker/dist/react-datepicker.css';

import DiaryDatePicker from './DiaryDatePicker'
import { enGB } from 'date-fns/locale/en-GB';

import { MdOutlineViewWeek, MdOutlineFormatListBulleted } from "react-icons/md";

registerLocale('en-GB', enGB);

interface DiaryHeaderProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    views: string[];
    viewMode: string;
    setViewMode: (mode: string) => void;
}

const DiaryHeader: React.FC<DiaryHeaderProps> = ({
    selectedDate,
    setSelectedDate,
    views,
    viewMode,
    setViewMode,
}) => {
    
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const datePickerRef = useRef<HTMLDivElement>(null);

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    const toggleDatePicker = () => {
        setIsDatePickerOpen(!isDatePickerOpen);
    };

    const closeDatePicker = () => {
        setIsDatePickerOpen(false);
    };

    const toggleView = (mode: string) => {
        setViewMode(mode);
    };

    useClickOutside(datePickerRef, closeDatePicker);

    return (
        <div className="w-full mb-4 px-2">
            <div className="lg:flex md:flex justify-between items-center mx-auto">

                <div className="flex justify-center items-center mb-5 md:mb-0">
                    {views.map((view, index) => (
                        <button key={index} onClick={() => toggleView(view)}
                                className={`flex items-center mr-2 
                                    ${viewMode === view ? 'btn-disable' : 'btn-white '}`}>
                            {index == 1 ? 
                                <MdOutlineViewWeek size={16} className="mr-1" /> : 
                                <MdOutlineFormatListBulleted size={16} className="mr-1" />}

                            <span className="hidden sm:inline text-sm">
                                {view.charAt(0).toUpperCase() + view.slice(1)} view
                            </span>
                        </button>
                    ))}
                </div>

                <DiaryDatePicker
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    handleDateChange={handleDateChange}
                    isDatePickerOpen={isDatePickerOpen}
                    toggleDatePicker={toggleDatePicker}
                    datePickerRef={datePickerRef}/>

            </div>
        </div>
    );
};

export default DiaryHeader;
