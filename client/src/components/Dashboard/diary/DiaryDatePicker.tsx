import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { enGB } from 'date-fns/locale/en-GB';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { registerLocale } from 'react-datepicker';
registerLocale('en-GB', enGB);

interface DiaryDatePickerProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) =>void;
    handleDateChange: (date: Date) => void;
    isDatePickerOpen: boolean;
    toggleDatePicker: () => void;
    datePickerRef: React.RefObject<HTMLDivElement>;
}

const DiaryDatePicker: React.FC<DiaryDatePickerProps> = ({
    selectedDate,
    setSelectedDate,
    handleDateChange,
    isDatePickerOpen,
    toggleDatePicker,
    datePickerRef,
}) => {

    const handlePrevWeek = () => {
        const prevWeek = new Date(selectedDate);
        prevWeek.setDate(selectedDate.getDate() - 7);
        setSelectedDate(prevWeek);
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(selectedDate);
        nextWeek.setDate(selectedDate.getDate() + 7);
        setSelectedDate(nextWeek);
    };

    const handlePrevDay = () => {
        const prevDay = new Date(selectedDate);
        prevDay.setDate(selectedDate.getDate() - 1);
        setSelectedDate(prevDay);
    };

    const handleNextDay = () => {
        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + 1);
        setSelectedDate(nextDay);
    };

    const getWeekRange = (date: Date) => {
        const startDate = new Date(date);
        startDate.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        const startMonth = startDate.toLocaleString('default', { month: 'short' });
        const startDay = startDate.getDate();
        const endMonth = endDate.toLocaleString('default', { month: 'short' });
        const endDay = endDate.getDate();
        const year = endDate.getFullYear();

        return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                
                {/* Small and medium screens */}
                <button className="lg:hidden cursor-pointer" onClick={handlePrevDay}>
                <IoIosArrowBack />
                </button>

                {/* Large screens */}
                <button className="hidden lg:block cursor-pointer" onClick={handlePrevWeek}>
                    <IoIosArrowBack />
                </button>

                <button onClick={toggleDatePicker}
                        className="flex cursor-pointer justify-center items-center relative w-fit lg:w-96 mx-2 btn-white w-96">
                    <div className="lg:hidden">{selectedDate.toLocaleDateString()}</div>
                    <div className="hidden lg:block">{getWeekRange(selectedDate)}</div>
                    {isDatePickerOpen && (
                        <div className="absolute top-full inset-0 z-50 mt-2" ref={datePickerRef}>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                className="text-center border border-gray-300 p-1 mx-2 rounded"
                                dateFormat="MMMM d"
                                locale="en-GB"
                                open={isDatePickerOpen}
                                inline/>
                        </div>
                    )}
                </button>

                {/* Small and medium screens */}
                <button className="lg:hidden cursor-pointer" onClick={handleNextDay}>
                    <IoIosArrowForward />
                </button>

                {/* Large screens */}
                <button className="hidden lg:block cursor-pointer" onClick={handleNextWeek}>
                    <IoIosArrowForward />
                </button>

            </div>

            <button onClick={() => handleDateChange(new Date())}
                    className="btn-white cursor-pointer">
                Today
            </button>

    </div>

    );
};

export default DiaryDatePicker;
