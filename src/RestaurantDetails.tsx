import React from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import {Route} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from './api/searchrestaurant';
import {ReviewDetail} from './components/ReviewDetail';

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
interface AppProps {
  route: Route<any>;
  navigation: StackNavigationProp<any, any>;
}

interface restaurantValue {
  id: string;
  feature_image: string;
  restaurant_name: string;
  restaurantReview: review[];
}

class RestaurantDetails extends React.Component<AppProps, restaurantValue> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      id: '',
      feature_image: '',
      restaurant_name: '',
      restaurantReview: [],
    };
    this.getRestaurantDetail();
  }

  getRestaurantDetail = async () => {
    const values = (Object as any).values(this.props.route.params); // this line get array of value from route.param
    this.props.navigation.setOptions({
      headerTitle: values[2],
    });

    let results = await axios.get('reviews', {
      params: {res_id: values[0]},
    });
    this.setState({restaurantReview: results.data.user_reviews});
    this.setState({restaurant_name: values[2]});
    this.setState({feature_image: values[1]}); //saving feature_image
  };

  public render() {
    return (
      <View style={{flex: 1}}>
        <Image
          style={styles.featureImageStyle}
          source={{
            uri:
              this.state.feature_image == ''
                ? 'https://picsum.photos/200'
                : this.state.feature_image,
          }}
        />
        <Text>{this.state.restaurant_name}</Text>
        <ReviewDetail reviewdetail={this.state.restaurantReview} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  featureImageStyle: {
    width: '100%',
    height: '40%',
  },
});
export default RestaurantDetails;
