import { Stack, TextField } from "@mui/material";
import React from "react";
import FilterModal from "@/shared/components/FilterModal";

const SearchField = ({
  search,
  setSearch,
  handleInput,
  title,
  categoryOption,
}) => {
  // const handleInput = (e) => {
  //   setSearch(e.target.value);
  // };
  return (
    <Stack flexDirection={"row"} justifyContent={"space-between"}>
      <TextField
        label={"Search"}
        sx={{
          width: title !== "users" ? "95%" : "100%",
          "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            outline: "none",
            borderColor: "divider",
          },
        }}
        onChange={handleInput}
      />
      {title !== "users" && (
        <FilterModal title={title} categoryOption={categoryOption} />
      )}
    </Stack>
  );
};

export default SearchField;
