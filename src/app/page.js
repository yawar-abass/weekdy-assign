"use client";
import Filters from "@/components/Filters/Filters";
import JobPosts from "@/components/JobPosts";
import {
  useCompanyFilters,
  useFilteredJobPosts,
} from "@/hooks/useFilteredJobPosts";

export default function Home() {
  const { filteredPosts, loading, selectedFilters, handleFiltersChange } =
    useFilteredJobPosts();
  const companies = useCompanyFilters();

  return (
    <main className="container mx-auto p-4 max-w-screen-xl">
      <Filters
        onFiltersChange={handleFiltersChange}
        selectedFilters={selectedFilters}
        companies={companies}
      />
      <JobPosts jobPostsData={filteredPosts} loading={loading} />
    </main>
  );
}
