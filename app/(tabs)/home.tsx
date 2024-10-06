import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { addWorkSchedule, addAttendance, getCurrentUser, getWorkSchedule } from '../../lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'


const initialSchedule = {
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: ''
}

const home = () => {
    const [schedule, setSchedule] = useState(initialSchedule)
    const { user } = useGlobalContext()
    const [submitting, setSubmitting] = useState(true);

    useEffect(() => {
        const fetchUserSchedule = async () => {
            try {
                if (user) {
                    const userSchedule = await getWorkSchedule(user.username);
                    if (userSchedule) {
                        setSchedule({
                            monday: userSchedule.monday,
                            tuesday: userSchedule.tuesday,
                            wednesday: userSchedule.wednesday,
                            thursday: userSchedule.thursday,
                            friday: userSchedule.friday,
                            saturday: userSchedule.saturday,
                            sunday: userSchedule.sunday
                        })
                    } else {
                        setSubmitting(false)
                        return;
                    }

                } else {
                    Alert.alert("Error", "Can not find current user")
                    return;
                }
            } catch (error) {
                Alert.alert('Error', (error as Error).message)
                setSubmitting(false)
            }
        }

        fetchUserSchedule();
    }, [])

    const submit = async () => {
        setSubmitting(true);
        try {
            if (user) {
                await addWorkSchedule({ username: user.username, schedule });
                Alert.alert('Success', 'Work schedule added successfully');
            }

        } catch (error) {
            Alert.alert('Error', (error as Error).message)
        }

    }

    return (
        <ScrollView contentContainerStyle={{ height: '100%' }} className=''>
            <View className='grid grid-cols-2'>
                <Text className='text-3xl font-[Helvetica-Rounded] ml-2'>Welcome Home {user?.username}</Text>
                <View className='my-3 flex flex-row flex-wrap'>
                    <FormField
                        title='Monday'
                        value={schedule.monday}
                        placeHolder='start - end'
                        handleChangeText={(val) => setSchedule({ ...schedule, monday: val })}
                        otherStyles='w-36 mx-2 my-3'
                        keyboardType='text'
                        maxLength={11}
                        editable={!submitting}
                    />
                    <FormField
                        title='Tuesday'
                        value={schedule.tuesday}
                        placeHolder='start - end'
                        handleChangeText={(val) => setSchedule({ ...schedule, tuesday: val })}
                        otherStyles='w-36 mx-2 my-3'
                        keyboardType='text'
                        maxLength={11}
                        editable={!submitting}
                    />

                    <FormField
                        title='Wednesday'
                        value={schedule.wednesday}
                        placeHolder='start - end'
                        handleChangeText={(val) => setSchedule({ ...schedule, wednesday: val })}
                        otherStyles='w-36 mx-2 my-3'
                        keyboardType='text'
                        maxLength={11}
                        editable={!submitting}
                    />

                    <FormField
                        title='Thursday'
                        value={schedule.thursday}
                        placeHolder='start - end'
                        handleChangeText={(val) => setSchedule({ ...schedule, thursday: val })}
                        otherStyles='w-36 mx-2 my-3'
                        keyboardType='text'
                        maxLength={11}
                        editable={!submitting}
                    />

                    <FormField
                        title='Friday'
                        value={schedule.friday}
                        placeHolder='start - end'
                        handleChangeText={(val) => setSchedule({ ...schedule, friday: val })}
                        otherStyles='w-36 mx-2 my-3'
                        keyboardType='text'
                        maxLength={11}
                        editable={!submitting}
                    />

                    <FormField
                        title='Saturday'
                        value={schedule.saturday}
                        placeHolder='start - end'
                        handleChangeText={(val) => setSchedule({ ...schedule, saturday: val })}
                        otherStyles='w-36 mx-2 my-3'
                        keyboardType='text'
                        maxLength={11}
                        editable={!submitting}
                    />

                    <FormField
                        title='Sunday'
                        value={schedule.sunday}
                        placeHolder='start - end'
                        handleChangeText={(val) => setSchedule({ ...schedule, sunday: val })}
                        otherStyles='w-36 mx-2 my-3'
                        keyboardType='text'
                        maxLength={11}
                        editable={!submitting}
                    />
                </View>

                <CustomButton
                    title='submit'
                    handlePress={submit}
                    containerStyles='bg-emerald-500 w-16 ml-2 p-2'
                    textStyles='text-white'
                    isLoading={submitting}
                />
            </View>
        </ScrollView>
    )
}


export default home