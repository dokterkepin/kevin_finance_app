import { View, Text, Alert, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect, } from 'react'
import { updateAttendanceRecord, getAttendanceRecord } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AttendanceRecord = {
    username: string;
    totalHour: number;
    totalIncome: number;
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
}

const intialRecord: AttendanceRecord = {
    username: '',
    totalHour: 0,
    totalIncome: 0,
    sunday: '',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
};


const status = () => {
    const [record, setRecord] = useState<AttendanceRecord>(intialRecord);
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState('')
    const { schedule } = useGlobalContext();
    const { user } = useGlobalContext();
    const [lastUpdated, setLastUpdated] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const getLastUpdateFromStorage = async () => {
        try {
            const storedData = await AsyncStorage.getItem('lastUpdated');
            if (storedData) {
                setLastUpdated(storedData);
            }
        } catch (error) {
            throw new Error(error as string);
        } finally {
            setIsLoading(false)
        }
    }

    const setLastUpdateFromStorage = async (todayDay: string) => {
        try {
            await AsyncStorage.setItem('lastUpdated', todayDay);
        } catch (error) {
            throw new Error(error as string);
        }
    }

    const fetchAttendanceMessages = async () => {
        try {
            if (user) {
                const dataRecorded = await getAttendanceRecord(user.username)
                if (dataRecorded) {
                    setRecord({
                        username: dataRecorded.username,
                        totalHour: dataRecorded.totalHour,
                        totalIncome: dataRecorded.totalIncome,
                        sunday: dataRecorded.sunday,
                        monday: dataRecorded.monday,
                        tuesday: dataRecorded.tuesday,
                        wednesday: dataRecorded.wednesday,
                        thursday: dataRecorded.thursday,
                        friday: dataRecorded.friday,
                        saturday: dataRecorded.saturday,
                    });

                } else {
                    Alert.alert('no attendance Record');
                    return;
                }
            }


        } catch (error) {
            Alert.alert('Error', (error as Error).message);
        }
    }

    useEffect(() => {
        getLastUpdateFromStorage()
        if (!isLoading && lastUpdated !== null) {
            const checkAttendance = async () => {
                fetchAttendanceMessages();
                // Days
                let myDate = new Date();
                const daysName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
                let todayDate = myDate.toLocaleString().split(",")[0];
                let todayDay = daysName[myDate.getDay()];
                // Time
                let rightnowTimeString = myDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })

                if (schedule[todayDay as keyof typeof schedule]) {
                    let [workStartTimeString, workEndTimeString] = schedule[todayDay as keyof typeof schedule].split('-')

                    const convertTimetoMinute = (time: string) => {
                        const [hours, minute] = time.split(':').map(Number);
                        return hours * 60 + minute;
                    }
                    let rightnowTimeInMinutes = convertTimetoMinute(rightnowTimeString);
                    let workStartTimeInMinutes = convertTimetoMinute(workStartTimeString);
                    let workEndTimeInMinutes = convertTimetoMinute(workEndTimeString);

                    if (rightnowTimeInMinutes >= workStartTimeInMinutes && rightnowTimeInMinutes <= workEndTimeInMinutes) {
                        setStatus("Busy");
                        setMessage(`${todayDay}, ${todayDate} - currently still working until ${workEndTimeString}`);

                    } else if (rightnowTimeInMinutes <= workEndTimeInMinutes) {
                        setStatus("Away");
                        setMessage(`${todayDay}, ${todayDate} - today your work will gonna start at ${workStartTimeString}`);
                    } else {
                        setStatus("Available");
                        setMessage(`${todayDay}, ${todayDate} - you have finish your work`);

                        let totalHour = (workEndTimeInMinutes - workStartTimeInMinutes) / 60;
                        let totalIncome = totalHour * 185;

                        if (user && todayDay !== lastUpdated) {
                            updateAttendanceRecord(user.username, totalHour, totalIncome, todayDay,
                                `${todayDay}, ${todayDate} ${workStartTimeString} - ${workEndTimeString} work has finished, total hours: ${totalHour}`);
                            setLastUpdateFromStorage(todayDay)
                        }
                    }
                } else {
                    setMessage('you have not set the schedule yet')
                }
            }
            checkAttendance();
        }

    }, [schedule, isLoading, lastUpdated]);


    return (
        <ScrollView>
            <View>
                <Text className='text-3xl mt-3 mx-3 font-[Helvetica]'>Currently: {<Text className={`text - 3xl font - [Helvetica - Rounded] ${status == "Busy" ? "text-red-500" :
                    status == "Away" ? "text-yellow-500" :
                        "text-green-500"
                    } `}>{status}</Text>}</Text>

                {status == "Busy" && (
                    <Text className='text-xl bg-blue-500 p-3 m-3 text-white rounded-md'>
                        Today {message}
                    </Text>
                )}

                {record.monday && (
                    <Text className='text-xl bg-green-400 p-3 m-3 text-white rounded-md'>
                        {record.monday}
                    </Text>
                )}

                {record.tuesday && (
                    <Text className='text-xl bg-green-400 p-3 m-3 text-white rounded-md'>
                        {record.tuesday}
                    </Text>
                )}

                {record.wednesday && (
                    <Text className='text-xl bg-green-400 p-3 m-3 text-white rounded-md'>
                        {record.wednesday}
                    </Text>
                )}

                {record.thursday && (
                    <Text className='text-xl bg-green-400 p-3 m-3 text-white rounded-md'>
                        {record.thursday}
                    </Text>
                )}
                {record.friday && (
                    <Text className='text-xl bg-green-400 p-3 m-3 text-white rounded-md'>
                        {record.friday}
                    </Text>
                )}
                {record.saturday && (
                    <Text className='text-xl bg-green-400 p-3 m-3 text-white rounded-md'>
                        {record.saturday}
                    </Text>
                )}
                {record.sunday && (
                    <Text className='text-xl bg-green-400 p-3 m-3 text-white rounded-md'>
                        {record.sunday}
                    </Text>
                )}

            </View>
        </ScrollView>
    )
}

export default status