import {
  FlatList,
  TouchableHighlight,
  TouchableHighlightProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {
  JSXElementConstructor,
  ReactElement,
  useMemo,
  useState,
} from 'react';
import { IDropdownData } from './model';
import { FlatListProps } from 'react-native';
import InputUI from '@packages/ui-kit/input-ui';
interface IProps<T> extends FlatListProps<T> {
  data: IDropdownData<T>;
  itemContainerProps: TouchableHighlightProps;
  search?: boolean;
  renderItem?: ({
    item,
    data,
    index,
  }: {
    item?: T;
    data?: IDropdownData<T>;
    index?: number;
  }) => JSX.Element;
}
const DropdownSingle: <T>(
  props: IProps<T>
) => ReactElement<any, string | JSXElementConstructor<any>> | null = (
  props
) => {
  const { data, renderItem, search, itemContainerProps, ...restProps } = props;
  const [listData, setListData] = useState(data?.items);
  const _renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight
        {...itemContainerProps}
        style={[itemContainerProps?.style]}
      >
        {renderItem({ item, data, index })}
      </TouchableHighlight>
    );
  };
  const onSearch = (text) => {
    if (text) {
      const filterData = [...listData].filter((item) => item?.label == text);
      setListData([...filterData]);
    } else {
      setListData([...data?.items]);
    }
  };
  const listHeaderComponent = useMemo(() => {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <InputUI
          // debouncedDuration={100}
          onChangeText={onSearch}
          containerProps={{
            style: {
              margin: 0,
              marginRight: 8,
              borderRadius: 0,
              height: 35,
            },
          }}
        />
      </View>
    );
  }, []);
  return (
    <TouchableWithoutFeedback>
      <FlatList
        keyboardShouldPersistTaps="handled"
        {...restProps}
        ListHeaderComponent={search ? listHeaderComponent : null}
        data={listData}
        renderItem={_renderItem}
        keyExtractor={(_item, index) => `${data?.id}_${index}`}
        showsVerticalScrollIndicator={true}
        // stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={[0]}
      />
    </TouchableWithoutFeedback>
  );
};

export default DropdownSingle;
