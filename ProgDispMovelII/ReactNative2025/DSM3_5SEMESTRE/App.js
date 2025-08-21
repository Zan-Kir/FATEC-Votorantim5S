import { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { TextInput, Divider, Text } from "react-native-paper";

export default function App() {
  const [cep, setCep] = useState("");

  const [dadosCep, setDadosCep] = useState([]);

  const buscaCep = (value) => {
    let url = `https://viacep.com.br/ws/${value}/json/`;
    let formataCep = value.replace(/\D/g, "");
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setDadosCep(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar CEP:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Digite o CEP:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: 200,
          marginTop: 10,
        }}
        label="CEP"
        placeholder="123456789"
        keyboardType="numeric"
        onChangeText={(text) => {
          setCep(text);
        }}
      />
      <Pressable onPress={() => buscaCep(cep)}>
        <Text
          style={{
            padding: 10,
            backgroundColor: "blue",
            color: "white",
            marginTop: 10,
            borderRadius: 5,
          }}
        >
          Busca CEP
        </Text>
      </Pressable>

      {dadosCep.length === 0 ? (
        <Text>CEP não encontrado</Text>
      ) : (
        <View
          style={{
            marginTop: 20,
            backgroundColor: "lightgray",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <TextInput
            label="Rua"
            value={dadosCep.logradouro}
            style={{ marginBottom: 10 }}
            editable={false}
            onChangeText={(text) =>
              setDadosCep({ ...dadosCep, logradouro: text })
            }
          />
          <TextInput
            label="Número"
            value={dadosCep.numero}
            style={{ marginBottom: 10 }}
            editable={false}
            onChangeText={(text) => setDadosCep({ ...dadosCep, numero: text })}
          />
          <TextInput
            label="Bairro"
            value={dadosCep.bairro}
            style={{ marginBottom: 10 }}
            editable={false}
            onChangeText={(text) => setDadosCep({ ...dadosCep, bairro: text })}
          />
          <TextInput
            label="Complemento"
            value={dadosCep.complemento}
            style={{ marginBottom: 10 }}
            editable={false}
            onChangeText={(text) =>
              setDadosCep({ ...dadosCep, complemento: text })
            }
          />
          <TextInput
            label="Cidade"
            value={dadosCep.localidade}
            style={{ marginBottom: 10 }}
            editable={false}
            onChangeText={(text) =>
              setDadosCep({ ...dadosCep, localidade: text })
            }
          />
          <TextInput
            label="Estado"
            value={dadosCep.uf}
            style={{ marginBottom: 10 }}
            editable={false}
            onChangeText={(text) => setDadosCep({ ...dadosCep, uf: text })}
          />
          <Pressable style={{ marginTop: 10 }}>
            <Text
              style={{
                padding: 10,
                backgroundColor: "red",
                color: "white",
                borderRadius: 5,
                width: 100,
              }}
            >
              Deletar
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 100,
  },
});
