import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native'
import styles from './styles'

export default class Login extends React.Component {

login = () => {
    fetch("https://feeltheburnas.herokuapp.com/api/login", {
      method: 'POST',
      body: JSON.stringify({user:this.state}),
      headers: new Headers({
          'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .then(data => {
        console.log('login')
        this.props.setToken(data.sessionToken)
    }) 
}

render = () => {
    return (
        <View>
            <TextInput onChangeText = {(text) => this.setState({username: text})} style={styles.textInput} placeholder='username' />
            <TextInput onChangeText = {(text) => this.setState({password: text})} style={styles.textInput} placeholder='password' secureTextEntry />
            <TouchableHighlight 
                onPress = {() => this.login()}>
                <Text>Login</Text>
            </TouchableHighlight>
            <TouchableHighlight
            style={{backgroundColor: 'blue'}} 
            onPress = {() => this.props.loginActive(false)}>
                    <Text
                    style={styles.btnText}
                    >Go To Signup</Text>
            </TouchableHighlight>
        </View>
    )
}
}