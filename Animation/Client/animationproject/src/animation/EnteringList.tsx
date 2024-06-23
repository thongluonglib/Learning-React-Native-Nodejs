import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const mock100Items = new Array(100).fill(0).map((_, i) => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return {
        id: i,
        name: `name ${i}`,
        color: `rgba(${r},${g},${b}, 1)`
    }
}
)
const ButtonAnimation = Animated.createAnimatedComponent(TouchableOpacity)
const EnteringList = () => {
    const [data, setData] = useState([...mock100Items])
    function renderItem({ item, index }) {
        return (
            <ButtonAnimation
                entering={FadeIn.duration(250)}
                exiting={FadeOut.duration(1000)}
                style={{ width: 100, height: 100, backgroundColor: item.color }}
                onPress={() => {
                    const newData = data.filter((item, idx) => idx != index)
                    setData([...newData])
                }}
            >
            </ButtonAnimation>
        )
    }
    return (
        <View>
            <Text>EnteringList</Text>
            <FlatList
                numColumns={3}
                data={data}
                renderItem={renderItem}
                columnWrapperStyle={{
                    justifyContent: 'space-evenly'
                }}
            />
        </View>
    )
}

export default EnteringList

const styles = StyleSheet.create({})