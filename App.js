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
        manageUser: false
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

  modifyProfileImage = (imgUrl) => {
    this.setState({
      profileImage: imgUrl,
      manageUser: false
    });
    Expo.SecureStore.setItemAsync('profileImage', imgUrl);
  }

  manageUserProfile = () => {
    this.setState({manageUser: true})
  }

  changeToWorkouts = () => {
    this.setState({manageUser: false})
  }

  protectedViews = () => {
    if (this.state.manageUser) {
      return (
        // <Settings openWorkouts={this.setState({manageUser: false})} token={this.state.sessionToken} />
        <Settings addImage={this.modifyProfileImage} token={this.state.sessionToken} />
      )
    }

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



