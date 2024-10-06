import { View, Text, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getCurrentUser } from '@/lib/appwrite';
import { getDayString } from '@/lib/myFunc';


const status = () => {
    useEffect(() => {
        const checkAttendance = async () => {
            try {

                const currentUser = await getCurrentUser();
                if (!currentUser) {
                    Alert.alert('Error', 'Can not find the user schedule')
                }

                const dayIndex = new Date().getDay();
                const currentDay = getDayString(dayIndex);
                // const workHours = schedule[currentDay as keyof typeof schedule]
            } catch (error) {
                Alert.alert('Error', (error as Error).message)
            }
        }
    })

    return (
        <View>
            <Text>status</Text>
        </View>
    )
}

export default status