import React, { ReactNode } from 'react';

interface InputWithIconProps {
  icon: ReactNode;
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  placeholder,
  type,
  name,
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
        name={name}
        autoComplete="yes" // idk why works
        id={name}
        placeholder={placeholder}
        className="border-none outline-none pl-10 w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputWithIcon;
