import React, { useState, useRef, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { enGB } from 'date-fns/locale/en-GB';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

registerLocale('en-GB', enGB);

interface DiaryDatePickerProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

const DiaryDatePicker: React.FC<DiaryDatePickerProps> = ({
    selectedDate,
    setSelectedDate,
}) => {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const datePickerRef = useRef<HTMLDivElement>(null);

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                datePickerRef.current &&
                !datePickerRef.current.contains(event.target as Node)
            ) {
                setIsDatePickerOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex w-full justify-between items-center mb-4 px-4">
            <div className="flex items-center mx-auto">
                <button onClick={handlePrevWeek}>
                    <IoIosArrowBack />
                </button>
                <div ref={datePickerRef}>
                    <button
                        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        className="relative mx-2 btn-white w-96"
                    >
                        <div>{getWeekRange(selectedDate)}</div>
                        {isDatePickerOpen && (
                            <div className="absolute top-full inset-0 z-50 mt-2">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    className="text-center border border-gray-300 p-1 mx-2 rounded"
                                    dateFormat="MMMM d"
                                    locale="en-GB"
                                    open={isDatePickerOpen}
                                    inline
                                />
                            </div>
                        )}
                    </button>
                </div>
                <button onClick={handleNextWeek}>
                    <IoIosArrowForward />
                </button>
            </div>
            <button className="btn-white" onClick={() => handleDateChange(new Date())}>
                Today
            </button>
        </div>
    );
};

export default DiaryDatePicker;
