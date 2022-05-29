// Modules
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image, Text, TouchableOpacity, View } from 'react-native'

// Icons
import { Ionicons } from '@expo/vector-icons';

// Routes
import { StackParams } from '../router/StackNavigator'

// Colors
import { darkGray, normalRed } from '../utils/colors';

export interface Props extends NativeStackScreenProps<StackParams, 'results'> { }

export default function Results({ route, navigation }:Props) {

  const { isDog, image } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ borderTopLeftRadius: 5, borderTopRightRadius: 5, padding: 15, backgroundColor: '#2C3333' }}>
        <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>La imagen que has mandado {isDog ? 'sí' : 'no '}es un perro</Text>
      </View>
      <Image 
        source={{ uri:image }} 
        style={{ width:'100%', height:250, borderBottomLeftRadius:5, borderBottomRightRadius:5 }}
      />
      <TouchableOpacity
        style={{ padding: 15, alignItems: 'center', backgroundColor: normalRed, borderRadius: 5, marginTop:20 }} onPress={() => navigation.navigate('home')}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}