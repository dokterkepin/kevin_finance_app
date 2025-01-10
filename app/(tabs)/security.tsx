import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from '@/lib/firebase'

type Parts = {
  proximity: number,
  buzzer_state: string,
  message: string
}

const initialParts: Parts = {
  proximity: 0,
  buzzer_state: "",
  message: ""
}

const security = () => {
  const [info, setInfo] = useState<Parts>(initialParts);
  useEffect(() => {
    const starCountRef = ref(db);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      if (data && typeof data === 'object') {
        const updatedInfo: Parts = {
          proximity: data.proximity || 0,
          buzzer_state: data.buzzer_state || "",
          message: data.message || ""
        };
        setInfo(updatedInfo)
      }
    })
  }, [])

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="p-4 bg-gray-100 mt-20">
        <View className="mb-4">
          <Text className="font-[Helvetica-Rounded] text-3xl mb-2 text-sky-400">Security Status</Text>
        </View>

        {/* Grid Layout */}
        <View className="flex flex-wrap flex-row ">
          {/* Proximity */}
          <View className="flex-1 p-4 m-1 rounded-xl bg-sky-400 ">
            <Text className="text-base text-white text-xl">Proximity: </Text>
            <Text className='text-4xl text-white'>{info.proximity}</Text>
          </View>

          {/* Buzzer */}
          <View className="flex-[1.2] m-1 p-6 rounded-xl  bg-sky-400">
            <Text className="text-base text-white text-xl">Buzzer: {info.buzzer_state}</Text>
          </View>

          {/* Message */}
          <View className="w-full p-4 m-0.5 rounded-xl bg-sky-400">
            <Text className="text-base text-white text-xl">Message: {info.message}</Text>
          </View>

        </View>
      </View>
    </ScrollView>


  )
};

export default security

const styles = StyleSheet.create({})