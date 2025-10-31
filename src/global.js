import ApiManager from "./helper/api-manager";

export const APP_TOKEN = process.env.NEXT_PUBLIC_TOKEN;
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const CLIENT_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_BASE_URL;
export const drawerWidth = 240;

export const FetchSingleData = async (pathname, setData, setLoading) => {
  if (!pathname) return;
  if (setLoading) setLoading(true);
  try {
    let { data } = await ApiManager({
      method: "get",
      path: pathname.slice(1),
    });
    // console.log(data?.response?.details);
    setData(data?.response?.details);
  } catch (error) {
    console.log("error", error);
    setData(null);
  } finally {
    if (setLoading) setLoading(false);
  }
};
