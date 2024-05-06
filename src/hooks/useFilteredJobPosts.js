import { useState, useEffect } from "react";
import {
  applyFilters,
  getCompanies,
  getJobsPosts,
  getLocations,
} from "@/utils/utils";
import { useJobPosts } from "@/hooks/useJobPosts";

export function useFilteredJobPosts() {
  const { jobPostsData, loading } = useJobPosts();
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    minExperience: {},
    remote: "",
    salary: {},
    location: "",
    companies: "",
  });
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(loading);

  const isFelterSelected =
    selectedFilters.roles.length > 0 ||
    selectedFilters.minExperience?.value ||
    selectedFilters.remote !== "" ||
    selectedFilters.salary?.value ||
    selectedFilters.companies !== "" ||
    selectedFilters.location !== "";

  useEffect(() => {
    if (jobPostsData && jobPostsData.length > 0) {
      const filteredData = applyFilters(jobPostsData, selectedFilters);
      setFilteredPosts(filteredData);
    }
  }, [jobPostsData, selectedFilters]);

  useEffect(() => {
    let temp = false;
    if (!filteredPosts.length && !loading && isFelterSelected) {
      if (temp) return;
      (async () => {
        setIsLoading(true);
        const { jdList } = await getJobsPosts(700);
        const filteredData = applyFilters(jdList, selectedFilters);
        setFilteredPosts(filteredData);
        setIsLoading(false);
      })();
    }
    return () => (temp = true);
  }, [filteredPosts.length, loading, selectedFilters, isFelterSelected]);

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
    let temp = false;
    (async () => {
      if (temp) return;
      const companies = await getCompanies();
      setCompanies(companies);
    })();
    return () => (temp = true);
  }, []);

  return companies;
}
