import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from '@/components/common/Text'

export default function GetStarted() {
    return (
        <View style={styles.container}>
            <Text className='bg-purple-500 p-3 rounded-md text-white'>Get started</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})