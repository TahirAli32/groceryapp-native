import { useState, useEffect } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Image, FlatList, ToastAndroid, Pressable } from 'react-native'
import { icons, images, baseUrl } from '../constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/cartReducer'

const Home = ({navigation}) => {

  const dispatch = useDispatch()
  const cartProducts = useSelector(state => state.cart.products)

  const [category, setCategory] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`${baseUrl}/api/category`)
      setCategory(res.data.categories)
    }
    fetchCategories()

    const fetchProducts = async () => {
      const res = await axios.get(`${baseUrl}/api/product`)
      setProducts(res.data.products)
    }
    fetchProducts()
  }, [])

  const renderItem = ({item}) => {
    return (
      <Pressable onPress={()=> ToastAndroid.show(item.categoryName, ToastAndroid.SHORT)}>
        <View style={styles.categoriesContent}>
          <Image
            style={styles.categoryImage}
            source={{
              uri: `${item.categoryImg}`,
            }}
          />
          <Text style={styles.categoryName}>{item.categoryName}</Text>
        </View>
      </Pressable>
    )
  }

  const addToCartItem = (item) => {
    let obj = {}
    ToastAndroid.show('Item Added to Cart', ToastAndroid.SHORT)
    console.log(item)
    obj['id'] = item._id
    obj['name'] = item.productName
    obj['img'] = item.productImg
    obj['price'] = item.price
    obj['quantity'] = 1
    obj['size'] = item.productSize
    obj['unit'] = item.unit
    dispatch(addToCart(obj))
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>SAYLANI WELFARE</Text>
            <Text style={styles.subheading}>DISCOUNT STORE</Text>
          </View>
          <View>
            <Pressable onPress={() => navigation.navigate('Cart')}>
              <Image
                style={{ width: 25, height: 25, alignContent: 'center' }}
                source={icons.basket}
              />
            </Pressable>
          </View>
        </View>
        <ScrollView>
          <View style={{paddingHorizontal: 15}}>
            <View style={styles.banner}>
              <Image source={images.grocery} />
            </View>
            <View style={styles.inputView}>
              <Image
                style={{ width: 16, height: 16, marginRight: 10 }}
                source={icons.search_icon}
              />
              <TextInput placeholder="Search by Product Name" style={styles.inputBox} />
            </View>
            <View style={styles.categoryView}>
              <Text style={styles.h1}>Shop By Category</Text>
              <FlatList
                data={category}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => `${item._id}`}
                renderItem={renderItem}
                style={styles.categoryList}
              />
            </View>
            <View>
              {products?.map(item => (
                <View style={styles.productContainer} key={item._id}>
                  <View style={styles.left}>
                    <Image
                      style={styles.productImg}
                      source={{ uri: `${item.productImg}` }}
                    />
                    <View>
                      <Text style={styles.productHeading}>
                        {item.productName}
                      </Text>
                      <Text style={{color: '#808080'}}>
                        {item.productDesc}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.price}>
                      Rs. {item.price}/{item.unit}
                    </Text>
                    <TouchableOpacity 
                      style={styles.btn}
                      onPress={() => addToCartItem(item)}
                    >
                      <Text style={styles.btnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  heading: {
    color: '#61B846',
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: .5
  },
  subheading: {
    color: '#024F9D',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: .3
  },
  banner:{
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#E8E8E8',
    paddingHorizontal: 20,
    height: 40
  },
  inputBox: {
    color: '#6d6e71',
    fontSize: 15,
    paddingRight: 30,
  },
  categoryView:{
    flexDirection: 'column',
    marginVertical: 15,
  },
  h1: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
  },
  categoryList:{
    paddingHorizontal: 2,
    marginTop: 10,
  },
  categoriesContent: {
    alignItems: 'center',
    paddingRight: 15,
  },
  categoryImage: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
    borderColor: '#9cd38b',
    borderWidth: 2,
    borderRadius: 15,
  },
  categoryName: {
    color: 'green',
    fontWeight: '600',
    fontSize: 14,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingVertical: 15,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    width: '50%'
  },
  productImg: {
    width: 115,
    height: 70,
    borderRadius: 10,
    resizeMode: 'contain'
  },
  productHeading: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-around'
  },
  price: {
    color: '#000',
    fontWeight: '700',
  },
  btn: {
    width: 55,
    height: 35,
    backgroundColor: '#59b300',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 600,
  },
})

export default Home