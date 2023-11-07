import { Children, createContext, useState } from "react";

export const FilterContext = createContext()

export function RecipeProvider({children}) {
    const [filter, setFilter] = useState({
        categories: '', 
        numberOfSteps: '', 
    });

    const valueObject = { filter , setFilter }

    return (
        <FilterContext.Provider value={valueObject}>
            {children}
        </FilterContext.Provider>
    )
}