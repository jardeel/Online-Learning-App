import React from 'react';
import { 
  View,
  Text,
  Image,
  TouchableOpacity, 
  ScrollView
} from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  withDelay,
  withTiming
} from 'react-native-reanimated';

import { TextButton, LineDivider } from '../components';
import { COLORS, FONTS, SIZES, icons, constants } from '../constants';

const FilterModal = ({ 
filterModalSharedValueOne, 
filterModalSharedValueTwo }) => {

  const filterModalContainerAnimatedStyle = useAnimatedStyle(
    () => {
      return {
        opacity: interpolate(filterModalSharedValueOne.value, 
          [SIZES.height, 0], [0, 1]),
        transform: [
          {
            translateY: filterModalSharedValueOne.value
          }
        ]
      }
    }
  )

  const filterModalBgAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(filterModalSharedValueTwo.value, 
        [SIZES.height, 0], [0, 1])
    }
  });

  const filterModalContentAnimatedStyle = useAnimatedStyle(
    () => {
      return {
        opacity: interpolate(filterModalSharedValueTwo.value,
          [SIZES.height, 0], [0, 1]),
        transform: [
          {
            translateY: filterModalSharedValueTwo.value
          }
        ]
      }
    }
  )


  return (
    // Main Container
    <Animated.View
      style={[{
        position: "absolute",
        bottom: 0,
        height: SIZES.height,
        width: SIZES.width
      },filterModalContainerAnimatedStyle]}
    >

      {/* Background Container  */}
      <Animated.View
        style={[{
          flex: 1, 
          height: SIZES.height, 
          width: SIZES.width,
          backgroundColor: COLORS.transparentBlack7
        }, filterModalBgAnimatedStyle]}
      >
        {/* Content Container */}
        <Animated.View
          style={[{
            position: "absolute",
            bottom: 0,
            height: SIZES.height * 0.9,
            width: SIZES.width, 
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: COLORS.white
          }, filterModalContentAnimatedStyle]}
        > 

        </Animated.View>

      </Animated.View>
    </Animated.View>
  )
}

export default FilterModal;