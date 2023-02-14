import { useState, useEffect } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { icons, images } from '../constants'
import {constant} from '../constants/constant'
import axios from 'axios'

const Home = ({navigation}) => {

  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`${constant.baseUrl}/api/category`);
      setCategory(res.data.categories)
    };
    fetchCategories();

    const fetchProducts = async () => {
      const res = await axios.get(`${constant.baseUrl}/api/product`);
      setProducts(res.data.products)
    };
    fetchProducts();
  }, []);

  const renderProducts = ({item}) => {
    return (
      <View style={styles.productContainer}>
        <View style={styles.productContent}>
          <Image
            style={styles.productImg}
            source={{uri: `${item.productImg}`}}
          />
          <View style={styles.productBar}>
            <Text style={styles.productHeading}>{item.productName}</Text>
            <Text style={styles.productDesc}>{item.productDesc}</Text>
          </View>
        </View>
        <View style={styles.priceCon}>
          <Text style={styles.price}>
            {item.price}-per {item.unit}
          </Text>
          <TouchableOpacity style={styles.Add}>
            <Text style={styles.AddText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const renderItem = ({item}) => {
    return (
      <View style={styles.categories}>
        <View style={styles.categoriesContent}>
          <Image
            style={styles.categoryImage}
            source={{
              uri: `${item.categoryImg}`,
            }}
          />
          <Text style={styles.categoryName}>{item.categoryName}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>SAYLANI WELFARE</Text>
          <Text style={styles.subheading}>DISCOUNT STORE</Text>
        </View>
        <View>
        <Image
            style={{width: 25, height: 25, alignContent: 'center'}}
            source={icons.basket}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.banner}>
          <Image source={images.grocery} style={styles.bannerImage} />
        </View>
        <View>
          <TextInput placeholder="Search Here...." style={styles.input} />
        </View>
        <View>
          <Text style={styles.h1}>Shop By Category</Text>
        </View>
        <View>
          <FlatList
            data={category}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => `${item._id}`}
            renderItem={renderItem}
            style={styles.catList}
          />
        </View>
        <View>
          <FlatList
            data={products}
            vertical
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => `${item._id}`}
            renderItem={renderProducts}
            style={styles.catList}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  categoriesContent: {
    alignItems: 'center',
  },

  heading: {
    color: '#61B846',
    fontSize: 18,
    fontWeight: '700',
  },
  subheading: {
    color: '#024F9D',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 25,
    backgroundColor: '#E8E8E8',
    marginTop: 5,
    padding: 5,
    color: '#6d6e71',
    paddingLeft: 20,
  },
  cart: {
    color: '#000000',
  },

  bannerImage: {
    marginLeft: 17,
    marginRight: 18,
    width: 326,
    height: 258,
    resizeMode: 'contain',
  },
  h1: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
    paddingLeft: 25,
    paddingRight: 22,
    paddingTop: 15,
  },
  categoryImage: {
    width: 120,
    height: 80,
    resizeMode: 'cover',
    borderColor: '#9cd38b',
    borderWidth: 1,
    borderRadius: 15,
  },

  categories: {
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginTop: 15,
  },
  categoryName: {
    color: 'green',
    fontWeight: '600',
    fontSize: 14,
  },
  productImg: {
    width: 70,
    height: 70,
    borderRadius: 7,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 5,
  },
  productContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productHeading: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productBar: {
    marginLeft: 10,
  },
  productDesc: {
    color: '#808080',
  },
  price: {
    color: '#000',
    fontWeight: '700',
  },
  priceCon: {
    paddingRight: 7,
  },
  Add: {
    marginTop: 10,
    width: 60,
    marginLeft: 20,
    backgroundColor: '#59b300',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 8,
    borderRadius: 15,
  },
  AddText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

 export default Home