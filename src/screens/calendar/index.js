import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';

import Header from '../../components/ui/header';
import HeaderAuthenticated from '../../components/ui/header-authenticated';
import api from '../../config/api';
import { Calendar, LocaleConfig} from 'react-native-calendars';
import HeaderSelectUser from '../../components/ui/header-select-user';

LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar','Abr','Mai','Jun','Jul.','Ago.','Set.','Out.','Nov.','Dec.'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sab.'],
  today: 'hoje'
};
LocaleConfig.defaultLocale = 'pt';

class CalendarPage extends React.Component {
  state = {
    eventsDates: {},
    eventsSelectedDay: [],
    allEvents: []
  };

  componentDidMount = () => {

    console.log(" ALUNO TURMA: " + this.props.students.student.TURMA)
    console.log(" MATRICULA: "+ this.props.students.student.RA)

    api
      .post('/calendario/lstCalendario/', {
        p_turma: this.props.students.student.TURMA,
        p_cd_usuario: this.props.students.student.RA
      }, )
      .then((res) => {
        //console.log(" ----AVALIACOES:  "+res.data);

        if (res.data.length > 0) {

          var dates = {}

          for (var index in res.data) {

            //console.log(" -----DATE: "+JSON.stringify(res.data[index]));

            var d = res.data[index].DATA.split('/')
            var dateFormated = '20' + d[2] + '-' + d[1] + '-' + d[0]
            dates[dateFormated] = { selected: true, marked: true, selectedColor: res.data[index].DC_COLOR }
            res.data[index].DATAFORMATADA = dateFormated

          }

        }
    
        this.setState({
          allEvents: res.data,
          eventsDates: dates,
        });

      })
      .catch((err) => {
        alert("Erro ao carregar informações.");
      });

  };

  componentDidUpdate = () => {
    api
      .post('/calendario/lstCalendario/', {
        p_turma: this.props.students.student.TURMA,
        p_cd_usuario: this.props.students.student.RA
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.length > 0) {

          var dates = {}

          for (var index in res.data) {
            var d = res.data[index].DATA.split('/')
            var dateFormated = '20' + d[2] + '-' + d[1] + '-' + d[0]
            dates[dateFormated] = { selected: true, marked: true, selectedColor: res.data[index].DC_COLOR }
            res.data[index].DATAFORMATADA = dateFormated

          }

        }

        this.setState({
          allEvents: res.data,
          eventsDates: dates,
        });

      })
      .catch((err) => {
        alert("Erro ao carregar informações.");
      });

  };


  filterDate(date){

    var dates = []
    for (var index in this.state.allEvents) {

      if(this.state.allEvents[index].DATAFORMATADA == date){
        dates.push(this.state.allEvents[index])
      }
    }

    this.setState({
      eventsSelectedDay: dates,
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View >
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
              CALENDÁRIO
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>

          <HeaderSelectUser />

            <Calendar
              monthFormat={'MMMM yyyy'}
              onDayPress={(day) => { this.filterDate(day.dateString) }}
              markedDates={this.state.eventsDates}
            />

            <FlatList 
              data={this.state.eventsSelectedDay}
              renderItem={(eventSelect) =>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 15,
                    marginTop: 15,
                  }}>
                  <View
                    style={{
                      flex: 0.3,
                    }}>
                    <Text
                      style={{
                        color: '#4674b7',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      {eventSelect.item.DATA}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.7,
                    }}>
                    <Text style={{ color: '#4674b7', fontWeight: 'bold' }}>
                      {eventSelect.item.DC_CALENDARIO}
                    </Text>
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

export default connect(mapStateToProps)(CalendarPage);
