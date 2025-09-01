"use client";

import { createContext, useContext, useState, useEffect, useCallback, Dispatch, SetStateAction } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LandlordPropertyService, { LeaseType, Property } from "@/services/landlords/property";

type PropertiesManagerContextValue = {
  properties: Property[];
  total: number;
  error: string;
  loading: boolean;

  // filters
  search: string;
  updateSearch: (val: string) => void;
  filterLease: "all" | LeaseType;
  updateFilterLease: (val: "all" | LeaseType) => void;

  // pagination
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  totalPages: number;

  // actions
  createProperty: (input: Omit<Property, "_id">) => Promise<void>;
  updateProperty: (id: string, input: Omit<Property, "_id">) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
};

const PropertiesManagerContext = createContext<PropertiesManagerContextValue | undefined>(undefined);

export function PropertiesManagerProvider({ children }: { children: React.ReactNode }) {
  const { token, user } = useAuth();

  const [properties, setProperties] = useState<Property[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  // filters & pagination
  const [search, setSearch] = useState("");
  const [filterLease, setFilterLease] = useState<"all" | LeaseType>("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  // Error and Loading states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      if (user && token) {
        const filters: any = {
          title: search || undefined,
          leaseType: filterLease === "all" ? undefined : filterLease,
          page,
          limit,
        };

        const data = await LandlordPropertyService.fetchProperties(token, filters);
        setProperties(data.properties);
        setTotalPages(data.pagination.totalPages ?? 1);
        setTotal(data.pagination.total ?? 0);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  }, [user, token, search, filterLease, page, limit]);

  // fetch whenever filters change
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  /**
   * Creates a new property on the backend and inserts into state
   */
  const createProperty = async (input: Omit<Property, "_id">) => {
    if (!token) return;
    const response = await LandlordPropertyService.createProperty(token, input);
    setProperties((current) => [...current, response.property])
  };

  /**
   * Updates a property on the backend and in the state
   */
  const updateProperty = async (id: string, input: Omit<Property, "_id">) => {
    if (!token) return;
    await LandlordPropertyService.updateProperty(token, id, input);
    setProperties((current) => current.map((p) => (p._id === id ? { ...p, ...input } : p)));
  };

  /**
   * Deletes a property on the backend and remove from state
   */
  const deleteProperty = async (id: string) => {
    if (!token) return;
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        await LandlordPropertyService.removeProperty(token, id);
        setProperties((current) => current.filter(p => p._id !== id));
      } catch (error) {
        alert("ERROR! Property was not deleted.\n");
      }
    }
  };

  return (
    <PropertiesManagerContext.Provider
      value={{
        properties,
        total,
        error,
        loading,

        // filters
        search,
        updateSearch: setSearch,
        filterLease,
        updateFilterLease: setFilterLease,

        // pagination
        page,
        setPage,
        limit,
        setLimit,
        totalPages,

        // actions
        createProperty,
        updateProperty,
        deleteProperty,
        refetch: fetchProperties,
      }}
    >
      {children}
    </PropertiesManagerContext.Provider>
  );
}

export function usePropertiesManager() {
  const ctx = useContext(PropertiesManagerContext);
  if (!ctx) throw new Error("usePropertiesManager must be used inside a PropertiesManagerProvider");
  return ctx;
}
