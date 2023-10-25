import { createContext, useContext, useState } from "react";

interface Courses {
    title: string;
    author: string;
    date: string;
}

interface FormData {
    name: string;
    surname: string;
    email: string;
    education: string,
    anotherEducation: string,
    refreshCourses: Courses[];
    skills: string[];
}

const FormContext = createContext({})

export const FormProvider = ({ children }: any) => {
    const [data, setData] = useState<FormData>({
        name: '',
        surname: '',
        email: '',
        education: '',
        anotherEducation: '',
        refreshCourses: [],
        skills: [],
    })

    const setValues = (values: any) => {
        setData(prevData => ({
            ...prevData,
            ...values
        }))
    }

    return <FormContext.Provider value={{ data, setValues }}>
        {children}
    </FormContext.Provider>
}

export const useData = () => useContext(FormContext)
