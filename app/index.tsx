import { Text, View, ScrollView, } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

export default function app() {
    const { isLoading, isLoggedIn } = useGlobalContext();
    if (!isLoading && isLoggedIn) return <Redirect href='/home' />;
    return (

        <SafeAreaView className='h-full '>
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className='h-full w-11/12 items-start justify-center m-auto'>
                    <Text className='font-[Helvetica-Rounded] text-3xl'>WELCOME TO </Text>
                    <Text className='font-[Helvetica] text-xl'>Kevin's Financial Management Platform</Text>
                    <CustomButton
                        title='Login'
                        handlePress={() => router.push('/login')}
                        containerStyles='bg-emerald-500 mt-3 p-2 w-44 '
                        textStyles='text-white text-lg'
                        isLoading={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}