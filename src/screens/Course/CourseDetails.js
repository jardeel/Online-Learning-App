import React, { useState, useRef } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Animated, Keyboard } from 'react-native';
// import Video from 'react-native-video';
import { Video } from 'expo-av';

import {IconButton, LineDivider} from "../../components";
import {
  COLORS, 
  FONTS,
  SIZES,
  icons,
  constants,
  dummyData
} from "../../constants";

const CourseDetails = ({ navigation, route }) => {

  const { selectedCourse } = route.params;
  const [playVideo, setPlayVideo] = useState(false);
  const video = useRef(null);

  function renderHeaderComponents() {
    return (
      <>
        {/* Back */}
        <View style={{ flex: 1 }}>
          <IconButton
            icon={icons.back}
            iconStyle={{ width: 25, height: 25, tintColor: COLORS.black }}
            containerStyle={{ 
              width: 40, 
              height: 40, 
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              backgroundColor: COLORS.white
            }}
            onPress={() => navigation.goBack()}
          />
        </View>

        {/* Share & Favourite */}
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            icon={icons.media}
            iconStyle={{tintColor: COLORS.white }}
            containerStyle={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          />

          <IconButton
            icon={icons.favourite_outline}
            iconStyle={{tintColor: COLORS.white }}
            containerStyle={{
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
      </>
    )
  }

  function renderHeader() {
    if(playVideo) {
      return (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.radius,
            paddingBottom: SIZES.base,
            height: 85,
            backgroundColor: COLORS.black,
            alignItems: "flex-end",
          }}
        >
          {renderHeaderComponents()}
        </View>
      )
    }else {
      return (
        <View
          style={{
            position: "absolute",
            top: SIZES.height > 800 ? 40 : 20,
            left: 0,
            right: 0,
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            zIndex: 1
          }}
        >
          {renderHeaderComponents()}
        </View>
      )
    }
  }

  function renderVideoSection(){
    return (
      <View 
        style={{ 
          height: SIZES.height > 800 ? 220 : 200,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.gray90
        }}
      >
        {/* Thumbnail */}
        <ImageBackground
          source={selectedCourse?.thumbnail}
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* Play Button */}
          <IconButton
            icon={icons.play}
            iconStyle={{
              width: 25, 
              height: 25,
              tintColor: COLORS.white
            }}
            containerStyle={{ 
              width: 55,
              height: 55,
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.padding,
              borderRadius: 30,
              backgroundColor: COLORS.primary
            }}
            onPress={() => setPlayVideo(true)}
          />
        </ImageBackground>
        {playVideo && 
          <Video 
            ref={video}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: COLORS.black
            }}
            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        }
      </View>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Header Bar */}
      {renderHeader()}

      {/* Video */}
      {renderVideoSection()}
    </View>
  )
}

export default CourseDetails;