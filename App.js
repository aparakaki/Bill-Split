import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import Amount from './components/amount'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      text: null
    }
  }


  onPressButton = () => {
    this.setState({ count: this.state.count + 1 })
    this.renderPeople()
    
  }

  renderPeople = ()=> {
    return (
      <Text>Person</Text>
    )
  }
  render() {
    return (
      
      
      <View style={styles.container}
      >
       
        <View style={{
          height: '20%',
          marginTop: '20%',
          backgroundColor: "powderblue",
          borderRadius: 4,
          borderWidth: 1,
          borderColor: 'black',
        }} >
          <Text>{this.state.count}</Text>
          <Button 
          onPress={this.onPressButton}
          title="Increase Count"
        />
        </View>

         <TextInput
          style={{
            height: 50,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: 'black',
            fontSize: 30
          }}
          placeholder="00.00"
          onChangeText={(text) => this.setState({text})}
        />
        <Button title="Submit"></Button>
        <Text>
          People: {this.state.count}</Text>
          <Text>Total: {this.state.text}</Text>        
      </View>
      

    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column'

  }
  
});
