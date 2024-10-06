import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert, } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { authUser, getCurrentUser, createUser } from '../../lib/appwrite';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';


const login = () => {

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [isSubmitting, setSubmitting] = useState(false)
    const { setUser, setLoggedIn } = useGlobalContext()

    const submit = async () => {

        // Register
        //     if (form.username === '' || form.email === '' || form.password === '') {
        //         Alert.alert('Please fill in all the fields')
        //         return;
        //     }

        //     setSubmitting(true);

        //     try {
        //         const result = await createUser(form.username, form.email, form.password);
        //         if (result) {
        //             setUser(result);
        //             setLoggedIn(true);
        //             Alert.alert('User Register Successfully')
        //         } else {
        //             Alert.alert('failed to retrieve user information')
        //         }

        //     } catch (error) {
        //         Alert.alert((error as Error).message);
        //     } finally {
        //         setSubmitting(false)
        //     }
        // }

        // Login
        if (form.email === '' || form.password === '') {
            Alert.alert('Please fill in all the fields')
            return;
        }

        setSubmitting(true);
        try {
            await authUser({ email: form.email, password: form.password });
            const result = await getCurrentUser()
            if (result) {
                setUser(result)
                setLoggedIn(true);
                Alert.alert('User login success')
                router.replace('/home')
            } else {
                Alert.alert('failed to retrieve user information')
            }


        } catch (error) {
            Alert.alert((error as Error).message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <SafeAreaView className='h-full'>
            <KeyboardAvoidingView behavior=
                {Platform.OS == 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ height: '100%' }}>
                    <View className='h-full justify-center items-start m-auto w-10/12'>
                        <Text className='text-3xl font-[Helvetica-Rounded]'>Login User Account</Text>

                        {/* <FormField
                            title='Username'
                            value={form.username}
                            placeHolder='enter user email here'
                            handleChangeText={(e) => setForm({ ...form, username: e })}
                            otherStyles='mt-4 w-full'
                            keyboardType='email-address'
                            maxLength={200}
                            editable={true}
                        /> */}

                        <FormField
                            title='Email'
                            value={form.email}
                            placeHolder='enter user email here'
                            handleChangeText={(e) => setForm({ ...form, email: e })}
                            otherStyles='mt-4 w-full'
                            keyboardType='email-address'
                            maxLength={200}
                            editable={true}
                        />

                        <FormField
                            title='Password'
                            value={form.password}
                            placeHolder='enter user password here'
                            handleChangeText={(e) => setForm({ ...form, password: e })}
                            otherStyles='mt-4 mb-8 w-full'
                            keyboardType='email-address'
                            maxLength={200}
                            editable={true}
                        />

                        <CustomButton
                            title='Submit'
                            handlePress={submit}
                            containerStyles='bg-emerald-500 self-end p-2 w-44 '
                            textStyles='text-white text-lg'
                            isLoading={isSubmitting}

                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default login;
