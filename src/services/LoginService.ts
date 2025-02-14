interface TokenResponse {
    access_token: string;
    token_type: string;
  }
  
  async function login(email: string, password: string): Promise<TokenResponse> {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
  
    const response = await fetch("http://localhost:8000/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Error while authenticating. Verify your credentials.");
    }
  
    const data = await response.json();

    // armazena localmente
    localStorage.setItem('token', data.access_token)
  }
  
  async function refreshToken(currentToken: string): Promise<TokenResponse> {
    const response = await fetch("http://localhost:8000/refresh_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${currentToken}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Error while refreshing token.");
    }
  
    return await response.json();
  }
  