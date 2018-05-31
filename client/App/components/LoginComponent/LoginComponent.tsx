import * as hash from 'object-hash';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions, IDispatchProps} from '../../../Actions/Actions';
import {IStoreState} from '../../../Store/Store';

import './LoginComponentStyle.css';
import HeaderComponent from '../DisplayComponent/HederComponent/HederComponent';
import {CubeGrid} from 'better-react-spinkit';

interface IStateProps {
  loginStatus: boolean;
  loading: boolean;
  isErrorLogin: boolean;
  isErrorServer: boolean;
}

type TProps = IDispatchProps & IStateProps;

class LoginComponent extends React.PureComponent<TProps, {loginValue: string, passwordValue: string}> {
  constructor(){
    super();
    this.state = {
      loginValue    : '',
      passwordValue : ''
    }
  }

  handleLogin = () => {
    if(this.state.loginValue && this.state.passwordValue){
      this.props.actions.onLogin(this.state.loginValue, hash.sha1(this.state.passwordValue))
      .then(()=>{
        
      })
      .catch(()=>{
        this.setState({
          loginValue: '',
          passwordValue: '',
        })
      });
    }
  };

  handleChangeLoginValue = (event: any) => {
    this.setState({loginValue: event.target.value});
  };
  handleChangePasswordValue = (event: any) => {
    this.setState({passwordValue: event.target.value});
  };

    render() {
    return (
      <div className='container'>
        <HeaderComponent />
        { this.props.loading ? <div className='indecatorLoading'><CubeGrid color={'#1d8415'} col={5} row={5} size={300} /></div> :        
          <div className="card card-container">
            <form className="form-signin">
                <span id="reauth-email" className="reauth-email"></span>
                <input value={this.state.loginValue} onChange={this.handleChangeLoginValue} type="login" className="form-control" placeholder="Login" required  />
                <input value={this.state.passwordValue} onChange={this.handleChangePasswordValue} type="password" className="form-control" placeholder="Password" required />
                {this.props.isErrorLogin ? <p className='ErrorLogin '>Вы ввели неверный логин или пароль </p> : null}
                {this.props.isErrorServer ? <p className='ErrorLogin '>Не получилось связатся с сервером повторите попытку позже. </p> : null}
                <button onClick={this.handleLogin} className="btn btn-lg btn-block btn-signin" type="submit">Sign in</button> 
            </form>
           </div>
        }
      </div>
    );
  }
};

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    loginStatus: state.loginStatus,
    loading: state.loading,
    isErrorLogin: state.isErrorLogin,
    isErrorServer: state.isErrorServer,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

export {connectApp as LoginComponent};