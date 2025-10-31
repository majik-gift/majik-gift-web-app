import ApiManager from "@/helper/api-manager";
import { Autocomplete, TextField } from "@mui/material";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const UIAutocomplete = ({
  control = null,
  name = "autocomplete",
  label = "",
  url,
  onChange = () => {},
  onInputChange = () => {},
  options = [],
  isLoading = false,
  placeholder = "",
  errorMessage = "",
  country = "",
  errors = {},
  multiple = true,
  onOpen = () => {},
  ...otherProps
}) => {
  const errorMessageToShow = errorMessage || errors[name];
  const isError = !!errorMessageToShow;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async (value) => {
    setLoading(true);
    try {
      const { data: res } = await ApiManager({
        method: "get",
        path: `${url}&search=${value}`,
      });
      const list = res?.response?.details || [];
      setData(
        list.map((item) => ({
          label: item.full_name || item.title || item.label || item.name,
          value: item.code || item.id,
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('');
  }, []);

  const fetchDataBySearch = debounce((searchValue) => {
    fetchData(searchValue);
  }, 500);

  const renderAutocomplete = ({ field: { ref, value = multiple ? [] : null, ...field } }) => (
    <Autocomplete
      multiple={multiple}
      options={url ? data : options}
      loading={url ? loading : isLoading}
      value={value}
      onChange={(event, newValue) => {
        if (control) {
          field.onChange(newValue);
        } else {
          onChange(newValue);
        }
      }}
      onInputChange={(event, newInput) => {
        if (url) {
          fetchDataBySearch(newInput);
        } else {
          onInputChange(newInput);
        }
      }}
      getOptionLabel={(option) => option.label || ""}
      isOptionEqualToValue={(option, val) => option.value === val.value}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={isError}
          helperText={errorMessageToShow}
          inputRef={ref}
          {...otherProps}
        />
      )}
    />
  );

  return control ? (
    <Controller name={name} control={control} render={renderAutocomplete} />
  ) : (
    renderAutocomplete({ field: { ref: null, value: otherProps.value || (multiple ? [] : null), ...otherProps } })
  );
};

export default UIAutocomplete;

UIAutocomplete.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  url: PropTypes.string,
  options: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  errors: PropTypes.object,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  country: PropTypes.string,
  onOpen: PropTypes.func,
};
