import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        filter,
        setFilter,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
