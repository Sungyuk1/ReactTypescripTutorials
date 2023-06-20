import { useEffect, useState } from "react"
//T is the generic type
//initialValue is a generic or a function that returns a generic
export function useLocalStorage<T>(key: string, initialValue: T |(()=>T)){
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)

        if (typeof initialValue === "function"){
            //Telling typescript that initial value is a type of ()=>T
            return (initialValue as ()=> T)()
        }else{
            return initialValue
        }

    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    //the as is telling typescript that the first and second values wills always have these specific types
    return [value, setValue] as [typeof value, typeof setValue]


}