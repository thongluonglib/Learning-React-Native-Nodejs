import React, { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserThunk } from './reducers/userReducer';

type Props = {}

function NavigationStack({ }: Props) {
    const dispatch = useDispatch();
    const { status, data, error } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getAllUserThunk())
    }, [])
    
    if (status == 'loading')
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator />
            </View>
        )
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>NavigationStack</Text>
        </View>
    )
}

export default NavigationStack