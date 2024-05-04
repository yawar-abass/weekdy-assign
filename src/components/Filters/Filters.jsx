import React from "react";
import Filter from "./Filter";
import Search from "./Search";

const Filters = async () => {
  return (
    <div className="flex flex-wrap gap-3 justify-center space-x-4">
      <Filter />
      <Filter />
      <Filter />
      <Filter />
      <Search />
    </div>
  );
};

export default Filters;
