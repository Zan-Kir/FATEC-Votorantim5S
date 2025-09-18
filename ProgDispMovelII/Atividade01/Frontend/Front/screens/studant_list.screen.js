import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
const { listStudants, deleteStudant } = require("../controllers/studants.controller");

export default function StudantList({ navigation }) {
	const [studants, setStudants] = useState([]);

	const load = async () => {
		try {
			const data = await listStudants();
			setStudants(Array.isArray(data) ? data : []);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		const unsub = navigation.addListener("focus", () => {
			load();
		});
		load();
		return unsub;
	}, [navigation]);

	const onDelete = async (id) => {
		try {
			await deleteStudant(id);
			load();
		} catch (e) {
			console.error(e);
		}
	};

		const renderItem = ({ item }) => (
			<View style={styles.item}>
				<View style={{ flex: 1 }}>
					<Text style={styles.name}>{item.nome || item.name}</Text>
					<Text style={styles.subtitle}>Matrícula: {item.matricula}</Text>
				</View>
				<View style={styles.actions}>
					<Button title="Visualizar" onPress={() => navigation.navigate("ViewStudant", { studant: item })} />
					<Button title="Editar" onPress={() => navigation.navigate("AddStudant", { studant: item })} />
					<Button title="Excluir" onPress={() => onDelete(item._id || item.id)} />
				</View>
			</View>
		);

		return (
			<View style={styles.container}>
				<Button title="Adicionar" onPress={() => navigation.navigate("AddStudant")} />
				<FlatList data={studants} keyExtractor={(i) => i._id || i.id || i.matricula || String(Math.random())} renderItem={renderItem} />
			</View>
		);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16 },
	item: { padding: 12, borderBottomWidth: 1, borderColor: "#ddd", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	name: { fontSize: 16 },
	actions: { flexDirection: "row", gap: 8 },
});
