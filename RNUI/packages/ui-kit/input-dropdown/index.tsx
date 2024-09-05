import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import DropdownMultiple from './dropdown-multiple';
import { IDropdownData } from './dropdown-multiple/model';

const data = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
];
const data2 = Array(60)
    .fill(0)
    .map((item, index) => ({
        label: (index + 1)?.toString(),
        value: (index + 1)?.toString(),
    }));
const myData: Array<
    IDropdownData<{
        label: string;
        value: string;
    }>
> = [
    {
        id: 0,
        title: 'Data 1',
        items: data,
    },
    {
        id: 1,
        title: 'Data 1',
        items: data2,
    },
    {
        id: 2,
        title: 'Data 2',
        items: data2,
    },
];
const InputDropdown = () => {
    const [values, setValues] = useState({});
    const [indexSelected, setIndexSelected] = useState({});
    return (
        <View>
            <DropdownMultiple
                data={myData}
                search
                containerProps={{
                    style: {
                        width: 300,
                    },
                }}
                value={Object.values(values).toString()}
                renderItem={({ item, data, index }) => {
                    return (
                        <TouchableOpacity
                            key={`${item?.label}`}
                            disabled={false}
                            style={{
                                backgroundColor:
                                    indexSelected?.[data?.id] == index ? '#f5a391' : 'white',
                                padding: 10,
                            }}
                            onPress={() => {
                                indexSelected[data?.id] = index;
                                setIndexSelected({ ...indexSelected });
                                values[data?.id] = item?.value;
                                setValues({ ...values });
                            }}
                        >
                            <Text>{`${item.label}`}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

export default InputDropdown;

const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        width: 200,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
        color: 'black',
    },
});
