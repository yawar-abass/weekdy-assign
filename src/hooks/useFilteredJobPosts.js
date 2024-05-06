import { useState, useEffect } from "react";
import { applyFilters, getCompanies, getJobsPosts } from "@/utils/utils";
import { useJobPosts } from "@/hooks/useJobPosts";

export function useFilteredJobPosts() {
  const { jobPostsData, loading } = useJobPosts();
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    minExperience: {},
    location: "",
    salary: {},
    companies: "",
  });
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    if (jobPostsData && jobPostsData.length > 0) {
      const filteredData = applyFilters(jobPostsData, selectedFilters);
      setFilteredPosts(filteredData);
    }
  }, [jobPostsData, selectedFilters]);

  useEffect(() => {
    if (
      filteredPosts.length === 0 &&
      !loading &&
      (selectedFilters.roles.length > 0 ||
        selectedFilters.minExperience?.value ||
        selectedFilters.location !== "" ||
        selectedFilters.salary?.value ||
        selectedFilters.companies !== "")
    ) {
      (async () => {
        console.log("fetching data");
        setIsLoading(true);
        const { jdList } = await getJobsPosts(600);
        const filteredData = applyFilters(jdList, selectedFilters);
        setFilteredPosts(filteredData);
        setIsLoading(false);
      })();
    }
  }, [filteredPosts.length, loading, selectedFilters]);

  const handleFiltersChange = (filters) => {
    setSelectedFilters(filters);
  };

  return {
    filteredPosts,
    loading: isLoading,
    selectedFilters,
    handleFiltersChange,
  };
}

export function useCompanyFilters() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    (async () => {
      const companies = await getCompanies();
      setCompanies(companies);
    })();
  }, []);

  return companies;
}
