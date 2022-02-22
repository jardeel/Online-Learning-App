import React from 'react';
import { 
  View, 
  Text,
  TextInput,
  Keyboard,
  FlatList,
  Image
} from 'react-native';

import { IconButton, IconLabelButton } from '../../../components';
import {
  COLORS, 
  FONTS,
  SIZES,
  icons,
  dummyData
} from '../../../constants';

const CommentSection = ({commentItem, commentOption, replies}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: SIZES.padding
      }}
    >
      {/* Profile Photo */}
      <Image
        source={commentItem?.profile}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20
        }}
      />

      {/* Name & Comment */}
      <View
        style={{
          flex: 1,
          marginTop: 3,
          marginLeft: SIZES.radius
        }}
      >
        {/* Name */}
        <Text style={{ ...FONTS.h3b }}>
          {commentItem?.name}
        </Text>

        {/* Comment */}
        <Text>
          {commentItem?.comment}
        </Text>

        {/* Comment Options */}
        {commentOption}
      </View>
    </View>
  )
}

const CourseDiscussions = () => {

  function renderDiscussions() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={dummyData?.course_details?.discussions}
          keyExtractor={item => `Discussions-main-${item.id}`}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding,
            paddingBottom: 70
          }}
          renderItem={({ item, index }) => (
            <CommentSection
              commentItem={item}
              commentOption={
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: SIZES.radius,
                    paddingVertical: SIZES.base,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: COLORS.gray20
                  }}
                >
                  {/* Comment */}
                  <IconLabelButton
                    icon={icons.comment}
                    label={item?.no_of_comments}
                    iconStyle={{
                      tintColor: COLORS.black 
                    }}
                    labelStyle={{
                      marginLeft: 3, 
                      color: COLORS.black,
                      ...FONTS.h4b
                    }} 
                  />

                  {/* Like */}
                  <IconLabelButton
                    icon={icons.heart}
                    label={item?.no_of_likes}
                    containerStyle={{
                      marginLeft: SIZES.radius
                    }}
                    labelStyle={{
                      marginLeft: 3, 
                      color: COLORS.black,
                      ...FONTS.h4b
                    }}
                  />

                  {/* Date */}
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'right',
                      ...FONTS.h4
                    }}
                  >
                    {item?.posted_on}
                  </Text>
                </View>
              }
              //replies
            />
          )}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      
      {/* Discussions */}
      {renderDiscussions()}

      {/* Footer */}
    </View>
  )
}

export default CourseDiscussions;