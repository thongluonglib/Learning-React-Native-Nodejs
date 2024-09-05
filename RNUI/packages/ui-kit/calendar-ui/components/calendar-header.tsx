import dayjs from "dayjs";
import { View, Text, StyleSheet } from "react-native";

export const CustomArrow = ({ direction }: {direction: 'left' | 'right'}) => (
    <View
        style={(styles.arrow, { paddingHorizontal: direction === 'left' ? 20 : 0 })}>
        <Text style={styles.arrowText}>{direction === 'left' ? '<' : '>'}</Text>
    </View>
);

function CalendarHeader({ date }: { date: string }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '500' }}>
                {' '}
                {`Tháng ${dayjs(date).format('MM')}`}
            </Text>
            <Text
                style={{
                    color: '#FFFFFF',
                    fontSize: 12,
                    fontWeight: '400',
                    top: -2,
                }}>
                {' '}
                {`${dayjs(date).format('YYYY')}`}
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    arrow: {
        backgroundColor: '#FFFFFF',
    },
    arrowText: {
        fontSize: 20,
        color: '#FFFFFF',
        right: 15,
    },

});

export default CalendarHeader
