import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { socket } from '../socket'

const ChatRoom = (props: any) => {
    const params = props?.route?.params
    const [message, setMessage] = useState('')
    const [roomMessages, setRoomMessages] = useState([])
    useEffect(() => {
        socket.emit("connection")
        socket.emit("join-room", {
            roomName: params?.room?.roomName
        })
        socket.on("chat-message", (data) => {
            console.log("data", data)
            roomMessages.push(data)
            setRoomMessages([...roomMessages])
        })
        return () => {
            socket.emit('leave-room')
        }
    }, [])
    async function sendMessage() {
        try {
            socket.timeout(10000).emit("chat-message", {
                message: message,
                roomName: params?.room?.roomName
            })
        } catch (error) {
            console.log("Server not response")
        }
    }

    function renderMessage({ item, index }) {
        return <View>
            <Text style={{ fontSize: 14, margin: 5, marginLeft: 10 }}>{item.clientId}: </Text>
            <Text style={{ fontSize: 14, margin: 5, marginLeft: 10 }}>{item?.message}</Text>
            <View style={{ backgroundColor: 'gray', height: 0.5, width: '100%' }} />
        </View>
    }
    return (
        <View style={{}}>
            <FlatList
                data={roomMessages}
                renderItem={renderMessage}
                style={{ height: "80%" }}
            />
            <TextInput
                placeholder='Message'
                style={{ width: '90%', height: 45, backgroundColor: 'white', padding: 10, borderRadius: 8, marginLeft: '5%' }}
                onChangeText={(text) => setMessage(text)}
            />
            <Button title='Send' onPress={sendMessage} />
        </View>
    )
}

export default ChatRoom

const styles = StyleSheet.create({})