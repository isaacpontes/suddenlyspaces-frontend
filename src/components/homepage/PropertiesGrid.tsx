import { Property } from "@/services/landlords/property"
import Button from "../common/Button"

interface PropertiesGridProps {
  properties: Property[]
}

export default function PropertiesGrid({ properties }: PropertiesGridProps) {
  return (
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
  )
}