import React from 'react'
import { Text, View, TouchableHighlight } from 'react-native'

export default class NavBar extends React.Component {

    render() {
        return (
            <View style={{paddingTop: Expo.Constants.statusBarHeight, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableHighlight onPress={() => console.log('Settings')}><Text style={{textAlign: 'left', fontSize: 20}}>Settings</Text></TouchableHighlight>
                <TouchableHighlight 
                    onPress={() => console.log('#myworkout')}>
                    <Text style={{fontSize: 30, color: 'blue', textAlign: 'center'}}>
                        #myworkout
                    </Text>
                </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.clickLogout()}>
                        <Text style={{fontSize: 20, textAlign: 'right'}}>Log out</Text>
                    </TouchableHighlight>
            </View>
        )
    }
}