// Modules
import React from 'react'
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';

// Icons
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// Colors
import { darkGray, normalRed } from '../utils/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Stack
import { StackParams } from '../router/StackNavigator';

// Hooks
import useSendImage from '../hooks/useSendData';

export interface Props extends NativeStackScreenProps<StackParams, 'photo'> { }

export default function Photo({ navigation, route }: Props) {

  const { base64, uri } = route.params;
  const { isLoading, isFetching, refetch } = useSendImage(base64);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Image
        source={{ uri }}
        style={{ height: 300, width: '100%', borderRadius: 5 }}
      />
      <TouchableOpacity
        style={{ marginVertical: 20, padding: 15, alignItems: 'center', backgroundColor: darkGray, borderRadius: 5 }}
        onPress={() => refetch}
        disabled={isLoading || isFetching}
      >
        {(isLoading || isFetching) ? <ActivityIndicator color='white' style={{ paddingVertical: 3 }} /> : <FontAwesome name="send" size={24} color="white" />}
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 15, alignItems: 'center', backgroundColor: normalRed, borderRadius: 5 }} onPress={() => navigation.navigate('home')}
        disabled={isLoading || isFetching}
      >
        <Ionicons name="reload" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}
