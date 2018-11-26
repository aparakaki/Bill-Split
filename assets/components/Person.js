import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';


export default class Person extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checked: false
        }
    }
 
    renderInputBox = () => {
        if(this.props.currentTotal > 0){
            return(
                <View>
                <TextInput
                placeholder = "00.00"
                keyboardType = 'numeric'
                returnKeyType='done'
                //value = {this.props.newItem}
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
    componentDidMount(){
        // console.log(this.props.people)
    }

    setChecked = (id) => {
        this.setState({ checked: !this.state.checked })
        this.props.handleChecked(id)
    }

    renderCheckboxes = () => {
        if(this.props.selectSplit){
            return (
            <CheckBox
            title = "split" 
            checked = {this.state.checked}
            onPress={() => this.setChecked(this.props.id)}
            /> 
            )
        }
    }
    render () {
    return (
        <View>
            {this.renderCheckboxes()}
            <Text>{this.props.people.name} </Text>
            {this.props.people.items.map((item, index) => {
                return(
                <View 
                key = {index + 1}>
                    <Text
                    key ={index + 2}
                    >Items
                    </Text>
                    <Text
                    key ={index}
                    >${item} 
                    </Text> 
                    <Button
                    key = {item}
                    title = "x"
                    onPress = {() => this.props.deleteItem(this.props.id, index)}
                    >
                    </Button>
                </View>
                )
            })} 
            <Text>Tax: ${(this.props.people.tax).toFixed(2)}</Text>
            <Text>Tip: ${(this.props.people.tip).toFixed(2)}</Text>
            <Text>Total: ${(this.props.people.total).toFixed(2)}</Text>
            
            {this.renderInputBox()}
            
        </View>
    ) 
    }
}