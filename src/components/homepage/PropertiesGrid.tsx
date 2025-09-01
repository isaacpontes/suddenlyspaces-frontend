import { Property } from "@/services/tenants/property"
import { FetchPropertiesFilters } from "@/services/tenants/property";
import Button from "../common/Button"
import Link from "next/link";

interface PropertiesGridProps {
  properties: Property[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  },
  currentFilters: FetchPropertiesFilters
}

export default function PropertiesGrid({ properties, pagination, currentFilters }: PropertiesGridProps) {
  const { page, totalPages } = pagination;

  const buildUrl = (newPage: number) => {
    const params = new URLSearchParams({
      ...currentFilters,
      page: String(newPage),
    });

    return `/?${params.toString()}`;
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div
              key={property._id}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm transition hover:shadow-md"
            >
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  {property.title}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  📍 {property.location}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  💰 ${property.rentAmount.toLocaleString()} /{" "}
                  {property.leaseType}
                </p>
                <Button className="w-full">View Details</Button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No properties found.
          </p>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-600">
          Showing {properties.length} of {pagination.total}
        </p>
        <div className="flex gap-2">
          <Link href={buildUrl(page - 1)} aria-disabled={page <= 1}>
            <Button variant="secondary" disabled={page <= 1}>
              Previous
            </Button>
          </Link>
          <Link href={buildUrl(page + 1)} aria-disabled={page >= totalPages}>
            <Button variant="secondary" disabled={page >= totalPages}>
              Next
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}