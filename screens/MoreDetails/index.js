import React from "react"
import { SafeAreaView, Text, View } from "react-native"
import CardImage from "../../components/cardImage";
import style from "./style";

const MoreDetails = ({ route, navigation }) => {

    const { data ,index} = route.params

    return (
        <View>
            <SafeAreaView />
            <CardImage
                showText={true}
                item={data}
                index={index}
                monthStyle={style.txtMonth}
                locationStyle={style.txtLoaction}
                temperatureStyle={style.txtTemperature}
            />
            <SafeAreaView />
        </View>
    )
}

export default MoreDetails