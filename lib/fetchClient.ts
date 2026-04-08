const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const logout = async () => {
  try {
    await fetch("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Logout API failed:", error);
  } finally {
    document.cookie = "access_token=; path=/; max-age=0";
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token");
    localStorage.removeItem("last_exam_result");
    window.location.href = "/login";
  }
};

export const fetchClient = async (
  endpoint: string,
  options: RequestInit = {},
) => {

   
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
 



  if (res.status === 401) {
    logout();
    throw new Error("Unauthorized");
  }

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid JSON response");
  }

   console.log(data?.detail?.message)

    if (data?.detail?.message === "Invalid or expired token.") {
    logout();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};
