import { Text, View, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { useState } from 'react'
import React from 'react'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { openAI_Chat } from '@/lib/openai'

type Response = {
    role: string | "chatgpt",
    content: string | null

}

const advice = () => {
    const [input, setInput] = useState('')
    const [message, setMessage] = useState<Response[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const sumbit = async () => {
        setIsLoading(false)
        try {
            if (!input.trim()) return;
            setMessage([...message, { role: 'user', content: input }])
            const response = await openAI_Chat(input)
            setMessage(prevMessage => [
                ...prevMessage,
                { role: 'chatgpt', content: response }
            ])

            setInput('')

        } catch (error) {
            throw new Error(error as string)
        }
    }


    return (
        <SafeAreaView className='h-full'>
            <KeyboardAvoidingView behavior=
                {Platform.OS == 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS == 'ios' ? 90 : 60}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className='flex-1 justify-between m-3'>
                        <Text className='font-[Helvetica-Rounded] text-3xl mb-5'>Financial Assitant</Text>

                        <View className='flex-grow rounded-lg'>
                            {message.map((msg, index) => (
                                <View
                                    key={index}
                                    className={`font-[Helvetica] p-3 leading-6 mt-5
                                    ${msg.role == "user"
                                            ? "bg-blue-400"
                                            : "bg-red-400"
                                        }`}>
                                    <Text className='font-[Helvetica-Rounded] text-lg text-white mb-2'>{msg.role}</Text>
                                    <Text className='text-white'>{msg.content}</Text>
                                </View>


                            ))}
                        </View>

                        <View className='mt-5 flex-row'>
                            <FormField
                                title=''
                                value={input}
                                placeHolder='chat with GPT'
                                handleChangeText={(text) => setInput(text)}
                                otherStyles='flex-grow'
                                keyboardType='default'
                                maxLength={200}
                                editable={true}
                            />

                            <CustomButton
                                title='Submit'
                                handlePress={sumbit}
                                containerStyles='bg-emerald-500 self-end p-2.5 absolute right-0 top-5.5 z-100'
                                textStyles='text-white text-sm'
                                isLoading={false}
                            />

                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default advice
