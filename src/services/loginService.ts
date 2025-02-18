interface TokenResponse {
	access_token: string;
	token_type: string;
}

export async function login(email: string, password: string) {
	const formData = new URLSearchParams();

	formData.append("username", email);
	formData.append("password", password);

	const response = await fetch("http://localhost:8000/auth/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: formData.toString(),
	});

	if (!response.ok) {
		throw new Error("Error while authenticating. Verify your credentials.");
	}

	const data = await response.json();

	// armazena localmente
	localStorage.setItem("token", data.access_token);
}

export async function refreshToken(
	currentToken: string,
): Promise<TokenResponse> {
	const response = await fetch("http://localhost:8000/auth/refresh_token", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${currentToken}`,
		},
	});

	if (!response.ok) {
		throw new Error("Error while refreshing token.");
	}

	return await response.json();
}
