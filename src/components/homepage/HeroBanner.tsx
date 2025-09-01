import { FetchPropertiesFilters } from "@/services/tenants/property"
import Form from "next/form"

type HeroBannerProps = {
  currentFilters: FetchPropertiesFilters
}

export default function HeroBanner({ currentFilters }: HeroBannerProps) {
  return (
    <div className="mb-16 py-16 bg-gradient-to-br from-sky-400 to-indigo-500 text-center">
      <h1 className="text-4xl md:text-5xl xl:text-6xl font-semibold text-gray-900 mb-8">
        Welcome to SuddenlySpaces
      </h1>
      <Form
        action={""}
        className="flex flex-col md:flex-row gap-4 items-center max-w-2xl mx-auto px-4"
      >
        <input
          className="bg-white lg:text-lg grow w-full p-4 rounded-2xl shadow-lg border border-gray-200 focus:ring-2 focus:ring-gray-800 focus:outline-none"
          type="text"
          name="title"
          placeholder="Search for properties"
        />
        <button
          type="submit"
          className="bg-white border border-gray-950 hover:bg-gray-900 hover:text-white text-lg px-6 py-4 rounded-2xl shadow-lg transition cursor-pointer"
        >
          Search
        </button>
      </Form>
    </div>
  )
}