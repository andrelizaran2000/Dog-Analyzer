// Modules
import React from 'react'
import { FlatList, Image, Text, View } from 'react-native'

export default function Results() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5, padding: 15, backgroundColor: '#2C3333' }}>
        <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>La raza de tu perro es: Labrador</Text>
      </View>
      <View style={{ borderBottomRightRadius: 5, borderBottomLeftRadius: 5, padding: 15, backgroundColor: '#D1D1D1', marginBottom: 20 }}>
        <Text style={{ textAlign: 'center', paddingBottom: 5, borderBottomColor: '#2C3333' }}>Esta raza se caracteriza por:</Text>
      </View>
      <Text style={{ fontSize: 16, fontWeight: '400', marginBottom: 20 }}>Imágenes</Text>
      <FlatList
        data={dummyData}
        keyExtractor={({ id }) => String(id)}
        renderItem={({ item }) => <Image source={{ uri: item.url }} style={{ width: '100%', height: 200, borderRadius: 5, marginBottom: 20, borderColor: '#D1D1D1', borderWidth: 1 }} />}
      />
    </View>
  )
}

const dummyData = [
  { id: 2, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnbW8yaOk-_BxDDu_rm3p8PjbLil18OUJkvA&usqp=CAU' },
  { id: 3, url: 'https://nubika.es/wp-content/uploads/2020/01/perro-labrador.jpg' },
  { id: 4, url: 'https://t2.uc.ltmcdn.com/images/7/3/2/img_diferencia_entre_labrador_y_golden_retriever_45237_orig.jpg' },
  { id: 5, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJPh5IUgptv95YNPZzsN2mKC4mCRt3giESAg&usqp=CAU' },
  { id: 6, url: 'https://www.razasdeperros.com/wp-content/uploads/2015/05/perro-de-raza-labrador-1280x720.jpg' },
  { id: 7, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpESb9R7X14qQw2vyo-qKMtxBOxNNgUOSGkw&usqp=CAU' },
  { id: 8, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSm0s3ccHW4AZamq02PTur57XXQR_WR5rWlQ&usqp=CAU' },
]