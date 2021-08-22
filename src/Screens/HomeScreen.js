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
  Modal,
} from 'react-native';
import config from '../../config/config';
import Categories from '../Components/Categories';
import TrendingNews from '../Components/TrendingNews';
import PremiumModal from './PremiumModal';

const {width, height} = Dimensions.get('window');

const BASE_URL =
  'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=';

class HomeScreen extends Component {
  state = {
    news: [],
    premiumVisible: false,
  };
  togglePremiumModal() {
    this.setState({premiumVisible: !this.state.premiumVisible});
  }
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
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.premiumVisible}
          onRequestClose={() => this.togglePremiumModal()}>
          <PremiumModal closeModal={() => this.togglePremiumModal()} />
        </Modal>
        <TouchableOpacity onPress={() => this.togglePremiumModal()}>
          <Text style={styles.premium}>Premium</Text>
        </TouchableOpacity>
        <Categories
          style={styles.topNavigate}
          navigation={this.props.navigation}
        />
        <TrendingNews
          style={styles.trendingNews}
          navigation={this.props.navigation}
        />

        <View style={styles.newsRow}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topNavigate: {
    flex: 1,
    color: 'red',
  },
  trendingNews: {
    flex: 10,
    color: 'blue',
  },
  newsRow: {
    flex: 10,
    color: 'green',
  },
  newContainer: {
    flexDirection: 'row',
    margin: 2,
  },
  newThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 6,
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
  premium: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 20,
    color: 'gray',
  },
});

export default HomeScreen;
