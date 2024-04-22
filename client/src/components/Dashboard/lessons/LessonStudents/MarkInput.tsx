import React from "react";

const MarkInput = ({ value, disabled, onSelect }) => {
  return (
    <select
      value={value}
      disabled={disabled}
      className="select select-bordered select-sm w-full max-w-xs"
      onChange={(e) => onSelect(parseInt(e.target.value))}
    >
      <option value={0} selected={value === 0}>
        none
      </option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
    </select>
  );
};

export default MarkInput;
