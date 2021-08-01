import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';

import Header from '../../components/ui/header';
import HeaderAuthenticated from '../../components/ui/header-authenticated';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../config/api';
import { connect } from 'react-redux';
Icon.loadFont();
import HeaderSelectUser from '../../components/ui/header-select-user';
import Tab from './components/tab';

class ContentsHours extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      itens: [
        {
          ds_content: [] //seg
        },
        {
          ds_content: [] //ter
        },
        {
          ds_content: [] //qua
        },
        {
          ds_content: [] //qui
        },
        {
          ds_content: [] //sex
        }
      ],
      tabActive: 0,
      loading: true,
      dataHoje: "",
    }
  }
  componentDidMount = () => {
    this.fetchItens();
  };

 
  fetchItens = () => {
    api
    .post('/horario/lstHorario/', {
      p_cd_usuario: this.props.students.student.RA,
    })
    .then((res) => {
      let today = new Date();
      let date = today.toLocaleDateString("pt-br", { 
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });


      this.state.itens = [
        {
          id: 1,
          ds_dia: 'SEGUNDA-FEIRA',
          ds_content: [...this.state.itens[0].ds_content,  res.data.filter(i => i.DIASEMANA == 2)],
        },       
        { 
          id: 2,
          ds_dia: 'TERÇA-FEIRA',
          ds_content: [...this.state.itens[1].ds_content,  res.data.filter(i => i.DIASEMANA == 3)],
        },
        {
          id: 3,
          ds_dia: 'QUARTA-FEIRA',
          ds_content: [...this.state.itens[2].ds_content, res.data.filter(i => i.DIASEMANA == 4)],
        },
        {
          id: 4,
          ds_dia: 'QUINTA-FEIRA',
          ds_content: [...this.state.itens[3].ds_content, res.data.filter(i => i.DIASEMANA == 5)],
        },
        {
          id: 5,
          ds_dia: 'SEXTA-FEIRA',
          ds_content: [...this.state.itens[4].ds_content, res.data.filter(i => i.DIASEMANA == 6)],
        }
      ]

      this.setState({
        ...this.state,
        loading: false,
        dataHora: date 
      })

      

      //console.log(this.state.itens[0])
      /*this.state.itens = [
        {
          id: 1,
          ds_dia: [...this.state.itens[0].ds_dia,  res.data.map((menu) => menu.DIASEMANA == 2 && menu.DS_DIASEMANA)],
          ds_disciplina: [...this.state.itens[0].ds_disciplina, res.data.map((menu) => menu.DIASEMANA == 2 && menu.NOME)]
        },       
        { 
          id: 2,
          ds_dia: [...this.state.itens[1].ds_dia,  res.data.map((menu) => menu.DIASEMANA == 3 && menu.DS_DIASEMANA)],
          ds_disciplina: [...this.state.itens[1].ds_disciplina, res.data.map((menu) => menu.DIASEMANA == 3 && menu.NOME)]
        }
      ]
  
      this.setState({
        ...this.state,
        dataHoje: date
      })*/
      /*this.setState({
        itensData: res.data,
        loading: false,
        dataHoje: date
      })*/

    })
    .catch((err) => {
      alert("Erro ao carregar os dados.");
      this.setState({
        loading: false,
      })

    });
  }

  /*updateFilter = (filterCrime) => {
    this.setState({ filterCrime: filterCrime })
  }*/

  changeTabSelected = (tabActive) => {
    this.setState({
      tabActive,
    });
  };


  /*handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1 
      },() => {
        this.fetchItens()
      }
    )
  }*/

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

          <View style={{ paddingHorizontal: 20}}>
            <Tab 
                data={this.state.itens[this.state.tabActive]}
                active={this.state.tabActive}
                changeTabSelected={this.changeTabSelected}/>
          </View>
          {this.state.loading && <ActivityIndicator size="large" color="#4674B7" />}


        
          
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