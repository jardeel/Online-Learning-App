import React from 'react';
import { TouchableOpacity, Text, ImageBackground } from 'react-native';

import { COLORS, FONTS, SIZES } from '../constants';

const CategoryCard = ({ category, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <ImageBackground
        source={category?.thumbnail}
        resizeMode="cover"
        style={{
          height: 150, 
          width: 200,
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          justifyContent: 'flex-end',
          ...containerStyle
        }}
        imageStyle={{ borderRadius: SIZES.radius }}
      >
        <Text style={{color: COLORS.white, ...FONTS.h2}}>{category?.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default CategoryCard;