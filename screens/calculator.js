import React from 'react';
import { Image, Text, View, Button, TextInput } from 'react-native';

export default class ImageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalBeforeTax: 0,            //user input total
            currentTotal: 0,              //total after plates have been divided
            tax: 0,
            tip: 0,                       //percentage
            people: this.props.navigation.state.params.people
        }
    }

    componentDidMount() {
        console.log("start")
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View>
                    {/* <Text>Total before tax: </Text> 
                    <TextInput
                        onChangeText={(input) => this.setState({totalBeforeTax: input})}
                        style={{borderColor:"blue"}}
                        value={this.state.totalBeforeTax}
                        keyboardType = 'numeric'
                    /> */}
                </View>
                <View>
                    {this.state.people.map((element, index) => {
                        return <Text key={index}>{element.name}</Text>
                    })}
                </View>
            </View>
        );
    }
}
