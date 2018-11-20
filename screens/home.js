import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.titleStyle}>Hello!</Text>
                </View>
                <View style={styles.container2}>
                <View style={styles.btnDiv}>
                    <Button
                        onPress={() => navigate('Calculator', {people: [{name:"Bob"},{name: "Jess"}]})}
                        title="See Image"
                    />
                    <Button
                        onPress={() => {
                            Alert.alert('Hey!');
                        }}
                        title="Press Me"
                    />
                </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#afccdb',
        flex: 1,
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnDiv: {
        // flex: 2,
        paddingTop: 15,
        backgroundColor: '#f7cba5',
        height: 100,
        width: 200
    },
    titleStyle: {
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 24
    }
});