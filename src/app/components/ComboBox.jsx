import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";

export default function ComboBox({
  countryOptions,
  setValue,
  registerName,
  label,
  errors,
  control,
}) {
  return (
    <Controller
      name={registerName}
      control={control}
      render={({ field }) => (
        <Autocomplete
          options={countryOptions || []}
          getOptionLabel={(option) => option?.label || ""}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          value={field.value || null}
          onChange={(_, newValue) => field.onChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!errors[registerName]}
              helperText={errors[registerName]?.message}
            />
          )}
        />
      )}
    />
  );
}
