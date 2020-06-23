import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import RestaurantDetails from '../RestaurantDetails';

type restaurant = {
  id: string;
  name: string;
  url: string;
  price_range: string;
  currency: string;
  thumb: string;
  featured_image: string;
  menu_url: string;
};
type restaurants = {
  restaurant: restaurant;
};

type SearchList = {
  title: string;
  restaurantList: restaurants[];
  navigationtonext: StackNavigationProp<any, any>;
};

export function SearchList({
  title,
  restaurantList,
  navigationtonext,
}: SearchList) {
  return (
    <View>
      <Text style={styles.titleStyle}>{title}</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={restaurantList}
        keyExtractor={restaurantList => restaurantList.restaurant.id}
        renderItem={({item}) => {
          return (
            <View style={{margin: 10}}>
              <TouchableOpacity
                onPress={() =>
                  navigationtonext.navigate('ResultDetail', {
                    id: item.restaurant.id,
                    featured_image: item.restaurant.featured_image,
                    restaurant_name: item.restaurant.name,
                  })
                }>
                <Image
                  style={styles.ImageStyle}
                  source={{
                    uri:
                      item.restaurant.thumb == ''
                        ? 'https://picsum.photos/200'
                        : item.restaurant.thumb,
                  }}
                />
                <Text style={styles.restauranttext}>
                  {item.restaurant.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ImageStyle: {
    height: 200,
    width: 300,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  restauranttext: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
