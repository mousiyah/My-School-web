import React, { useState } from 'react';
import DiaryDay from '../components/DiaryDay';
import DiaryDatePicker from '../components/DiaryDatePicker';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { enGB } from 'date-fns/locale/en-GB';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

registerLocale('en-GB', enGB);

const Diary: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex flex-col items-center p-4">
     
     <DiaryDatePicker 
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}/>

      <div className="w-full flex">
        {[...Array(6)].map((_, index) => (
          <DiaryDay key={index} weekIndex={index} selectedDate={selectedDate} />
        ))}
      </div>

    </div>
  );
};

export default Diary;
