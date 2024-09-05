import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedProps, useDerivedValue } from 'react-native-reanimated';
import { Circle, Svg } from 'react-native-svg';
import COLORS from '../../consts/Colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);


const ProgressCircle = ({ percentage, radius }) => {
    const circumference = 2 * Math.PI * radius;
    const animatedProps = useAnimatedProps(() => {
        const strokeDashoffset = circumference * (1 - percentage / 100);
        return { strokeDashoffset };
    });
    return (
        <Svg width={radius * 2} height={radius * 2}>
            <Circle
                cx={radius}
                cy={radius}
                r={radius - 5}
                fill="transparent"
                stroke="#e1e1e1"
                strokeWidth="10"
            />
            <AnimatedCircle
                cx={radius}
                cy={radius}
                r={radius - 5}
                fill="transparent"
                stroke={COLORS.main}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={[circumference]}
                animatedProps={animatedProps}
            />
        </Svg>
    )
}

export default ProgressCircle

const styles = StyleSheet.create({})