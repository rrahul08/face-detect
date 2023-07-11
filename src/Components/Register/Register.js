import React from 'react';
import './Register.css';
import my from './fam (1).png';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      registrationStatus: ''
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onSubmitSignIn = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
        console.log(user);
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
          this.setState({ registrationStatus: 'success' });
          console.log('Registration successful');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { registrationStatus } = this.state;

    return (
      <div >
        <div className='title'>
        
        <img className="img" src={my} alt="My" />
        <p className='face'>Face </p>
        <p className='detect'>Detect+</p>
        </div>
      <article className="card br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center cont">
        <main className="pa4  black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw9 ph0 mh0 register mb3">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f5 name" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-transparent hover- w-100 br-pill"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f5 mail" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-transparent hover- w-100 br-pill"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f5 password" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-ttransparent hover- w-100 br-pill"
                  type="password"
                  name="password"
                  id="password"
                  
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className="">
                <input
                  onClick={this.onSubmitSignIn}
                  className="b ph3 pv2 input-reset ba b--light-silver  grow pointer f4 dib button br-pill w-90 reg mt4 "
                  type="submit"
                  value="Register"
                  
                />
                {registrationStatus === 'success' && (
                  <p className="success-msg">Registration successful</p>
                )}
              </div>
            </fieldset>
          </div>
          <div>
            <p></p>
          </div>
        </main>
      </article>
      </div>
    );
  }
}

export default Register;
