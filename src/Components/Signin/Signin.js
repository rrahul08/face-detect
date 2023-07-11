import React from 'react';
import './Signin.css';
import fam from './fam (1).png';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    

    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
       email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.id){
          // this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
        // if (user.id) {
        //   this.props.loadUser(user)
        //   this.props.onRouteChange('home');
        // }
      })
      .catch(error =>{
        console.log(error);
      });
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <div >
      <div className='title'>
      
      <img className="img" src={fam} alt="fam" />
      <p className='face'>Face </p>
      <p className='detect'>Detect+</p>
      </div>
      <article className="card br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className=" ph0 mh0 enter mb3">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f5 email" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-transparent hover-white w-100 br-pill"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f5 pass" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-transparent hover-white w-100 br-pill"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--light-silver  grow pointer f4 dib butsign br-pill w-100  mt3"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onRouteChange('register')} className="b ph3 pv2  link dim  db pointer f4 reg br-pill">Register</p>
            </div>
          </div>
        </main>
      </article>
      </div>
    );
  }
}

export default Signin;
