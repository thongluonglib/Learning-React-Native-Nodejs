import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface IRoom {
  item: {
    roomName: String
  }
  index: Number
}
const roomMock = [
  {
    roomName: 'Room 1',
  },
  {
    roomName: 'Room 2',
  },
  {
    roomName: 'Room 3',
  },
]
const Home = ({ navigation }) => {
  function onPressRoom({ item, index }: IRoom) {
    navigation.navigate('ChatRoom', {
        room: item
    })
  }
  function renderItem({ item, index }: IRoom) {
    return (
      <Button title={item.roomName} onPress={() => onPressRoom({ item, index })} />
    )
  }

  return (
    <View>
      <FlatList
        data={roomMock}
        renderItem={renderItem}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})