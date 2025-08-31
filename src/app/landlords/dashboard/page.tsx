"use client";

import PageContainer from "@/components/PageContainer";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LandlordPropertyService, { LeaseType, Property } from "@/services/landlords/property";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const router = useRouter();
  const { token, user } = useAuth();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterLease, setFilterLease] = useState<"all" | LeaseType>("all");

  const fetchProperties = async () => {
    setLoading(true);
    setError("");
    try {
      if (user && token) {
        const data = await LandlordPropertyService.fetchProperties(token);
        setProperties(data.properties);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const filtered = properties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterLease === "all" ? true : p.leaseType === filterLease;
    return matchesSearch && matchesFilter;
  });

  return (
    <PageContainer>
      <div className="mx-auto my-8 max-w-6xl">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Your Properties</h1>

          {/* Actions */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row items-start sm:items-center">
            <Button onClick={() => router.push("/landlords/properties/create")}>
              + Add Property
            </Button>

            <Input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:w-64"
            />

            <select
              value={filterLease}
              onChange={(e) => setFilterLease(e.target.value as "all" | "coworking" | "residential" | "short-term")}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
            >
              <option value="all">All Lease Types</option>
              <option value="coworking">coworking</option>
              <option value="residential">residential</option>
              <option value="short-term">short term</option>
            </select>
          </div>
        </header>

        {loading ? (
          <p className="text-center text-gray-500">Loading properties...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
            {/* Properties Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.length > 0 ? (
                filtered.map((property) => (
                  <div
                    key={property._id}
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <h2 className="mb-2 text-lg font-medium text-gray-900">{property.title}</h2>
                    <p className="mb-1 text-sm text-gray-600">📍 {property.location}</p>
                    <p className="mb-2 text-sm text-gray-600">
                      💰 ${property.rentAmount.toLocaleString()} / {property.leaseType}
                    </p>
                    <Button className="mt-3 w-full">View Details</Button>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">No properties found.</p>
              )}
            </div>

            {/* Pagination (placeholder) */}
            <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600">
                Showing {filtered.length} of {properties.length}
              </p>
              <div className="flex gap-2">
                <Button variant="secondary">Previous</Button>
                <Button variant="secondary">Next</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
}
