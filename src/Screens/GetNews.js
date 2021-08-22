import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import config from '../../config/config';

const BASE_URL = 'https://newsapi.org/v2/top-headlines?';
const {width, height} = Dimensions.get('window');

class GetNews extends Component {
  state = {
    news: [],
  };
  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.category,
    });
    const newsURL = `${BASE_URL}category=${this.props.route.params.category}&country=us&apiKey=${config.API_KEY}`;
    console.log(newsURL);
    fetch(newsURL)
      .then(res => res.json())
      .then(response => {
        this.setState({
          news: response.articles,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <View>
        {this.state.news.length == 0 ? (
          <ActivityIndicator
            color="blue"
            size="large"
            style={styles.indicator}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.state.news.map((news, index) =>
              news.urlToImage ? (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    this.props.navigation.navigate('WebView', {
                      url: news.url,
                    });
                  }}>
                  <View style={styles.newContainer}>
                    <Image
                      source={{uri: `${news.urlToImage}`}}
                      style={styles.newThumbnail}
                    />
                    <Text style={styles.newTitle}>{news.title}</Text>
                  </View>
                </TouchableOpacity>
              ) : null,
            )}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  newContainer: {
    flexDirection: 'row',
    margin: 2,
  },
  newThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  newTitle: {
    paddingTop: 5,
    paddingLeft: 10,
  },
  indicator: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GetNews;
