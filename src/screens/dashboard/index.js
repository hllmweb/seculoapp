import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../components/ui/header';
import HeaderAuthenticated from '../../components/ui/header-authenticated';
import HeaderSelectUser from '../../components/ui/header-select-user';
import messaging from '@react-native-firebase/messaging';

class Dashboard extends Component {

  logout = async () => {
    
    try{

      messaging()
      .unsubscribeFromTopic( this.props.auth.user.USU_LOGIN)
      .then(() => console.log('Subscribed to topic!'));

      for(let index in this.props.students.students){
        messaging()
        .unsubscribeFromTopic(this.props.students.students[index].TURMA)
        .then(() => console.log('Subscribed to topic!'));
      }
    }catch(e){}

    await AsyncStorage.removeItem('@seculo/user');
    await AsyncStorage.removeItem('@seculo/students');
    await AsyncStorage.removeItem('@seculo/user');

    this.props.navigation.replace('Signin')
  };

  componentDidMount = () =>{

    try{

      messaging()
      .subscribeToTopic( this.props.auth.user.USU_LOGIN)
      .then(() => console.log('Subscribed to topic!'));

      for(let index in this.props.students.students){
        messaging()
        .subscribeToTopic(this.props.students.students[index].TURMA)
        .then(() => console.log('Subscribed to topic!'));
      }
    }catch(e){}
    
  }
  componentDidUpdate = () => {}

  render() {
    
    const data = [
      {
        id: '00',
        name: 'CALENDÁRIO',
        image: require('../../assets/images/calendar.png'),
        navigation: 'CalendarPage',
        done: false,
        roles: ['aluno', 'responsavel'],
      },
      {
        id: '01',
        name: 'Conteúdos e Horários',
        image: require('../../assets/images/contents.png'),
        navigation: 'ContentsHours',
        done: false,
        roles: ['aluno', 'responsavel'],
      },
      {
        id: '02',
        name: 'NOTAS E FREQUÊNCIAS',
        image: require('../../assets/images/notes.png'),
        navigation: 'BoletimFrequence',
        done: false,
        roles: ['aluno', 'responsavel'],
      }/*,
      {
        id: '03',
        name: 'DESEMPENHO',
        image: require('../../assets/images/performance.png'),
        navigation: 'TestPerformance',
        done: false,
        roles: ['aluno', 'responsavel'],
      },
      {
        id: '04',
        name: 'PROVAS',
        image: require('../../assets/images/feedback.png'),
        navigation: 'SelectEvaluation',
        done: false,
        roles: ['aluno', 'responsavel'],
      }*/,
      {
        id: '05',
        name: 'CARDÁPIO SEMANAL',
        image: require('../../assets/images/lunch.png'),
        navigation: 'WeeklyMenu',
        done: false,
        roles: ['aluno', 'responsavel'],
      },
      {
        id: '06',
        name: 'SALDO DE CRÉDITO',
        image: require('../../assets/images/balance.png'),
        navigation: 'Transfers',
        done: false,
        roles: ['responsavel'],
      },
      {
        id: '07',
        name: 'COMPRAR CRÉDITOS',
        image: require('../../assets/images/credit-card.png'),
        navigation: 'PurchaseCredits',
        done: false,
        roles: ['responsavel'],
      },
      {
        id: '08',
        name: 'MENSALIDADE',
        image: require('../../assets/images/balance.png'),
        navigation: 'BoletosComponent',
        done: false,
        roles: ['responsavel'],
      },
    
    ];
  
    const createRows = (data, columns) => {
      let a = [];

      data.map((c) => {
        a.push(c.roles.includes(this.props.auth.user.USU_TIPO));
      });

      let size = a.filter((value) => !value).length;
      let sizeData = data.length - size;

      const rows = Math.floor(sizeData / columns);

      let lastRowElements = sizeData - rows * columns;

      while (lastRowElements !== columns) {
        data.push({
          id: `empty-${lastRowElements}`,
          name: `empty-${lastRowElements}`,
          empty: true,
        });

        lastRowElements += 1;
      }

      return data;
    };

    const columns = 2;

    if(this.props.students.student.CODCURSO != "001"){
      data[2] = {
        id: '02',
        name: 'NOTAS E FREQUÊNCIAS',
        image: require('../../assets/images/notes.png'),
        navigation: 'BoletimFrequence',
        done: false,
        roles: ['aluno', 'responsavel'],
      }
    }else{
      data[2] = {
        id: '09',
        name: 'ACOMPANHAMENTO INFANTIL',
        image: require('../../assets/images/infantil.png'),
        navigation: 'AcompanhamentoInfantil',
        done: false,
        roles: ['responsavel'],
      }
    }

    return (
      <ScrollView>
        <View style={{backgroundColor: '#F1F1F2'}}>
          <Header navigation={this.props.navigation} />
          <HeaderAuthenticated />
          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            <HeaderSelectUser />
          </View>
          <View style={{paddingHorizontal: 20, paddingTop: 20}}>
            <FlatList
              data={createRows(data, columns)}
              keyExtractor={(item) => item.id}
              numColumns={columns}
              renderItem={({item}) => {
                if (item.empty) {
                  return <View style={[styles.item, styles.itemEmpty]} />;
                }

                if (
                  typeof item.roles !== 'undefined' &&
                  item.roles.includes(this.props.auth.user.USU_TIPO)
                ) {
                  return (
                    <TouchableOpacity
                      style={[styles.item]}
                      onPress={() =>
                        this.props.navigation.navigate(item.navigation)
                      }>
                      <View
                        style={{
                          padding: 15,
                          backgroundColor: '#F1F1F2',
                          borderRadius: 60,
                          marginBottom: 10,
                          flexShrink: 1,
                        }}>
                        <Image
                          resizeMode="stretch"
                          style={{width: 33, height: 35}}
                          source={item.image}
                        />
                      </View>
                      <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                }
              }}
            />
            <TouchableOpacity
              onPress={this.logout}
              style={{flex: 1, marginBottom: 20}}>
              <Text style={{ textAlign: 'center',
                color: '#4674b7',
                fontWeight: 'bold',
                fontSize: 16,}}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              bottom: 0,
              zIndex: 100,
              width: '100%',
            }}>
            <View>
              <Image
                style={{
                  width: '100%',
                }}
                source={require('../../assets/images/bar.png')}
                resizeMode="contain"
              />
            </View>
            <View
              style={{paddingVertical: Platform.OS === 'android' ? 15 : 25}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Support')}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginBottom: Platform.OS === 'android' ? 0 : 10,
                  }}>
                  PRECISA DE AJUDA?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c3c3c3',
    flexGrow: 1,
    marginHorizontal: 4,
    marginBottom: 10,
    flexBasis: 0,
    minHeight: 100,
    paddingVertical: 10,
    backgroundColor: '#fff',
    flexShrink: 1,
  },
  text: {
    color: '#4674b7',
    textAlign: 'center',
    paddingHorizontal: 5,
    flexShrink: 1,
  },
  itemEmpty: {
    backgroundColor: 'transparent',
    flexShrink: 1,
    borderWidth: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    students: state.students,
  };
};

export default connect(mapStateToProps)(Dashboard);
