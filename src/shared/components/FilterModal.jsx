import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "@/store/filterSlice";

const FilterModal = ({ title, categoryOption }) => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [firstDropdownValue, setFirstDropdownValue] = useState("");
  // console.log("🚀 ~ file: FilterModal.jsx:21 ~ firstDropdownValue:", !firstDropdownValue)
  const [secondDropdownValue, setSecondDropdownValue] = useState("");
  // console.log("🚀 ~ file: FilterModal.jsx:23 ~ secondDropdownValue:", secondDropdownValue)

  useEffect(() => {
    dispatch(
      setFilters({
        categoryId: "",
        sortOption: "",
      })
    );
  }, []);

  const serviceDropdownOptions = [
    { value: "service-name-az", label: "Sort by a-z" },
    { value: "service-name-za", label: "Sort by z-a" },
    { value: "price-low-to-high", label: "Sort by price low to high" },
    { value: "price-high-to-low", label: "Sort by price high to low" },
    { value: "exclusive", label: "Exclusive" },
  ];

  const productsDropdownOptions = [
    { value: "product-name-az", label: "Sort by a-z" },
    { value: "product-name-za", label: "Sort by z-a" },
    { value: "price-low-to-high", label: "Sort by price low to high" },
    { value: "price-high-to-low", label: "Sort by price high to low" },
    { value: "exclusive", label: "Exclusive" },
  ];

  const eventsDropdownOptions = [
    { value: "event-name-az", label: "Sort by a-z" },
    { value: "event-name-za", label: "Sort by z-a" },
    { value: "price-low-to-high", label: "Sort by price low to high" },
    { value: "price-high-to-low", label: "Sort by price high to low" },
    { value: "exclusive", label: "Exclusive" },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFirstDropdownValue("");
    setSecondDropdownValue("");
    dispatch(
      setFilters({
        categoryId: "",
        sortOption: "",
      })
    );
  };

  const handleSubmit = () => {
    // Dispatch the selected filters to Redux
    dispatch(
      setFilters({
        categoryId: firstDropdownValue,
        sortOption: secondDropdownValue,
      })
    );

    setFirstDropdownValue("");
    setSecondDropdownValue("");
    setOpen(false);
  };

  return (
    <div>
      <Stack
        onClick={handleOpen}
        style={{ cursor: "pointer" }}
        justifyContent={"center"}
        alignItems={"center"}
        border={1}
        borderColor={"divider"}
        padding={2.1}
      >
        <svg
          width="15"
          height="20"
          viewBox="0 0 27 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.15626 5.01882C3.15626 3.83321 4.11739 2.87208 5.303 2.87208C6.48862 2.87208 7.44974 3.83321 7.44974 5.01882C7.44974 6.20444 6.48862 7.16556 5.303 7.16556C4.11739 7.16556 3.15626 6.20444 3.15626 5.01882ZM5.303 0.00976562C2.53657 0.00976562 0.293945 2.25239 0.293945 5.01882C0.293945 7.78526 2.53657 10.0279 5.303 10.0279C8.06943 10.0279 10.3121 7.78526 10.3121 5.01882C10.3121 2.25239 8.06943 0.00976562 5.303 0.00976562ZM13.1744 6.44998H24.6237V3.58766H13.1744V6.44998ZM18.899 19.3304C18.899 18.1448 19.8602 17.1837 21.0458 17.1837C22.2313 17.1837 23.1925 18.1448 23.1925 19.3304C23.1925 20.516 22.2313 21.4772 21.0458 21.4772C19.8602 21.4772 18.899 20.516 18.899 19.3304ZM21.0458 14.3214C18.2793 14.3214 16.0367 16.564 16.0367 19.3304C16.0367 22.0969 18.2793 24.3395 21.0458 24.3395C23.8122 24.3395 26.0548 22.0969 26.0548 19.3304C26.0548 16.564 23.8122 14.3214 21.0458 14.3214ZM1.7251 17.8993V20.7616H13.1744V17.8993H1.7251Z"
            fill="black"
          />
        </svg>
      </Stack>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            pt: 4,
            borderRadius: 1,
          }}
        >
          <Typography
            textTransform={"capitalize"}
            id="modal-title"
            variant="h6"
            component="h2"
            mb={3}
            textAlign={"center"}
          >
            {title} Filter
          </Typography>

          <Stack spacing={3}>
            <Stack spacing={3} px={4}>
              <FormControl fullWidth>
                <InputLabel id="first-dropdown-label">Category</InputLabel>
                <Select
                  labelId="first-dropdown-label"
                  id="first-dropdown"
                  // set value from redux
                  value={firstDropdownValue || filters.categoryId}
                  label="Category"
                  onChange={(e) => {
                    setFilters({
                      categoryId: "",
                      sortOption: "",
                    });
                    setFirstDropdownValue(e.target.value);
                  }}
                >
                  {categoryOption?.map((option) => (
                    <MenuItem key={option.name} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="second-dropdown-label">Sort</InputLabel>
                <Select
                  labelId="second-dropdown-label"
                  id="second-dropdown"
                  // set value from redux
                  value={secondDropdownValue || filters.sortOption}
                  label="Sort"
                  onChange={(e) => {
                    setFilters({
                      categoryId: "",
                      sortOption: "",
                    });
                    setSecondDropdownValue(e.target.value);
                  }}
                >
                  {title == "service" &&
                    serviceDropdownOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  {title == "products" &&
                    productsDropdownOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  {title == "events" &&
                    eventsDropdownOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack direction="column" width={"100%"} height={"55px"}>
              <Box
                sx={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "divider",
                }}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                width={"100%"}
                height={"55px"}
              >
                <Button
                  sx={{ width: "50%" }}
                  variant="text"
                  onClick={handleSubmit}
                  disabled={!firstDropdownValue && !secondDropdownValue}
                >
                  Submit
                </Button>
                <Box
                  sx={{
                    width: "1px",
                    height: "100%",
                    backgroundColor: "divider",
                  }}
                />
                <Button
                  sx={{ width: "50%" }}
                  variant="text"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default FilterModal;
