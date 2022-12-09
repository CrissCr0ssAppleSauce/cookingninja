
import { StyleSheet } from 'react-native';
export const globalStyles = StyleSheet.create({
    icon: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 25,
        textAlign: 'center',
    },
    textStyle:{
        height: 40,
    },

    customTouchable:{
        padding:16,
        marginTop:16,
        borderColor: 'black',
        borderWidth:1,
        borderRadius: 10,
    },

    customButton:{
        height: 30,
        marginHorizontal: 10,
        backgroundColor: "#5d57ff",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText:{
        textTransform: "uppercase",
        color: "#fff",
        fontSize: 18,
    }
});