import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native'
import styles from './styles'

export default class Signup extends React.Component {

signup = () => {
    fetch("https://feeltheburnas.herokuapp.com/api/user", {
      method: 'POST',
      body: JSON.stringify({user:this.state}),
      headers: new Headers({
          'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .then(data => {
        console.log('signup')
        this.props.setToken(data.sessionToken)
    }) 
}

render = () => {
    return (
        <View>
            <TextInput onChangeText = {(text) => this.setState({username: text})} style={styles.textInput} placeholder='username' />
            <TextInput onChangeText = {(text) => this.setState({password: text})} style={styles.textInput} placeholder='password' secureTextEntry />
            <TouchableHighlight 
                onPress = {() => this.signup()}>
                <Text>Signup</Text>
            </TouchableHighlight>
            <TouchableHighlight
    style={{backgroundColor: 'blue'}} 
    onPress = {() => this.props.loginActive(true)}>
    <Text
    style={styles.btnText}
    >Go To Login</Text>
</TouchableHighlight>
        </View>
    )
}
}