// App.js
import React, { useMemo, useRef } from 'react';
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
    animationType?: 'TranslateBottomToTop' | 'Fade' | 'TranslateLeftToRight';
    modalType?: 'top' | 'bottom' | 'center';
    durationShow?: number;
    durationHide?: number;
}
const ModalUI = ({
    renderContent,
    modalHeight = '40%',
    modalWidth = '100%',
    animationType = 'TranslateBottomToTop',
    modalType = 'bottom',
    durationShow = 500,
    durationHide = 500,
}: IProps) => {
    const { visible, show, hide } = useModal();
    const { myRef, measurements, onLayout } = useMeasurement();
    const animatedValue = useRef(
        new Animated.Value(animationType == 'TranslateBottomToTop' ? 500 : 0)
    ).current;

    function bottomHandler() {
        if (animationType == 'Fade') {
            return {
                showValue: 1,
                hideValue: 0,
                containerStyle: {
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                },
                animationStyle: {
                    opacity: animatedValue,
                },
            };
        } else if (animationType == 'TranslateBottomToTop') {
            return {
                showValue: 0,
                hideValue: measurements.height + 100,
                containerStyle: {
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                },
                animationStyle: {
                    transform: [
                        {
                            translateY: animatedValue,
                        },
                    ],
                },
            };
        } else if (animationType == 'TranslateLeftToRight') {
            return {
                showValue: 0,
                hideValue: -measurements?.width,
                containerStyle: {
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                },
                animationStyle: {
                    transform: [
                        {
                            translateX: animatedValue,
                        },
                    ],
                },
            };
        }
    }

    function centeredHandler() {
        if (animationType == 'Fade') {
            return {
                showValue: 1,
                hideValue: 0,
                containerStyle: {
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                },
                animationStyle: {
                    opacity: animatedValue,
                },
            };
        } else if (animationType == 'TranslateBottomToTop') {
            return {
                showValue: 0,
                hideValue: measurements.height + 1000,
                containerStyle: {
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                },
                animationStyle: {
                    transform: [
                        {
                            translateY: animatedValue,
                        },
                    ],
                },
            };
        } else if (animationType == 'TranslateLeftToRight') {
            return {
                showValue: 0,
                hideValue: -measurements?.width,
                containerStyle: {
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                },
                animationStyle: {
                    transform: [
                        {
                            translateX: animatedValue,
                        },
                    ],
                },
            };
        }
    }
    function topHandler() {
        if (animationType == 'Fade') {
            return {
                showValue: 1,
                hideValue: 0,
                containerStyle: {
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                },
                animationStyle: {
                    opacity: animatedValue,
                },
            };
        }
        if (animationType == 'TranslateBottomToTop') {
            return {
                showValue: 0,
                hideValue: measurements.height + 100,
                containerStyle: {
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                },
                animationStyle: {
                    transform: [
                        {
                            translateY: animatedValue,
                        },
                    ],
                },
            };
        }
        if (animationType == 'TranslateLeftToRight') {
            return {
                showValue: 0,
                hideValue: -measurements.height + 100,
                containerStyle: {
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                },
                animationStyle: {
                    transform: [
                        {
                            translateX: animatedValue,
                        },
                    ],
                },
            };
        }
    }
    const getTypeValue = useMemo(() => {
        console.log('modalType', measurements);
        if (!measurements?.height) return {};
        if (modalType == 'bottom') {
            return bottomHandler();
        } else if (modalType == 'center') {
            return centeredHandler();
        } else if (modalType == 'top') {
            return topHandler();
        }
    }, [measurements?.height]);
    const startAnimation = (value: any, compelete?: () => void) => {
        Animated.timing(animatedValue, {
            toValue: value,
            duration: durationShow,
            useNativeDriver: true,
        }).start(() => {
            if (compelete) {
                compelete();
            }
        });
    };
    const hideAnimation = (value: any, compelete?: () => void) => {
        Animated.timing(animatedValue, {
            toValue: value,
            duration: durationHide,
            useNativeDriver: true,
        }).start(() => {
            if (compelete) {
                compelete();
            }
        });
    };
    const onShow = () => {
        show();
        console.log('getTypeValue?.showValue', getTypeValue?.showValue);
        startAnimation(getTypeValue?.showValue || 0);
    };
    const onClose = () => {
        hideAnimation(getTypeValue?.hideValue, () => {
            hide();
        });
    };
    return (
        <View style={styles.container}>
            <Button title="Show Modal UI" onPress={onShow} />
            <Modal
                transparent={true}
                animationType="none"
                visible={visible}
                onRequestClose={onClose}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.modalBackground, getTypeValue?.containerStyle]}
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
                                    ...getTypeValue?.animationStyle,
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
        justifyContent: 'flex-end',
        alignItems: 'center',
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
export default ModalUI;
