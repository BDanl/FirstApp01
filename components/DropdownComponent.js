import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useFoods } from '../hooks/useFoods';

const DropdownButton = () => {
  const { loadFoodsByCategory } = useFoods();
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    { id: 1, label: 'vicio' },
    { id: 2, label: 'Verduras' },
    { id: 3, label: 'Carnes' },
  ]);

  const handleSelectItem = async (item) => {
    await loadFoodsByCategory(item.label);
    setVisible(false);
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#f7f7f7',
          padding: 10,
          borderRadius: 5,
          borderColor: '#ddd',
          borderWidth: 1,
        }}
        onPress={() => setVisible(true)}
      >
        <Text style={{ fontSize: 16, color: '#666' }}>
          {selectedItem ? selectedItem.label : 'Select a category'}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onPress={() => setVisible(false)}
        >
          <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 10,
              width: 200,
            }}
          >
            <FlatList
              data={items}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectItem(item)}>
                  <Text style={{ padding: 10, fontSize: 16, color: '#333' }}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default DropdownButton;