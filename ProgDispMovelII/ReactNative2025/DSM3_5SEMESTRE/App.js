import { useState } from "react";
import { View } from "react-native";
import {
  TextInput,
  Text,
  Button,
  Card,
  HelperText,
  Divider,
} from "react-native-paper";

export default function App() {
  const [cep, setCep] = useState("");

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
    <View>
      <Text>Digite o CEP:</Text>
      <TextInput
        label="CEP"
        placeholder="12345-678"
        keyboardType="numeric"
        value={cep}
        maxLength={9}
        onChangeText={(text) => setCep(text)}
      />

      <Button mode="contained" onPress={() => buscaCep(cep)} disabled={loading}>
        {loading ? "Buscando..." : "Buscar CEP"}
      </Button>

      {error ? <HelperText type="error">{error}</HelperText> : null}

      {dadosCep ? (
        <Card>
          <Card.Content>
            <Divider />
            <TextInput
              label="Logradouro"
              value={dadosCep.logradouro ?? ""}
              editable={false}
            />
            <Divider />
            <Divider />
            <Divider />
            <TextInput
              label="Bairro"
              value={dadosCep.bairro ?? ""}
              editable={false}
            />
            <Divider />
            <TextInput
              label="Localidade"
              value={dadosCep.localidade ?? ""}
              editable={false}
            />
            <Divider />
            <TextInput
              label="UF"
              value={dadosCep.uf ?? ""}
              editable={false}
            />
            <Divider />
          </Card.Content>
          <Card.Actions>
            <Button
              onPress={() => {
                setCep("");
                setDadosCep(null);
                setError("");
              }}
            >
              Limpar
            </Button>
          </Card.Actions>
        </Card>
      ) : null}
    </View>
  );
}
