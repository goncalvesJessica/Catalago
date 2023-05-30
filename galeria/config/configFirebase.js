import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Pressable, Text, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAeGHNQwupMyl599alphPrf2RWgB7Eqq38",
  authDomain: "galeria-5da11.firebaseapp.com",
  projectId: "galeria-5da11",

});

export const Configu = () => {
  const [produtos, setProdutos] = useState([]);

  const db = getFirestore(firebaseApp);
  const produtoColletionRef = collection(db, "Produto");

  useEffect(() => {

    const getProdutos = async () => {
      let produtos = [];
      await getDocs(produtoColletionRef).then((data) => {
        data.forEach((doc) => {
          produtos.push(JSON.parse(JSON.stringify(doc.data())));
        });
      }).catch((error) => {
        console.error(error);
      });
      setProdutos(produtos);
    };
    getProdutos();
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ top: 100 }}>
        <Text style={styles.texto}>CATALAGO</Text>

        {produtos.map(produto => (
          <View style={styles.lista}>
          
             <Image style={styles.imagem} source={{uri: produto.imagem}}/>
            <Text style={styles.textol}>PRODUTO: {produto.nome}</Text>
            <Text style={styles.textol}>DESCRIÇÃO: {produto.descricao}</Text>
            <Text style={styles.textol}>VALOR: {produto.valor},00</Text>
            
            <Text style={styles.textol}>QUANTIDADE: {produto.quantidade} DISPONIVEIS</Text>

          </View>
          
        ))}

      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#E8A2D9",
  },
  texto: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    height: 45,
    left: 150,

  },
  lista:{
    backgroundColor: 'white',
    paddingHorizontal:10,
    borderRadius: 20,
    paddingVertical: 20,
    marginBottom:10,
    height:200,
  },
  textol: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    height: 40,
    left: 150,
    top:-400,

  },
  imagem:{
    top:-120,
    padding:50,
    margin:150,
right:150  }
})
