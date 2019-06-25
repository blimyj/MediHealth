import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Icon, Button, Container, Content, Form, Item, Label, Input } from "native-base";
import MyHeader from "../../components/header";
import styles from "./appStyle"

import * as firebase from 'firebase'

class LoginScreen extends Component {
    constructor (props) {
        super (props);
        this.state = {
            email : '',
            password: '',
            error: ''
        }
    }

    signUp(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch( (error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                  alert('The password is too weak.');
                } else {
                  alert(errorMessage);
                }
                console.log(error);
            })
            .then( (authData) => {
                this.writeUserData(authData.uid)

            });
    }

    login(email, password) {

    }

	render() {
		return (
			<Container>
				<MyHeader nav={this.props.navigation} headerTitle="Login" />
				<Content
					contentContainerStyle={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Text>Login Screen</Text>
					<Form>
						<Item stackedLabel>
							<Label>Email</Label>
							<Input
								onChangeText={text => this.setState({ email: text })}
							/>
						</Item>
						<Item stackedLabel num1>
							<Label>Password</Label>
							<Input
                                secureTextEntry={true}
								onChangeText={text => this.setState({ password: text })}
							/>
						</Item>
					</Form>
                    <View style={styles.ButtonsContainer}>

                        <View style={styles.ButtonPadding}/>
                        <View style={styles.ButtonContainer}>
                            <TouchableOpacity
                                title="Login Button"
                                style={styles.LoginButton}
                                accessibilityLabel="Login Button"
                                onPress={() => { 
                                    this.login(this.state.email,
                                        this.state.password
                                    );
                                    }
                                }
                            >
                                <Text style={styles.bigButtonText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ButtonPadding}/>

                        <View style={styles.ButtonContainer}>
                            <TouchableOpacity
                                title="Sign Up Button"
                                style={styles.SignUpButton}
                                accessibilityLabel="Sign Up Button"
                                onPress={() => {
                                    this.signUp(this.state.email,
                                        this.state.password
                                    );
                                    }
                                }
                            >
                                <Text style={styles.bigButtonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style = {styles.ButtonPadding}/>
                        
                    </View>
				</Content>
			</Container>
		);
	}
}

export default LoginScreen;
