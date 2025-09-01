const API_BASE = "http://localhost:3000/tenants/interests";

const TenantInterestsService = {
  async markInterest(propertyId: string, tenantToken: string) {
    const res = await fetch(`${API_BASE}/${propertyId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tenantToken}`
      },
    });

    const data = await res.json();
    if (data?.error) alert(data.error);
  },
};

export default TenantInterestsService;