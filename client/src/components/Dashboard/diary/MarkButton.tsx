import React from "react";
import { Tooltip } from "react-tooltip";

const MARKS_COLOR_MAP = {
  5: "bg-green-600",
  4: "bg-orange-400",
  3: "bg-yellow-400",
  2: "bg-red-600",
};

interface Mark {
  id: number;
  value: number;
}

interface MarkButtonProps {
  mark: Mark;
  hint: string;
}

const MarkButton: React.FC<MarkButtonProps> = ({ mark, hint }) => {
  return (
    <div>
      <Tooltip id={`tooltip-${mark.id}`} />
      <button
        className={`px-1.5 py-0.5 mr-1 max-w-min max-h-min h-fit rounded flex 
                    items-center justify-center text-white font-semibold 
                    ${MARKS_COLOR_MAP[mark.value]}`}
        data-tooltip-id={`tooltip-${mark.id}`}
        data-tooltip-content={hint}
        data-tooltip-place="top"
      >
        {mark.value}
      </button>
    </div>
  );
};

export default MarkButton;
