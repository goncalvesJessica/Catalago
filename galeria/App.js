import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import Cadastrar from './Rotas/Cadastrar';
import CameraApp from './Rotas/CameraApp';
import Home from './Rotas/Home';
import { Configu } from "./config/configFirebase";

const Stake = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stake.Navigator inicialRouteName="Home">
        <Stake.Screen name="Home" component={Home}  options={{ headerShown: false }} />
        <Stake.Screen name="CameraApp" component={CameraApp}  options={{ headerShown: false }} />
        <Stake.Screen name="Cadastrar" component={Cadastrar}  options={{ headerShown: false }} />
        <Stake.Screen name="configFirebase" component={Configu}  options={{ headerShown: false }} />

      </Stake.Navigator>
    </NavigationContainer>
  )
}