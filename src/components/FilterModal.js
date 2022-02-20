import React, { useState } from 'react';
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

const ClassTypeOption = ({ containerStyle, classType, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: isSelected ? COLORS.primary3 : COLORS.additionalColor9,
        ...containerStyle
      }}
      onPress={onPress}
    >
      <Image 
        source={classType.icon}
        resizeMode="contain"
        style={{
          width: 40,
          height: 40,
          tintColor: isSelected ? COLORS.white : COLORS.gray80
        }}
      />

      <Text
        style={{ 
          marginTop: SIZES.base,
          color: isSelected ? COLORS.white : COLORS.gray80,
          ...FONTS.h3
        }}
      >
        {classType.label}
      </Text>
    </TouchableOpacity>
  )
}

const ClassLevelOption = ({ containerStyle, classLevel, isLastItem, isSelected, onPress }) => {
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          ...containerStyle
        }}
        onPress={onPress}
      >
        <Text style={{flex: 1, ...FONTS.body3}}>
          {classLevel.label}
        </Text>

        <Image
          source={isSelected ? icons.checkbox_on : icons.checkbox_off}
          resizeMode="contain"
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>

      {isLastItem && <LineDivider lineStyle={{ height: 1 }} />}
    </>
  )
}

const FilterModal = ({ 
filterModalSharedValueOne, 
filterModalSharedValueTwo }) => {

  const [selectedClassType, setSelectedClassType] = useState("");
  const [selectedClassLevel, setSelectedClassLevel] = useState("");
  const [selectedCreateWithin, setSelectedCreateWithin] = useState("");

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
          {/* Header */}
          <View
            style={{
              marginTop: SIZES.padding,
              flexDirection: 'row',
              paddingHorizontal: SIZES.padding
            }}
          >
            <View style={{width: 60}} />
            <Text
              style={{ flex: 1, textAlign: 'center', ...FONTS.h1}}
            >
              Filter
            </Text>

            <TextButton
              label="Cancel"
              contentContainerStyle={{ width: 60, backgroundColor: null }}
              labelStyle={{ color: COLORS.black, ...FONTS.body3}}
              onPress={() => {
                filterModalSharedValueTwo.value = withTiming(SIZES.height, {
                  duration: 500
                })

                filterModalSharedValueOne.value = withDelay(500, withTiming(
                  SIZES.height, { duration: 100 }
                ))
              }}
            />
          </View>

          {/* Content */}
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding,
              paddingBottom: 50
            }}
          >
            {/* Class Type */}
            <View style={{ marginTop: SIZES.radius }}>
              <Text style={{ ...FONTS.h3b }}>Class Type</Text>

              <View style={{flexDirection: 'row', marginTop: SIZES.radius}}>
                {constants.class_types.map((item, index) => {
                  return (
                    <ClassTypeOption
                      key={`ClassType-${index}`}
                      classType={item}
                      isSelected={selectedClassType == item?.id}
                      containerStyle={{
                        marginLeft: index == 0 ? 0 : SIZES.base
                      }}
                      onPress={() => {
                        setSelectedClassType(item.id)
                      }}
                    />
                  )
                })}
              </View>
            </View>

            {/* Class Level */}
            <View style={{ marginTop: SIZES.padding }}>
              <Text style={{...FONTS.h3b}}>
                Class Level
              </Text>
              <View>
                {constants.class_levels.map((item, index) => {
                  return (
                    <ClassLevelOption
                      key={`ClassType-${index}`}
                      classLevel={item}
                      isLastItem={index == constants.class_levels.length - 1}
                      isSelected={selectedClassLevel == item?.id}
                      onPress={() => {setSelectedClassLevel(item.id)}}
                    />
                  )
                })}
              </View>
            </View>

          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  )
}

export default FilterModal;