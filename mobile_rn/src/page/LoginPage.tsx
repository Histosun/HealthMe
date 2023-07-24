import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import api from '../api';

const validateUsername = (username: String): boolean => {
    return true;
}

const validatePassword = (password: String): boolean => {
    return true;
}

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | undefined>();

    const handleLogin = () => {
        if (!validateUsername(username)) {
            setError("Invalid username");
            return;
        }
        if (!validatePassword(password)) {
            setError("Invalid password");
            return;
        }
        console.log(123);
        setError(undefined);
        api.user.login({ username: username, password: password })
            .then(result => {
                console.log(result.data);
            }).catch(error => {
                console.log(JSON.stringify(error))
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setUsername(text)}
                value={username}
                placeholder="Enter your username"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder="Enter your password"
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
});

export default LoginScreen;