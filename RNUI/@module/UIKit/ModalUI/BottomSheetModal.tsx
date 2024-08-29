// App.js
import React, { useRef } from 'react';
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity, DimensionValue, Animated, TouchableWithoutFeedback } from 'react-native';
import { useModal } from '../../hooks/useModal';
import useMeasurement from '../../hooks/useMeasurement';
import useTransition from '../../hooks/useAnimated/useTransition';
interface IProps {
    modalHeight?: DimensionValue,
    modalWidth?: DimensionValue,
    renderContent?: ({ onClose }: { onClose: () => void }) => JSX.Element,
}
const BottomSheetModal = ({ renderContent, modalHeight = "40%", modalWidth = '100%' }: IProps) => {
    const { visible, show, hide } = useModal();
    const animatedValue = useRef(new Animated.Value(500)).current
    const { startAnimation: startTransitionAnimation, animationStyle } = useTransition({ duration: 500, defaultValue: { x: 0, y: 500 } })
    const { myRef, measurements, onLayout } = useMeasurement()

    const onShow = () => {
        show()
        // startAnimation(0)
        startTransitionAnimation({ x: 0, y: 0 })
    }
    const onClose = () => {
        startTransitionAnimation({ x: 0, y: measurements.height + 100 }, null, () => {
            hide()
        })
    }
    return (
        <View style={styles.container}>
            <Button title="Show Bottom Modal" onPress={onShow} />
            <Modal
                transparent={true}
                animationType="none"
                visible={visible}
                onRequestClose={onClose}
            >
                <TouchableOpacity activeOpacity={1} style={styles.modalBackground} onPress={onClose}>
                    <TouchableWithoutFeedback>
                        <Animated.View ref={myRef} onLayout={onLayout}
                            style={[
                                styles.modalContainer,
                                { height: modalHeight, width: modalWidth },
                                animationStyle
                            ]}>
                            {renderContent ? renderContent({ onClose }) : (
                                <View style={{ width: '100%' }}>
                                    <Text style={styles.modalTitle}>Hello, World!</Text>
                                    <Text style={styles.modalContent}>This is a modal content.</Text>
                                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                        <Text style={styles.closeButtonText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        // alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContent: {
        fontSize: 16,
        marginVertical: 10,
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
export default BottomSheetModal
