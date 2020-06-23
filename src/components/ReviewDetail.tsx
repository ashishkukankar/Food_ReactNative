import * as React from 'react';
import {View, StyleSheet, Text, FlatList, Image} from 'react-native';
import {Card, Avatar, Rating} from 'react-native-elements';
import {Directions, ScrollView} from 'react-native-gesture-handler';

export interface AppProps {}

export interface AppState {}

type user = {
  name: string;
  profile_image: string;
};

type review = {
  review: reviewdata;
};

type reviewdata = {
  rating: number;
  review_text: string;
  id: number;
  user: user;
};

type reviews = {
  reviewdetail: review[];
};

export function ReviewDetail({reviewdetail}: reviews) {
  return (
    <View style={{flex: 1, marginBottom: 10}}>
      <FlatList
        keyExtractor={reviewdetail => 'key' + reviewdetail.review.id}
        data={reviewdetail}
        renderItem={({item}) => {
          return (
            <ScrollView>
              <Card>
                <View style={{flexDirection: 'row'}}>
                  <Avatar
                    size="small"
                    rounded
                    source={{uri: item.review.user.profile_image}}
                  />
                  <Text style={styles.userStyle}>{item.review.user.name}</Text>
                </View>
                <View>
                  <Rating
                    type="custom"
                    readonly
                    ratingColor="red"
                    ratingBackgroundColor="#c8c7c8"
                    ratingCount={5}
                    imageSize={10}
                    style={styles.ratingStyle}
                  />
                  <Text style={{marginHorizontal: 10}}>
                    {item.review.review_text}
                  </Text>
                </View>
              </Card>
            </ScrollView>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 50,
    height: 50,
    alignItems: 'center',
  },
  userStyle: {
    margin: 5,
    fontSize: 14,
  },
  ratingStyle: {
    marginHorizontal: 40,
    alignSelf: 'flex-start',
  },
});
