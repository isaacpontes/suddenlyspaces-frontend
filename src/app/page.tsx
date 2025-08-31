"use client";

import { useState } from "react";
import PageContainer from "@/components/PageContainer";
import Sidebar from "@/components/homepage/Sidebar";
import PropertiesGrid from "@/components/homepage/PropertiesGrid";
import { Property } from "@/services/landlords/property";

const mockProperties: Property[] = [
  {
    _id: "1",
    title: "Modern Apartment",
    location: "Downtown",
    rentAmount: 1200,
    leaseType: "residential",
  },
  {
    _id: "2",
    title: "Cozy Studio",
    location: "Midtown",
    rentAmount: 800,
    leaseType: "short-term",
  },
  {
    _id: "3",
    title: "Spacious Loft",
    location: "Uptown",
    rentAmount: 2000,
    leaseType: "coworking",
  },
  {
    _id: "4",
    title: "Luxury Condo",
    location: "Riverside",
    rentAmount: 3500,
    leaseType: "residential",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [filterLease, setFilterLease] = useState<
    "all" | "coworking" | "residential" | "short-term"
  >("all");

  const filtered = mockProperties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterLease === "all" ? true : p.leaseType === filterLease;
    return matchesSearch && matchesFilter;
  });

  return (
    <PageContainer>
      <div className="mx-auto py-12">
        {/* Hero */}
        <div className="mb-16 py-16 bg-blue-400 text-center">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-semibold text-gray-900 mb-6">
            Welcome to SuddenlySpaces
          </h1>
          <form className="flex flex-col md:flex-row gap-4 items-center max-w-2xl mx-auto px-4">
            <input
              className="bg-white lg:text-lg grow w-full p-4 rounded-2xl shadow-lg border border-gray-200 focus:ring-2 focus:ring-gray-800 focus:outline-none"
              type="text"
              name="search"
              placeholder="Search for properties"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white border border-gray-950 hover:bg-gray-900 hover:text-white text-lg px-6 py-4 rounded-2xl shadow-lg transition cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-4 md:px-0">
          <Sidebar
            filterLease={filterLease}
            setFilterLease={setFilterLease}
          />

          <main className="lg:col-span-3">
            <PropertiesGrid properties={filtered} />
          </main>
        </div>
      </div>
    </PageContainer>
  );
}
