import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import COLORS from '../../consts/Colors';
import { PieChart, ProgressChart } from 'react-native-chart-kit';
import Pie from 'react-native-pie';
const { width, height } = Dimensions.get("window");

const Speedometer = ({ value, minValue, maxValue, size, strokeWidth, backgroundColor, fillColor, textColor, route }) => {
    // const {value} = route.params
    // console.log(value);

    return (

        <View style={{ width: 175, alignItems: 'center' }}>
            <Pie
                radius={80}
                innerRadius={65}
                sections={[
                    {
                        percentage: value,
                        color: COLORS.main,
                    },
                ]}
                backgroundColor="#ddd"
            />
            <View
                style={styles.gauge}
            >
                <Text
                    style={styles.gaugeText}
                >
                    {value}%
                </Text>
            </View>
        </View>


        // <ProgressChart
        //     data={{
        //         labels: ["Swim"], // optional
        //         data: [0.4,]
        //     }}
        //     width={width - 40}
        //     height={220}
        //     strokeWidth={16}
        //     radius={32}
        //     chartConfig={{
        //         backgroundGradientFrom: COLORS.white,
        //         backgroundGradientFromOpacity: 0,
        //         backgroundGradientTo: COLORS.white,
        //         backgroundGradientToOpacity: 0.5,
        //         color: opacity => `rgba(255, 222, 89, ${opacity})`,
        //         labelColor: opacity => `${COLORS.gray}`,
        //         strokeWidth: 2, // optional, default 3
        //         barPercentage: 0.5,
        //         useShadowColorFromDataset: false // optional
        //     }}
        //     bezier
        //     style={{
        //         marginVertical: 8,
        //         borderRadius: 16
        //     }}
        //     hideLegend={false}
        // />
    )
}

export default Speedometer


Speedometer.defaultProps = {
    value: 0,
    minValue: 0,
    maxValue: 100,
    size: 200,
    strokeWidth: 20,
    backgroundColor: '#f0f0f0',
    fillColor: '#E53D00',
    textColor: '#000',
};

const styles = StyleSheet.create({
    gauge: {
        position: 'absolute',
        width: 100,
        height: 160,
        // top:'60%',
        // backgroundColor:COLORS.light,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: 'red',
        fontSize: 12,
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: COLORS.light,
        borderRadius: 5,
    },
})