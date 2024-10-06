import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser } from "../lib/appwrite";


type UserType = {
    accountId: string;
    username: string;
};

type GlobalContextType = {
    isLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    isLoading: boolean;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};

const GlobalProvider = ({ children }: { children: ReactNode; }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setLoggedIn(true);
                    setUser({
                        accountId: res.accountId,
                        username: res.username
                    });
                } else {
                    setLoggedIn(false);
                    setUser(null)
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setLoggedIn,
                user,
                setUser,
                isLoading,
            }}
        >

            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;