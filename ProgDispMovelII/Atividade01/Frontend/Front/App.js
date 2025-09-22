import React from "react";
import { PaperProvider } from "react-native-paper";
import Routes from "./routes";
import { paperTheme } from "./themes/studants_light.theme";

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <Routes />
    </PaperProvider>
  );
}
