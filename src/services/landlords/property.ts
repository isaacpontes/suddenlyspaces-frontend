import { useAuth } from "@/contexts/AuthContext";

export type LeaseType = "coworking" | "residential" | "short-term";

export interface Property {
  _id: string;
  title: string;
  location: string;
  rentAmount: number;
  leaseType: LeaseType;
}

interface ListFilters {
  title?: string;
  location?: string;
  leaseType?: LeaseType;
  priceMin?: number;
  priceMax?: number;
  page?: number;
  limit?: number;
}

interface CreatePropertyInput {
  title: string;
  location: string;
  rentAmount: number;
  leaseType: LeaseType;
}

const API_BASE = "http://localhost:3000/landlords/properties";

const LandlordPropertyService = {
  async fetchProperties(landlordToken: string, filters: ListFilters = {}): Promise<{ properties: Property[]; total?: number }> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });

    const res = await fetch(`${API_BASE}?${params.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${landlordToken}`
      },
    });

    if (!res.ok) throw new Error("Failed to fetch properties");
    return res.json();
  },

  async getPropertyById(id: string): Promise<{ property: Property }> {
    const res = await fetch(`${API_BASE}/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Property not found");
    return res.json();
  },

  async createProperty(landlordToken: string, input: CreatePropertyInput): Promise<{ property: Property }> {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${landlordToken}`
      },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.message || "Failed to create property");
    }

    return res.json();
  },

  async updateProperty(id: string, data: Partial<{
    title: string;
    location: string;
    rentAmount: number;
    leaseType: LeaseType;
  }>): Promise<{ property: Property }> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.message || "Failed to update property");
    }

    return res.json();
  },

  async removeProperty(id: string): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.message || "Failed to delete property");
    }

    return res.json();
  },
};

export default LandlordPropertyService;
