import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import Header from '../../components/ui/header';
import HeaderAuthenticated from '../../components/ui/header-authenticated';
import api from '../../config/api';

import Tab from './components/tab';

class WeeklyMenu extends React.Component {
  state = {
    tabActive: 0,
    weekly: [
      {
        coffee: [],
        lunch: [],
        evening: [],
      },
      {
        coffee: [],
        lunch: [],
        evening: [],
      },
      {
        coffee: [],
        lunch: [],
        evening: [],
      },
      {
        coffee: [],
        lunch: [],
        evening: [],
      },
      {
        coffee: [],
        lunch: [],
        evening: [],
      },
    ],
  };

  changeTabSelected = (tabActive) => {
    this.setState({
      tabActive,
    });
  };

  componentDidMount = () => {
    api
      .post('/cardapio/lstCardapio/', {
        p_cd_usuario: this.props.auth.students.RA,
      })
      .then((res) => {
        res.data.map((menu) => {
          if (menu.DC_TIPO == 'LANCHE DA MANHÃ (Exclusivo Ensino Infantil)') {
            this.state.weekly = [
              {
                ...this.state.weekly[0],
                coffee: [...this.state.weekly[0].coffee, menu.SEG_DESC],
              },
              {
                ...this.state.weekly[1],
                coffee: [...this.state.weekly[1].coffee, menu.TER_DESC],
              },
              {
                ...this.state.weekly[2],
                coffee: [...this.state.weekly[2].coffee, menu.QUA_DESC],
              },
              {
                ...this.state.weekly[3],
                coffee: [...this.state.weekly[3].coffee, menu.QUI_DESC],
              },
              {
                ...this.state.weekly[4],
                coffee: [...this.state.weekly[4].coffee, menu.SEX_DESC],
              },
            ];
          }

          if (menu.DC_TIPO == 'ALMOÇO') {
            this.state.weekly = [
              {
                ...this.state.weekly[0],
                lunch: [...this.state.weekly[0].lunch, menu.SEG_DESC],
              },
              {
                ...this.state.weekly[1],
                lunch: [...this.state.weekly[1].lunch, menu.TER_DESC],
              },
              {
                ...this.state.weekly[2],
                lunch: [...this.state.weekly[2].lunch, menu.QUA_DESC],
              },
              {
                ...this.state.weekly[3],
                lunch: [...this.state.weekly[3].lunch, menu.QUI_DESC],
              },
              {
                ...this.state.weekly[4],
                lunch: [...this.state.weekly[4].lunch, menu.SEX_DESC],
              },
            ];
          }

          if (menu.DC_TIPO == 'LANCHE DA TARDE (Exclusivo Ensino Infantil)') {
            this.state.weekly = [
              {
                ...this.state.weekly[0],
                evening: [...this.state.weekly[0].evening, menu.SEG_DESC],
              },
              {
                ...this.state.weekly[1],
                evening: [...this.state.weekly[1].evening, menu.TER_DESC],
              },
              {
                ...this.state.weekly[2],
                evening: [...this.state.weekly[2].evening, menu.QUA_DESC],
              },
              {
                ...this.state.weekly[3],
                evening: [...this.state.weekly[3].evening, menu.QUI_DESC],
              },
              {
                ...this.state.weekly[4],
                evening: [...this.state.weekly[4].evening, menu.SEX_DESC],
              },
            ];
          }
        });


        console.log("CARDAPIO: "+JSON.stringify(this.state))

        this.setState({...this.state}, () => {
          this.state;
        });
      })
      .catch((err) => {});
  };

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, backgroundColor: '#f1f1f2'}}>
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
              CARDÁPIO SEMANAL
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 28,
              paddingVertical: 20,
            }}>
            <Tab
              data={this.state.weekly[this.state.tabActive]}
              active={this.state.tabActive}
              changeTabSelected={this.changeTabSelected}
            />
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
                  marginTop: 40,
                  width: '100%',
                }}
                source={require('../../assets/images/bar.png')}
                resizeMode="contain"
              />
            </View>
            <View
              style={{paddingVertical: Platform.OS === 'android' ? 15 : 25}}>
              <TouchableOpacity>
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(WeeklyMenu);
