import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const pokemonTypes = [
  'water',
  'fire',
  'grass',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'steel',
];

const Footer = ({ onShowProductDetails }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const navigation = useNavigation(); 

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    setModalVisible(false);

    navigation.navigate('Home', { selectedType: type });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.footerItem} onPress={() => setModalVisible(true)}>
      <Image source={require('../assets/Lupa.pokemon.jpg')} style={styles.footerImage} />
        <Text style={styles.footerText}>Tipos de Pokémon</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem}>
        <Text style={styles.footerEmoji}>🛒</Text>
        <Text style={styles.footerText}>Carrito</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tipos de Pokémon</Text>
            <ScrollView>
              {pokemonTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeItem,
                    type === selectedType && styles.selectedTypeItem,
                  ]}
                  onPress={() => handleTypeSelection(type)}
                >
                  <Text style={styles.typeText}>{" " + type + " "}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerImage: {
    width: 42, 
    height: 50, 
    alignItems: 'center',
  },  
  footerEmoji: {
    fontSize: 24,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  typeItem: {
    padding: 10,
  },
  selectedTypeItem: {
    backgroundColor: '#007AFF',
  },
  typeText: {
    fontSize: 12, 
    textAlign: 'center',
  },
});

export default Footer;
