import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router'

const FormField = ({ title, value, placeHolder, handleChangeText, otherStyles, maxLength, editable, ...props }: {
    title: string,
    value: string,
    placeHolder: string,
    handleChangeText: (text: string) => void,
    otherStyles: string
    keyboardType: string
    maxLength: number
    editable: boolean
}) => {
    const [showPassword, setshowPassword] = useState(false)

    const showPasswordIcon = require('../assets/images/show.png');
    const hidePasswordIcon = require('../assets/images/hide.png');
    return (
        <View className={` ${otherStyles}`}>
            <Text className='mb-2 text-xl font-[Helvetica]'>{title}</Text>

            <View className='flex-row bg-slate-400  rounded-md justify-start items-center '>
                <TextInput
                    className='focus:outline-none p-3 w-10/12'
                    value={value}
                    placeholder={placeHolder}
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                    maxLength={maxLength}
                    editable={editable}
                />

                {title === 'Password' && (
                    <TouchableOpacity className='m-auto' onPress={() =>
                        setshowPassword(!showPassword)}>
                        <Image className='self-center' source={!showPassword ? showPasswordIcon : hidePasswordIcon} />
                    </TouchableOpacity>
                )}
            </View>

        </View>
    )
}

export default FormField