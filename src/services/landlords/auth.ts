type LoginResponseBody = {
  landlord: {
    id: string
    name: string
    email: string
    role: 'landlord'
  },
  token: string
}

type MeResponseBody = {
  landlord: {
    id: string
    name: string
    email: string
    role: 'landlord'
  },
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

  async me(landlordToken: string): Promise<MeResponseBody> {
    const res = await fetch("http://localhost:3000/landlords/me", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${landlordToken}`
      }
    });

    if (!res.ok) throw new Error("Invalid token");

    return res.json();
  }
};

export default LandlordAuthService;