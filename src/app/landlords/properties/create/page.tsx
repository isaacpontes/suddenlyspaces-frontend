"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/PageContainer";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import LandlordPropertyService, { LeaseType } from "@/services/landlords/property";
import { useAuth } from "@/contexts/AuthContext";

export default function CreatePropertyPage() {
  const router = useRouter();
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [rentAmount, setRentAmount] = useState<number | "">("");
  const [leaseType, setLeaseType] = useState<LeaseType>("coworking");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (token) {
        const propertyData = {
          title,
          location,
          rentAmount: Number(rentAmount),
          leaseType,
        }
        await LandlordPropertyService.createProperty(token, propertyData);
      }
      router.push("/landlords/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to create property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="mx-auto my-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-800">Add New Property</h1>
          <p className="text-gray-600 text-sm">
            Fill in the details below to add a new property to your dashboard.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Title */}
          <div>
            <Label text="Property Title" htmlFor="title" />
            <Input
              id="title"
              placeholder="e.g. Spacious Loft"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Location */}
          <div>
            <Label text="Location" htmlFor="location" />
            <Input
              id="location"
              placeholder="e.g. Midtown"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* Rent Amount */}
          <div>
            <Label text="Monthly Rent ($)" htmlFor="rentAmount" />
            <Input
              id="rentAmount"
              type="number"
              placeholder="e.g. 1200"
              value={rentAmount}
              onChange={(e) =>
                setRentAmount(e.target.value === "" ? "" : Number(e.target.value))
              }
              required
            />
          </div>

          {/* Lease Type */}
          <div>
            <Label text="Lease Type" htmlFor="leaseType" />
            <select
              id="leaseType"
              value={leaseType}
              onChange={(e) =>
                setLeaseType(e.target.value as "coworking" | "residential" | "short-term")
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
            >
              <option value="coworking">coworking</option>
              <option value="residential">residential</option>
              <option value="short-term">short-term</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push("/landlords/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Property"}
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
