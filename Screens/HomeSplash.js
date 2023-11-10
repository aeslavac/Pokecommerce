//HomeSplash.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import Navbar from './NavBar';
import Footer from './Footer';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';



export default function HomeSplash() {
  const navigation = useNavigation();
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonImages, setPokemonImages] = useState([]);

  const [ghostPokemonList, setGhostPokemonList] = useState([]);
  const [ghostPokemonImages, setGhostPokemonImages] = useState([]);

  const [dragonPokemonList, setDragonPokemonList] = useState([]);
  const [dragonPokemonImages, setDragonPokemonImages] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      const pokemonData = response.data;

      const speciesResponse = await axios.get(pokemonData.species.url);
      const speciesData = speciesResponse.data;
      const description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'es').flavor_text;

      const pokemon = {
        name: pokemonData.name,
        id: pokemonData.id,
        types: pokemonData.types.map(type => type.type.name),
        weight: pokemonData.weight,
        height: pokemonData.height,
        description: description,
        image: pokemonData.sprites.front_default,
      };

      navigation.navigate('PokemonDetails', { pokemon });
    } catch (error) {
      Alert.alert('Error', 'El Pokémon no se encontró. Intente con otro nombre.');
    }
  };


  useEffect(() => {
    const fetchPokemonDetails = async (pokemon) => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      const pokemonData = response.data;



      pokemon.id = pokemonData.id;
      pokemon.types = pokemonData.types.map(type => type.type.name);
      pokemon.weight = pokemonData.weight;
      pokemon.height = pokemonData.height;

      const speciesResponse = await axios.get(pokemonData.species.url);
      const speciesData = speciesResponse.data;
      const generation = speciesData.generation.name;
      pokemon.generation = generation;

      const description = speciesData.flavor_text_entries.find(entry => entry.language.name === 'es');
      pokemon.description = description.flavor_text;

      setPokemonList(prevList => {
        const updatedList = prevList.map(item => (item.name === pokemon.name ? pokemon : item));
        return updatedList;
      });
    };

    const fetchPokemon = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/type/steel');
      const data = response.data.pokemon.slice(0, 10).map(p => p.pokemon);
      const pokemonImages = await Promise.all(
        data.map(async pokemon => {
          const res = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: res.data.sprites.front_default,
          };
        }),
      );
      await Promise.all(pokemonImages.map((pokemon) => fetchPokemonDetails(pokemon)));
      setPokemonList(pokemonImages);
    };

    const fetchGhostPokemon = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/type/ghost');
      const data = response.data.pokemon.slice(0, 10).map(p => p.pokemon);
      const ghostImages = await Promise.all(
        data.map(async pokemon => {
          const res = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: res.data.sprites.front_default,
          };
        }),
      );
      await Promise.all(ghostImages.map((pokemon) => fetchPokemonDetails(pokemon)));
      setGhostPokemonList(ghostImages);
    };

    const fetchDragonPokemon = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/type/dragon');
      const data = response.data.pokemon.slice(0, 10).map(p => p.pokemon);
      const dragonImages = await Promise.all(
        data.map(async pokemon => {
          const res = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: res.data.sprites.front_default,
          };
        }),
      );
      await Promise.all(dragonImages.map((pokemon) => fetchPokemonDetails(pokemon)));
      setDragonPokemonList(dragonImages);
    };

    fetchPokemon();
    fetchGhostPokemon();
    fetchDragonPokemon();
  }, []);

  const renderPokemonItem = ({ item }) => {
    const navigateToPokemonDetails = () => {
      navigation.navigate('PokemonDetails', { pokemon: item });
    };

    return (
      <TouchableOpacity onPress={navigateToPokemonDetails}>
        <View style={styles.pokemonItem}>
          <Image source={{ uri: item.image }} style={styles.pokemonImage} />
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  const renderGhostPokemonItem = ({ item }) => {
    const navigateToPokemonDetails = () => {
      navigation.navigate('PokemonDetails', { pokemon: item });
    };

    return (
      <TouchableOpacity onPress={navigateToPokemonDetails}>
        <View style={styles.pokemonItem}>
          <Image source={{ uri: item.image }} style={styles.pokemonImage} />
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDragonPokemonItem = ({ item }) => {
    const navigateToPokemonDetails = () => {
      navigation.navigate('PokemonDetails', { pokemon: item });
    };

    return (
      <TouchableOpacity onPress={navigateToPokemonDetails}>
        <View style={styles.pokemonItem}>
          <Image source={{ uri: item.image }} style={styles.pokemonImage} />
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <Navbar />
        </View>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text style={styles.contentTitle}>
              Selecciona uno para obtener detalles
            </Text>
          </View>
          <Text style={styles.contentSubtitleSteel}>
              Pokemon Tipo Acero
          </Text>
          <Carousel
            data={pokemonList}
            renderItem={renderPokemonItem}
            sliderWidth={400}
            itemWidth={200}
            firstItem={1}
          />
          <Text style={styles.contentSubtitleGhost}>
              Pokemon Tipo Fantasma
          </Text>

          <Carousel
            data={ghostPokemonList}
            renderItem={renderGhostPokemonItem}
            sliderWidth={400}
            itemWidth={200}
            firstItem={1}
          />
          <Text style={styles.contentSubtitleDragon}>
              Pokemon Tipo Dragon
          </Text>

          <Carousel
            data={dragonPokemonList}
            renderItem={renderDragonPokemonItem}
            sliderWidth={400}
            itemWidth={200}
            firstItem={1}
          />
        </View>
      </ScrollView>
      <Footer onSearch={handleSearch} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pokemonItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: 'center',
  },
  contentInfo: {
    fontSize: 14,
    fontWeight: '500',
    color: '#707070',
    textAlign: 'right',
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  container: {
    backgroundColor: '#f0f1f7',
    flex: 1,
  },
  top: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentTitle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
  },
  contentInfo: {
    fontSize: 16, 
    fontWeight: '500',
    color: '#707070',
    textAlign: 'center', 
  },
  contentSubtitleSteel:{
    fontSize: 20,
    fontFamily:'bold',
    textAlign: 'center',
    marginTop: 20,
    textDecorationColor: '#B8B8D0',
    color:'#B8B8D0',
    textShadowColor: '#F8D030',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5, 
  },
  contentSubtitleGhost:{
    fontSize: 20,
    fontFamily:'bold',
    textAlign: 'center',
    marginTop: 20,
    textDecorationColor:'#705898',
    color:'#705898',
    textShadowColor: '#705898', 
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 5, 
  },
  contentSubtitleDragon:{
    fontSize: 20,
    fontFamily:'bold',
    textAlign: 'center',
    marginTop: 20,
    textDecorationColor:'#7038F8',
    color:'#7038F8',
    textShadowColor: 'rgba(255, 0, 0, 0.75)', 
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  }
});
