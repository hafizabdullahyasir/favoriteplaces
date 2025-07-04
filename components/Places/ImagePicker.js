import { View, Alert, Image, StyleSheet, Text } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import OutlinedButton from "../UI/OutlinedButton";
import { useState } from "react";
import Colors from "../../constants/colors";

export default function ImagePicker({onTakeImage} ) {
  const [pickedImage, setPickedImage] = useState(null);
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Camera Permission Required", 
        "This app needs access to camera to take photos. Please enable camera permission in your device settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => {
            // On Android, this will prompt user to open settings
            Alert.alert("Please enable camera permission in device settings");
          }}
        ]
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    console.log('Camera permission status:', cameraPermissionInformation?.status);
    
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      console.log('Camera permission denied');
      return;
    }

    try {
      console.log('Launching camera...');
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });

      console.log('Camera result:', image);

      if (!image.canceled && image.assets && image.assets.length > 0) {
        setPickedImage(image.assets[0].uri);
        onTakeImage(image.assets[0].uri);
        console.log('Image captured successfully');
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Camera Error', 'Failed to take photo. Please try again.');
    }
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
