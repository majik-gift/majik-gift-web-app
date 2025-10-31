import { Stack, Typography } from "@mui/material";
import React from "react";

export default function Detail({title , value}) {
  return (
    <Stack direction={"row"} width={"100%"} justifyContent={'space-between'}>
      <Typography variant="p" fontSize={17}>
        {title}
      </Typography>
      <Typography variant="p" fontSize={17} color="grey">
        {value}
      </Typography>
    </Stack>
  );
}
