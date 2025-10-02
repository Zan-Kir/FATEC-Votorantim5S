import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { atualizarDados, criaBanco, criaTabela, deletarDados, inserirDados, listarDados } from "./config/bd";
import { useEffect } from "react";

export default function App() {
  const main = async () => {
    const db = await criaBanco();
    if (db) {
      criaTabela(db);
      inserirDados(db, "João Silva", "joao.silva@example.com");
      const usuarios = await listarDados(db);

      if(usuarios && usuarios.length > 0) {
        console.log(usuarios.length);
        for (const usuario of usuarios) {
          console.log(`ID: ${usuario.ID_US}, Nome: ${usuario.NOME_US}, Email: ${usuario.EMAIL_US}`);
        }
      }
      // const resp = await deletarDados(db, 1);
      // if(resp) {
      //   const usuariosAtualizados = await listarDados(db);
      //   if(usuariosAtualizados && usuariosAtualizados.length > 0) {
      //     for (const usuario of usuariosAtualizados) {
      //       console.log(`ID: ${usuario.ID_US}, Nome: ${usuario.NOME_US}, Email: ${usuario.EMAIL_US}`);
      //     }
      //   }
      // }
      await atualizarDados(db, 1, "Maria Souza", "maria.souza@example.com");
      const usuariosAtualizados = await listarDados(db);
      if(usuariosAtualizados && usuariosAtualizados.length > 0) {
        for (const usuario of usuariosAtualizados) {
          console.log(`ID: ${usuario.ID_US}, Nome: ${usuario.NOME_US}, Email: ${usuario.EMAIL_US}`);
        }
      }
    } else {
      console.log("Erro ao criar tabela banco nâo inicializado");
    }
  };

  useEffect(() => {
    main();
  }, []);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
