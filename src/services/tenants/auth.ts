type LoginResponseBody = {
  tenant: {
    id: string
    name: string
    email: string
    role: 'tenant'
  },
  token: string
}

type MeResponseBody = {
  tenant: {
    id: string
    name: string
    email: string
    role: 'tenant'
  },
}

const TenantAuthService = {
  async login(email: string, password: string): Promise<LoginResponseBody> {
    const res = await fetch("http://localhost:3000/tenants/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Invalid credentials");

    return res.json();
  },

  async register(data: { name: string, email: string, password: string }): Promise<LoginResponseBody> {
    const res = await fetch("http://localhost:3000/tenants/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Something went wrong.");
    
    return res.json();
  },

  async me(tenantToken: string): Promise<MeResponseBody> {
    const res = await fetch("http://localhost:3000/tenants/me", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tenantToken}`
      }
    });

    if (!res.ok) throw new Error("Invalid token");

    return res.json();
  }
};

export default TenantAuthService;