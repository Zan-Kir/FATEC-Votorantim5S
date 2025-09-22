import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StudantList from "./screens/studant_list.screen";
import AddStudant from "./screens/add_studant.screen";
import ViewStudant from "./screens/view_studant.screen";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="StudantList" component={StudantList} />
        <Stack.Screen name="AddStudant" component={AddStudant} />
        <Stack.Screen name="ViewStudant" component={ViewStudant} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
