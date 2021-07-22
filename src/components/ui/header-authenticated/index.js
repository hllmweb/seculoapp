import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, Title} from './styles';

class HeaderAuthenticated extends Component {
  render() {
    return (
      <Container
        color={
          this.props.auth.user.USU_TIPO === 'aluno' ? '#51924b' : '#4674b7'
        }>
        <Title style={{fontWeight: 'bold', fontSize: 22, textAlign: 'left',}}>
          Olá {this.props.auth.user.USU_TIPO === 'aluno' ? 'Aluno' : 'Sr.'}(a){' '}
        </Title>
        <Title>
          {this.props.auth.user.USU_NOME}
        </Title>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(HeaderAuthenticated);
