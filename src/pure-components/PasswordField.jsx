import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller } from 'react-hook-form';

const PasswordField = ({ 
  value,
  onChange,
  placeholder = 'Password',
  error,
  helperText,
  fullWidth = true,
  control,
  name,
  register,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const renderTextField = ({ field }) => (
    <TextField
      {...field}
      {...(register && register(name))}
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props}
    />
  );

  if (register) {
    return renderTextField({ field: { value, onChange, ...props } });
  }

  return control ? (
    <Controller
      name={name}
      control={control} 
      render={renderTextField}
    />
  ) : (
    renderTextField({
      field: {
        value,
        onChange,
        ...props
      }
    })
  );
};

export default PasswordField;