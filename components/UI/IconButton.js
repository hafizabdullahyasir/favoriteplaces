import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";



export default function IconButon({icon, size, color, onPress}){
return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.buton, pressed && styles.pressed]}  android_ripple={{color: '#ccc'}}>
        <Ionicons name={icon} size={size} color={color} />
    </Pressable>
)


}

const styles = StyleSheet.create({
    buton:{
     padding: 8,
     margin: 4,
     justifyContent: "center",
     alignItems: "center",
     borderRadius: 24,
    },
    pressed:{
        opacity: 0.7,
    }
})