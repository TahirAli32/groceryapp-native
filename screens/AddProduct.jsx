import { 
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ToastAndroid
} from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { launchImageLibrary } from 'react-native-image-picker'
import { icons, images, baseUrl, IMGBB_API_KEY } from '../constants'

const AddProduct = () => {

  const { userName, profileUrl } = useSelector(state => state.user.userInfo)
  
  const [inputHeight, setInputHeight] = useState(40)
  const [productImg, setProductImg] = useState("")
  const [dropdown, setDropdown] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")

  const [inputFields, setInputFields] = useState({
    name: '',
    desc: '',
    unit: '',
    size: '',
    price: '',
  })

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`${baseUrl}/api/category`)
      setCategories(res.data.categories)
    }
    fetchCategories()
  }, [])

  const handleUpload = async (file) => {

    let size = file.fileSize/(1024**2)
    size = size.toFixed(2)

    if(size > 5) return ToastAndroid.show('File Size cannot be larger than 3 MB', ToastAndroid.SHORT)
    
    ToastAndroid.show('Uploading Product Image', ToastAndroid.SHORT)

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
    .then(res => setProductImg(res.data.url))
    .catch(err => console.log(err))

  }

  const handleImagePick = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' })
    
    handleUpload(result.assets[0])
  }

  const handleSubmit = async () => {
    const body = {
      productName: inputFields.name,
      productDesc: inputFields.desc,
      productSize: inputFields.size,
      price: inputFields.price,
      unit: inputFields.unit,
      category: selectedCategory,
      productImg
    }

    const res = await axios.post(`${baseUrl}/api/product/add`, body)
    if (res.data.success) {
      ToastAndroid.show('Product Added Successfully', ToastAndroid.SHORT)
      setInputFields({
        name: '',
        desc: '',
        unit: '',
        size: '',
        price: '',
      })
      setProductImg("")
      setSelectedCategory("")

      return
    }
    else{
      ToastAndroid.show(res.data.error, ToastAndroid.SHORT)
    }
  }

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
          <Text style={styles.heading2}>Add New Item</Text>
        </View>
        <ScrollView>
          <View style={{ paddingHorizontal: 25, marginBottom: 5, gap: 25 }}>
            <KeyboardAvoidingView>
              <Pressable onPress={handleImagePick}>
                <View style={styles.imgPicker}>
                  {!productImg ?
                    <>
                      <Image
                        source={icons.camera_icon}
                      />
                      <Text>Product Image</Text>
                    </>
                    :
                    <Image
                      style={{ width: '90%', height: '90%' }}
                      resizeMode='cover'
                      source={{uri: productImg}}
                    />
                  }
                </View>
              </Pressable>
              <TextInput
                placeholder="Product Name"
                value={inputFields.name}
                onChangeText={text => setInputFields({...inputFields, name: text})}
                style={styles.inputFull}
              />
              <Pressable onPress={() => setDropdown(!dropdown)} style={styles.dropDownContainer}>
                <Text style={{ fontSize: 17, fontWeight: 700 }}>{ !selectedCategory ? 'Select Category' : selectedCategory }</Text>
                <Image
                  style={!dropdown ? { width: 20, height: 20 } : { width: 20, height: 20, transform: [{rotate: '180deg'}] }}
                  source={icons.down_icon}
                />
              </Pressable>
              {dropdown && 
                <View style={styles.dropDownMenu}>
                  {categories?.map(category => (
                    <Text key={category._id} onPress={() => {setSelectedCategory(category.categoryName); setDropdown(false)}} style={styles.menuItem}>{category.categoryName}</Text>
                  ))}
                </View>
              }
              <TextInput
                placeholder="Description of Product"
                multiline={true}
                onContentSizeChange={event => {
                  setInputHeight(event.nativeEvent.contentSize.height)
                }}
                style={[styles.inputFull, { height: inputHeight }]}
                value={inputFields.desc}
                onChangeText={text => setInputFields({...inputFields, desc: text})}
              />
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Unit Name:</Text>
                <TextInput
                  placeholder="Kg/Dozen/Litre"
                  value={inputFields.unit}
                onChangeText={text => setInputFields({...inputFields, unit: text})}
                  style={styles.inputHalf}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Unit Size:</Text>
                <TextInput
                  placeholder="1/0.5/Half"
                  value={inputFields.size}
                onChangeText={text => setInputFields({...inputFields, size: text})}
                  style={styles.inputHalf}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Unit Price:</Text>
                <TextInput
                  placeholder="PKR 999"
                  keyboardType='numeric'
                  value={inputFields.price}
                  onChangeText={text => setInputFields({...inputFields, price: text})}
                  style={styles.inputHalf}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 15 }}>
            <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
              <Text style={styles.btnText}>Add Product</Text>
            </TouchableOpacity>
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
  header: {
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
    fontWeight: 600,
    letterSpacing: .2,
  },
  imgPicker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 125,
    backgroundColor: '#D4D3D3',
    borderRadius: 10,
    marginBottom: 5,
  },
  dropDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    height: 40,
    backgroundColor: '#D4D3D3',
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  dropDownMenu: {
    backgroundColor: '#D4D3D3',
    alignItems: 'center',
    borderRadius: 5,
    gap: 10,
    padding: 10,
  },
  menuItem: {
    textAlign: 'center',
    backgroundColor: '#f0efef',
    fontSize: 17,
    fontWeight: 600,
    color: '#000',
    width: '100%',
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  inputFull: {
    marginVertical: 5,
    height: 40,
    backgroundColor: '#D4D3D3',
    paddingHorizontal: 15,
    borderRadius: 10,
    color: '#000',
  },
  inputLabel: {
    fontSize: 19,
    color: '#024F9D',
    letterSpacing: 0.5,
    fontWeight: 700,
  },
  inputHalf: {
    height: 40,
    width: '50%',
    backgroundColor: '#D4D3D3',
    paddingHorizontal: 15,
    borderRadius: 10,
    color: '#000',
  },
  btn: {
    backgroundColor: '#61B846',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 600,
  },
})

export default AddProduct