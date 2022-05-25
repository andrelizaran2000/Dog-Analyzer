// Modules
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { CameraType } from 'expo-camera/build/Camera.types';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';

// Icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Colors
import { normalRed } from '../utils/colors';

// Stack
import { StackParams } from '../router/StackNavigator';

type CurrentScreenType = 'camera' | 'no-permissions' | 'camera-off';

export interface Props extends NativeStackScreenProps<StackParams, any> { }

export default function Home({ navigation }: Props) {

  const cameraRef = useRef<Camera | null>();
  const [takingPhoto, setTakingPhoto] = useState(false);
  const [cameraType, setCameraType] = useState<CameraType>(Camera.Constants.Type.back);
  const [currentWindow, setCurrentWindow] = useState<CurrentScreenType>('camera-off');

  async function getImageFromGallery() {
    try {
      setCurrentWindow('camera-off');
      let photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });
      if (!photo.cancelled && photo.base64) navigation.navigate('photo', { uri: photo.uri, base64: photo.base64 });
    } catch (error: any) {
      console.log(error);
    }
  }

  async function getPermissions() {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No has concedido permisos', 'No has concedido permisos para utilizar');
        setCurrentWindow('no-permissions');
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  async function takePhoto() {
    setTakingPhoto(true);
    if (cameraRef.current !== null && cameraRef.current !== undefined) {
      let photo = await cameraRef.current.takePictureAsync({ base64: true });
      if (photo.base64) navigation.navigate('photo', { uri: photo.uri, base64: photo.base64 });
      setCurrentWindow('camera-off');
      setTakingPhoto(false);
    } else setTakingPhoto(true);
  }

  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <CurrentSquareWindow
        currentWindow={currentWindow}
        setCurrentWindow={setCurrentWindow}
        cameraType={cameraType}
        setCameraType={setCameraType}
        cameraRef={cameraRef}
      />
      <View style={{ flexDirection: 'row', borderRadius: 5, marginVertical: 20 }}>
        <TouchableOpacity
          style={{
            width: '50%',
            padding: 15,
            alignItems: 'center',
            backgroundColor: '#495371',
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5
          }}
          disabled={currentWindow === 'no-permissions' || currentWindow === 'camera-off'}
          onPress={() => cameraType === Camera.Constants.Type.back ? setCameraType(Camera.Constants.Type.front) : setCameraType(Camera.Constants.Type.back)}
        >
          <Ionicons name="md-camera-reverse-outline" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            padding: 15,
            alignItems: 'center',
            backgroundColor: '#D1D1D1',
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5
          }}
          disabled={currentWindow === 'no-permissions' || currentWindow === 'camera-off' || takingPhoto}
          onPress={takePhoto}
        >
          <Ionicons name="ios-camera-sharp" size={25} color="#2C3333" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          padding: 15,
          borderRadius: 5,
          alignItems: 'center',
          backgroundColor: normalRed,
          marginBottom: 20
        }}
        disabled={currentWindow === 'no-permissions'}
        onPress={() => currentWindow === 'camera' ? setCurrentWindow('camera-off') : setCurrentWindow('camera')}
      >
        {currentWindow === 'camera' ? <MaterialCommunityIcons name="cancel" size={25} color="white" /> : <Ionicons name="ios-camera-sharp" size={23} color="white" />}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 15,
          borderRadius: 5,
          alignItems: 'center',
          backgroundColor: '#2C3333'
        }}
        onPress={getImageFromGallery}
      >
        <Ionicons name="md-images" size={23} color="white" />
      </TouchableOpacity>
    </View>
  )
}

type CameraWindowProps = {
  cameraType: CameraType
  cameraRef: MutableRefObject<Camera | null | undefined>;
}

function CameraWindow({ cameraType, cameraRef }: CameraWindowProps) {
  return (
    <Camera
      style={{ width: '100%', height: 300 }}
      type={cameraType}
      ref={ref => {
        cameraRef.current = ref;
      }}
    >
    </Camera>
  )
}

function NoPermissionsWindow() {
  return (
    <View
      style={{
        width: '100%',
        height: 300,
        borderRadius: 5,
        backgroundColor: '#2C3333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
      }}
    >
      <Ionicons name="ios-camera-sharp" size={35} color="white" />
      <Text
        style={{
          textAlign: 'center',
          color: 'white',
          marginTop: 10,
          fontSize: 14
        }}>Es necesario concedas permisos para poder acceder a tu cámara</Text>
    </View>
  )
}

function CameraOffWindow() {
  return (
    <View
      style={{
        width: '100%',
        height: 300,
        borderRadius: 5,
        backgroundColor: '#2C3333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
      }}
    >
      <Ionicons name="ios-camera-sharp" size={35} color="white" />
      <Text
        style={{
          textAlign: 'center',
          color: 'white',
          marginTop: 10,
          fontSize: 14
        }}>Cámara apagada</Text>
    </View>
  )
}

type CurrentSquareWindowProps = {
  currentWindow: CurrentScreenType;
  setCurrentWindow: Dispatch<SetStateAction<CurrentScreenType>>;
  cameraType: CameraType;
  setCameraType: Dispatch<SetStateAction<CameraType>>;
  cameraRef: MutableRefObject<Camera | null | undefined>;
}

function CurrentSquareWindow({ currentWindow, setCurrentWindow, cameraType, setCameraType, cameraRef }: CurrentSquareWindowProps) {
  switch (currentWindow) {
    case 'camera':
      return <CameraWindow cameraType={cameraType} cameraRef={cameraRef} />
    case 'camera-off':
      return <CameraOffWindow />
    case 'no-permissions':
      return <NoPermissionsWindow />
  }
}