import { createContext, useEffect, useState } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase-collections.utils.js";


export const CategoriesContext = createContext({
    categoriesMap: [],
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState([]);
    const value = {categoriesMap, setCategoriesMap}
    useEffect(()=>{
        console.log("Loading Categories");
        const getCategoryMap = async () => {
            const categories = await getCategoriesAndDocuments();
            console.log(categories);
            setCategoriesMap(categories);
        }

        getCategoryMap();

        
    }, []);

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}