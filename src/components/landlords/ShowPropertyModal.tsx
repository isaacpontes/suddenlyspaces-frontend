"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/common/Button";
import { Property } from "@/services/tenants/property";
import { useAuth } from "@/contexts/AuthContext";
import LandlordPropertyService, { PropertyDetails } from "@/services/landlords/property";

interface ShowPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

export default function ShowPropertyModal({
  isOpen,
  onClose,
  property,
}: ShowPropertyModalProps) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<PropertyDetails | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!isOpen || !property?._id || !token) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const result = await LandlordPropertyService.getPropertyDetails(token, property._id);
        setDetails(result);
      } catch (err) {
        console.error("Failed to fetch property details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [isOpen, property, token]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {details?.title || property?.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading details...</p>
          ) : (
            details && (
              <>
                {/* Property Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-600">Location</h3>
                    <p className="text-gray-800">{details.location}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-600">Rent Amount</h3>
                    <p className="text-gray-800">${details.rentAmount}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-600">Lease Type</h3>
                    <p className="capitalize text-gray-800">{details.leaseType}</p>
                  </div>
                </div>

                {/* Interested Tenants */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Interested Tenants
                  </h3>
                  {details.interestedTenants.length === 0 ? (
                    <p className="text-gray-500">No tenants have shown interest yet.</p>
                  ) : (
                    <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
                      {details.interestedTenants.map((tenant) => (
                        <li
                          key={tenant._id}
                          className="flex justify-between items-center p-4 hover:bg-gray-50"
                        >
                          <div>
                            <p className="font-medium text-gray-800">{tenant.name}</p>
                            <p className="text-sm text-gray-500">ID: {tenant._id}</p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${tenant.riskScore < 40
                              ? "bg-green-100 text-green-700"
                              : tenant.riskScore < 70
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                              }`}
                          >
                            Risk Score: {tenant.riskScore}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50">
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
