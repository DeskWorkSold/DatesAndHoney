import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import COLORS from '../../consts/Colors';
import { PieChart, ProgressChart } from 'react-native-chart-kit';
import Pie from 'react-native-pie';
const { width, height } = Dimensions.get("window");

const CustomeEfilatedCode = ({ value, minValue, maxValue, size, strokeWidth, backgroundColor, fillColor, textColor, route }) => {

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
    )
}

export default CustomeEfilatedCode


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