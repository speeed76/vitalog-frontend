// screens/TemperatureScreen.tsx

import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import DialInput from '../components/DialInput';
import { API_URLS } from '../constants/Api';

type TemperatureScreenProps = {
  navigation: {
    goBack: () => void;
  };
};

export default function TemperatureScreen({ navigation }: TemperatureScreenProps) {
  const [temperature, setTemperature] = useState(36.6);
  const [isLoading, setIsLoading] = useState(false);

  // This function is called when the user presses the "Save" button
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URLS.logs, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'body_temperature',
          value_1: temperature,
          unit_1: '°C',
        }),
      });

      if (!response.ok) {
        throw new Error('Nie udało się zapisać danych.');
      }

      await response.json();
      Alert.alert('Sukces', 'Pomyślnie zapisano temperaturę.');
      navigation.goBack(); // Go back to the home screen
    } catch (error: any) {
      Alert.alert('Błąd', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DialInput
        label="Temperatura Ciała"
        unit="°C"
        minValue={35.0}
        maxValue={42.0}
        initialValue={temperature}
        onValueChange={(value) => setTemperature(parseFloat(value.toFixed(1)))}
      />
      <TouchableOpacity
        style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Zapisz</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonDisabled: {
    backgroundColor: '#95a5a6',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});