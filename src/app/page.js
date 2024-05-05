"use client";
import Filters from "@/components/Filters/Filters";
import JobPosts from "@/components/JobPosts";
import { useJobPosts } from "@/hooks/useJobPosts";
import {
  filterByLocation,
  filterByMinExperience,
  filterByRoles,
  filterBySalary,
} from "@/utils/utils";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    minExperience: {},
    location: "",
    salary: {},
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

      // Filter by Location
      if (
        selectedFilters.location &&
        typeof selectedFilters.location === "object" &&
        Object.keys(selectedFilters.location).length !== 0
      ) {
        filteredData = filterByLocation(filteredData, selectedFilters.location);
      }

      // Filter by Salary
      if (
        selectedFilters.salary &&
        typeof selectedFilters.salary === "object" &&
        Object.keys(selectedFilters.salary).length !== 0
      ) {
        filteredData = filterBySalary(filteredData, selectedFilters.salary);
      }

      setFilteredPosts(filteredData);
      console.log("test" + jobPostsData);
    }
  }, [jobPostsData, selectedFilters]);

  const handleFiltersChange = (filters) => {
    setSelectedFilters(filters);
  };
  // console.log("test" + selectedFilters);

  return (
    <main className="container mx-auto p-4 max-w-screen-xl">
      <Filters onFiltersChange={handleFiltersChange} />
      <JobPosts jobPostsData={filteredPosts} loading={loading} />
    </main>
  );
}
