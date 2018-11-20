import React from 'react';
import { Image, Text, View, Button, Alert } from 'react-native';

export default class ImageScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
                <Image
                    source={require("../assets/gudetama.jpg")}
                    style={{ width: 300, height: 300 }}
                />
            </View>
        );
    }
}
