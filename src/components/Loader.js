import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Animated } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const sizes = {
    small: { width: 80, height: 20 },
    large: { width: 120, height: 30 },
}

export default function Loader({ size = 'large', fill = '#ced4da', style, children, ...props }) {
    // Create animated value state holder.
    const [state] = useState(new Animated.Value(0));

    // Start looping animation on mount.
    React.useEffect(() => {
        Animated.loop(
            // Run 0-1 and then 1-0 in a sequence.
            Animated.sequence([
                Animated.timing(state, {
                    toValue: 1,
                    duration: 350,
                    useNativeDriver: true,
                }),
    
                Animated.timing(state, {
                    toValue: 0,
                    duration: 350,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    });

    // Return the loader view.
    return (
        <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }, style]} {...props}>
            <Svg class="loader" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" style={{
                width: sizes[size].width,
                height: sizes[size].height,
            }}>
                <AnimatedCircle cx="15" cy="15"
                    fill={fill}
                    r={state.interpolate({
                        inputRange: [0, 1],
                        outputRange: [9, 15],
                    })}
                    fillOpacity={state.interpolate({
                        inputRange: [0, 1],
                        outputRange: [.5, 1],
                    })}
                />

                <AnimatedCircle cx="60" cy="15"
                    fill={fill}
                    r={state.interpolate({
                        inputRange: [0, 1],
                        outputRange: [15, 9],
                    })}
                    fillOpacity={state.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, .5],
                    })}
                />

                <AnimatedCircle cx="105" cy="15"
                    fill={fill}
                    r={state.interpolate({
                        inputRange: [0, 1],
                        outputRange: [9, 15],
                    })}
                    fillOpacity={state.interpolate({
                        inputRange: [0, 1],
                        outputRange: [.5, 1],
                    })}
                />
            </Svg>

            {children}
        </View>
    );
}

Loader.propTypes = {
    size: PropTypes.oneOf(['small', 'large']),
    fill: PropTypes.string,
}
