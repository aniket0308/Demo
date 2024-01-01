import React, { Fragment } from "react";
import { ActivityIndicator, Dimensions, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { constants } from "../../common/constant";

const CardImage = ({ onPress, item, index, monthStyle, locationStyle, temperatureStyle, path, location, temperature, loaderStyle, onPressCaptureImageDetails, captureStyle,
    textAreaStyle, onChangeText, text, loaderStyleLoc, loaderStyleTem,showText
}) => {
    return (
        path
            ? <View style={{ height: Dimensions.get('screen').height / 1.23 }}>
                <View>
                    <Image
                        style={{ width: Dimensions.get('screen').width, height: 200 }}
                        resizeMode="cover"
                        source={{ uri: path }} />
                    <Text style={monthStyle}>Jan</Text>
                    {
                        location
                            ? <Text style={locationStyle}>{location}</Text>
                            : <ActivityIndicator
                                color={constants.Colors.White}
                                style={loaderStyleLoc} />
                    }
                    <TouchableOpacity onPress={onPressCaptureImageDetails}>
                        <Image style={captureStyle}
                            resizeMode="cover"
                            source={constants.Icon.capture} />
                    </TouchableOpacity>
                    {
                        temperature
                            ? <Text style={temperatureStyle}>{temperature}</Text>
                            : <ActivityIndicator
                                color={constants.Colors.White}
                                style={loaderStyleTem} />
                    }
                </View>
                <TextInput
                    style={textAreaStyle}
                    placeholder="Type your thoughts..."
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={onChangeText}
                    value={text}
                />
            </View>
            : <Fragment>
                <TouchableOpacity onPress={onPress} >
                    <Image
                        style={{ width: Dimensions.get('screen').width, height: 200 }}
                        resizeMode="cover"
                        source={item?.image || { uri: item?.imageOption?.path }} />
                    {index > 3 && <Text style={monthStyle}>JAN</Text>}
                    <Text style={locationStyle}>{item?.whichCity}</Text>
                    <Text style={temperatureStyle}>{item?.temp}</Text>
                </TouchableOpacity>
                {showText && <Text style={{ color: constants.Colors.Black, marginHorizontal: 10, fontSize: 16,marginTop:10 }}>{item?.text}</Text>}
            </Fragment>
    )
}

export default CardImage