import React from 'react';

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 1.6 }) => {
  return <p className="logo m-0" style={{ fontSize: `${size}rem` }}>my school</p>;
};

export default Logo;
