import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

type errorContext = {[key: string]: string}

const Context = createContext<[errorContext, Dispatch<SetStateAction<errorContext>>]>([{}, ()=>{}]);

export const ErrorProvider = ({ children }: {children: JSX.Element}) => {
    const [error, setError] = useState<errorContext>({})

    return (
        <Context.Provider value={[error, setError]}>{children}</Context.Provider>
    )
}

export const useErrorContext = () => {
    return useContext(Context);
}