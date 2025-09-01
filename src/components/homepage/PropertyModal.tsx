"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/common/Button";
import { Property } from "@/services/tenants/property";
import TenantInterestsService from "@/services/tenants/interests";
import { useAuth } from "@/contexts/AuthContext";

interface PropertyLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

export default function PropertyModal({ isOpen, onClose, property, }: PropertyLocationModalProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuth();

  if (!isOpen) return null;

  const handleInterest = async () => {
    if (!property) return;
    if (!token || !user) return alert("You must be logged in to save your interests.");
    if (user.role !== "tenant") return alert("You must be logged in as tenant to save your interests.");
    try {
      setLoading(true);
      await TenantInterestsService.markInterest(property._id, token);
      onClose();
    } catch (err) {
      console.error("Failed to mark interest", err);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="w-full max-w-3xl rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{property?.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-lg"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Map placeholder */}
        <div className="w-full h-[400px] bg-stone-200 text-stone-400 grid place-content-center" ref={mapRef}>Map placeholder</div>

        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="button" onClick={handleInterest} disabled={loading}>
            {loading ? "Submitting..." : "I'm Interested"}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
