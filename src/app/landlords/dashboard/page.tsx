"use client";

import PageContainer from "@/components/PageContainer";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import CreatePropertyModal from "@/components/landlords/CreatePropertyModal";
import DashboardPropertiesGrid from "@/components/landlords/DashboardPropertiesGrid";
import EditPropertyModal from "@/components/landlords/EditPropertyModal";
import ShowPropertyModal from "@/components/landlords/ShowPropertyModal";
import { usePropertiesManager } from "@/contexts/PropertiesManagerContext";
import { Property } from "@/services/landlords/property";
import { useState } from "react";

export default function DashboardPage() {
  const {
    properties,
    loading,
    error,
    search,
    filterLease,
    updateSearch,
    updateFilterLease,
    page,
    setPage,
    totalPages,
    total,
    deleteProperty,
  } = usePropertiesManager();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null);

  const openShowModal = (property: Property) => {
    setCurrentProperty(property);
    setIsShowModalOpen(true);
  };

  const openEditModal = (property: Property) => {
    setCurrentProperty(property);
    setIsEditModalOpen(true);
  };

  const finishEditing = () => {
    setCurrentProperty(null);
    setIsEditModalOpen(false);
  };

  const goNextPage = () => {
    if (page + 1 <= totalPages) {
      setPage(p => p + 1);
    }
  };

  const goPreviousPage = () => {
    if (page - 1 >= 1) {
      setPage(p => p - 1);
    }
  }

  return (
    <PageContainer>
      <CreatePropertyModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <ShowPropertyModal property={currentProperty} isOpen={isShowModalOpen} onClose={() => setIsShowModalOpen(false)} />
      <EditPropertyModal property={currentProperty} isOpen={isEditModalOpen} onClose={finishEditing} />

      <div className="mx-auto my-8">
        <header className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Your Properties</h1>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row items-start sm:items-center">
            <Button
              className="min-w-fit"
              onClick={() => setIsCreateModalOpen(true)}
            >
              + Add Property
            </Button>

            <Input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => updateSearch(e.target.value)}
              className="sm:w-64"
            />

            <Select
              value={filterLease}
              onChange={(e) => updateFilterLease(e.target.value as "all" | "coworking" | "residential" | "short-term")}
            >
              <option value="all">All Lease Types</option>
              <option value="coworking">coworking</option>
              <option value="residential">residential</option>
              <option value="short-term">short term</option>
            </Select>
          </div>
        </header>

        {loading ? (
          <p className="text-center text-gray-500">Loading properties...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
            <DashboardPropertiesGrid
              properties={properties}
              onShow={openShowModal}
              onEdit={openEditModal}
              onDelete={(property) => deleteProperty(property._id)}
            />

            <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600">
                Showing {properties.length} of {total}
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={goPreviousPage}>Previous</Button>
                <Button variant="secondary" onClick={goNextPage}>Next</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
}
