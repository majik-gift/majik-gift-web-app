import { NotFoundData } from "@/shared/components";
import { Box, Divider, List, Paper, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import UserListItemSkeleton from "./skeleton/UserListItemSkeleton";
import UserListItem from "./UserListItem";

const UserList = ({ userChat, setActiveChat, activeChat, loading }) => {
  // Sorting the chat data by the last message sent timestamp
  const dataSortByLastSendMsg = userChat?.sort(
    (a, b) =>
      new Date(a.last_message_sent_at) - new Date(b.last_message_sent_at)
  );

  return (
    <Paper
      sx={{
        borderRadius: "20px",
        height: {
          md: "calc(100% - 10%)", // Desktop
          sm: "calc(100vh - 150px)", // Tablet
          xs: "calc(100vh - 120px)", // Mobile
        },
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      variant="outlined"
    >
      <Typography sx={{ px: "18px", p: 2 }} variant="h6" fontWeight="bold">
        Messages
      </Typography>
      <Divider />
      <List
        sx={{
          width: 1,
          flexDirection: "column-reverse",
          overflow: "auto",
          height: "100%",
          "::-webkit-scrollbar": { width: "0.4em" },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            borderRadius: "10px",
          },
        }}
      >
        {loading && <UserListItemSkeleton />}

        <AnimatePresence>
          {dataSortByLastSendMsg?.reverse().map((chat, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <UserListItem
                chat={chat}
                onClick={() => setActiveChat(chat)}
                selected={activeChat?.id === chat?.id}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Display if no chats are found */}
        {!loading && !dataSortByLastSendMsg.length && (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NotFoundData title="No Chats Found" />
          </Box>
        )}
      </List>
    </Paper>
  );
};

export default UserList;
