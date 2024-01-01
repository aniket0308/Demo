import React, { Fragment, useEffect, useState } from "react";
import {  Dimensions, FlatList, Image, Platform, SafeAreaView, TouchableOpacity, View } from "react-native";
import { constants } from "../../common/constant";
import style from "./style";
import ImageCropPicker from "react-native-image-crop-picker";
import Geolocation from "@react-native-community/geolocation";
import { openSettings, requestMultiple } from "react-native-permissions";
import CardImage from "../../components/cardImage";

const Home = ({ navigation }) => {

    const API_KEY = Config.WEATHER_API_KEY;

    let tempArr = [
        {
            image: constants.Icon.lady,
            text: 'Another awesome morning I can’t live a day without coffee.',
            city: 'Pune'
        },
        {
            image: constants.Icon.yellowFlowers,
            text: 'Another awesome morning I can’t live a day without coffee.',
            city: 'Kerela'
        },
        {
            image: constants.Icon.hugs,
            text: 'Another awesome morning I can’t live a day without coffee.',
            city: 'Chennai'
        },
        {
            image: constants.Icon.snow,
            text: 'Another awesome morning I can’t live a day without coffee.',
            city: 'Bangluru'
        },
    ]

    const [imageObj, setImageObj] = useState(tempArr)
    const [path, setPath] = useState('')
    const [location, setLocation] = useState('')
    const [temperature, setTemperature] = useState('')
    const [text, setText] = useState('')
    const [menuSelection, setMenuSelection] = useState('Home')

    useEffect(() => {
        async function requestPermissions() {
            if (Platform.OS === 'android') {
                const permissions = [
                    'android.permission.ACCESS_FINE_LOCATION',
                    'android.permission.CAMERA',
                    // Add more permissions as needed
                ];
                const status = await requestMultiple(permissions);
                if (
                    status['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
                    status['android.permission.CAMERA'] === 'granted'
                    // Check for other permissions
                ) {
                    console.log('All permissions granted');
                    // Do something here after getting all permissions
                } else {
                    openSettings();
                    // Handle the denied permissions case
                }
            } else if (Platform.OS === 'ios') {
                const permissions = [
                    'ios.permission.LOCATION_WHEN_IN_USE',
                    'ios.permission.CAMERA',
                    // Add more permissions as needed
                ];
                const statuses = await requestMultiple(permissions);
                if (
                    statuses['ios.permission.LOCATION_WHEN_IN_USE'] === 'granted' &&
                    statuses['ios.permission.CAMERA'] === 'granted'
                    // Check for other permissions
                ) {
                    console.log('All permissions granted');
                    // Do something here after getting all permissions
                } else {
                    console.log('Some permissions were denied');
                    // Handle the denied permissions case
                }
            }
        }
        requestPermissions();
    }, []);

    let LATITUDE;
    let LONGITUDE;

    const requestGeoLocationPermission = (imageItem) => {
        // Request permission to access location
        Geolocation.requestAuthorization();

        // Get current position
        Geolocation.getCurrentPosition(
            (position) => {

                LATITUDE = position.coords.latitude
                LONGITUDE = position.coords.longitude;

                const reverseGeocodingURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${LATITUDE}&lon=${LONGITUDE}&zoom=18&addressdetails=1`;

                fetch(reverseGeocodingURL)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('What is image object location', data);
                        setLocation(data.address.city)
                        getWeatherForParticularCity(imageItem, data.address.city)
                    })
                    .catch((error) => {
                        console.error('Error fetching geoLocation data: ', error);
                    });
            },
            (error) => {
                console.error(error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    //function used to get weather information for city
    const getWeatherForParticularCity = (imageItem, whichCity) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${imageItem.city || whichCity}&appid=${API_KEY}`
        )
            .then((response) => response.json())
            .then((data) => {
                imageObj.push({ ...imageItem, temp: data.main.temp, whichCity })
                setTemperature(data?.main?.temp)
            })
            .catch((error) => {
                console.error('Error fetching weather data: ', error);
            });
    }

    const openCameraForTakingPicture = () => {

        let mediaOptions = {
            width: 300,
            height: 400,
            cropping: true
        }

        let tempImageObj = {
            onWhichDate: new Date().getDate(),
            onWhichYear: new Date().getFullYear(),
        }
        ImageCropPicker.openCamera(mediaOptions).then(image => {
            tempImageObj.imageOption = image
            setPath(image?.path)
            console.log('image?.imageOption?.path', image.path);
            validateImageOnBasesOfDate(tempImageObj)
        }).catch(error => console.log(error));

    }

    //function which check date if image is uploaded on same day then edit or else add new image.
    const validateImageOnBasesOfDate = (imageItem) => {
        let index = imageObj.findIndex(i => i?.onWhichDate == imageItem.onWhichDate && i.onWhichYear == imageItem.onWhichYear)
        if (index > 0) {
            let tempImageObj = imageObj
            tempImageObj[index] = imageItem
            setImageObj(tempArr)
        } else {
            requestGeoLocationPermission(imageItem)
        }
    }

    const renderItem = ({ index, item }) => {
        return (
            <CardImage
                onPress={() => navigation.navigate(constants.Screen.MORE_DETAILS, { data: item, index })}
                monthStyle={style.txtMonth}
                locationStyle={style.txtLoaction}
                temperatureStyle={style.txtTemperature}
                index={index}
                item={item}
            />
        )
    }

    const captureImageDetails = () => {
        let tempArr = imageObj
        tempArr[tempArr.length - 1].text = text
        setImageObj(tempArr)
        setPath('')
        setLocation('')
        setTemperature('')
    }

    return (
        <Fragment>
            <SafeAreaView />
            {
                path
                    ? <CardImage
                        path={path}
                        temperature={temperature}
                        location={location}
                        onPressCaptureImageDetails={captureImageDetails}
                        monthStyle={style.txtMonth}
                        captureStyle={style.captureImg}
                        temperatureStyle={style.txtTemperature}
                        locationStyle={style.txtLoaction}
                        textAreaStyle={style.textArea}
                        loaderStyleLoc={style.loaderLocation}
                        loaderStyleTem={style.loaderTem}
                        onChangeText={(value) => setText(value)}

                    />
                    : <Fragment>
                        {
                            menuSelection == 'Home'
                                ? <FlatList
                                    bounces={false}
                                    showsVerticalScrollIndicator={false}
                                    data={imageObj}
                                    renderItem={renderItem}
                                />
                                : <Fragment>
                                    <View style={{height:Dimensions.get('screen').height/1.24,marginTop:20}}>
                                    <Image
                                        style={{ width: Dimensions.get('screen').width, height: 120 }}
                                        resizeMode="contain"
                                        source={constants.Icon.day} />
                                        <Image
                                        style={{ width: Dimensions.get('screen').width, height: 120,marginTop:20 }}
                                        resizeMode="contain"
                                        source={constants.Icon.hotDay} />
                                        <Image
                                        style={{ width: Dimensions.get('screen').width, height: 120 ,marginTop:20}}
                                        resizeMode="contain"
                                        source={constants.Icon.coldDay} />
                                    </View>
                                </Fragment>

                        }
                        <View style={style.bottomBarView}>
                            <TouchableOpacity
                                onPress={() => setMenuSelection('Home')}
                                style={style.menuTouchable}>
                                <Image style={style.menuIcon}
                                    source={constants.Icon.home} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={openCameraForTakingPicture}
                                style={style.addTouchable}>
                                <Image style={style.addButtonIcon} source={constants.Icon.add} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setMenuSelection('Summary')}
                                style={style.menuTouchable}>
                                <Image style={style.menuIcon}
                                    source={constants.Icon.information} />
                            </TouchableOpacity>
                        </View>
                    </Fragment>
            }
            <SafeAreaView />
        </Fragment>
    )
}

export default Home