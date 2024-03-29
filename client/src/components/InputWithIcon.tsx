import React, { ReactNode } from 'react';

interface InputWithIconProps {
  icon: ReactNode;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  placeholder,
  type,
  value,
  onChange,
}) => {
  return (
    <div className="relative p-2 m-2 border rounded-md">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="border-none outline-none pl-10 w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputWithIcon;
