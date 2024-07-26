import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationProp, NavigationState } from '@react-navigation/native'
import AxiosInstance from '../axios/AxiosInstance'
interface IProps {
    navigation: NavigationProp<any, any>
}
const HomePage = ({ navigation }: IProps) => {
    useEffect(() => {
        AxiosInstance.post('/get-list-channel', {}).then(response => {
            console.log('response', JSON.stringify(response, null, 2))
        })
        AxiosInstance.post('/get-timeout', {}).then(response => {
            console.log('response', JSON.stringify(response, null, 2))
        })
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>HomePage</Text>
            <Button
                title='DetailPage'
                onPress={() => {
                    navigation.navigate('DetailPage');
                }}
            />
        </View>
    )
}

export default HomePage

const styles = StyleSheet.create({})