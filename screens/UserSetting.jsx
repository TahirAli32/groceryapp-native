import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { images, baseUrl } from '../constants'
import { logoutSuccessful, resetCart, deleteUserInfo } from '../redux'

const UserSetting = ({ navigation, route }) => {

  const { userName, profileUrl, userID } = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`${baseUrl}/api/order?userID=${userID}`)
      setOrders(res.data.orders)
    }
    fetchOrders()
  }, [route?.params?.render])

  const handleLogout = () => {
    dispatch(logoutSuccessful())
    dispatch(resetCart())
    dispatch(deleteUserInfo())
    navigation.navigate('Login')
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Settings</Text>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={!profileUrl ? images.avatar : { uri: profileUrl }}
            />
          </View>
          <Text style={styles.nameText}>{userName}</Text>
        </View>
        {orders?.length ?
          <ScrollView>
            <View style={{ paddingHorizontal: 20 }}>
              <Text style={styles.heading}>Orders</Text>
              <View style={{ marginVertical: 10 }}>
                {orders?.map(item => (
                  <View style={styles.orderContainer} key={item._id}>
                    <View style={styles.orderInfo}>
                      <View style={styles.left}>
                        <View>
                          <Text style={styles.customerName}>{item.contactInfo.fullName}</Text>
                        </View>
                        <View>
                          <Text style={styles.orderStatus}>
                            {moment(item.createdAt).startOf('hour').fromNow()} - {item.orderStatus}
                          </Text>
                        </View>
                        <View style={styles.productQuantity}>
                          {item.orderInfo?.map((eachOrder, index) => (
                            <Text key={index} style={{ fontSize: 14, color: 'gray' }}>
                              {eachOrder.productQuantity} x {eachOrder.productName}
                            </Text>
                          ))}
                        </View>
                      </View>
                      <View style={styles.right}>
                        <Text style={styles.contantNo}>{item.contactInfo.mobileNo}</Text>
                      </View>
                    </View>
                    <View style={styles.totalInfo}>
                      <Text style={styles.totalText}>Total</Text>
                      <Text style={styles.totalPrice}>PKR {item.totalCost}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
          :
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.subheading}>You haven't placed any order yet</Text>
          </View>
        }
        <TouchableOpacity onPress={handleLogout} style={styles.btn}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
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
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  heading: {
    color: '#024F9D',
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: .3,
  },
  avatarContainer: {
    borderColor: '#61B846',
    borderWidth: 1,
    borderRadius: 100,
    padding: 8,
    width: 120,
    height: 120,
  },
  avatar: {
    height: '100%',
    width: '100%',
    backgroundColor: '#61B846',
    borderRadius: 100,
  },
  nameText: {
    fontSize: 22,
    color: '#61B846',
    fontWeight: 600,
  },
  orderContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'column',
    width: '50%',
  },
  customerName: {
    color: '#000',
    fontWeight: 500,
    fontSize: 18,
  },
  orderStatus: {
    fontSize: 13,
    fontWeight: 500
  },
  productQuantity: {
    marginVertical: 5,
    flexDirection: 'column',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  contantNo: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14
  },
  totalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    paddingBottom: 5,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 3,
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 600,
    letterSpacing: 0.2,
  },
  totalPrice: {
    fontWeight: 600,
    letterSpacing: 0.2,
    fontSize: 15,
    color: '#61B846',
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 10,
    marginHorizontal: 20,
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
  subheading: {
    width: '75%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: .3
  },
})

export default UserSetting