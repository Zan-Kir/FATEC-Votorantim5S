import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

export default function App() {
  const getHostFromExpo = () => {
    const debuggerHost =
      Constants.manifest?.debuggerHost || Constants.expoConfig?.hostUri;
    if (debuggerHost) {
      return debuggerHost.split(":")[0];
    }
    return null;
  };

  const host = getHostFromExpo();
  // const url = "http://10.0.2.2:3000/";
  // const url = "http://192.168.50.54:3000/";
  const url = host ? `http://${host}:3000/` : "http://localhost:3000/";

  const ExibirDados = (url) => {
    fetch(`${url}users`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Exibir Dados" onPress={() => ExibirDados(url)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
