import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { Button, Icon } from 'react-native-elements';


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Split',
    };

    state = {
        personCount: 2,
        people: [{ name: "Me", nameSet: false, checked: false, items: [], tax: 0, tip: 0, total: 0 }, { name: "Person 1", nameSet: false, checked: false, items: [], tax: 0, tip: 0, total: 0 }],
        nameSet: null
    }

    addPeople = () => {
        if(this.state.personCount < 9){
            this.setState({ personCount: this.state.personCount + 1 })
            var newPerson = `Person ${this.state.personCount}`;
            var peopleArr = this.state.people.concat({ name: newPerson, nameSet: false, checked: false, items: [], tax: 0, tip: 0, total: 0 })
            this.setState({ people: peopleArr })
            // console.log(this.state.people);
        }
    }

    handleItemChange = (input) => {
        this.setState({ nameSet: input })
    }
    setName = (index) => {
        console.log("set name")
        if (this.state.nameSet) {
            this.state.people[index].name = this.state.nameSet
            this.state.people[index].nameSet = true
            this.forceUpdate()
        }

    }

    renderNameInput = (index) => {
        if (!this.state.people[index].nameSet) {
            return (
                <View style={styles.nameInput}>
                    <TextInput

                        key={index}
                        placeholder="Enter Name"
                        onChangeText={(input) => this.handleItemChange(input)}
                        returnKeyType='done'
                        maxLength = {10}
                    >

                    </TextInput>
                        <Icon
                        name='person-add' 
                        iconStyle = {{
                            marginLeft: 10
                        }}
                        color = "#6B7A8F"
                        onPress={() => this.setName(index)}
                        />
                </View>
            )
        }
    }
    removePeople = () => {
        if (this.state.personCount > 2) {
            this.setState({ personCount: this.state.personCount - 1 })
            var removePeopleArray = this.state.people.slice(0, this.state.people.length - 1)
            this.setState({ people: removePeopleArray })
            // console.log(this.state.people) 
        }

    }

    reset = () => {
        this.setState({
            personCount: 2,
            people: [{ name: "Me", nameSet: false, checked: false, items: [], tax: 0, tip: 0, total: 0 }, { name: "Person 1", nameSet: false, checked: false, items: [], tax: 0, tip: 0, total: 0 }],
            nameSet: null
        });

    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView style={styles.container}  behavior="padding" enabled>
                <Text style={{ 
                    textAlign: "center", 
                    padding: 10, 
                    fontSize: 30 }}>
                    Select Amount of People</Text>

                <View style={styles.amount}>

                    <Button
                        buttonStyle={styles.setAmount}
                        onPress={this.removePeople}
                        title="-"
                    />
                    <Text style={{
                        // paddingTop: 10,
                        // paddingBottom: 10,
                        // paddingRight: 15,
                        // paddingLeft: 15,
                        fontSize: 40,
                        // backgroundColor: "pink",
                        // flex: 3 / 4,
                        textAlign: "center",
                        justifyContent: "center"
                        // borderWidth: 0,
                        // borderRadius: 5, 
                        
                    }}
                    >{this.state.personCount}  
                    </Text> 
                    <Icon
                        name='person'   
                        size = {40}
                        color= "#6B7A8F"
                        />
                    <Button
                        buttonStyle={styles.setAmount}
                        onPress={this.addPeople}
                        title="+"
                    />
                </View> 
                <View style={styles.people}>
                    {this.state.people.map((element, index) => {
                        return (
                            <View
                                style={{
                                    marginTop: 20
                                }}
                                key={index + 1}>
                                <Text
                                    style={{ fontSize: 20 }}
                                    key={element.name}>{element.name}</Text>
                                {this.renderNameInput(index)}
                            </View>
                        );
                    })}
                </View>
                
                <View style={styles.nextReset}>
                    <Button
                        buttonStyle={{
                            backgroundColor: "#F7C331",
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5,


                        }}
                        title="reset"
                        onPress={this.reset}
                    />
                    <Button
                        buttonStyle={{
                            backgroundColor: "#F7882F",
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5,


                        }}
                        onPress={() => navigate('Calculator', { people: this.state.people })}
                        title="Next"
                        
                    />

                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#F4DECB",
        


    }, 
  
    amount: {
        flexDirection: "row",
        justifyContent: "center",

    },
    setAmount: {
        paddingLeft: 15,
        paddingRight: 15, 
        borderRadius: 5,
        backgroundColor: "#6B7A8F"
    },
    people: { 
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignItems: "center",
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    
    },
    nameInput: {
        flexDirection: "row",

    },
    nextReset: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 20
    }

});