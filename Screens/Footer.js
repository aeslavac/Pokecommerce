import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../Navigator/CartContext';

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
  'fairy',
  'normal',
  'dark',
];

const Footer = ({ onShowProductDetails }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0); 

  const navigation = useNavigation();
  const { cart } = useCart();

  useEffect(() => {
    
    setCartItemCount(cart.length);
  }, [cart]);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    setTypeModalVisible(false);
    navigation.navigate('Home', { selectedType: type });
  };

  const handleExitConfirmation = () => {
    setModalVisible(true);
  };

  const handleExit = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };

  const handleCartNavigation = () => {
    navigation.navigate('PokeCart');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.footerItem} onPress={handleExitConfirmation}>
        <Image source={require('../assets/ExitButtonOpcion2.jpg')} style={styles.footerImage} />
        <Text style={styles.footerText}>Salir</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem} onPress={() => setTypeModalVisible(true)}>
        <Image source={require('../assets/Lupa.pokemon.jpg')} style={styles.footerImage} />
        <Text style={styles.footerText}>Tipos de Pokémon</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.footerItem} onPress={handleCartNavigation}>
        <View>
          <Image source={require('../assets/carritopokemon.jpg')} style={styles.footerImage} />
          {cartItemCount > 0 && (
            <View style={styles.notificationBubble}>
              <Text style={styles.notificationText}>{cartItemCount}</Text>
            </View>
          )}
        </View>
        <Text style={styles.footerText}>Carrito</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿Estás seguro de salir?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleExit}>
                <Text style={styles.modalButton}>Sí</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButton}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={typeModalVisible}>
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
  footerItem: {
    alignItems:'center',
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
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
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
  notificationBubble: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Footer;
