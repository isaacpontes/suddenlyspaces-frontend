import { Property } from "@/services/landlords/property"
import Button from "../common/Button"

interface DashboardPropertiesGridProps {
  properties: Property[]
  onEdit: (property: Property) => void,
  onDelete: (property: Property) => void
}

export default function DashboardPropertiesGrid({ properties, onEdit, onDelete }: DashboardPropertiesGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.length > 0 ? (
        properties.map((property) => (
          <div
            key={property._id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="mb-2 text-lg font-medium text-gray-900">{property.title}</h2>
            <p className="mb-1 text-sm text-gray-600">📍 {property.location}</p>
            <p className="mb-2 text-sm text-gray-600">
              💰 ${property.rentAmount.toLocaleString()} / {property.leaseType}
            </p>
            <div className="flex gap-4 mt-4">
              <Button
                className="grow"
                variant="secondary"
                onClick={() => onEdit(property)}
              >
                Edit Property
              </Button>
              <Button
                className="grow"
                variant="danger"
                onClick={() => onDelete(property)}
              >
                Delete Property
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No properties found.</p>
      )}
    </div>
  )
}