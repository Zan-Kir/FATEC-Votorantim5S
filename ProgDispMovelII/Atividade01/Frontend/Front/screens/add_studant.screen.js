import React, { useState, useEffect } from "react";
import { View, Alert, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Card,
  Checkbox,
  Surface,
  HelperText,
  useTheme,
  IconButton,
} from "react-native-paper";
import {
  cardStyles,
  containerStyles,
  headerStyles,
  inputStyles,
  buttonStyles,
  matriculaStyles,
  courseStyles,
  addressStyles,
} from "../themes/studants_light.theme";
const {
  addStudant,
  updateStudant,
} = require("../controllers/studants.controller");
const { fetchAddress } = require("../controllers/via_cep.controller");

const CURSOS_DISPONIVEIS = [
  "Desenvolvimento de Software Multi-plataforma",
  "Ciência de Dados para Negócios",
  "Controle de Obras",
];

const genMatricula = () => {
  return Math.floor(Math.random() * 0xffffffff)
    .toString(16)
    .padStart(8, "0");
};

export default function AddStudant({ navigation, route }) {
  const theme = useTheme();
  const editing = !!route?.params?.studant;
  const studant = route?.params?.studant || {};

  const [matricula, setMatricula] = useState(
    editing ? studant.matricula : genMatricula()
  );
  const [nome, setNome] = useState(editing ? studant.nome || "" : "");
  const [cep, setCep] = useState(editing ? studant.endereco?.cep || "" : "");
  const [logradouro, setLogradouro] = useState(
    editing ? studant.endereco?.logradouro || "" : ""
  );
  const [cidade, setCidade] = useState(
    editing ? studant.endereco?.cidade || "" : ""
  );
  const [bairro, setBairro] = useState(
    editing ? studant.endereco?.bairro || "" : ""
  );
  const [estado, setEstado] = useState(
    editing ? studant.endereco?.estado || "" : ""
  );
  const [numero, setNumero] = useState(
    editing ? studant.endereco?.numero || "" : ""
  );
  const [cursosSelecionados, setCursosSelecionados] = useState(
    editing ? studant.cursos || [] : []
  );
  const [enderecoPreenchido, setEnderecoPreenchido] = useState(false);
  const [buscandoCep, setBuscandoCep] = useState(false);

  useEffect(() => {
    if (editing && studant) {
      setMatricula(studant.matricula);
    }
  }, [editing, studant]);

  const onFetchCep = async (cepValue = cep) => {
    if (cepValue.length !== 8) return;

    setBuscandoCep(true);
    try {
      const data = await fetchAddress(cepValue);
      if (!data) {
        Alert.alert("CEP", "Endereço não encontrado para este CEP");
        setEnderecoPreenchido(false);
        return;
      }
      setLogradouro(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.cidade || "");
      setEstado(data.estado || "");
      setEnderecoPreenchido(true);
    } catch (error) {
      Alert.alert("Erro", "Erro ao buscar CEP");
      setEnderecoPreenchido(false);
    } finally {
      setBuscandoCep(false);
    }
  };

  const onCepChange = (value) => {
    const numericValue = value.replace(/\D/g, "");
    setCep(numericValue);

    if (numericValue.length === 8) {
      onFetchCep(numericValue);
    } else if (numericValue.length < 8) {
      setEnderecoPreenchido(false);
    }
  };

  const toggleCurso = (curso) => {
    setCursosSelecionados((prev) => {
      if (prev.includes(curso)) {
        return prev.filter((c) => c !== curso);
      } else {
        return [...prev, curso];
      }
    });
  };

  const onSave = async () => {
    if (!nome.trim()) return Alert.alert("Validação", "Nome é obrigatório");
    if (cursosSelecionados.length === 0)
      return Alert.alert("Validação", "Selecione pelo menos um curso");

    try {
      const payload = {
        matricula,
        nome,
        endereco: { cep, logradouro, cidade, bairro, estado, numero },
        cursos: cursosSelecionados,
      };
      if (editing) {
        await updateStudant(studant._id || studant.id, payload);
      } else {
        await addStudant(payload);
      }
      navigation.goBack();
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível salvar");
    }
  };

  return (
    <View style={containerStyles.container}>
      <Surface style={headerStyles.header}>
        <View style={headerStyles.headerContent}>
          <IconButton
            icon="arrow-left"
            size={24}
            iconColor="#1976D2"
            style={headerStyles.backButton}
            onPress={() => navigation.goBack()}
          />
          <View style={headerStyles.headerInfo}>
            <Text variant="titleLarge" style={headerStyles.headerTitle}>
              {editing ? "Editar Estudante" : "Adicionar Estudante"}
            </Text>
            <Text style={headerStyles.headerSubtitle}>
              {editing
                ? "Atualize os dados do estudante"
                : "Preencha os dados do novo estudante"}
            </Text>
          </View>
        </View>
      </Surface>

      <ScrollView style={containerStyles.scrollContainer}>
        <Card style={cardStyles.card}>
          <Card.Content>
            <Text variant="titleLarge">Dados Pessoais</Text>

            <Surface style={matriculaStyles.matriculaContainer}>
              <Text style={matriculaStyles.matriculaLabel}>Matrícula</Text>
              <Text style={matriculaStyles.matricula}>{matricula}</Text>
            </Surface>

            <TextInput
              label="Nome Completo"
              value={nome}
              onChangeText={setNome}
              style={inputStyles.input}
              mode="outlined"
            />
          </Card.Content>
        </Card>

        <Card style={cardStyles.card}>
          <Card.Content>
            <Text variant="titleLarge">Endereço</Text>

            <TextInput
              label="CEP"
              value={cep}
              onChangeText={onCepChange}
              onBlur={() => onFetchCep()}
              style={inputStyles.input}
              mode="outlined"
              keyboardType="numeric"
              maxLength={8}
              loading={buscandoCep}
            />
            <HelperText type="info">
              Digite 8 dígitos - a busca será automática
            </HelperText>

            <TextInput
              label="Rua"
              value={logradouro}
              onChangeText={setLogradouro}
              style={[
                inputStyles.input,
                enderecoPreenchido && inputStyles.inputDisabled,
              ]}
              mode="outlined"
              disabled={enderecoPreenchido}
              right={
                enderecoPreenchido ? (
                  <TextInput.Icon icon="check-circle" iconColor="#81C784" />
                ) : null
              }
            />

            <TextInput
              label="Número"
              value={numero}
              onChangeText={setNumero}
              style={inputStyles.input}
              mode="outlined"
              keyboardType="numeric"
            />

            <TextInput
              label="Bairro"
              value={bairro}
              onChangeText={setBairro}
              style={[
                inputStyles.input,
                enderecoPreenchido && inputStyles.inputDisabled,
              ]}
              mode="outlined"
              disabled={enderecoPreenchido}
              right={
                enderecoPreenchido ? (
                  <TextInput.Icon icon="check-circle" iconColor="#81C784" />
                ) : null
              }
            />

            <TextInput
              label="Cidade"
              value={cidade}
              onChangeText={setCidade}
              style={[
                inputStyles.input,
                enderecoPreenchido && inputStyles.inputDisabled,
              ]}
              mode="outlined"
              disabled={enderecoPreenchido}
              right={
                enderecoPreenchido ? (
                  <TextInput.Icon icon="check-circle" iconColor="#81C784" />
                ) : null
              }
            />

            <TextInput
              label="Estado"
              value={estado}
              onChangeText={setEstado}
              style={[
                inputStyles.input,
                enderecoPreenchido && inputStyles.inputDisabled,
              ]}
              mode="outlined"
              disabled={enderecoPreenchido}
              right={
                enderecoPreenchido ? (
                  <TextInput.Icon icon="check-circle" iconColor="#81C784" />
                ) : null
              }
            />
          </Card.Content>
        </Card>

        <Card style={cardStyles.card}>
          <Card.Content>
            <Text variant="titleLarge">Cursos</Text>
            <Text style={buttonStyles.subtitle}>
              Selecione os cursos de interesse:
            </Text>

            {CURSOS_DISPONIVEIS.map((curso, index) => (
              <View key={curso} style={courseStyles.checkboxContainer}>
                <Checkbox
                  status={
                    cursosSelecionados.includes(curso) ? "checked" : "unchecked"
                  }
                  onPress={() => toggleCurso(curso)}
                />
                <Text
                  style={courseStyles.checkboxLabel}
                  onPress={() => toggleCurso(curso)}
                >
                  {curso}
                </Text>
              </View>
            ))}

            <HelperText type="info">
              {cursosSelecionados.length === 0
                ? "Nenhum curso selecionado"
                : `${cursosSelecionados.length} curso(s) selecionado(s)`}
            </HelperText>
          </Card.Content>
        </Card>

        <View style={buttonStyles.buttonContainer}>
          <Button
            mode="contained"
            onPress={onSave}
            style={buttonStyles.saveButton}
            contentStyle={buttonStyles.buttonContent}
          >
            {editing ? "Atualizar Estudante" : "Cadastrar Estudante"}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
