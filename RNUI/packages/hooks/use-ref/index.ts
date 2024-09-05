import { StyleSheet, Text, View } from 'react-native';
import React, { useRef as useRefRN } from 'react';

const useRef = () => {
    const myRef = useRefRN();
    return {
        myRef,
    };
};

export default useRef;

const styles = StyleSheet.create({});
