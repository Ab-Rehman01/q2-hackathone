export const WP_API_URL = "https://bullet-mart.net.pk/wp-json";

type User = {
  id: number;
  username: string;
  email: string;
};

type AuthResponse = {
  token: string;
  user_display_name: string;
  user_email: string;
  user_nicename: string;
};

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${WP_API_URL}/jwt-auth/v1/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password }),
  });

  const data: AuthResponse = await response.json();
  if (!response.ok) throw new Error(data.user_email || "Login failed");
  localStorage.setItem("token", data.token);
  return data;
}

export async function registerUser(
  email: string,
  password: string,
  username: string
): Promise<User> {
  const response = await fetch(`${WP_API_URL}/wp/v2/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  });

  const data: User = await response.json();
  if (!response.ok) throw new Error("Registration failed");
  return data;
}

export async function getUserProfile(token: string): Promise<User> {
  const response = await fetch(`${WP_API_URL}/wp/v2/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data: User = await response.json();
  if (!response.ok) throw new Error("Failed to fetch profile");
  return data;
}
