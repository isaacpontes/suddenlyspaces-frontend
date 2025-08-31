import { Dispatch, SetStateAction } from "react";
import Input from "../common/Input";
import Label from "../common/Label";
import Select from "../common/Select";

interface SidebarProps {
  filterLease: "all" | "coworking" | "residential" | "short-term"
  setFilterLease: Dispatch<SetStateAction<"all" | "coworking" | "residential" | "short-term">>
}

export default function Sidebar({ filterLease, setFilterLease }: SidebarProps) {
  return (
    <aside className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit sticky top-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>

      <div className="mb-4">
        <Label text="Location" />
        <Input
          placeholder="Search for a location"
        />
      </div>

      <div className="mb-4">
        <Label text="Price Range" />
        <div className="flex gap-2">
          <Input
            placeholder="Min."
          />
          <Input
            placeholder="Max."
          />
        </div>
      </div>

      <div className="mb-4">
        <Label text="Lease Type" />
        <Select
          value={filterLease}
          onChange={(e) =>
            setFilterLease(
              e.target.value as "all" | "coworking" | "residential" | "short-term"
            )
          }
        >
          <option value="all">All</option>
          <option value="coworking">Coworking</option>
          <option value="residential">Residential</option>
          <option value="short-term">Short-term</option>
        </Select>
      </div>
    </aside>
  )
}