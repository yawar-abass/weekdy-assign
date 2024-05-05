"use client";
import Filters from "@/components/Filters/Filters";
import JobPosts from "@/components/JobPosts";
import { useJobPosts } from "@/hooks/useJobPosts";
import { filterByMinExperience, filterByRoles } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    minExperience: {},
  });
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { jobPostsData, loading } = useJobPosts();

  useEffect(() => {
    if (jobPostsData && jobPostsData.length > 0) {
      let filteredData = [...jobPostsData];

      //Filter by Roles
      if (selectedFilters.roles.length > 0) {
        filteredData = filterByRoles(filteredData, selectedFilters.roles);
      }

      // Filter by minExperience
      if (
        selectedFilters.minExperience &&
        typeof selectedFilters.minExperience === "object" &&
        Object.keys(selectedFilters.minExperience).length !== 0
      ) {
        filteredData = filterByMinExperience(
          filteredData,
          selectedFilters.minExperience?.value
        );
      }
      setFilteredPosts(filteredData);
    }
  }, [jobPostsData, selectedFilters]);

  const handleFiltersChange = (filters) => {
    setSelectedFilters(filters);
  };
  console.log("test" + filteredPosts);

  return (
    <main className="container mx-auto p-4 max-w-screen-xl">
      <Filters onFiltersChange={handleFiltersChange} />
      <JobPosts jobPostsData={filteredPosts} loading={loading} />
    </main>
  );
}
