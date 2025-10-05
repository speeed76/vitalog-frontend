// screens/HomeScreen.tsx

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

// Typ propsów dla nawigacji, na razie prosty
type HomeScreenProps = {
  navigation: {
    navigate: (screenName: string) => void;
  };
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>VitaLog</Text>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.button} onPress={() => { /* TODO: Nawigacja */ }}>
          <Text style={styles.buttonText}>🌡️ Temperatura</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { /* TODO: Nawigacja */ }}>
          <Text style={styles.buttonText}>🩸 Ciśnienie Krwi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { /* TODO: Nawigacja */ }}>
          <Text style={styles.buttonText}>🧪 Cukier we Krwi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { /* TODO: Nawigacja */ }}>
          <Text style={styles.buttonText}>📊 Test Paskowy Moczu</Text>
        </TouchableOpacity>
         <TouchableOpacity style={[styles.button, styles.logbookButton]} onPress={() => { navigation.navigate('Logbook'); }}>
          <Text style={styles.buttonText}>📖 Dziennik Wpisów</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 60,
    marginBottom: 40,
  },
  menu: {
    width: '90%',
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logbookButton: {
      marginTop: 20,
      backgroundColor: '#3498db',
  },
  buttonText: {
    fontSize: 18,
    color: '#34495e',
    fontWeight: '500',
  },
});