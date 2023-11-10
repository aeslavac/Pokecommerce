import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { useCart } from '../Navigator/CartContext';

const PokeCart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [isThankYouModalVisible, setThankYouModalVisible] = useState(false);
  const [creditCardData, setCreditCardData] = useState({
    number: '',
    name: '',
    expiration: '',
    cvv: '',
  });

  const [isFormIncomplete, setFormIncomplete] = useState(false);

  const canCheckout = cart.length > 0;

  const isFormValid = creditCardData.number && creditCardData.name && creditCardData.expiration && creditCardData.cvv; // Validar que todos los campos del formulario estén llenos

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.id} c/u</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={() => decreaseQuantity(item)}>
            <Text style={styles.controlButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>Cantidad: {item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item)}>
            <Text style={styles.controlButton}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item)}>
          <Text style={styles.removeButton}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.id * item.quantity, 0);
    return total;
  };

  const handleCheckout = () => {
    if (canCheckout) {
      setCheckoutModalVisible(true);
    }
  };

  const handleConfirmCheckout = () => {
    if (isFormValid) {
      clearCart();
      setCheckoutModalVisible(false);
      setThankYouModalVisible(true);
    }
  };

  const closeThankYouModal = () => {
    setThankYouModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi PokéCart</Text>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.checkoutContainer}>
        <Text style={styles.total}>Total: ${calculateTotal()}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isCheckoutModalVisible}
          onRequestClose={() => setCheckoutModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Datos de Tarjeta de Crédito</Text>
            <TextInput
              style={[styles.input, creditCardData.number === '' && styles.invalidInput]}
              placeholder="Número de Tarjeta"
              onChangeText={(text) => setCreditCardData({ ...creditCardData, number: text })}
            />
            <TextInput
              style={[styles.input, creditCardData.name === '' && styles.invalidInput]}
              placeholder="Nombre en la Tarjeta"
              onChangeText={(text) => setCreditCardData({ ...creditCardData, name: text })}
            />
            <TextInput
              style={[styles.input, creditCardData.expiration === '' && styles.invalidInput]}
              placeholder="Fecha de Expiración (MM/YY)"
              onChangeText={(text) => setCreditCardData({ ...creditCardData, expiration: text })}
            />
            <TextInput
              style={[styles.input, creditCardData.cvv === '' && styles.invalidInput]}
              placeholder="CVV"
              onChangeText={(text) => setCreditCardData({ ...creditCardData, cvv: text })}
            />
            {isFormIncomplete && (
              <Text style={styles.warningText}>Por favor, complete todos los campos.</Text>
            )}
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmCheckout}>
              <Text style={styles.confirmButtonText}>Confirmar Compra</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isThankYouModalVisible}
          onRequestClose={closeThankYouModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>¡Gracias por su compra!</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={closeThankYouModal}>
              <Text style={styles.confirmButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
  },
  itemDetails: {
    marginLeft: 16,
    flex: 1,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  invalidInput: {
    borderColor: 'red', 
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  warningText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default PokeCart;
