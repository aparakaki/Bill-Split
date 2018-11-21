import React from 'react';
import { Image, Text, View, Button, TextInput } from 'react-native';
import Person from "../assets/components/Person"

export default class ImageScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalBeforeTax: 0,            //user input total
            currentTotal: 0,              //total after plates have been divided
            tax: 0,
            tip: 0,                       //percentage
            people: this.props.navigation.state.params.people,
            newItem: null
        }
    }

    componentDidMount() {
        console.log("start")
        console.log(this.state.people);
    }

    addItem = (index) => {
    console.log(index);
    this.state.people[index].items.push(this.state.newItem)

    }

    handleItemChange = (input)=> {
        this.setState({newItem: input})
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
                        return <Person 
                                key={index} 
                                id = {index}
                                people = {element}
                                handleItemChange = {this.handleItemChange}
                                addItem = {() => this.addItem(index)}
                                />
                    })}
                </View>
            
            </View>
        );
    }
}
