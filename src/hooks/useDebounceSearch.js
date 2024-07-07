import { useEffect, useState } from "react"


const useDebounceSearch = (value) => {
    const [debounceValue, setDebounceValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, 300); 

        return () => {
            clearTimeout(handler); 
        }
    }, [value]); 

    return debounceValue
}

export default useDebounceSearch;