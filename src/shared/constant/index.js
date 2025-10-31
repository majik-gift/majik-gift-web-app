export const GRID_SPACING = 4;
export const GRID_SUB_SPACING = 2;
export const DRAWER_WIDTH = 260;
export const HEADER_HEIGHT = "100px";
export const MOBILE_BREAK_POINT = "(min-width:900px)";
export const DRAWER_BREAK_POINT = "(min-width:1200px)";
export const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const daysOfWeek = [
  { label: "Sunday", value: "sunday" },
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
];

export const redirectNotificationLink = (notification) => {
  // const rolesMap = {
  //   admin: 'admin',
  //   light_worker: 'light-worker',
  //   stall_holder: 'stall-holder',
  // };

  // const userRole = rolesMap[role] || '';
  // if (!userRole) return '#';

  if (notification?.data?.notificationType) {
    // return `/chat?chatId=${notification?.data?.chatId}`;
  }
  if (notification?.data?.chatId || notification?.data?.chat_id) {
    return `/chat?chatId=${
      notification.data.chatId || notification.data.chat_id
    }`;
  }
  if (notification?.event_ticket_order_id) {
    return `/group-activities`;
  }
  if (notification?.service_order_id) {
    // return `/service-order/${notification.service_order_id}`;
    if (notification?.data?.type === "reading") {
      return `/readings`;
    } else {
      return `/subscriptions`;
    }
  }
  if (notification?.product_order_id) {
    // return `/order-details/${notification.product_order_id}`;
    return `/order-details`;
  }
  if (notification?.data?.product_id) {
    return `/products/${notification.data.product_id}`;
  }
  if (notification?.data?.service_id) {
    return `/services/${notification.data.service_id}`;
  }
  if (notification?.data?.event_id) {
    return `/events/${notification.data.event_id}`;
  }

  return "#";
};
