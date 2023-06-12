import React, { useState, useLayoutEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, StyleSheet, 
         Image, TextInput, Alert, ActivityIndicator } from 'react-native'
import themes from '../themes'
import {auth, database} from '../config/configFirebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Ionicons, EvilIcons } from "@expo/vector-icons";

export default function Signup({navigation}) {
    useLayoutEffect(()=> {
        navigation.setOptions({
            headerLeft: () => <></>,
        })
    }, [navigation])

    function changeEye() {
        setHidePass(!hidePass);
    
        if (hidePass) {
          setStatusEye("eye");
        } else {
          setStatusEye("eye-off");
        }
      }

    const insets = useSafeAreaInsets()
    const [hidePass, setHidePass] = useState(true);
    const [statusEye, setStatusEye] = useState("eye-off");
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    
    function handleSignup() {
        //Efetuando as validações básicas do form
        if(email === '' || senha ===''){
            Alert.alert('Atenção⚠',
            'Informe um email e senha para efetuar o login')
            return
        }
        if(senha.length < 6){
            Alert.alert('Atenção⚠',
            'A senha deve ter no mínimo 6 caracteres')
            return  
        }

        //Iremos cadastrar no Firebase
        createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
            Alert.alert('Aviso',
            'Usuário criado com sucesso! Efetue o login')
            navigation.navigate('Login', { email })
        })
        .catch((error) => {
            Alert.alert('Erro', `Erro ao criar o novo usuário: ${error.message}`)
        })
    }


    return (
        <View style={{
            paddingTop: insets.top,
            flex: 1
            
        }}>
            <View style={styles.container}>
            <Text style={styles.title }> CADASTRO</Text>

                <Image source={require('../assets/logo.png')}
                    style={styles.logo} />

                <View style={styles.form}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="Digite seu email"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        autoCompleteType="email" />
<View>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        placeholder='Digite sua senha'
                        style={styles.input}
                        value={senha}
                        secureTextEntry={hidePass}
                        onChangeText={setSenha}
                         />
</View>
<TouchableOpacity style={styles.icone} onPress={changeEye}>
            <Ionicons name={statusEye} size={20} color="#000000" />
          </TouchableOpacity>
<View>
                    <TouchableOpacity style={styles.loginButton}
                        onPress={handleSignup}>
                        <Text style={styles.loginButtonText}>
                            CADASTAR
                        </Text>
                    </TouchableOpacity>

                    </View>
                    <TouchableOpacity style={styles.createusuario}
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginButtonText}>
                        LOGIN
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.brand.verdeClaro,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
        borderRadius: 16
    },
    titulo: {
        fontSize: 24,
        color: themes.colors.brand.verdeEscuro,
        marginVertical: 8
    },
    logo: {
        width: 200,
        height: 200,
        marginVertical: 16
    },
    createusuario:{
        backgroundColor: themes.colors.utility.info,
        borderRadius: 20,
        padding: 16,
        marginTop: -2
    },
    input: {
        borderWidth: 1,
        borderColor: themes.colors.brand.verdeEscuro,
        backgroundColor: themes.colors.neutral.foreground,
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
        width:350,
        right:70,
    },
    form: {
        width: '60%'
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: themes.colors.neutral.foreground,
        fontWeight: 'bold',
        right:70,
    },
    loginButton: {
        backgroundColor: themes.colors.utility.info,
        borderRadius: 20,
        padding: 16,
        marginVertical: 8,
        marginTop:35,
    },
    loginButtonText: {
        color: themes.colors.neutral.foreground,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    icone: {
        zIndex: 1000,
        width: "-50%",
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        color: "#000000",
        left:130,
        marginTop:-50
      },
      title: {
        fontSize: 32,
        fontWeight: '500',
        color:"#fff"
        
    },
})