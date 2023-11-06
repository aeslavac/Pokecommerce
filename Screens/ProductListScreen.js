import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProductListScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loadedCount, setLoadedCount] = useState(15);
  const [isSearching, setIsSearching] = useState(false);

  const route = useRoute();
  const selectedType = route.params?.selectedType;

  const loadMore = () => {
    if (!isSearching) {
      const newCount = loadedCount + 5;
      setLoadedCount(newCount);
    }
  };

  const searchPokemon = () => {
    if (searchText) {
      const searchResults = pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase()) && pokemon.type === selectedType
      );
  
      if (searchResults.length === 0) {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`)
          .then((response) => {
            const pokemon = response.data;
  
            if (pokemon && pokemon.types.some(type => type.type.name === selectedType)) {
              const result = {
                id: pokemon.id,
                name: pokemon.name,
                type: selectedType,
                image: pokemon.sprites.front_default,
                price: `$${pokemon.id}.00`,
              };
  
              setSearchResults([result]);
              setIsSearching(true);
            } else {
              alert(`El Pokémon ${pokemon.name} no es del tipo ${selectedType}.`);
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              alert(`El Pokémon ${searchText} no existe.`);
            } else {
              console.error(error);
            }
          });
      } else {
        setSearchResults(searchResults);
        setIsSearching(true);
      }
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };
  
  useEffect(() => {
    if (selectedType && !isSearching) {
      axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`).then((response) => {
        const pokemonsOfType = response.data.pokemon.slice(0, loadedCount);
        const requests = pokemonsOfType.map((pokemon) => axios.get(pokemon.pokemon.url));
        Promise.all(requests).then((pokemonDetails) => {
          const formattedData = pokemonDetails.map((detail) => ({
            id: detail.data.id,
            name: detail.data.name,
            type: selectedType,
            image: detail.data.sprites.front_default,
            price: `$${detail.data.id}.00`,
          }));
          setPokemonData(formattedData);
        });
      });
    }
  }, [selectedType, loadedCount, isSearching]);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem}>
      <Image
        source={{ uri: item.image }}
        style={{ width: 80, height: 80 }}
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pokemon"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onBlur={searchPokemon}
        />
      </View>
      <FlatList
        data={isSearching ? searchResults : pokemonData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
      />
      <Button title="Cargar Más" onPress={loadMore} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productName: {
    fontSize: 18,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductListScreen;
