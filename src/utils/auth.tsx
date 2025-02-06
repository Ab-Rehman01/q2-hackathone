// export const registerUser = async (email: string, username: string, password: string) => {
//     const response = await fetch("https://bullet-mart.net.pk/wp-json/wp/v2/users/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username,
//         email,
//         password,
//       }),
//     });
  
//     const data = await response.json();
//     if (data.id) {
//       return data; //
//     } else {
//       throw new Error(data.message || "Registration failed");
//     }
//   };
  

export const WP_API_URL = "https://bullet-mart.net.pk/wp-json";

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${WP_API_URL}/jwt-auth/v1/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Login failed");
  localStorage.setItem("token", data.token);
  return data;
}

export async function registerUser(email: string, password: string, username: string) {
  const response = await fetch(`${WP_API_URL}/wp/v2/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Registration failed");
  return data;
}

export async function getUserProfile(token: string) {
  const response = await fetch(`${WP_API_URL}/wp/v2/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch profile");
  return data;
}
