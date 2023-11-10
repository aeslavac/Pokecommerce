import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {useCart} from '../Navigator/CartContext';
import Modal from 'react-native-modal';
import Footer from './Footer';

const getTypeColor = (type) => {
    switch (type) {
        case 'water':
            return '#6890F0';
        case 'fire':
            return '#F08030';
        case 'grass':
            return '#78C850';
        case 'electric':
            return '#F8D030';
        case 'ice':
            return '#98D8D8';
        case 'fighting':
            return '#C03028';
        case 'poison':
            return '#A040A0';
        case 'ground':
            return '#E0C068';
        case 'flying':
            return '#00BFFF';
        case 'psychic':
            return '#F85888';
        case 'bug':
            return '#A8B820';
        case 'rock':
            return '#B8A038';
        case 'ghost':
            return '#705898';
        case 'dragon':
            return '#7038F8';
        case 'steel':
            return '#B8B8D0';
        case 'fairy':
            return '#EE99AC';
        case 'dark':
            return '#705848';
        default:
            return '#A8A8A8';
    }
};

const TypeBadge = ({ type }) => {
    return (
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor(type) }]}>
            <Text style={styles.typeText}>{type}</Text>
        </View>
    );
};

const ProductListDetail = ({ route, onShowProductDetails }) => {
    const { addToCart } = useCart(); 
    const { data } = route.params;
    const searchedPokemon = data.searchedPokemon;
    const listPokemon = data.listPokemon;
    const pokemon = searchedPokemon || listPokemon;
    const [isModalVisible, setModalVisible] = useState(false); 
  
    const handleAddToCart = () => {
      addToCart(pokemon); 
      setModalVisible(true); 
    };
  
    const closeModal = () => {
      setModalVisible(false); 
    };
  
    return (
      <View style={styles.container}>
        <View
          style={[styles.productImageContainer, { backgroundColor: getTypeColor(pokemon.types[0]) }]}
        >
          <Image
            source={{ uri: pokemon.image }}
            style={styles.productImage}
          />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{pokemon.name}</Text>
          <View style={styles.typeContainer}>
            {pokemon.types && pokemon.types.map((type, index) => (
              <TypeBadge key={index} type={type} />
            ))}
          </View>
          <Text style={styles.productDescription}>{pokemon.description}</Text>
          <Text style={styles.productPrice}>Precio: ${pokemon.id}</Text>
          <TouchableOpacity style={styles.productButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Agregar al Carrito</Text>
          </TouchableOpacity>
        </View>
  
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Producto agregado al carrito</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Footer/>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    productImageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    productImage: {
      width: '80%',
      height: '80%',
      resizeMode: 'cover',
    },
    productInfo: {
      padding: 20,
    },
    productTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    typeContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    typeBadge: {
      backgroundColor: 'transparent',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginRight: 10,
    },
    typeText: {
      color: 'white',
      fontWeight: 'bold',
    },
    productDescription: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'justify',
      lineHeight: 30,
      color: '#333',
    },
    productPrice: {
      fontSize: 24,
      color: '#ff6600',
      fontWeight: 'bold',
    },
    productButton: {
      backgroundColor: '#ffcc00',
      padding: 15,
      borderRadius: 8,
      marginTop: 20,
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 8,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalCloseText: {
      fontSize: 16,
      color: 'blue',
    },
  });
  
  export default ProductListDetail;