import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';

import Header from '../../components/ui/header';
import HeaderAuthenticated from '../../components/ui/header-authenticated';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../config/api';
import { connect } from 'react-redux';
Icon.loadFont();
import HeaderSelectUser from '../../components/ui/header-select-user';
class ContentsHours extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      itens: [],
      loading: true,
      dataHoje: ""
    }
  }

  componentDidMount = () => {
    api
      .post('/horario/lstHorario/', {
        p_cd_usuario: this.props.students.student.RA,
      })
      .then((res) => {

        console.log("Conteudos e horarios: " + JSON.stringify(res));
        var today = new Date();
        var date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

        this.setState({
          itensData: res.data,
          loading: false,
          dataHoje: date
        })

      })
      .catch((err) => {

        alert("Erro ao carregar os dados.");
        this.setState({
          loading: false,
        })

      });
  };


  componentDidUpdate = () => {
    api
      .post('/horario/lstHorario/', {
        p_cd_usuario: this.props.students.student.RA,
      })
      .then((res) => {

        var today = new Date();
        var date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

        this.setState({
          itensData: res.data,
          loading: false,
          dataHoje: date
        })

      })
      .catch((err) => {

        alert("Erro ao carregar os dados.");
        this.setState({
          loading: false,
        })

      });
  };


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
              CONTEÚDOS E HORÁRIOS
            </Text>
          </View>

          <View style={{ paddingHorizontal: 20}}>

            <HeaderSelectUser />

          </View>

          <View style={{ paddingHorizontal: 40 }}>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 15,
                marginTop: 15,
                borderWidth: 1,
                borderColor: '#BBBCBF',
                borderRadius: 20,
                paddingHorizontal: 15,
                paddingVertical: 10,
                alignItems: 'center',
              }}>

              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {this.state.dataHoje}
              </Text>

            </View>

            {this.state.loading && <ActivityIndicator size="large" color="#4674B7" />}

            <FlatList
              data={this.state.itensData}
              renderItem={(itemData) =>

                <View
                  style={{
                    flexDirection: 'column',
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    borderWidth: 1,
                    borderColor: '#BBBCBF',
                    borderRadius: 10,
                    marginBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{ color: '#4674B7', fontWeight: 'bold' }}>
                        {itemData.item.NOME}
                      </Text>
                      <Text style={{ color: '#383838' }}>Horário: {itemData.item.HORAINICIAL} - {itemData.item.HORAFINAL}</Text>
                      {/* <Text style={{ color: '#383838' }}>Dia: { itemData.item.DIASEMANA}</Text> */}
                    </View>
                    {/* <View>
                  <Text style={{textAlign: 'right', color: '#383838'}}>
                  {itemData.item.HORAINICIAL} - {itemData.item.HORAFINAL}
                  </Text>
                </View> */}
                  </View>
                  <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                    {/* <TouchableOpacity>
                  <Image
                    resizeMethod="resize"
                    style={{width: 14, height: 14}}
                    source={require('../../assets/images/menu.png')}
                  />
                </TouchableOpacity> */}
                  </View>
                </View>

              }
              keyExtractor={(item) => item.name}
            />

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

export default connect(mapStateToProps)(ContentsHours);
