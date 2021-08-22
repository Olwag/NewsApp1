import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import config from '../../config/config';

const BASE_URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=';
class TrendingNews extends Component {
  state = {
    news: [],
  };
  componentDidMount() {
    const newsURL = `${BASE_URL}${config.API_KEY}`;
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
          <ActivityIndicator color="blue" size="large" />
        ) : (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.state.news.map((news, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  this.props.navigation.navigate('WebView', {
                    url: news.url,
                  })
                }>
                <View style={styles.newContainer}>
                  <Image
                    source={{uri: `${news.urlToImage}`}}
                    style={styles.newThumbnail}
                  />
                  <Text style={styles.newTitle}>{news.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  newContainer: {
    margin: 5,
  },
  newThumbnail: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  newTitle: {
    width: 120,
    textAlign: 'justify',
  },
});

export default TrendingNews;
