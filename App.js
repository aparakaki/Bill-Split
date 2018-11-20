import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from "./screens/home";
import CalculatorScreen from "./screens/calculator"

export default class App extends React.Component{
  render() {
    return(
      <AppContainer />
    )
  }
};

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Calculator: CalculatorScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);