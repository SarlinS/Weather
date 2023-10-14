import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, Image } from 'react-native';

const api = {
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICONS_URL
}

export default function Weather({latitude, longitude}) {

    const [temp, setTemp] = useState(0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        const url = api.url +
        'lat=' + latitude +
        '&lon=' + longitude +
        '&units=metric' +
        '&lang=fi' +
        '&appid=' + api.key
        fetch(url)
        .then(res => res.json())
        .then((json) => {
            setTemp(json.main.temp)
            setDescription(json.weather[0].description)
            setIcon(api.icons + json.weather[0].icon + '@2x.png')
        })
        .catch((error) => {
            setDescription("Error retrieving weather information.")
            console.log(error)
        })
    }, [])

    return (
        <>
        <Text style = {styles.label}>Temperature</Text>
        <Text>{temp}</Text>
        <Text style = {styles.label}>Description</Text>
        <Text>{description}</Text>
        <Image source = {{uri: icon}} style = {{width: 100, height: 100}}/>
        </>
    )
}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        marginTop: 10,
    }
});