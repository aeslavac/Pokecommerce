import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Navbar() {
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/2560px-International_Pokémon_logo.svg.png',
                }}
                style={{ width: 265, height: 90 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0387FD', // Color azul primario
        alignItems: 'center',
        justifyContent: 'center',
        height: 100, // Altura de la barra de navegación
        width: '100%', // Ancho al 100%
    },
});
