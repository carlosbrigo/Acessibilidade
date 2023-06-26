import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, SafeAreaView, StatusBar } from 'react-native';
import css from '../../../css/css.js';
import { Feather as Icon } from '@expo/vector-icons';
import MenuAreaRestrita from '../MenuAreaRestrita/index.js';
import config from '../../../config/config.json';
import { Table, Row, Rows } from 'react-native-table-component';
import Modal from 'react-native-modal';

export default function Locais({ navigation }) {
    const [data, setData] = useState([]);
    const [isModalVisibleQr, setIsModalVisibleQr] = useState(false);
    const [modalQr, setModalQr] = useState('');
    const [isModalVisibleDescricao, setIsModalVisibleDescricao] = useState(false);
    const [modalDescricao, setModalDescricao] = useState('');
    const [isModalVisibleOpcao1, setIsModalVisibleOpcao1] = useState(false);
    const [modalOpcao1, setModalOpcao1] = useState('');
    const [isModalVisibleOpcao2, setIsModalVisibleOpcao2] = useState(false);
    const [modalOpcao2, setModalOpcao2] = useState('');
    const [isModalVisibleOpcao3, setIsModalVisibleOpcao3] = useState(false);
    const [modalOpcao3, setModalOpcao3] = useState('');
    const [isModalVisibleOpcao4, setIsModalVisibleOpcao4] = useState(false);
    const [modalOpcao4, setModalOpcao4] = useState('');
    const [isModalVisibleOpcao5, setIsModalVisibleOpcao5] = useState(false);
    const [modalOpcao5, setModalOpcao5] = useState('');

    const [searchText, setSearchText] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [localData, setLocalData] = useState({
        descricao: '',
        opcao1: '',
        opcao2: '',
        opcao3: '',
        opcao4: '',
        opcao5: '',
        qr: '',
    });

    useEffect(() => {
        buscaDados();
        StatusBar.setHidden(true);

    }, []);

    const buscaDados = async () => {
        try {
            const response = await fetch(`${config.urlRoot}locais/`);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    const filtrarDados = () => {
        if (searchText === '') {
            return data;
        }
        return data.filter((item) =>
            item.local.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    const Deletar = async (item) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza de que deseja excluir este item?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    onPress: async () => {
                        try {
                            const response = await fetch(`${config.urlRoot}locais/${item.id}`, {
                                method: 'Delete',
                            });

                            if (response.ok) {
                                // A exclusão foi bem-sucedida
                                buscaDados();
                            } else {
                                console.error('Erro ao excluir o item:', response.status);
                            }
                        } catch (error) {
                            console.error('Erro ao excluir o item:', error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const Descricao = (item) => {
        setModalDescricao(item.descricao);
        setIsModalVisibleDescricao(true);
    };

    const Opcao1 = (item) => {
        setModalOpcao1(item.opcao1);
        setIsModalVisibleOpcao1(true);
    };

    const Opcao2 = (item) => {
        setModalOpcao2(item.opcao2);
        setIsModalVisibleOpcao2(true);
    };

    const Opcao3 = (item) => {
        setModalOpcao3(item.opcao3);
        setIsModalVisibleOpcao3(true);
    };

    const Opcao4 = (item) => {
        setModalOpcao4(item.opcao4);
        setIsModalVisibleOpcao4(true);
    };

    const Opcao5 = (item) => {
        setModalOpcao5(item.opcao5);
        setIsModalVisibleOpcao5(true);
    };

    const handleAddLocal = async () => {
        setIsFormVisible(true);
        try {
            const response = await fetch(`${config.urlRoot}locais/`, {
                method: 'POST',
                body: JSON.stringify(localData),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                buscaDados();
            } else {
                console.error('Erro ao adicionar o local:', response.error);
            }
        } catch (error) {
            console.error('Erro ao adicionar o local:', error);
            setErrorResponse(error.message);
        }
    };

    const handleEditLocal = async (item) => {
        setIsFormVisible(true);
        setLocalData({
            qr: item.qr || '',
            descricao: item.descricao || '',
            opcao1: item.opcao1 || '',
            opcao2: item.opcao2 || '',
            opcao3: item.opcao3 || '',
            opcao4: item.opcao4 || '',
            opcao5: item.opcao5 || ''
        });
        try {
            const response = await fetch(`${config.urlRoot}locais/${localData.id}`, {
                method: 'PUT',
                body: JSON.stringify(localData),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                buscaDados();
            }
        } catch (error) {
            console.error('Erro ao editar o local: ', error);
        }
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
        setLocalData({});
    };

    const handleSave = async (item) => {
        if (localData.local === '') {
            Alert.alert('Erro ao salvar', 'O campo local deve ser preenchido', [
                { text: 'OK', style: 'cancel' },
            ]);
            return;
        }
        if (localData.qr === '') {
            Alert.alert('Erro ao salvar', 'O campo Qr Code deve ser preenchido', [
                { text: 'OK', style: 'cancel' },
            ]);
            return;
        }
        if (localData.descricao === '') {
            Alert.alert('Erro ao salvar', 'O campo descrição deve ser preenchido', [
                { text: 'OK', style: 'cancel' },
            ]);
            return;
        }
        if (localData.id) {
            await handleEditLocal(localData);
        } else {
            await handleAddLocal();
        }
        setIsFormVisible(false);
        setLocalData({
            qr: '',
            descricao: '',
            opcao1: '',
            opcao2: '',
            opcao3: '',
            opcao4: '',
            opcao5: ''
        });
    };

    return (
        <SafeAreaView style={css.container}>
            <View>
                <MenuAreaRestrita title="Locais" navigation={navigation} />
                <TextInput
                    style={css.searchInput}
                    placeholder="Digite aqui o Qr Code..."
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
                <Table style={css.tableContainerListar}>
                    <Row
                        data={['Qr', 'Desc', '1', '2', '3', '4', '5', 'Ações']}
                        style={css.tableHeadListar}
                    />                  
                    <Rows
                        data={filtrarDados().map((item) => [
                            item.qr,
                            item.descricao ? (
                                <View style={[css.actionContainerListar]}>
                                    <TouchableOpacity
                                        style={css.buttonListar}
                                        onPress={() => Descricao(item)}
                                    >                                    
                                        <Icon name="list" color="black" size={15} />
                                    </TouchableOpacity>
                                </View>
                            ) : null,
                            item.Opcao1 ? (
                                <View style={[css.actionContainerListar]}>
                                    <TouchableOpacity
                                        style={css.buttonListar}
                                        onPress={() => Opcao1(item)}
                                    >
                                        <Icon name="list" color="black" size={15} />
                                    </TouchableOpacity>
                                </View>
                            ) : null,
                            item.opcao2 ? (
                                <View style={[css.actionContainerListar]}>
                                    <TouchableOpacity
                                        style={css.buttonListar}
                                        onPress={() => Opcao2(item)}
                                    ><Icon name="list" color="black" size={15} />
                                    </TouchableOpacity>
                                </View>
                            ) : null,
                            item.opcao3 ? (
                                <View style={[css.actionContainerListar]}>
                                    <TouchableOpacity
                                        style={css.buttonListar}
                                        onPress={() => Opcao3(item)}
                                    ><Icon name="list" color="black" size={15} />
                                    </TouchableOpacity>
                                </View>
                            ) : null,
                            item.opcao4 ? (
                                <View style={[css.actionContainerListar]}>
                                    <TouchableOpacity
                                        style={css.buttonListar}
                                        onPress={() => Opcao4(item)}
                                    ><Icon name="list" color="black" size={15} />
                                    </TouchableOpacity>
                                </View>
                            ) : null,
                            item.opcao5 ? (
                                <View style={[css.actionContainerListar]}>
                                    <TouchableOpacity
                                        style={css.buttonListar}
                                        onPress={() => Opcao5(item)}
                                    ><Icon name="list" color="black" size={15} />
                                    </TouchableOpacity>
                                </View>
                            ) : null,
                            <View style={[css.actionContainerListar]}>
                                <TouchableOpacity
                                    style={css.buttonListar}
                                    onPress={() => handleEditLocal(item)}
                                >
                                    <Icon name="edit" color="blue" size={15} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={css.buttonListar}
                                    onPress={() => Deletar(item)}
                                >
                                    <Icon name="trash" color="red" size={15} />
                                </TouchableOpacity>
                            </View>,
                        ])}
                        style={css.tableRowSeparatorListar}
                    />
                </Table>

                <Modal isVisible={isModalVisibleDescricao}>
                    <View style={css.modalContainer}>
                        <Text style={css.modalTitle}>A descrição informada foi:</Text>
                        <Text style={css.modalMesage}>{modalDescricao}</Text>
                        <TouchableOpacity
                            style={css.modalButton}
                            onPress={() => setIsModalVisibleDescricao(false)}
                        >
                            <Text style={css.modalButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal isVisible={isModalVisibleOpcao1}>
                    <View style={css.modalContainer}>
                        <Text style={css.modalTitle}>A descrição da Opção 1 é:</Text>
                        <Text style={css.modalMesage}>{modalOpcao1}</Text>
                        <TouchableOpacity
                            style={css.modalButton}
                            onPress={() => setIsModalVisibleOpcao1(false)}
                        >
                            <Text style={css.modalButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal isVisible={isModalVisibleOpcao2}>
                    <View style={css.modalContainer}>
                        <Text style={css.modalTitle}>A descrição da Opção 2 é:</Text>
                        <Text style={css.modalMesage}>{modalOpcao2}</Text>
                        <TouchableOpacity
                            style={css.modalButton}
                            onPress={() => setIsModalVisibleOpcao2(false)}
                        >
                            <Text style={css.modalButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal isVisible={isModalVisibleOpcao3}>
                    <View style={css.modalContainer}>
                        <Text style={css.modalTitle}>A descrição da Opção 3 é:</Text>
                        <Text style={css.modalMesage}>{modalOpcao3}</Text>
                        <TouchableOpacity
                            style={css.modalButton}
                            onPress={() => setIsModalVisibleOpcao3(false)}
                        >
                            <Text style={css.modalButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal isVisible={isModalVisibleOpcao4}>
                    <View style={css.modalContainer}>
                        <Text style={css.modalTitle}>A descrição da Opção 4 é:</Text>
                        <Text style={css.modalMesage}>{isModalVisibleOpcao4}</Text>
                        <TouchableOpacity
                            style={css.modalButton}
                            onPress={() => setIsModalVisibleOpcao4(false)}
                        >
                            <Text style={css.modalButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal isVisible={isModalVisibleOpcao5}>
                    <View style={css.modalContainer}>
                        <Text style={css.modalTitle}>A descrição da Opção 5 é:</Text>
                        <Text style={css.modalMesage}>{modalOpcao5}</Text>
                        <TouchableOpacity
                            style={css.modalButton}
                            onPress={() => setIsModalVisibleOpcao5(false)}
                        >
                            <Text style={css.modalButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal isVisible={isFormVisible}>
                    <View style={css.modalContainer}>
                        <Text style={css.formLabel}>Qr Code:</Text>
                        <TextInput
                            style={css.formInput}
                            value={localData.qr}
                            onChangeText={(text) =>
                                setLocalData((prevData) => ({ ...prevData, qr: text }))
                            }
                            placeholder="Digite o Qr Code"
                        />

                        <Text style={css.formLabel}>Descrição:</Text>
                        <TextInput
                            style={css.formInput}
                            value={localData.descricao}
                            onChangeText={(text) =>
                                setLocalData((prevData) => ({ ...prevData, descricao: text }))
                            }
                            placeholder="Digite a descrição com as opções"
                        />

                        <Text style={css.formLabel}>Opção 1:</Text>
                        <TextInput
                            style={css.formInput}
                            value={localData.opcao1}
                            onChangeText={(text) =>
                                setLocalData((prevData) => ({ ...prevData, opcao1: text }))
                            }
                            placeholder="Digite a descrição da Opção 1"
                        />

                        <Text style={css.formLabel}>Opção 2:</Text>
                        <TextInput
                            style={css.formInput}
                            value={localData.opcao2}
                            onChangeText={(text) =>
                                setLocalData((prevData) => ({ ...prevData, opcao2: text }))
                            }
                            placeholder="Digite a descrição da Opção 2"
                        />

                        <Text style={css.formLabel}>Opção 3:</Text>
                        <TextInput
                            style={css.formInput}
                            value={localData.opcao3}
                            onChangeText={(text) =>
                                setLocalData((prevData) => ({ ...prevData, opcao3: text }))
                            }
                            placeholder="Digite a descrição da Opção 3"
                        />

                        <Text style={css.formLabel}>Opção 4:</Text>
                        <TextInput
                            style={css.formInput}
                            value={localData.opcao4}
                            onChangeText={(text) =>
                                setLocalData((prevData) => ({ ...prevData, opcao4: text }))
                            }
                            placeholder="Digite a descrição da Opção 4"
                        />

                        <Text style={css.formLabel}>Opção 5:</Text>
                        <TextInput
                            style={css.formInput}
                            value={localData.opcao5}
                            onChangeText={(text) =>
                                setLocalData((prevData) => ({ ...prevData, opcao5: text }))
                            }
                            placeholder="Digite a descrição da Opção 5"
                        />

                        <TouchableOpacity style={css.formButton} onPress={handleSave}>
                            <Text style={css.formButtonText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={css.formButton} onPress={handleCloseForm}>
                            <Text style={css.formButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            <View style={css.buttonIncluir}>
                <TouchableOpacity onPress={() => setIsFormVisible(true)}>
                    <Text style={css.buttonIncluirText}>+</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView  >
    );
}