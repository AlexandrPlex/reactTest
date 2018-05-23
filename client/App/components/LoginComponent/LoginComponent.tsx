import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions, IDispatchProps} from '../../../Actions/Actions';
import {IStoreState} from '../../../Store/Store';
import * as hash from 'object-hash';
import * as PropTypes from 'prop-types';


interface IStateProps {
  loginStatus: boolean;
  loading: boolean;
}

type TProps = IDispatchProps & IStateProps;

class LoginComponent extends React.Component<TProps, {loginValue: string, passwordValue: string}> {
  static contextTypes = {
      router: PropTypes.object
    }
  constructor(props: any, context: any){
    super(props, context);
    this.state = {
      loginValue    : "",
      passwordValue : ""
    }
  }

  componentDidUpdate(){
    if(sessionStorage.getItem('session') == 'true'){
        //document.location.href = '/main';
        this.context.router.history.push("/main");
    }
  }

  handleLogin = () => { 
    console.log(this.props.loading)
    const {actions} = this.props;
    actions.onLogin(this.state.loginValue, hash.sha1(this.state.passwordValue));
    //document.location.href = '/main';
  };

  handleLogout = () => {
    console.log(this.props)
    const {actions} = this.props;
    actions.onLogout();
  };
  handleChangeLoginValue = (event: any) => {
    this.setState({loginValue: event.target.value});
  };
  handleChangePasswordValue = (event: any) => {
    this.setState({passwordValue: event.target.value});
  };

  render () {
    return (
      <div>
        <p>login</p><input  onChange={this.handleChangeLoginValue} />
        <p>password</p><input  onChange={this.handleChangePasswordValue} type='password'/>
        <br />
        <button onClick={this.handleLogin}> login </button>
        <button onClick={this.handleLogout}> logout</button>
        <br />
        <input disabled value={`${this.props.loading} : ${this.props.loading}`} />
      </div>
    );
  }
};

function mapStateToProps(state: IStoreState): IStateProps {
  return {
    loginStatus: state.loginStatus,
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch: Dispatch<IDispatchProps>): IDispatchProps {
  return {
    actions: new Actions(dispatch)
  };
}

const connectApp = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

export {connectApp as LoginComponent};
