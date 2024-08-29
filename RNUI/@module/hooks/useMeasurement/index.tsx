import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
interface IMeasurement {
    x: number, y: number, width: number, height: number, pageX?: number, pageY?: number
}
const useMeasurement = () => {
    const myRef: any = useRef(null);
    const [measurements, setMeasurements] = useState<IMeasurement | null>(null);
    console.log('measurements', measurements)
    const startMeasurement = () => {
        if (myRef && myRef.current?.measure) {
            myRef.current?.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
                setMeasurements({ x, y, width, height, pageX, pageY });
            });
        }
    };
    const onLayout = (event: any) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        if (myRef.current) {
            startMeasurement()
        }
        else {
            setMeasurements({ x, y, width, height });
        }

    }
    return {
        measurements,
        startMeasurement,
        myRef,
        onLayout
    }
}

export default useMeasurement

const styles = StyleSheet.create({})