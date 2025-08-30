import ApiManager from "@/helper/api-manager";
import { createCookie } from "@/helper/cookies";
import { setUser } from "@/store/reducer";

export async function useGuestLogIn({ dispatch }) {
  try {
    let { data } = await ApiManager({
      method: "post",
      path: "auth/sign-in",
      params: { email: "guest@gmail.com", password: "123123" },
    });
    dispatch(setUser(data?.response?.details));
    createCookie(
      JSON.stringify({
        user: data?.response?.details,
        access_token: data?.response?.access_token,
      })
    );
    localStorage.setItem(
      process.env.NEXT_PUBLIC_APP_TOKEN,
      data.response.access_token
    );
  } catch (error) {
    console.log(error);
  }
}
