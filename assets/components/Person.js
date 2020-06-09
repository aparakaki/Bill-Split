import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { CheckBox, Button, Icon } from 'react-native-elements';


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
                <View style = {styles.addItems}>
                <TextInput
                    placeholder = "00.00"
                    keyboardType = 'numeric'
                    returnKeyType='done'
                    maxLength = {5}
                    onChangeText={(input) => this.props.handleItemChange(input)}
                    style ={{
                        fontSize: 20
                    }}
                    onSubmitEditing = {this.props.addItem}
                />
                <Icon
                    name = "add-shopping-cart"
                    onPress = {this.props.addItem}
                />
                </View>
            ) 
        }
    }

    setChecked = (id) => {
        this.setState({ checked: !this.state.checked })
        this.props.handleChecked(id)
    }

    renderCheckboxes = () => {
        if(this.props.selectSplit){
            return (
            <CheckBox
            // title = "split"
            containerStyle = {styles.checkBox}
            checked = {this.state.checked}
            checkedColor = "#f7882f"
            onPress={() => this.setChecked(this.props.id)}
            /> 
            )
        }
    }
    render () {
    return (
        
        <KeyboardAvoidingView style={styles.container}  behavior="padding" enabled>
            {this.renderCheckboxes()}
            <Text style = {{
                fontSize: 18,
                padding: 10,
                color: "#6B7A8F"
            }}>{this.props.people.name} </Text>
            <View style ={styles.items}>
            <Text style = {{
                fontSize: 18,
                color: "#6B7A8F"
            }}>Items</Text>
            {this.props.people.items.map((item, index) => {
                return(
                <View  key = {index + 1}>
                    
                    <View style = {styles.eachItem}>
                    <Text key ={index} 
                    style = {{
                        fontSize: 15
                    }}>${item} </Text> 
                    <Icon
                    key = {item}
                    size = {15}
                    name = "cancel"
                    onPress = {() => this.props.deleteItem(this.props.id, index)}
                    />
                    </View>
                </View>
                )
            })} 
            </View>
            <View style={styles.totals}>
            <Text style = {{
                fontSize: 15,
                color: "#6B7A8F"
            }}>
                Tax: ${(this.props.people.tax).toFixed(2)}
            </Text>
            <Text style = {{
                fontSize: 15,
                color: "#6B7A8F"
            }}>
                Tip: ${(this.props.people.tip).toFixed(2)}
            </Text>
            <Text style = {{
                fontSize: 15,
                fontWeight: 'bold'
            }}>
                Total: ${(this.props.people.total).toFixed(2)}
            </Text>
            </View>
            
            {this.renderInputBox()}
            
        </KeyboardAvoidingView>
        
    ) 
    }
}
const styles = StyleSheet.create({
    
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#F4DECB",
        marginTop: 10,
        borderRadius: 8
    },
    totals: {
        flexDirection: "column",
        padding: 10
        
    },
    items: {
        flexDirection: 'column',
        padding: 10
    },
    eachItem: {
        flexDirection: "row",
        
    },
    addItems: {
        flexDirection: 'column',
        padding: 10
    },
    checkBox: {
        backgroundColor: "#F4DECB",
        borderWidth: 0,
        justifyContent: 'center',
        padding: 0
    }
   

});