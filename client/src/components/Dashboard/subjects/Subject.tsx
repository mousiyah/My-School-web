import React from "react";
import { useParams } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LessonMyWork: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();

  const generateRandomMarks = () => {
    const marks = [];
    const startDate = new Date("2023-09-01");
    const endDate = new Date();

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setMonth(date.getMonth() + 1)
    ) {
      const mark = Math.floor(Math.random() * 4) + 2;
      marks.push([date.getTime(), mark]);
    }

    return marks;
  };

  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: "My average marks",
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        month: "%b %Y",
      },
    },
    yAxis: {
      max: 5,
    },
    series: [
      {
        name: "Lesson",
        data: generateRandomMarks(),
        color: "hsl(0, 80%, 70%)",
      },
      {
        name: "Homework",
        data: generateRandomMarks(),
        color: "hsl(200, 80%, 70%)",
      },
      {
        name: "Classwork",
        data: generateRandomMarks(),
        color: "hsl(30, 80%, 70%)",
      },
    ],
  };

  return (
    <div className="w-full items-center py-10 px-10">
      <div className="ml-10 mb-10">
        <p className="text-xl font-semibold mb-1">Subject: {subjectId}</p>
        <p>2023-2024 Academic Year</p>
      </div>

      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LessonMyWork;
