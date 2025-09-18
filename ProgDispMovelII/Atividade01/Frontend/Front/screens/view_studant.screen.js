import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function ViewStudant({ route }) {
  const studant = route?.params?.studant || {};
  const endereco = studant.endereco || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.row}><Text style={styles.label}>Matrícula: </Text>{studant.matricula}</Text>
      <Text style={styles.row}><Text style={styles.label}>Nome: </Text>{studant.nome}</Text>
      <Text style={styles.sectionTitle}>Endereço</Text>
      <Text style={styles.row}><Text style={styles.label}>CEP: </Text>{endereco.cep}</Text>
      <Text style={styles.row}><Text style={styles.label}>Logradouro: </Text>{endereco.logradouro}</Text>
      <Text style={styles.row}><Text style={styles.label}>Número: </Text>{endereco.numero}</Text>
      <Text style={styles.row}><Text style={styles.label}>Bairro: </Text>{endereco.bairro}</Text>
      <Text style={styles.row}><Text style={styles.label}>Cidade: </Text>{endereco.cidade}</Text>
      <Text style={styles.row}><Text style={styles.label}>Estado: </Text>{endereco.estado}</Text>
      <Text style={styles.sectionTitle}>Cursos</Text>
      {Array.isArray(studant.cursos) ? studant.cursos.map((c, i) => <Text key={i} style={styles.row}>- {c}</Text>) : <Text style={styles.row}>{studant.cursos}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: 'bold' },
  row: { marginBottom: 8 },
  sectionTitle: { fontWeight: 'bold', marginTop: 12, marginBottom: 6 }
});
