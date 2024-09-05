// App.js
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
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
    ModalProps,
    ScrollView,
} from 'react-native';
import { useModal } from '../../hooks/use-modal';
import useMeasurement from '../../hooks/use-measurement';
import useTransition from '../../hooks/use-animation/use-transition';
import ButtonUI from '../button-ui';
interface IProps extends ModalProps {
    modalHeight?: DimensionValue;
    modalWidth?: DimensionValue;
    renderContent?: ({ onClose }: { onClose: () => void }) => JSX.Element;
    buttonProps?: TouchableOpacity;
    buttonShow?: boolean;
    renderVisible?: (props: {
        onShow: () => void;
        onClose: () => void;
        visible: boolean;
    }) => JSX.Element;
}
const BottomSheetModal = forwardRef((props: IProps, ref) => {
    const {
        buttonProps,
        renderContent,
        modalHeight = '40%',
        modalWidth = '100%',
        buttonShow = true,
        renderVisible,
        ...restProps
    } = props;
    useImperativeHandle(ref, () => ({
        visible,
        open: onShow,
        close: onClose,
    }));
    const { visible, show, hide } = useModal();
    const { startAnimation: startAnimation, animationStyle } = useTransition({
        duration: 500,
        defaultValue: { x: 0, y: 500 },
    });

    const { myRef, measurements, onLayout } = useMeasurement();
    const onShow = () => {
        show();
        // startAnimation(0)
        startAnimation({ x: 0, y: 0 });
    };
    const onClose = () => {
        startAnimation({ x: 0, y: measurements?.height + 100 }, undefined, () => {
            hide();
        });
    };
    return (
        <View style={styles.container}>
            {renderVisible && typeof renderVisible === 'function'
                ? renderVisible({ onShow, onClose, visible })
                : buttonShow && (
                      <ButtonUI title="Show Bottom Modal" onPress={onShow} {...buttonProps} />
                  )}
            <Modal
                transparent={true}
                animationType="none"
                visible={visible}
                onRequestClose={onClose}
                {...restProps}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.modalBackground}
                    onPress={onClose}
                >
                    <ScrollView
                        directionalLockEnabled={true}
                        contentContainerStyle={{ flex: 1,  justifyContent: 'flex-end' }}
                        // contentContainerStyle={styles.scrollModal}
                    >
                        <TouchableWithoutFeedback>
                            <Animated.View
                                ref={myRef}
                                onLayout={onLayout}
                                style={[
                                    styles.modalContainer,
                                    { height: modalHeight, width: modalWidth },
                                    animationStyle,
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
                                        <TouchableOpacity
                                            style={styles.closeButton}
                                            onPress={onClose}
                                        >
                                            <Text style={styles.closeButtonText}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </TouchableOpacity>
            </Modal>
        </View>
    );
});

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
export default BottomSheetModal;
