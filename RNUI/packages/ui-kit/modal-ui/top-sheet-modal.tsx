// App.js
import React, { useRef } from 'react';
import {
    View,
    Text,
    Button,
    Modal,
    StyleSheet,
    TouchableOpacity,
    DimensionValue,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';
import { useModal } from '../../hooks/use-modal';
import useMeasurement from '../../hooks/use-measurement';
interface IProps {
    modalHeight?: DimensionValue;
    modalWidth?: DimensionValue;
    renderContent?: ({ onClose }: { onClose: () => void }) => JSX.Element;
}
const TopSheetModal = ({ renderContent, modalHeight = '40%', modalWidth = '100%' }: IProps) => {
    const { visible, show, hide } = useModal();
    const animatedValue = useRef(new Animated.Value(500)).current;
    const { myRef, measurements, onLayout } = useMeasurement();
    const startAnimation = (value: any, compelete?: () => void) => {
        Animated.timing(animatedValue, {
            toValue: value,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            if (compelete) {
                compelete();
            }
        });
    };
    const onShow = () => {
        show();
        startAnimation(0);
    };
    const onClose = () => {
        startAnimation(measurements.height + 1000, () => {
            hide();
        });
    };
    return (
        <View style={styles.container}>
            <Button title="Show Top Modal" onPress={onShow} />
            <Modal
                transparent={true}
                animationType="none"
                visible={visible}
                onRequestClose={onClose}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.modalBackground}
                    onPress={onClose}
                >
                    <TouchableWithoutFeedback>
                        <Animated.View
                            ref={myRef}
                            onLayout={onLayout}
                            style={[
                                styles.modalContainer,
                                {
                                    height: modalHeight,
                                    width: modalWidth,
                                    transform: [
                                        {
                                            translateY: animatedValue,
                                        },
                                    ],
                                },
                            ]}
                        >
                            {renderContent ? (
                                renderContent({ onClose })
                            ) : (
                                <View style={{ width: '100%' }}>
                                    <Text style={styles.modalTitle}>Hello, World!</Text>
                                    <Text style={styles.modalContent}>
                                        This is a modal content.
                                    </Text>
                                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                        <Text style={styles.closeButtonText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View>
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
        justifyContent: 'flex-start',
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
export default TopSheetModal;
