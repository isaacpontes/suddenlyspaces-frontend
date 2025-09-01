"use client";

import { FormEvent, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import Select from "@/components/common/Select";
import z from "zod";
import { usePropertiesManager } from "@/contexts/PropertiesManagerContext";
import { Property } from "@/services/landlords/property";

interface EditPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

export default function EditPropertyModal({ isOpen, onClose, property }: EditPropertyModalProps) {
  const { updateProperty } = usePropertiesManager();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [rentAmount, setRentAmount] = useState<number>(0);
  const [leaseType, setLeaseType] = useState<"coworking" | "residential" | "short-term">("residential");

  useEffect(() => {
    if (property) {
      setTitle(property.title);
      setLocation(property.location);
      setRentAmount(property.rentAmount);
      setLeaseType(property.leaseType);
    }
  }, [property]);

  if (!isOpen || !property) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editPropertySchema = z.object({
      title: z.string().min(1, "Title is required"),
      location: z.string().min(1, "Location is required"),
      rentAmount: z.number().min(1, "Rent must be greater than 0"),
      leaseType: z.enum(["coworking", "residential", "short-term"]),
    });

    try {
      setLoading(true);
      setError("");

      const result = editPropertySchema.parse({
        title,
        location,
        rentAmount: Number(rentAmount),
        leaseType,
      });

      await updateProperty(property._id, result);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update property");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Edit Property</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-lg"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div>
            <Label text="Property Title" htmlFor="title" />
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label text="Location" htmlFor="location" />
            <Input
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <Label text="Rent Amount ($)" htmlFor="rentAmount" />
            <Input
              id="rentAmount"
              name="rentAmount"
              type="number"
              value={rentAmount}
              onChange={(e) => setRentAmount(Number(e.target.value))}
              required
            />
          </div>

          <div>
            <Label text="Lease Type" htmlFor="leaseType" />
            <Select
              id="leaseType"
              name="leaseType"
              value={leaseType}
              onChange={(e) =>
                setLeaseType(e.target.value as "coworking" | "residential" | "short-term")
              }
            >
              <option value="coworking">coworking</option>
              <option value="residential">residential</option>
              <option value="short-term">short-term</option>
            </Select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
