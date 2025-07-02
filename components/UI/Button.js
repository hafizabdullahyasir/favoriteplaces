import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";





export default function Butoon ({children, onPress}){

    return (
       <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed && styles.pressed]}>

       <Text style={styles.text}>{children}</Text>


       </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: Colors.primary800,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        elevation: 2,
    },
    pressed: {
        opacity: 0.7,
    },
    text: {
        textAlign: 'center',
                    color: Colors.primary50,
    }   
})