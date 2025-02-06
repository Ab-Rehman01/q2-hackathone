export const registerUser = async (email: string, username: string, password: string) => {
    const response = await fetch("https://bullet-mart.net.pk/wp-json/wp/v2/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
  
    const data = await response.json();
    if (data.id) {
      return data;
        } else {
      throw new Error(data.message || "Registration failed");
    }
  };
  