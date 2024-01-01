import { Dimensions, StyleSheet } from "react-native";
import { constants } from "../../common/constant";

const style=StyleSheet.create({
    txtLoaction: {
        position: 'absolute',
        color: constants.Colors.White,
        fontWeight: '600',
        fontSize: 16,
        bottom: 10,
        left: 10
    },
    txtMonth: {
        position: 'absolute',
        color: constants.Colors.White,
        fontWeight: '900',
        marginLeft: 10,
        marginTop: 10,
        fontSize: 18
    },
    txtTemperature: {
        position: 'absolute',
        color: constants.Colors.White,
        fontWeight: '600',
        fontSize: 16,
        bottom: 10,
        right: 10
    },
})

export default style