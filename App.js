import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableNativeFeedback } from 'react-native';
import Auth from './src/screens/auth/Auth';
import NavBar from './src/components/NavBar';
import WorkoutIndex from './src/screens/workouts/index';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        sessionToken: '',
        
    }
  }
  
  setSessionState = (token) => {
    Expo.SecureStore.setItemAsync('token', token);
    this.setState({ sessionToken: token });
  }
  
  componentWillMount = () => {
    Expo.SecureStore.getItemAsync('token')
    .then((sessionToken) => {
      this.setState({ sessionToken })      
    })
  }

  logout = () => {
    this.setState({ sessionToken: '' })
    Expo.SecureStore.deleteItemAsync('token')
  }

  protectedViews = () => {

    if (this.state.sessionToken == null || this.state.sessionToken == '') {      
      return (
        <Auth setToken={this.setSessionState} />
      )
    } else {
      return (
        <WorkoutIndex profileImg={this.state.profileImage} token={this.state.sessionToken}/>
      )
    }
  }
  
  render = () => {
    return (
      <View style={styles.container}>
        <NavBar token={this.state.sessionToken} goToWorkouts={this.changeToWorkouts} clickLogout={this.logout} goToUser={this.manageUserProfile}/>
        {this.protectedViews()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});



