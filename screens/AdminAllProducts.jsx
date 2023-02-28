import { 
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  RefreshControl,
} from 'react-native'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { icons, images, baseUrl } from '../constants'

const AdminAllProducts = () => {

  const { userName, profileUrl } = useSelector(state => state.user.userInfo)

  const [products, setProducts] = useState([])

  const [refreshing, setRefreshing] = useState(false)

  const fetchProducts = async () => {
    const res = await axios.get(`${baseUrl}/api/product`)
    setProducts(res.data.products)
    setRefreshing(false)
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchProducts()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={!profileUrl ? images.avatar : { uri: profileUrl }}
              />
            </View>
            <View>
              <Text style={styles.heading}>{userName}</Text>
              <Text style={styles.subheading}>Admin</Text>
            </View>
          </View>
          <View>
            <Image
              style={{ width: 25, height: 25, alignContent: 'center' }}
              source={icons.list}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={styles.heading2}>All Products</Text>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ paddingHorizontal: 25, marginBottom: 10, gap: 25 }}>
            {products?.map(item => (
              <View key={item._id} style={styles.products}>
                <View>
                  <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                    <View style={styles.imgContainer}>
                      <Image
                        style={{ height: '100%', width: '100%', }}
                        source={{
                          uri: `${item.productImg}`,
                        }}
                      />
                    </View>
                    <View>
                      <Text style={styles.subheading}>{item.productName}</Text>
                      <Text style={{ fontSize: 16 }}>{item.productSize} {item.unit}</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={{ fontSize: 16 }}>PKR {item.price}</Text>
                </View>
              </View>
            ))}
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
    borderBottomWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  avatarContainer: {
    borderColor: '#61B846',
    borderWidth: 1,
    borderRadius: 100,
    padding: 3,
    width: 60,
    height: 60,
  },
  avatar: {
    height: '100%',
    width: '100%',
    backgroundColor: '#61B846',
    borderRadius: 100,
  },
  heading: {
    color: '#024F9D',
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: .5
  },
  subheading: {
    color: '#61B846',
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: .3
  },
  heading2: {
    color: '#024F9D',
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: .5,
  },
  products: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#65BD50',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  imgContainer: {
    padding: 3,
    width: 85,
    height: 85,
  },
})

export default AdminAllProducts