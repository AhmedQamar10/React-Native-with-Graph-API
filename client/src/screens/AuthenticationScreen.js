import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SignupForm from '../components/SignupForm'
import SigninForm from '../components/SigninForm'

const initialState = {
    showSignup: false,
    showSignin: false,
}

class AuthenticationScreen extends Component {
    state = initialState;
    _onShowSignupPress = () => this.setState({ showSignup: true });
    _onShowSigninPress = () => this.setState({ showSignin: true });

    _onBackPress = () => this.setState({ ...initialState });

    render() {
        if (this.state.showSignup) {
            return (
                <SignupForm onBackPress={this._onBackPress} />
            )
        }
        if (this.state.showSignin) {
            return (
                <SigninForm onBackPress={this._onBackPress} />
            )
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#353b48', position: 'relative' }}>
                <TouchableOpacity onPress={this._onShowSignupPress} style={{
                    height: 75, width: 150, backgroundColor: '#0097e6',
                    justifyContent: 'center', position: 'absolute', alignItems: 'center',
                    top: '30%', right: 0, borderBottomLeftRadius: 20, borderTopLeftRadius: 20,
                    shadowOpacity: 0.4, shadowRadius: 5, shadowOffset: '0px 4px', shadowColor: '#000'
                    , elevation: 2
                }}>
                    <Text style={{
                        color: 'white', fontWeight: 'bold',
                        fontSize: 20
                    }}>Get Started</Text>
                </TouchableOpacity>
                <View style={{
                    position: 'absolute', bottom: 0, left: 0,
                    right: 0, height: 200,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <TouchableOpacity 
                    onPress={this._onShowSigninPress}
                    hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }} 
                    style={{
                        justifyContent: 'center', alignItems: 'center',
                    }}>
                        <Text style={{
                            color: 'white', fontWeight: '400',
                            fontSize: 20
                        }}>Already have an account?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default AuthenticationScreen;