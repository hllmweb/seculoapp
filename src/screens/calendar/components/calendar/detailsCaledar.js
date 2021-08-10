import React, {Component} from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';



import Header from '../../../../components/ui/header'
import HeaderAuthenticated from '../../../../components/ui/header-authenticated';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
//import api from '../../../../config/api';


const detailsCaledar = ({route, navigation}) => {
        /*constructor(props){
            super(props);
            this.state = {
                dados: 'okok'//this.props.navigation.getParam('title')
            }
        }*/
        //render(){
            //const { navigation } = this.props;
            //const dados = navigation.getParam('params');
            /*const  params  = this.props.navigation.state;
            console.log("ooooooooo"+params)
            const otherParam = params ? params.params : 'null';*/

            const { conteudo } = route.params;

            return(
                <ScrollView style={{ flex: 1, backgroundColor: '#F1F1F2' }}>
                    <View>
                        <Header navigation={navigation}/>
                        <HeaderAuthenticated />

                        
                        <View style={styles.container}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.boxLeft}>
                                    <Text style={styles.title}>AVALIAÇÕES</Text>
                                </View>
                                <View style={styles.boxRight}>
                                    <Text style={styles.shared}><Icon name="share-alt" size={25} color={'#E6BD56'}/></Text>
                                </View>
                            </View>    
                        

                            <View style={{flex:1, flexDirection: 'column'}}>
                                <Text style={styles.content}>{conteudo ? conteudo : 'Conteúdo da prova não informado'}</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.buttonBack}
                                onPress={() => navigation.goBack()}
                            >
                            <Text style={{color:'#FFFFFF', justifyContent:'center', alignItems: 'center', fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}> VOLTAR</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                </ScrollView>
            );
        //}
    
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
}

const styles = StyleSheet.create({
    title:{
        color:'#1A2541',
        fontWeight: 'bold',
        fontSize: 16,
       
    },
    shared:{
        fontSize:12
    },
    boxLeft:{
        flex:2, 
        height:50, 
        alignItems:'flex-start',
        justifyContent:'center',
        paddingLeft:10
    },
    boxRight:{
        flex:1,  
        height:50, 
        alignItems:'flex-end',
        justifyContent:'center',
        paddingRight:10
    },
    content:{
        fontSize:14,
        marginVertical:20,
        paddingHorizontal:10
    },
    container:{
        marginHorizontal:15,
        marginVertical:15,
        padding:10,
        borderWidth:1,
        borderColor:'#CCCCCC',
        backgroundColor:'#FFFFFF',
        borderRadius:10 
    },
    buttonBack: {
        backgroundColor: '#4F74B2',
        color:'#FFFFFF',
        borderRadius:10,
        paddingHorizontal: 10,
        paddingVertical:10
    }
});


export default connect(mapStateToProps)(detailsCaledar);