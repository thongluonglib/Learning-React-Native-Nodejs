import { processColor, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { LineChart } from 'react-native-charts-wrapper';
import { times } from 'lodash'
function _randomParabolaValues(size: number) {
    return times(size, (index) => {
        return { x: index, y: index * index }
    });
}
const data = {
    dataSets: [{
        values: _randomParabolaValues(80),
        label: 'refer',
        config: {
            lineWidth: 2,
            drawValues: false,
            drawCircles: false,
            highlightColor: processColor('red'),
            color: processColor('red'),
            drawFilled: true,
            fillColor: processColor('blue'),
            fillAlpha: 60,
            highlightEnabled: false,
            // dashedLine: {
            //     lineLength: 20,
            //     spaceLength: 20
            // }
        }
    }, {
        values: [
            { x: 1, y: 11000, marker: "a very long long long long long long long long \nmarker at top left" },
            // ..._randomParabolaValues(50),
            { x: 20, y: 90, marker: "eat eat eat, never\n stop eat" },
            { x: 40, y: -130, marker: "" },
            { x: 65, y: 11000, marker: "test top center marker" },
            { x: 70, y: -2000, marker: "eat more" },
            { x: 90, y: 9000, marker: "your are overweight, eat less" },
            { x: 100, y: 11000, marker: "test top right marker" }
        ],

        label: 'user',
        config: {
            lineWidth: 1,
            drawValues: true,
            circleRadius: 5,
            highlightEnabled: true,
            drawHighlightIndicators: true,
            color: processColor('red'),
            drawFilled: true,
            valueTextSize: 10,
            fillColor: processColor('red'),
            fillAlpha: 45,
            valueFormatter: "$###.0",
            circleColor: processColor('red'),
        }
    }]
}

const legend = {
    enabled: true,
    textColor: processColor('red'),
    textSize: 12,
    form: 'SQUARE',
    formSize: 14,
    xEntrySpace: 10,
    yEntrySpace: 5,
    formToTextSpace: 5,
    wordWrapEnabled: true,
    maxSizePercent: 0.5,
    custom: {
        colors: [processColor('red'), processColor('red')],
        labels: ['REFER', 'USER',]
    }
}

const marker = {
    enabled: true,
    markerColor: processColor('#F0C0FF8C'),
    textColor: processColor('white'),
    markerFontSize: 14,
}
let borderColor = processColor("red");
const yAxis = { left: { axisMaximum: 12000 }, right: { enabled: false } }
const TimeSeriesLineChart = () => {
    const [state, setState] = useState({
        data: data,
        legend: legend,
        marker: marker,
        yAxis: yAxis,
        selectedEntry: ''
    })

    function handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            setState({ ...state, selectedEntry: null })
        } else {
            setState({ ...state, selectedEntry: JSON.stringify(entry) })
        }

        console.log(event.nativeEvent)
    }
    return (
        <View style={{ height: 500, width: '100%' }}>
            <LineChart
                style={{ flex: 1 }}
                data={data}
                chartDescription={{ text: '' }}
                legend={legend}
                marker={marker}

                drawGridBackground={true}

                borderColor={borderColor}
                borderWidth={1}
                drawBorders={true}

                yAxis={yAxis}


                onSelect={handleSelect.bind(this)}
                onChange={(event) => console.log(event.nativeEvent)}

            // ref="chart"
            />
        </View>
    )
}

export default TimeSeriesLineChart

const styles = StyleSheet.create({})