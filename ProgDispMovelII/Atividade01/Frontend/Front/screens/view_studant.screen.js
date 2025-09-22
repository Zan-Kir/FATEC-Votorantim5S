import React from "react";
import { ScrollView, View } from "react-native";
import {
  Text,
  Card,
  Chip,
  Surface,
  Divider,
  IconButton,
} from "react-native-paper";
import {
  cardStyles,
  addressStyles,
  containerStyles,
  headerStyles,
  matriculaStyles,
  courseStyles,
  textStyles,
  emptyCourseStyles,
} from "../themes/studants_light.theme";

export default function ViewStudant({ route, navigation }) {
  const studant = route?.params?.studant || {};
  const endereco = studant.endereco || {};

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
            <Text variant="titleLarge" style={headerStyles.headerTitle}>Visualizar Estudante</Text>
            <Text style={headerStyles.headerSubtitle}>
              Detalhes completos do estudante
            </Text>
          </View>
        </View>
      </Surface>

      <ScrollView style={containerStyles.scrollContainer}>
        <Card style={cardStyles.card}>
          <Card.Content>
            <Text variant="titleLarge">Dados Pessoais</Text>
            <Divider style={textStyles.divider} />

            <Surface style={matriculaStyles.matriculaContainer}>
              <Text style={matriculaStyles.matriculaLabel}>Matrícula</Text>
              <Text style={matriculaStyles.matricula}>{studant.matricula}</Text>
            </Surface>

            <View style={textStyles.row}>
              <Text style={textStyles.label}>Nome</Text>
              <Text variant="bodyMedium" style={textStyles.value}>{studant.nome}</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={cardStyles.card}>
          <Card.Content>
            <Text variant="titleLarge">Endereço</Text>
            <Divider style={textStyles.divider} />

            <View style={addressStyles.addressGrid}>
              <View style={addressStyles.addressRow}>
                <View style={addressStyles.addressField}>
                  <Text style={textStyles.label}>CEP</Text>
                  <Text variant="bodyMedium" style={textStyles.value}>
                    {endereco.cep || "Não informado"}
                  </Text>
                </View>
                <View style={addressStyles.addressField}>
                  <Text style={textStyles.label}>Número</Text>
                  <Text variant="bodyMedium" style={textStyles.value}>
                    {endereco.numero || "S/N"}
                  </Text>
                </View>
              </View>

              <View style={addressStyles.addressField}>
                <Text style={textStyles.label}>Rua</Text>
                <Text variant="bodyMedium" style={textStyles.value}>
                  {endereco.logradouro || "Não informado"}
                </Text>
              </View>

              <View style={addressStyles.addressRow}>
                <View style={addressStyles.addressField}>
                  <Text style={textStyles.label}>Bairro</Text>
                  <Text variant="bodyMedium" style={textStyles.value}>
                    {endereco.bairro || "Não informado"}
                  </Text>
                </View>
                <View style={addressStyles.addressField}>
                  <Text style={textStyles.label}>Cidade</Text>
                  <Text variant="bodyMedium" style={textStyles.value}>
                    {endereco.cidade || "Não informado"}
                  </Text>
                </View>
              </View>

              <View style={addressStyles.addressField}>
                <Text style={textStyles.label}>Estado</Text>
                <Text variant="bodyMedium" style={textStyles.value}>
                  {endereco.estado || "Não informado"}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={cardStyles.card}>
          <Card.Content>
            <Text variant="titleLarge">Cursos</Text>

            {Array.isArray(studant.cursos) && studant.cursos.length > 0 ? (
              <View style={courseStyles.coursesContainer}>
                {studant.cursos.map((curso, index) => (
                  <Chip
                    key={index}
                    style={courseStyles.cursoChip}
                    mode="outlined"
                    textStyle={courseStyles.cursoChipText}
                  >
                    {curso}
                  </Chip>
                ))}
              </View>
            ) : (
              <Surface style={emptyCourseStyles.emptyCourses}>
                <Text style={emptyCourseStyles.emptyCourseText}>
                  Nenhum curso selecionado
                </Text>
              </Surface>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}
