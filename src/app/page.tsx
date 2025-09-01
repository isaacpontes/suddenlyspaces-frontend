import PageContainer from "@/components/PageContainer";
import Sidebar from "@/components/homepage/Sidebar";
import PropertiesGrid from "@/components/homepage/PropertiesGrid";
import TenantPropertyService, { FetchPropertiesFilters, LeaseType, Property } from "@/services/tenants/property";
import HeroBanner from "@/components/homepage/HeroBanner";

type HomePageProps = {
  searchParams: Promise<FetchPropertiesFilters>
}

export default async function Home({ searchParams }: HomePageProps) {
  const filters = await searchParams

  let properties: Property[] = []
  let pagination = { page: 1, limit: 9, total: 0, totalPages: 1 }
  let error = ''

  try {
    const response = await TenantPropertyService.fetchProperties({
      title: filters.title,
      location: filters.location,
      priceMin: filters.priceMin ?? undefined,
      priceMax: filters.priceMax ?? undefined,
      leaseType: filters.leaseType,
      page: filters.page ?? "1",
      limit: filters.limit ?? "9"
    });
    properties = response.properties;
    pagination = response.pagination
  } catch (err) {
    console.error(err);
    error = err instanceof Error ? err.message : 'An error ocurred';
  }

  return (
    <PageContainer>
      <div className="mx-auto py-12">
        <HeroBanner currentFilters={filters} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-4 md:px-0">
          <Sidebar currentFilters={filters}/>

          <main className="lg:col-span-3">
            {error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <PropertiesGrid
                properties={properties}
                pagination={pagination}
                currentFilters={filters}
              />
            )}
          </main>
        </div>
      </div>
    </PageContainer>
  );
}
