// OtherScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useFirestoreDocument } from '../hooks/useFirestoreDocument';
import { getId } from 'firebase/installations';

const OtherScreen = () => {
  const [titleInput, setTitleInput] = useState('');
  const { document, loading, error, getData } = useFirestoreDocument();

  const handleSearch = async () => {
    await getData(titleInput);
  };
  const handleSearchId = async () => {
    await getId(titleInput);
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: '80%' }}
        value={titleInput}
        onChangeText={setTitleInput}
        placeholder="Ingrese el título"
      />
      
      <Button title="Buscar" onPress={handleSearch} disabled={loading} />
      <Button title="Buscar id" onPress={handleSearchId} disabled={loading} />
      
      {loading && <Text>Cargando...</Text>}
      
      {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
      
      {document && Object.keys(document).length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text>Título: {document.title}</Text>
          <Text>Precio: {document.price}</Text>
          {/* Otros campos según tu estructura de datos */}
        </View>
      )}
    </View>
  );
};

export default OtherScreen;