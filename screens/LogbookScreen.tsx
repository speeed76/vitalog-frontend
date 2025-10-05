// screens/LogbookScreen.tsx

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { API_URLS } from '../constants/Api';

// Definiujemy typ danych dla pojedynczego wpisu, aby zgadzał się z backendem
interface Log {
  id: string;
  timestamp: string;
  type: string;
  value_1: number | null;
  unit_1: string | null;
  value_2: number | null;
  unit_2: string | null;
  notes: string | null;
}

export default function LogbookScreen() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ta funkcja zostanie wywołana, gdy ekran się załaduje
    const fetchLogs = async () => {
      try {
        const response = await fetch(API_URLS.logs);
        if (!response.ok) {
          throw new Error('Nie udało się połączyć z serwerem.');
        }
        const json = await response.json();
        setLogs(json.data); // Ustawiamy pobrane dane w stanie komponentu
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false); // Kończymy ładowanie, niezależnie od wyniku
      }
    };

    fetchLogs();
  }, []); // Pusta tablica zależności oznacza, że efekt uruchomi się tylko raz

  // Funkcja do renderowania pojedynczego elementu listy
  const renderLogItem = ({ item }: { item: Log }) => (
    <View style={styles.logItem}>
      <Text style={styles.logType}>{item.type.replace('_', ' ').toUpperCase()}</Text>
      <Text style={styles.logValue}>
        {item.value_1} {item.unit_1} {item.value_2 ? `/ ${item.value_2} ${item.unit_2}` : ''}
      </Text>
      <Text style={styles.logTimestamp}>
        {new Date(item.timestamp).toLocaleString('pl-PL')}
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Ładowanie danych...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Błąd: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {logs.length === 0 ? (
        <View style={styles.centered}>
            <Text>Brak wpisów w dzienniku.</Text>
        </View>
      ) : (
        <FlatList
          data={logs}
          renderItem={renderLogItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 10,
  },
  logItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  logType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  logValue: {
    fontSize: 18,
    color: '#3498db',
    marginVertical: 5,
  },
  logTimestamp: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'right',
  },
  errorText: {
      color: '#e74c3c',
      fontSize: 16,
  }
});