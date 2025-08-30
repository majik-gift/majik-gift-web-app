import dayjs from "dayjs";

const {
  Box,
  Typography,
  Card,
  CardActionArea,
  Stack,
  Skeleton,
} = require("@mui/material");

const TimeSlot = ({ slot, loading, selectedSlot, onClick }) => {
  const disabled = true;
  return (

    <Stack>
      {loading ?
        <Skeleton height={64} width={194} variant="rectangular" sx={{ borderRadius: 1 }} /> :
        <Card
          onClick={onClick}
          sx={{
            ...styles.card,
            borderColor: slot?.booked
              ? "#E0E0E0"
              : selectedSlot?.id === slot.id
                ? "background.primary"
                : "text.lightGrey",
            borderWidth: selectedSlot?.id === slot.id && "2px",
            backgroundColor: slot?.booked && "#E0E0E0",
          }}
        >
          <CardActionArea disableRipple={slot?.booked}>
            <Box sx={styles.slotContainer}>
              <Typography color={slot?.booked && "textDisabled"}>
                {dayjs.unix(slot?.start_time).format("h:mm A")} -{" "}
                {dayjs.unix(slot?.end_time).format("h:mm A")}
              </Typography>
              <Typography color={slot?.booked && "textDisabled"}>
                {slot?.number_of_left_slots} slot
                {slot?.number_of_left_slots > 1 ? "s" : ""} left
              </Typography>
            </Box>
          </CardActionArea>
        </Card>
      }
      {!loading && selectedSlot?.id === slot.id && slot?.booked && (
        <Typography variant="body2" color="error">
          This slot is already booked!
        </Typography>
      )}
    </Stack>
  );
};

export default TimeSlot;

const styles = {
  slotContainer: {
    py: 1,
    px: 4,
  },
  card: {
    border: "1px solid grey",
  },
};
