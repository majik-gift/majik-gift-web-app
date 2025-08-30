"use server";

import { cookies } from "next/headers";

// Function to create a cookie
async function createCookie(value) {
  let cookieStore = await cookies();
  cookieStore.set({
    name: process.env.NEXT_PUBLIC_APP_TOKEN,
    value, // Ensure this is a valid string
    httpOnly: true,
    path: "/",
  });
}

// Function to delete a cookie
function deleteCookie() {
  cookies().delete('@ACCESS_TOKEN');
}

export { createCookie, deleteCookie };
