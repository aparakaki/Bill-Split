import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };

    state = {
        personCount: 2,
        people: [{name: "Me", items: [], total: 0}, {name: "Person 1", items: [], total: 0}]
    }

    addPeople = () => {
        this.setState({ personCount: this.state.personCount + 1 })
        var newPerson = `Person ${this.state.personCount}`;
        var peopleArr = this.state.people.concat({name: newPerson, items: [], total: 0})
        this.setState({ people: peopleArr })
        // console.log(this.state.people);
    }

    removePeople = () => {
        if(this.state.personCount > 2){
            this.setState({personCount: this.state.personCount - 1})
            var removePeopleArray = this.state.people.slice(0, this.state.people.length-1)
            this.setState({people: removePeopleArray})
            // console.log(this.state.people) 
        }
        
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>

                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.titleStyle}>Select Amount of People</Text>
                    <Button
                        onPress={this.removePeople}
                        title="-"
                    />
                    <Text>{this.state.personCount} People</Text>
                    <Button
                        onPress={this.addPeople}
                        title="+"
                    />
                    {this.state.people.map((element, index) => {
                        return (
                            <View key={index + 1}>
                                <Text
                                key={element.name}>{element.name}</Text>
                                <TextInput
                                key = {index}
                                placeholder = "Name"></TextInput>
                            </View>
                                );
                    })}
                </View>
                <View style={styles.container2}>
                    <View style={styles.btnDiv}>
                        <Button
                            onPress={() => navigate('Calculator', {people: this.state.people})}
                            title="Next"
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