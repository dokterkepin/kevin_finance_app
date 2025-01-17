import { View, Text } from 'react-native';
import React from 'react';
import { Stack, Tabs } from 'expo-router';


const TabsLayout = () => {

    return (
        <>
            <Tabs
                screenOptions={{

                }}
            >
                <Tabs.Screen
                    name='home'
                    options={{
                        title: 'Home',
                        headerShown: false
                    }}
                />

                <Tabs.Screen
                    name='status'
                    options={{
                        title: 'Status',
                        headerShown: false
                    }}
                />

                <Tabs.Screen
                    name='advice'
                    options={{
                        title: 'Advice',
                        headerShown: false
                    }}
                />

                <Tabs.Screen
                    name='security'
                    options={{
                        title: 'Security',
                        headerShown: false
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabsLayout