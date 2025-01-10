import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser, getWorkSchedule } from "../lib/appwrite";


type UserType = {
    accountId: string;
    username: string;
};

type Schedule = {
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
};

type GlobalContextType = {
    isLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    isLoading: boolean;
    schedule: Schedule;
    setSchedule: React.Dispatch<React.SetStateAction<Schedule>>
};


const initialSchedule: Schedule = {
    sunday: '',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
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
    const [schedule, setSchedule] = useState<Schedule>(initialSchedule)

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

    useEffect(() => {
        const fetchUserSchedule = async () => {
            try {
                if (user) {
                    const userSchedule = await getWorkSchedule(user?.username)
                    if (userSchedule) {
                        setSchedule({
                            sunday: userSchedule.sunday,
                            monday: userSchedule.monday,
                            tuesday: userSchedule.tuesday,
                            wednesday: userSchedule.wednesday,
                            thursday: userSchedule.thursday,
                            friday: userSchedule.friday,
                            saturday: userSchedule.saturday
                        });
                    } else {
                        return;
                    }
                }
            } catch (error) {
                console.log(error)
                throw new Error(error as string)
            }
        }
        if (user) {
            fetchUserSchedule()
        }
    }, [user])


    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setLoggedIn,
                user,
                setUser,
                isLoading,
                schedule,
                setSchedule
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;