import React, { useState } from 'react';
import DiaryDay from '../components/DiaryDay';

import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {enGB} from 'date-fns/locale/en-GB';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

registerLocale('en-GB', enGB);

const Diary: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
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

  const WeekRangeInput = ({ value, onClick }: any) => (
    <button onClick={onClick} className="text-center border border-gray-300 p-1 mx-2 rounded">
      {getWeekRange(value)}
    </button>
  );

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex w-full justify-between items-center mb-4 px-4">
        <div className="flex items-center mx-auto">
          <button>
            <IoIosArrowBack className="text-2xl" />
          </button>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="text-center border border-gray-300 p-1 mx-2 rounded"
            dateFormat="MMMM d"
            
            locale="en-GB"
          />
          <button>
            <IoIosArrowForward className="text-2xl" />
          </button>
        </div>
        <button className="btn-white" onClick={() => handleDateChange(new Date())}>
          Today
        </button>
      </div>

      <div className="flex">
        {[...Array(6)].map((_, index) => (
          <DiaryDay key={index} weekIndex={index} />
        ))}
      </div>
      
      <div>{getWeekRange(selectedDate)}</div>
    </div>
  );
};

export default Diary;
