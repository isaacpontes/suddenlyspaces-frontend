"use client";

import { FormEvent, useState } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import Select from "@/components/common/Select";
import z from "zod";
import { usePropertiesManager } from "@/contexts/PropertiesManagerContext";

interface CreatePropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePropertyModal({ isOpen, onClose }: CreatePropertyModalProps) {
  const { createProperty } = usePropertiesManager();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const location = formData.get("location");
    const rentAmount = formData.get("rentAmount");
    const leaseType = formData.get("leaseType");

    const createPropertySchema = z.object({
      title: z.string().min(1, "Title is required"),
      location: z.string().min(1, "Location is required"),
      rentAmount: z.number().min(1, "Rent must be greater than 0"),
      leaseType: z.enum(["coworking", "residential", "short-term"]),
    });

    try {
      setLoading(true);
      setError("");

      const result = createPropertySchema.parse({
        title,
        location,
        rentAmount: Number(rentAmount),
        leaseType,
      });

      await createProperty(result);
      onClose(); // close after success
    } catch (err: any) {
      setError(err.message || "Failed to create property");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Add New Property</h2>
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
            <Input id="title" name="title" placeholder="e.g. Spacious Loft" required />
          </div>

          <div>
            <Label text="Location" htmlFor="location" />
            <Input id="location" name="location" placeholder="e.g. Midtown" required />
          </div>

          <div>
            <Label text="Rent Amount ($)" htmlFor="rentAmount" />
            <Input id="rentAmount" name="rentAmount" type="number" placeholder="e.g. 1200" required />
          </div>

          <div>
            <Label text="Lease Type" htmlFor="leaseType" />
            <Select id="leaseType" name="leaseType">
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
              {loading ? "Creating..." : "Create Property"}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
