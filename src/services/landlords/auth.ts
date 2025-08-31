type LoginResponseBody = {
  landlord: {
    id: string
    name: string
    email: string
    role: 'landlord'
  },
  token: string
}

const LandlordAuthService = {
  async login(email: string, password: string): Promise<LoginResponseBody> {
    const res = await fetch("http://localhost:3000/landlords/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Invalid credentials");

    return res.json();
  },

};

export default LandlordAuthService;