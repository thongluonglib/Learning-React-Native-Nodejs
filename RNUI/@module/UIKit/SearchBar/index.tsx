import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import GradientButton from '../GradientButton';
import { useDebouncedCallback } from '../../hooks';
interface IProps {
    onChangeText?: Function
}
const SearchBar = (props: IProps) => {

    const _onChangeTextDebounce = useDebouncedCallback((text: String) => {
        if (typeof props.onChangeText == 'function') props?.onChangeText(text)
    }, 500)

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0050FF', '#2DC0FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
                start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.viewContainer}>
                    <EvilIcons
                        name="search"
                        size={24}
                    />
                    <TextInput
                        placeholder='Tìm kiếm'
                        placeholderTextColor={'#919EAB'}
                        style={styles.inputContainer}
                        onChangeText={_onChangeTextDebounce}
                    />
                    <GradientButton styleContainer={{ marginRight: 8 }} />
                </View>
            </LinearGradient>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: 8,
    },
    gradient: {
        height: 54,
        width: "90%",
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
    },
    viewContainer: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: '99%',
        margin: 1,
        flexDirection: 'row',
        borderRadius: 8
    },
    buttonText: {
        textAlign: 'center',
        color: '#4C64FF',
        alignSelf: 'center',
    },
    inputContainer: {
        fontSize: 14,
        flex: 1
    }
})