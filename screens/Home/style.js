import { Dimensions, StyleSheet } from "react-native";
import { constants } from "../../common/constant";

const style = StyleSheet.create({
    addTouchable: {
        width: Dimensions.get('screen').width / 3,
        alignItems: 'center',
        position: 'absolute',
        left: Dimensions.get('screen').width / 3, top: -30
    },
    addButtonIcon: {
        height: 60,
        width: 60
    },
    menuTouchable: {
        alignItems: 'center',
        width: Dimensions.get('screen').width / 3
    },
    menuIcon: { height: 25, width: 25 },
    txtTemperature: {
        position: 'absolute',
        color: constants.Colors.White,
        fontWeight: '600',
        fontSize: 16,
        bottom: 10,
        right: 10
    },
    loaderTem: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    captureImg: {
        height: 60,
        width: 60,
        position: 'absolute',
        alignSelf: 'center',
        bottom: -30
    },
    loaderLocation: {
        position: 'absolute',
        bottom: 10,
        left: 10
    },
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
    bottomBarView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        position:'absolute',
        bottom:0,
        width:'100%'
    },
    textArea: {
        paddingHorizontal: 10,
        paddingTop: 10,
        fontSize:16,
        marginTop:20
      },
})

export default style