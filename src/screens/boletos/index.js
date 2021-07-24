import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import api from '../../config/api';

import Header from '../../components/ui/header';
import HeaderAuthenticated from '../../components/ui/header-authenticated';
import HeaderSelectUser from '../../components/ui/header-select-user';
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome';


class BoletosComponent extends React.Component {
  state = {
    mensalidades: [],
    loading: true,
  };

  componentDidMount = async () => {
    //console.log(" ALUNO: " + this.props.students.student.RA)
    await api
      .post('/mensalidade/lstMensalidade/', {
        p_cd_usuario: this.props.students.student.RA,
      })
      .then((res) => {

        //console.log("  MENSALIDADES: " + res.data)

        this.setState({
            mensalidades: res.data,
            loading: false,
        });
      })
      .catch((err) => {
        alert("Erro ao carregar os dados.");
        this.setState({
          loading: false,
        });
      });
  };

  componentDidUpdate = () => {
    console.log(" ALUNO: " + this.props.students.student.RA)
    api
      .post('/mensalidade/lstMensalidade/', {
        p_cd_usuario: this.props.students.student.RA,
      })
      .then((res) => {

        console.log("  MENSALIDADES: " + res.data)

        this.setState({
            mensalidades: res.data,
            loading: false,
        });
      })
      .catch((err) => {
        alert("Erro ao carregar os dados.");
        this.setState({
          loading: false,
        });
      });
  };

  verificaSePago(FLG_VENCIDO, VALOR_RECEBIDO, CODIGO_BARRA){

    if(VALOR_RECEBIDO == 0){
        if(FLG_VENCIDO == "S"){
            return <Text>EM ATRASO</Text>;
        }else{
            if(CODIGO_BARRA == null){
              return <Text></Text>;
            }
            return <Text>EM ABERTO</Text>;
        }
    }

    return <Text>PAGO</Text>;
  }

  copyToClipboard(codigo){
    Clipboard.setString(codigo);
    alert("Código de barras copiado");
  }

  copyToClipboard_pix = (codigo) => {
    Clipboard.setString(codigo);
    alert("Pix copiado!");
  }
  
  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#f1f1f2' }}>
          <Header navigation={this.props.navigation} />
          <HeaderAuthenticated />
          <View
            style={{
              marginVertical: 15,
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#4674b7',
                fontWeight: 'bold',
                fontSize: 16,
                width: '50%',
              }}>
              MENSALIDADE
            </Text>
          </View>
          <View>
          <View style={{paddingHorizontal: 10, marginTop: 10}}>
            <HeaderSelectUser />
          </View>

            {this.state.loading && <ActivityIndicator size="large" color="#4674B7" />}

            <View
              style={{
                flexDirection: 'column',
                paddingHorizontal: 10,
                paddingVertical: 15,
                borderWidth: 1,
                borderColor: '#BBBCBF',
                borderRadius: 10,
                margin: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={{ color: '#383838', fontWeight: 'bold' }}>
                    Chave Pix
                  </Text>
                  <Text style={{ color: '#4674B7', fontWeight: 'bold', fontSize: 18 }} onPress={() => this.copyToClipboard_pix('18.621.830/0001-00')}>
                  CNPJ: 18.621.830/0001-00  <Icon name="copy" size={25}/>
                  </Text>
                </View>
              </View>
 
            </View>

            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>

              {this.state.mensalidades.length == 0 && <Text style={{ textAlign: 'center', fontSize:32, color:'#111', fontWeight:'bold'}}> Não há Boleto</Text>}
              
              
              <FlatList
                data={this.state.mensalidades}
                renderItem={(itemData) =>
                 
                <TouchableOpacity onPress={() => this.copyToClipboard(itemData.item.CODIGO_BARRA)}>
                 
                  {itemData.item.CODIGO_BARRA != null &&
                  
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      paddingBottom: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: '#c1c1c1',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <View style={{ width: '10%'}}>
                      <Image
                        source={require('../../assets/images/balance.png')}
                        resizeMode="stretch"
                        style={{ width: 20, height: 35, marginLeft:15}}
                      />
                    </View>
                    <View style={{ width: '60%', marginHorizontal:5}}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#1A2541',
                          fontWeight: 'bold',
                        }}>
                        MENSALIDADE
                      </Text>
                      <Text style={{ fontSize: 12, color: '#1A2541' }}>VALOR: R${itemData.item.VALOR_BOLETO}</Text>
                      
                      <Text style={{ fontSize: 10, color: '#cc0000', fontWeight: 'bold', marginTop: 15}}>{itemData.item.CODIGO_BARRA == null ? 'Boleto não Disponível' : itemData.item.CODIGO_BARRA} <Icon name="copy" size={15}/> </Text>     
                    
                    </View>


                        
                    <View>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#1A2541',
                          fontWeight: 'bold',
                        }}>
                        {itemData.item.DT_VENCIMENTO}
                      </Text>
                      <Text style={{ fontSize: 13, color: '#1A2541' }}>{this.verificaSePago(itemData.item.FLG_VENCIDO, itemData.item.VALOR_RECEBIDO, itemData.item.CODIGO_BARRA)}</Text>
                    </View>

               
                  </View> 

                  }
                  

                </TouchableOpacity>
                

                }
                keyExtractor={(item) => item.name}
              /> 

            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  students: state.students,
});

export default connect(mapStateToProps)(BoletosComponent);
