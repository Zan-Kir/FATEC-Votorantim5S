import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import {
  Text,
  Card,
  FAB,
  IconButton,
  Chip,
  Surface,
} from "react-native-paper";
import {
  containerStyles,
  headerStyles,
  cardStyles,
  courseStyles,
  fabStyles,
} from "../themes/studants_light.theme";
const {
  listStudants,
  deleteStudant,
} = require("../controllers/studants.controller");

export default function StudantList({ navigation }) {
  const [studants, setStudants] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await listStudants();
      setStudants(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
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
    <Card style={cardStyles.card}>
      <Card.Content>
        <View style={cardStyles.cardHeader}>
          <View style={cardStyles.studentInfo}>
            <Text variant="titleLarge" style={cardStyles.studentName}>{item.nome || item.name}</Text>
            <Text variant="bodyMedium" style={cardStyles.matricula}>
              Matrícula: {item.matricula}
            </Text>
          </View>
          <View style={cardStyles.actions}>
            <IconButton
              icon="eye"
              size={20}
              onPress={() =>
                navigation.navigate("ViewStudant", { studant: item })
              }
            />
            <IconButton
              icon="pencil"
              size={20}
              onPress={() =>
                navigation.navigate("AddStudant", { studant: item })
              }
            />
            <IconButton
              icon="delete"
              size={20}
              onPress={() => onDelete(item._id || item.id)}
            />
          </View>
        </View>

        {item.cursos && item.cursos.length > 0 && (
          <View style={courseStyles.coursesContainer}>
            <Text style={courseStyles.coursesLabel}>Cursos:</Text>
            <View style={courseStyles.chipContainer}>
              {item.cursos.slice(0, 2).map((curso, index) => (
                <Chip key={index} style={courseStyles.chip} compact>
                  {curso}
                </Chip>
              ))}
              {item.cursos.length > 2 && (
                <Chip style={courseStyles.chip} compact>
                  +{item.cursos.length - 2}
                </Chip>
              )}
            </View>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  const EmptyComponent = () => (
    <Surface style={containerStyles.emptyContainer}>
      <Text style={containerStyles.emptyText}>Nenhum estudante cadastrado</Text>
      <Text style={containerStyles.emptySubtext}>
        Toque no botão + para adicionar o primeiro estudante
      </Text>
    </Surface>
  );

  return (
    <View style={containerStyles.container}>
      <Surface style={headerStyles.header}>
        <View style={headerStyles.headerContent}>
          <View>
            <Text variant="titleLarge" style={headerStyles.headerTitle}>Estudantes</Text>
            <Text style={headerStyles.headerSubtitle}>
              {studants.length}{" "}
              {studants.length === 1
                ? "estudante cadastrado"
                : "estudantes cadastrados"}
            </Text>
          </View>
        </View>
      </Surface>

      <FlatList
        data={studants}
        keyExtractor={(i) =>
          i._id || i.id || i.matricula || String(Math.random())
        }
        renderItem={renderItem}
        refreshing={loading}
        onRefresh={load}
        contentContainerStyle={
          studants.length === 0 ? containerStyles.emptyList : containerStyles.list
        }
        ListEmptyComponent={EmptyComponent}
      />

      <FAB
        icon="account-multiple-plus"
        style={fabStyles.fab}
        onPress={() => navigation.navigate("AddStudant")}
        color="#FFFFFF"
      />
    </View>
  );
}
