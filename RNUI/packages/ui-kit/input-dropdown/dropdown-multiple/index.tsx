/* eslint-disable @typescript-eslint/no-shadow */
import _assign from 'lodash/assign';
import _differenceWith from 'lodash/differenceWith';
import _findIndex from 'lodash/findIndex';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

import React, {
  JSXElementConstructor,
  ReactElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  I18nManager,
  Image,
  Keyboard,
  KeyboardEvent,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  StatusBar,
} from 'react-native';
import { DropdownProps } from './model';
import { styles } from './styles';
import DropdownSingle from './dropdown-single';
import InputUI from '@packages/ui-kit/input-ui';
import { useDeviceOrientation } from '@packages/hooks/use-device-orientation';
import { useDetectDevice } from '@packages/utils/toolkits';

const { isTablet } = useDetectDevice;
const ic_down = require('../../../assets/down.png');

const statusBarHeight: number = StatusBar.currentHeight || 0;

const DropdownMultiple: <T>(
  props: DropdownProps<T>
) => ReactElement<any, string | JSXElementConstructor<any>> | null =
  React.forwardRef((props, currentRef) => {
    const orientation = useDeviceOrientation();
    const {
      containerProps,
      style = {},
      iconStyle,
      selectedContainerProps = {},
      data: dataT = [],
      value,
      fontFamily,
      iconColor = 'gray',
      placeholder = 'Select item',
      search = false,
      maxHeight = 340,
      minHeight = 0,
      disable = false,
      keyboardAvoiding = true,
      onFocus,
      onBlur,
      dropdownPosition = 'auto',
      backgroundColor,
      mode = 'default',
      renderItem,
      flatListProps,
      inputProps,
      renderRightIcon,
      renderLeftIcon,
    } = props;
    const data = [...dataT];
    const ref = useRef<View>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [position, setPosition] = useState<any>();
    const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

    const { width: W, height: H } = Dimensions.get('window');
    const styleContainerVertical: ViewStyle = useMemo(() => {
      return {
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
      };
    }, []);
    const styleHorizontal: ViewStyle = useMemo(() => {
      return {
        width: orientation === 'LANDSCAPE' ? W / 2 : '100%',
        alignSelf: 'center',
      };
    }, [W, orientation]);

    useImperativeHandle(currentRef, () => {
      return { open: eventOpen, close: eventClose };
    });

    useEffect(() => {
      return eventClose;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const eventOpen = () => {
      if (!disable) {
        setVisible(true);
        if (onFocus) {
          onFocus();
        }
      }
    };

    const eventClose = useCallback(() => {
      if (!disable) {
        setVisible(false);
        if (onBlur) {
          onBlur();
        }
      }
    }, [disable, onBlur]);

    const font = useCallback(() => {
      if (fontFamily) {
        return {
          fontFamily: fontFamily,
        };
      } else {
        return {};
      }
    }, [fontFamily]);

    const _measure = useCallback(() => {
      if (ref && ref?.current) {
        ref.current.measureInWindow((pageX, pageY, width, height) => {
          let isFull = isTablet
            ? false
            : mode === 'modal' || orientation === 'LANDSCAPE';

          if (mode === 'auto') {
            isFull = false;
          }

          const top = isFull ? 20 : height + pageY + 2;
          const bottom = H - top + height;
          const left = I18nManager.isRTL ? W - width - pageX : pageX;

          setPosition({
            isFull,
            width: Math.floor(width),
            top: Math.floor(top + statusBarHeight),
            bottom: Math.floor(bottom - statusBarHeight),
            left: Math.floor(left),
            height: Math.floor(height),
          });
        });
      }
    }, [H, W, orientation, mode]);

    const onKeyboardDidShow = useCallback(
      (e: KeyboardEvent) => {
        _measure();
        setKeyboardHeight(e.endCoordinates.height);
      },
      [_measure]
    );

    const onKeyboardDidHide = useCallback(() => {
      setKeyboardHeight(0);
      _measure();
    }, [_measure]);

    useEffect(() => {
      const susbcriptionKeyboardDidShow = Keyboard.addListener(
        'keyboardDidShow',
        onKeyboardDidShow
      );
      const susbcriptionKeyboardDidHide = Keyboard.addListener(
        'keyboardDidHide',
        onKeyboardDidHide
      );

      return () => {
        if (typeof susbcriptionKeyboardDidShow?.remove === 'function') {
          susbcriptionKeyboardDidShow.remove();
        }

        if (typeof susbcriptionKeyboardDidHide?.remove === 'function') {
          susbcriptionKeyboardDidHide.remove();
        }
      };
    }, [onKeyboardDidHide, onKeyboardDidShow]);

    const showOrClose = useCallback(() => {
      if (!disable) {
        const visibleStatus = !visible;

        if (keyboardHeight > 0 && !visibleStatus) {
          return Keyboard.dismiss();
        }

        _measure();
        setVisible(visibleStatus);

        if (visibleStatus) {
          if (onFocus) {
            onFocus();
          }
        } else {
          if (onBlur) {
            onBlur();
          }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disable, keyboardHeight, visible, _measure, data, onFocus, onBlur]);

    const _renderDropdown = () => {
      return (
        <TouchableWithoutFeedback onPress={showOrClose}>
          <View
            {...selectedContainerProps}
            style={[styles.dropdown, selectedContainerProps?.style]}
          >
            <InputUI
              onPress={showOrClose}
              value={value}
              placeholder={placeholder}
              editable={false}
              leftIcon={renderLeftIcon ? renderLeftIcon(visible) : null}
              rightIcon={
                renderRightIcon && typeof renderRightIcon === 'function' ? (
                  renderRightIcon(visible)
                ) : (
                  <Image
                    source={ic_down}
                    style={StyleSheet.flatten([
                      styles.icon,
                      { tintColor: iconColor },
                      iconStyle,
                    ])}
                  />
                )
              }
              containerProps={{
                style: containerProps?.style,
              }}
              {...inputProps}
            />
            {/* {renderLeftIcon?.(visible)} */}
            {/* <Text
              {...selectedTextProps}
              style={[
                styles.textItem,
                value ? selectedTextProps?.style : placeholderStyle,
                font(),
              ]}
            >
              {value ? value : placeholder}
            </Text> */}
            {/* {renderRightIcon ? (
              renderRightIcon(visible)
            ) : (
              <Image
                source={ic_down}
                style={StyleSheet.flatten([
                  styles.icon,
                  { tintColor: iconColor },
                  iconStyle,
                ])}
              />
            )} */}
          </View>
        </TouchableWithoutFeedback>
      );
    };
    const renderList = useMemo(() => {
      // return (
      //   <FlatList
      //     data={data}
      //     horizontal
      //     style={{ width: '100%'}}
      //     scrollEnabled
      //     renderItem={({ item, index }) => (
      //       <DropdownSingle
      //         key={`${index}`}
      //         data={item}
      //         renderItem={renderItem}
      //         {...flatListProps}
      //       />
      //     )}
      //   />
      // );
      return data?.map((item, index) => {
        return (
          <DropdownSingle
            key={`${index}`}
            data={item}
            renderItem={renderItem}
            search={search}
            {...flatListProps}
          />
        );
      });
    }, [data]);
    const _renderModal = useCallback(() => {
      if (visible && position) {
        const { isFull, width, height, top, bottom, left } = position;

        const onAutoPosition = () => {
          if (keyboardHeight > 0) {
            return bottom < keyboardHeight + height;
          }

          return bottom < (search ? 150 : 100);
        };

        if (width && top && bottom) {
          const styleVertical: ViewStyle = {
            left: left,
            maxHeight: maxHeight,
            minHeight: minHeight,
          };
          const isTopPosition =
            dropdownPosition === 'auto'
              ? onAutoPosition()
              : dropdownPosition === 'top';

          let extendHeight = !isTopPosition ? top : bottom;
          if (
            keyboardAvoiding &&
            keyboardHeight > 0 &&
            isTopPosition &&
            dropdownPosition === 'auto'
          ) {
            extendHeight = keyboardHeight;
          }
          return (
            <Modal
              transparent
              statusBarTranslucent
              visible={visible}
              supportedOrientations={['landscape', 'portrait']}
              onRequestClose={showOrClose}
            >
              <TouchableWithoutFeedback onPress={showOrClose}>
                <View
                  style={StyleSheet.flatten([
                    styles.flex1,
                    isFull && styleContainerVertical,
                    backgroundColor && {
                      backgroundColor: backgroundColor,
                    },
                  ])}
                >
                  <View
                    style={StyleSheet.flatten([
                      styles.flex1,
                      !isTopPosition
                        ? { paddingTop: extendHeight }
                        : {
                            justifyContent: 'flex-end',
                            paddingBottom: extendHeight,
                          },
                      isFull && styles.fullScreen,
                    ])}
                  >
                    <View
                      {...containerProps}
                      style={StyleSheet.flatten([
                        styles.container,
                        isFull ? styleHorizontal : styleVertical,
                        {
                          width,
                          flexDirection: 'row',
                          marginHorizontal: 10,
                        },
                        containerProps?.style,
                      ])}
                    >
                      {renderList}
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          );
        }
        return null;
      }
      return null;
    }, [
      visible,
      position,
      keyboardHeight,
      maxHeight,
      minHeight,
      dropdownPosition,
      keyboardAvoiding,
      showOrClose,
      styleContainerVertical,
      backgroundColor,
      styleHorizontal,
    ]);

    return (
      <View
        style={StyleSheet.flatten([styles.mainWrap, style])}
        ref={ref}
        onLayout={_measure}
      >
        {_renderDropdown()}
        {_renderModal()}
      </View>
    );
  });

export default DropdownMultiple;
