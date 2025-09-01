"use client"

import Input from "../common/Input";
import Label from "../common/Label";
import Select from "../common/Select";
import Button from "../common/Button";
import { FetchPropertiesFilters } from "@/services/tenants/property";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  currentFilters: FetchPropertiesFilters
}

export default function Sidebar({ currentFilters }: SidebarProps) {
  const router = useRouter();

  const [filters, setFilters] = useState(currentFilters);

  const updateFilters = (key: string, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const filter = () => {
    const params = new URLSearchParams({ ...currentFilters, ...filters });
    router.replace(`/?${params.toString()}`);
  }

  return (
    <aside className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit sticky top-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>

      <div className="mb-4">
        <Label text="Title" />
        <Input
          name="title"
          placeholder="Search for a title"
          value={filters.title}
          onChange={(ev) => updateFilters("title", ev.target.value)}
        />
      </div>

      <div className="mb-4">
        <Label text="Location" />
        <Input
          name="location"
          placeholder="Search for a location"
          value={filters.location}
          onChange={(ev) => updateFilters("location", ev.target.value)}
        />
      </div>

      <div className="mb-4">
        <Label text="Price Range" />
        <div className="flex gap-2">
          <Input
            name="priceMin"
            placeholder="Min."
            value={filters.priceMin}
            onChange={(ev) => updateFilters("priceMin", ev.target.value)}
          />
          <Input
            name="priceMax"
            placeholder="Max."
            value={filters.priceMax}
            onChange={(ev) => updateFilters("priceMax", ev.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <Label text="Lease Type" />
        <Select name="leaseType" value={filters.leaseType} onChange={(ev) => updateFilters("leaseType", ev.target.value)}>
          <option value="all">All</option>
          <option value="coworking">Coworking</option>
          <option value="residential">Residential</option>
          <option value="short-term">Short-term</option>
        </Select>
      </div>

      <div className="mb-4">
        <Button className="w-full" onClick={filter}>Filter Properties</Button>
      </div>
    </aside>
  )
}