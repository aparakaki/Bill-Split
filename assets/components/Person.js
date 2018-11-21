import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class Person extends React.Component {
    constructor(props){
        super(props)
    }
    state = {
        newItem: null,
    }

    addItem = () => {
        var itemsArray = this.state.items.concat(this.state.newItem)
        this.setState({ items: itemsArray })
        this.setState({newItem: null})

    }

    componentDidMount(){
        console.log(this.props.people)
    }
    render () {
    return (
        <View>
            <Text>{this.props.people.name} </Text>
            {this.props.people.items.map((item, index) => {
                return(
                <Text
                key ={index}
                >{item}
                </Text>
                )
            })}
            <Text>Total</Text>
            <TextInput
            placeholder = "00.00"
            keyboardType = 'numeric'
            value = {this.state.newItem}
            onChangeText={(input) => this.props.handleItemChange(input)}
            
            />
            <Button
            title = "Add"
            onPress = {this.props.addItem}
            />
            
        </View>
    ) 
    }
}