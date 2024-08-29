import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';

interface IRenderItem {
  item?: any;
  index?: number;
  isSelected?: boolean;
}
export interface IProps {
  data: Array<any>;
  defaultIndex?: any;
  onChangeTab?: ({item, index}: IRenderItem) => void;
  renderItem?: ({item, index, isSelected}: IRenderItem) => JSX.Element;
  containerStyle?: ViewStyle;
  activeContainerStyle?: ViewStyle;
  inActiveContainerStyle?: ViewStyle;
}
const TabView = ({
  data,
  renderItem,
  defaultIndex = null,
  onChangeTab,
  ...orders
}: IProps & ScrollViewProps) => {
  const [indexSelected, setIndexSelected] = useState(defaultIndex);
  const _onPress = ({item, index}: any) => {
    if (index === indexSelected) {
      return;
    }
    setIndexSelected(index);
    if (typeof onChangeTab === 'function') {
      onChangeTab({item, index});
    }
  };

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={[styles.contentStyle, orders.containerStyle]}
      {...orders}>
      {data && data.length > 0
        ? data.map((item, index) => {
            return (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => _onPress({item, index})}
                style={[
                  {
                    borderRadius: 4,
                    borderColor: 'grey',
                    borderWidth: 0.5,
                    paddingHorizontal: 24,
                    paddingVertical: 8,
                    backgroundColor:
                      index == indexSelected ? '#0f59' : 'transparent',
                  },
                  index === indexSelected
                    ? orders.activeContainerStyle
                    : orders.inActiveContainerStyle,
                ]}>
                {renderItem && typeof renderItem === 'function' ? (
                  renderItem({
                    item,
                    index,
                    isSelected: index === indexSelected,
                  })
                ) : (
                  <Text>{index}</Text>
                )}
              </TouchableOpacity>
            );
          })
        : null}
    </ScrollView>
  );
};

export default TabView;

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: '#1E3A8A',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
});
