//Aula 90: Este arquivo teo mesmo nome de ISSLocationScreen, pois ela é uma classe child (filha).

import React, { Component } from "react";
import { View, Text, StyleSheet, Alert} from "react-native";
import axios from "axios";

export default class IssLocationScreen extends Component {
    //Desafio 01: Criação de um objeto em nosso estado “location” (semelhante ao IssLocation)
    constructor(props) {
        super(props);
        this.state = {
          location: {},
        };
    }

    //Desafio 03: Chamada da função de localização da EEI continuamente após intervalos definidos.
    componentDidMount() {
        this.getIssLocation();
        try {
            setInterval(async () => {
              this.getIssLocation();
            }, 5000);
          } catch (e) {
            console.log(e);
          }
    }

    //Desafio 02: função para fazer solicitações na API e buscar os dados de localização
    getIssLocation = () => {
        axios
            .get('https://api.wheretheiss.at/v1/satellites/25544')
            .then((response) => {
              this.setState({ location: response.data });
            })
            .catch((error) => {
              alert(error.message);
            });
    }

    //Desafio 04: SE a função estiver buscando os dados, MOSTRE uma mensagem de carregamento na tela:
    //Desafio 05: SENÃO mostre os dados no cartão de localização.
    render() {
        if (Object.keys(this.state.location).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text>Loading...</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                        Latitude: {this.state.location.latitude}
                    </Text>
                    <Text style={styles.infoText}>
                        Longitude: {this.state.location.longitude}
                    </Text>
                    <Text style={styles.infoText}>
                        Altitude (KM): {this.state.location.altitude}
                    </Text>
                    <Text style={styles.infoText}>
                        Velocidade (KM/H): {this.state.location.velocity}
                    </Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    infoContainer: {
        flex: 0.2,
        backgroundColor: 'white',
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    },
    infoText: {
        fontSize: 15,
        color: "black",
        fontWeight: "bold"
    }
});