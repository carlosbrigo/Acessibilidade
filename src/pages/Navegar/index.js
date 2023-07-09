import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import config from '../../config/config.json';
import { StatusBar } from 'expo-status-bar';
import * as Speech from 'expo-speech';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

export default Navegar = () => {

  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [cameraVisivel, setCameraVisivel] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const cameraRef = useRef(null);
  const [qrCodeInvalido, setQRCodeInvalido] = useState(false);
  const [permissao, setPermissao] = useState(null)
  const [aux, setAux] = useState(1);
  const [areaRestrita, setAreaRestrita] = useState(1);

  const rate = 1.5; // Velocidade
  const pitch = 0.9; // Taxa
  const navigation = useNavigation();

  useEffect(() => {
    Speech.speak('Bem vindo ao instituto Federal Panambi', { language: 'pt', rate: rate, pitch: pitch });
    Speech.speak('Clique no centro de sua tela para iniciar e aguarde as instruções', { language: 'pt', rate: rate, pitch: pitch });
    Speech.stop();  
  
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermissao(status === 'granted');
    })();
  }, []);

  const instrucoes = () => {
    setAreaRestrita(0);
    if (newCount === 0) {
      Speech.speak('Você está no hall de entrada, há na sua esquerda um totem com um qr code no canto inferior esquerdo, quando localizar clique novamente no centro da sua tela.', { language: 'pt', rate: rate, pitch: pitch });
      setNewCount(1);
      setAux(0);
    }
    else if (newCount === 1) {
      Speech.speak('Neste momento esta sendo aberto a câmera, aponte para o Qr e aguarde as instruções', { language: 'pt', rate: rate, pitch: pitch });
      setCameraVisivel(true);
      setNewCount(2);
      setAux(1);
    }
    else if (newCount === 2) {
      setNewCount(1)
      setAux(0);
      
    }
  };
  
  const buscaDados = async (qrCode) => {
    try {
      const response = await fetch(`${config.urlRoot}locais/${qrCode}`);
      const jsonData = await response.json();
      setData(jsonData);

      if (jsonData) {
        setDescricao(jsonData.descricao);
        Speech.speak(jsonData.descricao, { language: 'pt', rate: rate, pitch: pitch });

        setCameraVisivel(false);
        }
      return jsonData.id;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setCameraVisivel(false);
      setNewCount(2);
      instrucoes();
      Speech.speak('Qr Code Invalido, clique novamente para reiniciar o processo', { language: 'pt', rate: rate, pitch: pitch });
      }
  };

  useEffect(() => {
    if (qrCodeInvalido) {
      const timeout = setTimeout(() => {
        setQRCodeInvalido(false);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [qrCodeInvalido]);

  const handleBarCodeScanned = ({ type, data }) => {
    try {
      if (!cameraRef.current) {
        return;
      }
      lerQRCode({ data });
      console.log(data);
      Vibration.vibrate();
    } catch (error) {
      console.log(error);
    }
  };

  const lerQRCode = async ({ data }) => {
    try {
      buscaDados(data);
    } catch (error) {
      console.log(error);
    }
  };

  const btAeaRestrita = () => {
    setAreaRestrita(areaRestrita + 1);
    if(areaRestrita === 1){
    Speech.speak('Você está acessando a area restrita tem certeza que deseja proseguir?', { language: 'pt', rate: rate, pitch: pitch });
    Speech.speak('Clique varias veses para acessar. Ou clique no centro da tela para navegar.', { language: 'pt', rate: rate, pitch: pitch });
    }    
    if (areaRestrita > 2) {
      Speech.speak('Acessando aguarde', { language: 'pt', rate: rate, pitch: pitch });
      navigation.navigate('AreaRestrita');
      setAreaRestrita(0);
    }
  };

  return (
    <View style={styles.container}>
       <StatusBar hidden style="inverted" />
      <TouchableOpacity style={styles.testeButton} onPress={btAeaRestrita}>
        <Text style={styles.testeButtonText}>Aréa restrita</Text>
      </TouchableOpacity>

      {qrCodeInvalido && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>QR Code inválido para este app</Text>
        </View>
      )}
      {cameraVisivel ? (
        <View style={styles.cameraContainer}>
          <BarCodeScanner
            ref={cameraRef}
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      ) : (

        <TouchableOpacity style={styles.fullScreenButton} onPress={instrucoes}>
          <Text style={styles.fullScreenButtonContent}>Instruções</Text>
        </TouchableOpacity>

      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  testeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: '#9f9ea0',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  testeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  fullScreenButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    bottom: 20,
    borderRadius: 20,
    marginTop: 60,
    backgroundColor: '#5f9ea0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenButtonContent: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#5f9ea0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
    width: '100%',
  },
  errorMessageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorMessage: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
