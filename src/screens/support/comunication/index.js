import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import Header from '../../../components/ui/header';
import HeaderAuthenticated from '../../../components/ui/header-authenticated';
import api from '../../../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

let user

const init = async function (a, b) {
  user = JSON.parse(await AsyncStorage.getItem('@seculo/user'));
}
init();

class Comunication extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      itens: [],
      loading: true
    }
  }

  componentDidMount = () => {

    console.log(" Responsavel: " + user.USU_LOGIN)
    api
      .post('notificacao/lstNotificacao/', {
        p_cd_usuario: user.USU_LOGIN,
      })
      .then((res) => {

        console.log("COmunicados: " + JSON.stringify(res))
        if (res.data.length > 0) {

          this.setState({
            notas: res.data,
            loading: false
          })
        } else {
          alert("Você não tem comunicados.");
        }

      })
      .catch((err) => {
        alert("Erro ao carregar informações.");
      });
  };


  responderNotificacao(resposta, id){
    api
      .post('notificacao/confNotificacao/', {
        p_cd_usuario: user.USU_LOGIN,
        p_id_notificacao: id,
        p_status_confirmacao: resposta,
      })
      .then((res) => {
 
          alert("Resposta ao comunicado enviada.");
        
      })
      .catch((err) => {
      });
  }

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#F1F1F2' }}>
          <Header navigation={this.props.navigation} />
          <HeaderAuthenticated />
          <View
            style={{
              marginVertical: 15,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#4674b7',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              COMUNICADOS
            </Text>
          </View>

          <View style={{ paddingHorizontal: 20, marginBottom: 20 }} >
            <View>

              {this.state.loading && <ActivityIndicator size="large" color="#4674B7" />}

              <View
                scrollEnabled={true}
                scrollIndicatorInsets={true}>

                <FlatList
                  data={this.state.notas}
                  renderItem={(itemComunicado) =>

                    <View style={{
                      borderWidth: 1,
                      borderColor: '#ccc',
                      padding: 20,
                      borderRadius: 20,
                      marginBottom: 10,
                      alignItems:'center'
                    }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#4674B7',
                          fontWeight: 'bold',
                        }}>
                        {itemComunicado.item.TITULO}
                      </Text>
                      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        {itemComunicado.item.DT_NOTIFICAR}
                      </Text>
                      <Text style={{ textAlign: 'justify', marginVertical: 10 }}>
                        {itemComunicado.item.MENSAGEM}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: '#e1e1e1',
                          width: '50%',
                          justifyContent: 'center',
                          paddingVertical: 10,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: '#ccc',
                        }}>

                    <TouchableOpacity onPress={() => this.responderNotificacao("S", itemComunicado.item.ID_NOTIFICACAO)}>
                      <Text>SIM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.responderNotificacao("N", itemComunicado.item.ID_NOTIFICACAO)}
                      style={{
                        marginLeft: 10,
                        borderLeftWidth: 1,
                        paddingLeft: 10,
                      }}>
                      <Text>NÃO</Text>
                    </TouchableOpacity>

                </View>
                    </View>

                  }
                  keyExtractor={(item) => item.name}
                />
              </View>

            </View>
          </View>
        </View>
      </ScrollView>

    );
  }
}


export default Comunication;
