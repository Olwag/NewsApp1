import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import NativeButton from 'apsl-react-native-button';
import AntDeSign from 'react-native-vector-icons/AntDesign';
import IAP from 'react-native-iap';

const itemSkus = Platform.select({
  ios: [
    // 'com.cooni.point1000',
    // 'com.cooni.point5000', // dooboolab
  ],
  android: [
    'buy_vip_a_week',
    'buy_vip_a_month',
    'buy_vip_three_month',
    'buy_vip_six_month',
    'buy_vip_a_year',
    // 'android.test.purchased',
    // 'android.test.canceled',
    // 'android.test.refunded',
    // 'android.test.item_unavailable',
  ],
});

class PremiumModal extends Component {
  state = {
    products: [],
  };
  componentDidMount() {
    this.initIAP();
  }

  initIAP() {
    IAP.initConnection()
      .catch(() => {
        console.log('Error connecting to store');
      })
      .then(() => {
        IAP.getSubscriptions(itemSkus)
          .catch(() => {
            console.log('Error finding items');
          })
          .then(res => {
            this.setState({products: res ? res : []});
          });
      });
  }

  renderIapItem = item => {
    return (
      <View style={styles.iapContainer}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={styles.iapTitleTxt}>{item.title}</Text>
            <Text style={styles.iapDesTxt}>{item.description}</Text>
            <Text style={styles.iapPriceTxt}>{item.localizedPrice}</Text>
          </View>
        </View>
        <NativeButton
          // onPress={(): void => this.requestPurchase(product.productId)}
          onPress={() => IAP.requestSubscription(item.productId)}
          activeOpacity={0.5}
          style={styles.buyBtn}
          textStyle={styles.txt}>
          <Text>Buy</Text>
        </NativeButton>
      </View>
    );
  };
  render() {
    const products = this.state.products;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{position: 'absolute', top: 32, left: 32}}
          onPress={this.props.closeModal}>
          <AntDeSign name="close" size={24} color={'black'} />
        </TouchableOpacity>
        {products && products.length > 0 ? (
          <View style={[styles.section, {flex: 7}]}>
            <FlatList
              data={products}
              renderItem={({item}) => this.renderIapItem(item)}
              keyExtractor={item => item.productID}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingTop: 32,
                paddingVertical: 16,
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <View style={[styles.section, {flex: 7}, {justifyContent: 'center'}]}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Fetching products. Please wait..</Text>
          </View>
        )}

        <View style={{flex: 1}}>
          <Text style={({fontSize: 18}, {fontWeight: 'bold'})}>
            Premium benefits
          </Text>
          <Text style={{color: 'blue'}}>No Ads</Text>
          <Text style={{color: 'gray'}}>
            Your subscription will auto re-new after period time and you will be
            charged the amount specified above
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  section: {
    paddingTop: 48,
  },
  iapContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    width: '100%',
    backgroundColor: 'aliceblue',
  },
  iapTitleTxt: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    minHeight: 20,
    paddingHorizontal: 5,
    marginLeft: 20,
  },

  iapDesTxt: {
    marginTop: 5,
    fontSize: 16,
    color: 'black',
    minHeight: 20,
    paddingHorizontal: 5,
    marginLeft: 20,
  },
  iapPriceTxt: {
    marginTop: 5,
    fontSize: 18,
    color: 'red',
    minHeight: 20,
    paddingHorizontal: 5,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  buyBtn: {
    height: '30%',
    width: '18%',
    alignSelf: 'center',
    backgroundColor: 'blue',
    borderRadius: 15,
    borderWidth: 0,
  },
});

export default PremiumModal;
