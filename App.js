import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from "./screens/home";
import ImageScreen from "./screens/image"

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
    Image: ImageScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);