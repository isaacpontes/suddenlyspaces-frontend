export type LeaseType = "coworking" | "residential" | "short-term";

export interface Property {
  _id: string;
  title: string;
  location: string;
  rentAmount: number;
  leaseType: LeaseType;
}

export interface FetchPropertiesFilters {
  title?: string;
  location?: string;
  leaseType?: LeaseType;
  priceMin?: string;
  priceMax?: string;
  page?: string;
  limit?: string;
}

interface GetPropertiesResponseBody {
  properties: Property[],
  pagination: {
    limit: number,
    page: number,
    total: number,
    totalPages: number
  }
}

const API_BASE = "http://localhost:3000/tenants/properties";

const TenantPropertyService = {
  async fetchProperties(filters: FetchPropertiesFilters = {}): Promise<GetPropertiesResponseBody> {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value);
      }
    });

    const res = await fetch(`${API_BASE}?${params.toString()}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch properties");

    return res.json();
  },
};

export default TenantPropertyService;
