import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      android_ripple={{ color: '#ccc' }}
    >
      <Ionicons 
        name={icon} 
        size={size} 
        color={color || '#000'} // Fallback color for Android
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 36,
   
  },
  pressed: {
    opacity: 0.6,
  },
});
