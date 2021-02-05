import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Button,
  Alert,
  Text,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

export enum SecureStoreEnum {
  TOKEN = 'token',
}

const App = () => {
  const [token, setToken] = useState<string>('');
  const fakeToken = 'A fake token 🍪';

  const handleSetToken = async () => {
    await SecureStore.setItemAsync(SecureStoreEnum.TOKEN, fakeToken);
    setToken(fakeToken);
  };

  const handleGetToken = async () => {
    const tokenFromPersistentState = await SecureStore.getItemAsync(
      SecureStoreEnum.TOKEN,
    );
    if (tokenFromPersistentState) {
      Alert.alert(
        "This token is stored on your device, isn't that cool!:",
        tokenFromPersistentState,
      );
    }
  };

  const handleDeleteToken = async () => {
    await SecureStore.deleteItemAsync(SecureStoreEnum.TOKEN);
    setToken('');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Button title="set token" onPress={handleSetToken} />
        <Button title="get token" onPress={handleGetToken} />
        <Button title="delete token" onPress={handleDeleteToken} />
        <Text>{token}</Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
