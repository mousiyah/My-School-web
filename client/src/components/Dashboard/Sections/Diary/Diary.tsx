import React, { useState, useEffect } from 'react';
import DiaryDay from './DiaryDay';
import DiaryDatePicker from './DiaryDatePicker';
import { diaryApi } from 'api/routes';

const Diary: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diaryData, setDiaryData] = useState([]);

  useEffect(() => {
    fetchWeekData();
  }, [selectedDate]);

  const fetchWeekData = async () => {
    const weekData = [];
    for (let i = 1; i < 7; i++) {
      const currentDate = new Date(selectedDate);
      currentDate.setDate(selectedDate.getDate() - selectedDate.getDay() + i);

      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');

      const dateOnly = `${year}-${month}-${day}`;

      const diaryEntry = await fetchDiaryDay(dateOnly);
      weekData.push(diaryEntry);
    }
    setDiaryData(weekData);
  };

  const fetchDiaryDay = async (date) => {
    const diaryDay = await diaryApi.getDiaryDay(date);
    return diaryDay;
  };

  const getDate = (weekIndex) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(selectedDate.getDate() - selectedDate.getDay() + 1 + weekIndex);
    return currentDate;
  };

  const getWeekIndex = (date: Date): number => {
    let dayIndex = date.getDay() - 1;
    if (dayIndex === -1) dayIndex = 6;
    return dayIndex;
};

  return (
    <div className="flex w-full flex-col items-center">
      <DiaryDatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Large screens: render one week at a time */}
      <div className="hidden lg:flex w-full border-box px-2 space-x-1">
        {[...Array(6)].map((_, weekIndex) => (
          <DiaryDay key={getDate(weekIndex).getTime()} date={getDate(weekIndex)} diaryDayData={diaryData[weekIndex]} />
        ))}
      </div>

      {/* Small and medium screens: render one day at a time */}
      <div className="lg:hidden flex w-full border-box px-2">
          <DiaryDay
            date={selectedDate}
            diaryDayData={diaryData[getWeekIndex(selectedDate)]}
          />
      </div>


    </div>
  );
};

export default Diary;
