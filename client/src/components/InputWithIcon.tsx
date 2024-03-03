import React, { ReactNode } from 'react';

interface InputWithIconProps {
  icon: ReactNode;
  placeholder: string;
  type: string;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ icon, placeholder, type}) => {
  return (
    <div className="relative p-2 m-2 border rounded-md">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {icon}
        </div>
      )}
      <input type={type} placeholder={placeholder} className="border-none outline-none pl-10 w-full" />
    </div>
  );
};

export default InputWithIcon;
