import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useSafeAreaInsets }
    from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity, StyleSheet, 
         Image, TextInput, Alert, SafeAreaView } from 'react-native'
import themes from '../themes'
import { auth } from '../config/configFirebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, EvilIcons } from "@expo/vector-icons";


export default function Login() {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [efetuandoLogin, setEfetuandoLogin] = useState(false)
    const [hidePass, setHidePass] = useState(true);
    const [statusEye, setStatusEye] = useState("eye-off");
    
    function changeEye() {
        setHidePass(!hidePass);
    
        if (hidePass) {
          setStatusEye("eye");
        } else {
          setStatusEye("eye-off");
        }
      }

    function handleLogin() {
        //Efetuando as validações básicas do form
        if(email === '' || senha ===''){
            Alert.alert('Atenção',
            'Informe um email e senha para realizar o login')
            return
        }
        if(senha.length < 6){
            Alert.alert('Atenção',
            'A senha informada é muito curta !')
            return  
        }
        setEfetuandoLogin(true)
        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential)=> {
            const user = userCredential.user
            //console.log(user)
             navigation.navigate('Home')
        })
        .catch((error) => {
            Alert.alert('Erro',
          `Erro ao realizar o login: ${error.message}`)
        })
        setEfetuandoLogin(false)
    }

    return (
        <View style={{
            paddingTop: insets.top,
            backgroundColor: themes.colors.brand.verde,
            flex: 1
        }}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title }> LOGIN</Text>
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
                        onChangeText={setSenha}
                        secureTextEntry={hidePass} />
</View>
<TouchableOpacity style={styles.icone} onPress={changeEye}>
            <Ionicons name={statusEye} size={20} color="#000000" />
          </TouchableOpacity>
          <View>
                    <TouchableOpacity style={styles.loginButton}
                        onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>
                            LOGIN
                        </Text>
                    </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.createusuario}
                        onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.loginButtonText}>
                            CADASTRAR
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'E8A2D9',
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
    input: {
        borderWidth: 1,
        borderColor: themes.colors.brand.verdeEscuro,
        backgroundColor: themes.colors.neutral.foreground,
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
        width:350,
        right:80,
    },
    form: {
        width: '55%'
    },
    createusuario:{
        backgroundColor: themes.colors.utility.info,
        borderRadius: 20,
        padding: 15,
        marginTop: -2
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: themes.colors.neutral.foreground,
        fontWeight: 'bold', 
        right:80,
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
        textAlign: 'center',

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