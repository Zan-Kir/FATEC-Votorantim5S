import { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { TextInput, Divider, Text } from "react-native-paper";

export default function App() {
  const [cep, setCep] = useState("");

  // dadosCep: null = nenhum resultado, object = dados do viacep
  const [dadosCep, setDadosCep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buscaCep = (value) => {
    const formataCep = value.replace(/\D/g, "");
    setError("");

    if (formataCep.length !== 8) {
      setDadosCep(null);
      setError("CEP inválido. Informe 8 dígitos.");
      return;
    }

    const url = `https://viacep.com.br/ws/${formataCep}/json/`;
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.erro) {
          setDadosCep(null);
          setError("CEP não encontrado.");
        } else {
          setDadosCep(data);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar CEP:", err);
        setLoading(false);
        setDadosCep(null);
        setError("Erro ao buscar CEP. Tente novamente.");
      });
  };

  return (
    <View style={styles.container}>
      <Text>Digite o CEP:</Text>
      <TextInput
        style={styles.cepInput}
        label="CEP"
        placeholder="12345678"
        keyboardType="numeric"
        value={cep}
        maxLength={9}
        onChangeText={(text) => setCep(text)}
      />

      <Pressable onPress={() => buscaCep(cep)} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>{loading ? 'Buscando...' : 'Buscar CEP'}</Text>
      </Pressable>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {dadosCep ? (
        <View style={styles.card}>
          <TextInput
            label="Rua"
            value={dadosCep.logradouro ?? ""}
            style={{ marginBottom: 10 }}
            editable={false}
          />
          {/* <TextInput
            label="Número"
            value={dadosCep.numero ?? ""}
            style={{ marginBottom: 10 }}
            editable={true}
            onChangeText={(text) => setDadosCep({ ...dadosCep, numero: text })}
          /> */}
          <TextInput
            label="Bairro"
            value={dadosCep.bairro ?? ""}
            style={{ marginBottom: 10 }}
            editable={false}
          />
          {/* <TextInput
            label="Complemento"
            value={dadosCep.complemento ?? ""}
            style={{ marginBottom: 10 }}
            editable={true}
            onChangeText={(text) => setDadosCep({ ...dadosCep, complemento: text })}
          /> */}
          <TextInput
            label="Cidade"
            value={dadosCep.localidade ?? ""}
            style={{ marginBottom: 10 }}
            editable={false}
          />
          <TextInput
            label="Estado"
            value={dadosCep.uf ?? ""}
            style={{ marginBottom: 10 }}
            editable={false}
          />

          <Pressable
            style={styles.clearButton}
            onPress={() => {
              setCep("");
              setDadosCep(null);
              setError("");
            }}
          >
            <Text style={styles.clearButtonText}>Limpar</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 60,
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 100,
  },
  cepInput: {
    height: 50,
    width: 300,
    marginTop: 10,
    backgroundColor: 'white'
  },
  searchButton: {
    marginTop: 12,
    backgroundColor: '#1976D2',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center'
  },
  errorText: {
    color: '#c62828',
    marginTop: 8,
  },
  card: {
    marginTop: 20,
    backgroundColor: '#f2f2f2',
    padding: 14,
    borderRadius: 8,
    width: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  clearButton: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 6,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center'
  }
});
