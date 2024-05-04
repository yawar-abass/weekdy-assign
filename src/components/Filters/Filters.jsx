import React from "react";
import Filter from "./Filter";

const Filters = async () => {
  return (
    <div className="flex space-x-4">
      <Filter />
      <Filter />
      <Filter />
      <Filter />
    </div>
  );
};

export default Filters;
