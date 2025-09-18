import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text, ScrollView } from "react-native";
const { addStudant, updateStudant } = require("../controllers/studants.controller");
const { fetchAddress } = require("../controllers/via_cep.controller");

const genMatricula = () => {
	return Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, "0");
};

export default function AddStudant({ navigation, route }) {
	const editing = !!route?.params?.studant;
	const studant = route?.params?.studant || {};

	const [matricula, setMatricula] = useState(editing ? studant.matricula : genMatricula());
	const [nome, setNome] = useState(editing ? studant.nome || "" : "");
	const [cep, setCep] = useState(editing ? studant.endereco?.cep || "" : "");
	const [logradouro, setLogradouro] = useState(editing ? studant.endereco?.logradouro || "" : "");
	const [cidade, setCidade] = useState(editing ? studant.endereco?.cidade || "" : "");
	const [bairro, setBairro] = useState(editing ? studant.endereco?.bairro || "" : "");
	const [estado, setEstado] = useState(editing ? studant.endereco?.estado || "" : "");
	const [numero, setNumero] = useState(editing ? studant.endereco?.numero || "" : "");
	const [cursos, setCursos] = useState(editing ? (studant.cursos || []).join(", ") : "");

	useEffect(() => {
		if (editing && studant) {
			setMatricula(studant.matricula);
		}
	}, [editing, studant]);

	const onFetchCep = async () => {
		const data = await fetchAddress(cep);
		if (!data) return Alert.alert("CEP", "Endereço não encontrado para este CEP");
		setLogradouro(data.logradouro || "");
		setBairro(data.bairro || "");
		setCidade(data.cidade || "");
		setEstado(data.estado || "");
	};

	const onSave = async () => {
		if (!nome.trim()) return Alert.alert("Validação", "Nome é obrigatório");
		try {
			const payload = {
				matricula,
				nome,
				endereco: { cep, logradouro, cidade, bairro, estado, numero },
				cursos: cursos ? cursos.split(",").map(s => s.trim()) : [],
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
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.label}>Matrícula (hex, 8 dígitos)</Text>
			<Text style={styles.matricula}>{matricula}</Text>
			<Text style={styles.label}>Nome</Text>
			<TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />

			<Text style={styles.label}>CEP</Text>
			<TextInput placeholder="00000000" value={cep} onChangeText={setCep} style={styles.input} keyboardType="numeric" />
			<Button title="Buscar CEP" onPress={onFetchCep} />

			<Text style={styles.label}>Logradouro</Text>
			<TextInput placeholder="Logradouro" value={logradouro} onChangeText={setLogradouro} style={styles.input} />

			<Text style={styles.label}>Bairro</Text>
			<TextInput placeholder="Bairro" value={bairro} onChangeText={setBairro} style={styles.input} />

			<Text style={styles.label}>Cidade</Text>
			<TextInput placeholder="Cidade" value={cidade} onChangeText={setCidade} style={styles.input} />

			<Text style={styles.label}>Estado</Text>
			<TextInput placeholder="Estado" value={estado} onChangeText={setEstado} style={styles.input} />

			<Text style={styles.label}>Número</Text>
			<TextInput placeholder="Número" value={numero} onChangeText={setNumero} style={styles.input} />

			<Text style={styles.label}>Cursos (separar por vírgula)</Text>
			<TextInput placeholder="Curso A, Curso B" value={cursos} onChangeText={setCursos} style={styles.input} />

			<Button title={editing ? "Atualizar" : "Adicionar"} onPress={onSave} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { padding: 16 },
	input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 12 },
	label: { fontWeight: "bold", marginBottom: 4 },
	matricula: { fontFamily: undefined, marginBottom: 12 },
});
