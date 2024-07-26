import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native'
interface IProps {
    navigation: NavigationProp<any, any>
}
const DetailPage = ({ navigation }: IProps) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>DetailPage</Text>
            <Button
                title='Goback'
                onPress={() => {
                    navigation.goBack()
                }}
            />
        </View>
    )
}

export default DetailPage

const styles = StyleSheet.create({})