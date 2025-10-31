import React, { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import UIInputField from './InputField';

const UIPasswordField = ({ 
  showIcon = true,
  defaultShowPassword = false,
  ...otherProps 
}) => {
  const [showPassword, setShowPassword] = useState(defaultShowPassword);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <UIInputField
      type={showPassword ? 'text' : 'password'}
      autoComplete="current-password"
      icon={
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      }
      {...otherProps}
    />
  );
};

export default UIPasswordField; 