import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';
import config from '../../config/config.json';
import css from '../../css/css';
import * as Speech from 'expo-speech';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default Rastreio = () => {

  const [qr, setQr] = useState('');
  const [descricao, setDescricao] = useState('');
  const [opcao1, setOpcao1] = useState('');
  const [opcao2, setOpcao2] = useState('');
  const [opcao3, setOpcao3] = useState('');
  const [opcao4, setOpcao4] = useState('');
  const [opcao5, setOpcao5] = useState('');
  const [data, setData] = useState('');
  const [count, setCount] = useState(0);
  const [cameraVisivel, setCameraVisivel] = useState(false);
  const [newCount, setNewCount] = useState(0);
  const cameraRef = useRef(null);
  const [qrCodeInvalido, setQRCodeInvalido] = useState(false);
  const [permissao, setPermissao] = useState(null)
  const [aux, setAux] = useState(1)
  const [auxOpcao, setAuxOpcao] = useState(true);

  const rate = 1.2; // Velocidade
  const pitch = 0.7; // Taxa

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

  const instrucoes = async () => {
    if (newCount === 0) {
      Speech.speak('Você está no centro administrativo, há na sua esquerda um totem com um qr code no canto inferior esquerdo, quando localiza-lo clique novamente no centro da sua tela.', { language: 'pt', rate: rate, pitch: pitch });
      setNewCount(1);
    }
    else if (newCount === 1) {
     Speech.speak('Neste momento esta sendo aberto a câmera, aponte para o Qr e aguarde as instruções', { language: 'pt', rate: rate, pitch: pitch });      
      setCameraVisivel(true);
      //buscaDados(1); //Teste apagar
      setNewCount(2);
    }
    else if (newCount === 2) {
      nOpcoes();
    }
  };

  const nOpcoes = () => {

    setAuxOpcao(true);

    if (count >= aux) {
      setAux(aux + 1);
      Speech.speak('Opção ' + aux.toString(), { language: 'pt', rate: rate, pitch: pitch });
      
    }
    if (count < aux) {
      Speech.speak('Opção inválida reiniciando a contagem ', { language: 'pt', rate: rate, pitch: pitch });
      setAux(0);
    } 

    if (auxOpcao) {
      setTimeout(() => {    
      if(aux === 1){Speech.speak(opcao1.toString(), { language: 'pt', rate: rate, pitch: pitch });}
      else if(aux === 2){Speech.speak(opcao2.toString(), { language: 'pt', rate: rate, pitch: pitch });}
      else if(aux === 3){Speech.speak(opcao3.toString(), { language: 'pt', rate: rate, pitch: pitch });}
      else if(aux === 4){Speech.speak(opcao4.toString(), { language: 'pt', rate: rate, pitch: pitch });}
      else if(aux === 5){Speech.speak(opcao5.toString(), { language: 'pt', rate: rate, pitch: pitch });}        
      setAuxOpcao(false);
      setAux(1);
      setNewCount(1);  
    }, 10000);
      
    }
  };

const buscaDados = async (qrCode) => {
    try {
      const response = await fetch(`${config.urlRoot}locais/${qrCode}`);
      const jsonData = await response.json();
      setData(jsonData);

      if (jsonData) {
        setDescricao(jsonData.descricao);
        let count = 0;
        setOpcao1(jsonData.opcao1);
        setOpcao2(jsonData.opcao2);
        setOpcao3(jsonData.opcao3);
        setOpcao4(jsonData.opcao4);
        setOpcao5(jsonData.opcao5);
        setQr(jsonData.qr);

        if (jsonData.opcao1.length > 0) { count = count + 1 }
        if (jsonData.opcao2.length > 0) { count = count + 1 }
        if (jsonData.opcao3.length > 0) { count = count + 1 }
        if (jsonData.opcao4.length > 0) { count = count + 1 }
        if (jsonData.opcao5.length > 0) { count = count + 1 }
        setCount(count);

        Speech.speak(jsonData.descricao, { language: 'pt', rate: rate, pitch: pitch });

        //console.log(jsonData.descricao);
        setCameraVisivel(false);

        Speech.speak('Escolha', { language: 'pt', rate: rate, pitch: pitch });
        Speech.speak('Clique no centro da tela a quantidade de vezes conforme sua escolha', { language: 'pt', rate: rate, pitch: pitch });
      }
      return jsonData.id;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setCameraVisivel(false);
      setNewCount(1);
      instrucoes();
      Speech.speak('Não estou conseguindo ler o Qr Code, clique novamente para reiniciar o processo', { language: 'pt', rate: rate, pitch: pitch });
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

  return (
    <View style={styles.container}>
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
        <TouchableOpacity style={styles.button} onPress={instrucoes}>
          <Text style={styles.buttonText}>Instruções</Text>
        </TouchableOpacity>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
