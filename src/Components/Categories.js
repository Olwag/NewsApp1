import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const categories = [
  'Entertainment',
  'Business',
  'Politics',
  'Health',
  'Technology',
  'Sports',
];

class Categories extends Component {
  render() {
    console.log(categories);
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              this.props.navigation.navigate('GetNews', {category});
            }}>
            <View>
              <Text style={styles.categoryTitle}> {category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  categoryTitle: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: 10,
  },
});

export default Categories;
