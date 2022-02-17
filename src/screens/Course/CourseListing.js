import React from 'react';
import {
  View, 
  Text,
  Image,
  FlatList,
  StyleSheet
} from 'react-native';
// import { navigation } from '@react-navigation/native';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { SharedElement } from 'react-native-shared-element';

import {
  IconButton,
  HorizontalCourseCard,
  LineDivider
} from '../../components';

import {
  COLORS, 
  FONTS,
  SIZES,
  images,
  icons,
  dummyData
} from '../../constants';

const CourseListing = ({ navigation, route }) => {
  //const navigation = useNavigation();
  const { category, sharedElementPrefix } = route.params;

  //Handler
  function backHandler(){
    navigation.goBack()
  }

  //Render
  function renderHeader(){
    return(
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 250,
          overflow: "hidden"
        }}
      >
        {/* Background Image */}

        <SharedElement
          id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}
        >
          <Image
            source={category?.thumbnail}
            resizeMode="cover"
            style={{
              height: "100%",
              width: "100%",
              borderBottomLeftRadius: 60
            }}
          />
        </SharedElement>

        {/* Title */}
        <Animated.View
          style={{
            position: "absolute",
            bottom: 70, 
            left: 30
          }}
        >
          <SharedElement
            id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
            style={[StyleSheet.absoluteFillObject]}
          >
            <Text
              style={{
                position: "absolute",
                color: COLORS.white,
                ...FONTS.h1
              }}
            >
              {category?.title}
            </Text>
          </SharedElement>
        </Animated.View>
        
        {/* Back */}
        <Animated.View>
          <IconButton
            icon={icons.back}
            iconStyle={{
              tintColor: COLORS.black
            }}
            containerStyle={{
              position: "absolute",
              top: 40,
              left: 20, 
              width: 50, 
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 25,
              backgroundColor: COLORS.white
            }}
            onPress={() => { backHandler() }}
            //onPress={() => goBack()}
          />
        </Animated.View>

      </Animated.View>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      
      {/* Header */}
      {renderHeader()}
    </View>
  )
}

CourseListing.sharedElement = (route, otherRoute, showing) => {
  const { category, sharedElementPrefix } = route.params;
  return [
    {
      id: `${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`
    },
    {
      id: `${sharedElementPrefix}-CategoryCard-Title-${category?.id}`
    }
  ]
}

export default CourseListing;