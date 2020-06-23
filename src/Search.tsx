import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ColorPropType,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {SearchBar} from './components/SearchBar';
import searchrestaurant from './api/searchrestaurant';
import {SearchList} from './components/SearchList';
import {ScrollView} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';
import {Location} from './components/Location';
import GEOLocation from '@react-native-community/geolocation';
import Geolocation from '@react-native-community/geolocation';

type restaurantinfo = {};

// stackNavigationProp help to navigate between the screen
interface IProp {
  navigation: StackNavigationProp<any, any>;
}

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

type SearchResultJson = {
  results_found: string;
  results_start: string;
  results_shown: string;
  restaurants: restaurants[];
};

interface IsearchText {
  currentLongitude: string;
  currentLatitude: string;
  isInternet: boolean;
  searchText: string;
  searchResult: SearchResultJson; //created custom object
}

class Search extends Component<IProp, IsearchText> {
  constructor(props: IProp) {
    super(props);
    this.state = {
      currentLongitude: 'unknown',
      currentLatitude: 'unknown',
      isInternet: false,
      searchText: '',
      searchResult: {
        results_found: '',
        results_start: '',
        results_shown: '',
        restaurants: [],
      },
    };
    this.searchResults('');
    // NetInfo.fetch().then(state => {
    //   if (state.isConnected) {
    //     this.searchResults('');
    //   }
    //   this.setState({isInternet: state.isConnected});
    // });
  }

  searchResults = async (searchparam: string) => {
    console.log(searchparam);
    try {
      let resultlength = await searchrestaurant.get('search', {
        params: {
          entity_id: 5404,
          entity_type: 'subzone',
          q: searchparam,
        },
      });
      this.setState({searchResult: resultlength.data});
    } catch (err) {
      console.log(err);
    }
  };

  unsubscribe = NetInfo.addEventListener(connection => {
    if (!connection.isConnected) {
      Alert.alert(
        'No Internet Connection',
        'No Internet connection. Try after some time',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      this.searchResults('');
    }

    this.setState({isInternet: connection.isConnected});
  });

  // method filtering out restaurant based on price_range
  filterRestaurantBasedOnPrice = (price_range: string) => {
    return this.state.searchResult.restaurants.filter(result => {
      return result.restaurant.price_range == price_range;
    });
  };

  // get current location using GEOLocation
  getGeoLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        this.setState({currentLongitude: currentLongitude});
        //Setting state Longitude to re re-render the Longitude Text
        this.setState({currentLatitude: currentLatitude});
        //Setting state Latitude to re re-render the Longitude Text
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>{this.state.isInternet ? '' : 'No Internet'}</Text>
        <SearchBar
          searchItem={this.state.searchText}
          onChangeSearchItem={(text: string) => {
            this.setState({searchText: text});
          }}
          onTextSubmitted={() => this.searchResults(this.state.searchText)}
        />

        <Location />

        <ScrollView>
          <SearchList
            title="Cost Effective"
            restaurantList={this.filterRestaurantBasedOnPrice('1')}
            navigationtonext={this.props.navigation}
          />
          <SearchList
            title="Bit Pricer"
            restaurantList={this.filterRestaurantBasedOnPrice('2')}
            navigationtonext={this.props.navigation}
          />
          <SearchList
            title="Big Spender"
            restaurantList={this.filterRestaurantBasedOnPrice('3')}
            navigationtonext={this.props.navigation}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
export default Search;
