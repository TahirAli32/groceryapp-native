import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
  ToastAndroid
} from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { launchImageLibrary } from 'react-native-image-picker'
import { images, baseUrl, icons, IMGBB_API_KEY } from '../constants'
import { logoutSuccessful, resetCart, deleteUserInfo } from '../redux'

const AdminSetting = ({navigation}) => {

  const { userName, profileUrl } = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()

  const [categories, setCategories] = useState([])
  const [categoryImg, setCategoryImg] = useState('')
  const [categoryName, setCategoryName] = useState('')

  const fetchCategories = async () => {
    const res = await axios.get(`${baseUrl}/api/category`)
    setCategories(res.data.categories)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleUpload = async (file) => {

    let size = file.fileSize/(1024**2)
    size = size.toFixed(2)

    if(size > 5) return ToastAndroid.show('File Size cannot be larger than 3 MB', ToastAndroid.SHORT)
    
    ToastAndroid.show('Uploading Category Image', ToastAndroid.SHORT)

    const image = {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    }

    let data = new FormData()
    data.append('image', image)

    fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "post",
      body: data
    })
    .then(res => res.json())
    .then(res => setCategoryImg(res.data.url))
    .catch(err => console.log(err))
  }

  const handleImagePick = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' })
    
    handleUpload(result.assets[0])
  }

  const handleLogout = () => {
    dispatch(logoutSuccessful())
    dispatch(resetCart())
    dispatch(deleteUserInfo())
    navigation.navigate('Login')
  }

  const handleSubmit = async () => {
    const res = await axios.post(`${baseUrl}/api/category/add`, { categoryName, categoryImg })
    if (res.data.success) {
      ToastAndroid.show('Category Added Successfully', ToastAndroid.SHORT)
      setCategoryName("")
      setCategoryImg("")
      fetchCategories()
      return
    }
    else {
      ToastAndroid.show(res.data.error, ToastAndroid.SHORT)
    }
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
        <View style={styles.newCategoryContainer}>
          <Pressable style={styles.imgPicker} onPress={handleImagePick}>
            {!categoryImg ?
              <Image
                source={icons.camera_icon}
                resizeMode='contain'
                style={{
                  width: 70,
                }}
              />
              :
              <Image
                style={{ width: '90%', height: '90%' }}
                resizeMode='cover'
                source={{ uri: categoryImg }}
              />
            }
          </Pressable>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="New Category Name"
              value={categoryName}
              onChangeText={text => setCategoryName(text)}
              style={styles.inputHalf}
            />
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.inputBtn}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={{ paddingHorizontal: 50 }}>
            <Text style={styles.heading2}>All Cateogories</Text>
            <View style={{ marginVertical: 10, gap: 20 }}>
              {categories?.map(item => (
                <View key={item._id} style={styles.categories}>
                  <View style={styles.imgContainer}>
                    <Image
                      style={{ height: '100%', width: '100%', }}
                      resizeMode='contain'
                      source={{
                        uri: `${item.categoryImg}`,
                      }}
                    />
                  </View>
                  <View>
                    <Text style={styles.subheading}>{item.categoryName}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 50 }}>
          <TouchableOpacity onPress={handleLogout} style={styles.btn}>
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>
        </View>
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
  newCategoryContainer:{
    flexDirection: 'column',
    gap: 5,
    paddingHorizontal: 75,
    marginBottom: 10,
    borderBottomColor: '#e6e1e1',
    borderBottomWidth: 1
  },
  imgPicker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 80,
    backgroundColor: '#D4D3D3',
    borderRadius: 10,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputHalf: {
    height: 40,
    width: '70%',
    backgroundColor: '#D4D3D3',
    paddingHorizontal: 15,
    borderRadius: 10,
    color: '#000',
  },
  inputBtn: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#61B846',
    letterSpacing: 0.5,
    fontWeight: 600,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#65BD50',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    gap: 25,
  },
  imgContainer: {
    width: 75,
    height: 75,
  },
  heading2: {
    color: '#024F9D',
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: .3,
  },
  subheading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: .3
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#61B846',
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 600,
  },
})

export default AdminSetting