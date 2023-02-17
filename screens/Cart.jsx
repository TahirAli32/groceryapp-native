import { useState, useEffect } from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView, TextInput, StyleSheet, TouchableOpacity, Image, ToastAndroid, Pressable } from 'react-native'
import { icons, baseUrl } from '../constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { resetCart, increaseQuantity, decreaseQuantity } from '../redux/cartReducer'

const Cart = () => {

  const cartProducts = useSelector(state => state.cart.products)
  const dispatch = useDispatch()

  const totalPrice = () => {
    let total = 0
    for(const product of cartProducts){
      total += product.price * product.quantity
    }
    return total
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>Shopping</Text>
            <Text style={styles.subheading}>Cart</Text>
          </View>
          <View>
            <Pressable onPress={() => dispatch(resetCart())}>
              <Image
                style={{ width: 25, height: 25, alignContent: 'center' }}
                source={icons.bin_icon}
              />
            </Pressable>
          </View>
        </View>

        {cartProducts.length ? 
          <ScrollView>
            <View style={{ paddingHorizontal: 15 }}>
              <View style={styles.cartContainer}>
                {cartProducts?.map(item => (
                  <View style={styles.productContainer} key={item.id}>
                    <View style={styles.left}>
                      <Image
                        style={styles.productImg}
                        source={{ uri: `${item.img}` }}
                      />
                      <View style={{ gap: 5 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={styles.productName}>
                            {item.name}
                          </Text>
                          <Text style={{ fontSize: 13, color: 'gray', marginLeft: 3 }}>
                            ({item.size} {item.unit})
                          </Text>
                        </View>
                        <View style={styles.productQuantity}>
                          <TouchableOpacity onPress={() => dispatch(decreaseQuantity(item.id))}>
                            <Text style={styles.quantityBtn}>-</Text>
                          </TouchableOpacity>
                          <Text style={{fontWeight: 600, fontSize: 17}}>
                            {item.quantity}
                          </Text>
                          <TouchableOpacity onPress={() => dispatch(increaseQuantity(item.id))}>
                            <Text style={styles.quantityBtn}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View style={styles.right}>
                      <Text style={{fontSize: 13, color: 'gray' }}>
                        {item.quantity} x {item.price}
                      </Text>
                      <Text style={styles.price}>
                        Rs. {item.price * item.quantity}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalPrice}>PKR {totalPrice()}</Text>
              </View>
              <KeyboardAvoidingView style={styles.customerInfo}>
                <TextInput
                  placeholder="Full Name"
                  // value={email}
                  // onChangeText={text => setEmail(text)}
                  style={styles.input}
                  enterKeyHint="next"
                />
                <TextInput
                  placeholder="Email"
                  // value={email}
                  // onChangeText={text => setEmail(text)}
                  style={styles.input}
                  enterKeyHint="next"
                />
                <TextInput
                  
                  placeholder="Phone Number"
                  // value={email}
                  // onChangeText={text => setEmail(text)}
                  style={styles.input}
                  enterKeyHint="next"
                  inputmode="tel"
                />
                <TextInput
                  placeholder="Shipping Address"
                  multiline={true}
                  // value={email}
                  // onChangeText={text => setEmail(text)}
                  style={styles.input}
                  enterKeyHint="next"
                />
              </KeyboardAvoidingView>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>
                  Place Order
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        :
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.subheading}>Cart is Empty</Text>
          </View>
        }
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  heading: {
    color: '#024F9D',
    fontSize: 22,
    fontWeight: 400,
    letterSpacing: .5
  },
  subheading: {
    color: '#61B846',
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: .3
  },
  cartContainer: {
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 3,
    paddingBottom: 10,
    marginBottom: 10,
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
  productName: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productQuantity:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityBtn:{
    backgroundColor: '#E8E8E8',
    fontSize: 20,
    fontWeight: 500,
    width: 30,
    height: 30,
    textAlign: 'center',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  price: {
    color: '#000',
    fontWeight: '600',
    fontSize: 15
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderBottomColor: '#888888',
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginBottom: 15,
  },
  totalText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 600,
    letterSpacing: 0.2,
  },
  totalPrice: {
    fontWeight: 600,
    letterSpacing: 0.2,
    fontSize: 17,
    color: '#61B846',
  },
  input: {
    // width: 228,
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#D4D3D3',
    backgroundColor: '#fff',
    color: '#000000',
  },
  btn: {
    marginTop: 15,
    margiBottom: 5,
    paddingVertical: 10,
    backgroundColor: '#61B846',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 600,
  },
})



export default Cart