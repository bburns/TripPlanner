// SignInUp
// sign in or up with email, facebook, google, etc

import React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useNeomem } from '../application';
import iconGoogle from './images/google.png';
import iconFacebook from './images/facebook.png';
import iconAnonymous from './images/person.svg';
import './styles.css';


const ProviderButton = (props) => (
  <div className="signinup-provider">
    <button type="button" id={props.provider} onClick={props.handleClick}>
      <img src={props.icon} alt="" />
      <span>Sign {props.formtype} {props.label}</span>
    </button>
  </div>
);

const ProviderButtons = (props) => (
  <div className="signinup-buttons">
    <ProviderButton
      provider="Google"
      label="with Google"
      icon={iconGoogle}
      handleClick={props.handleProviderButton}
      formtype={props.formtype}
    />
    {/* <ProviderButton
      provider="Facebook"
      label="with Facebook"
      icon={iconFacebook}
      handleClick={props.handleProviderButton}
      formtype={props.formtype}
    /> */}
    {/* <ProviderButton
      provider="Anonymous"
      label="anonymously"
      icon={iconAnonymous}
      handleClick={props.handleProviderButton}
      formtype={props.formtype}
    /> */}
  </div>
);

// email form - structure was obtained from a semantic ui form and uses its classes - ui form box field
const EmailForm = (props) => (
  <div className="signinup-email">
    <form className="box" onSubmit={props.handleSubmitEmail}>
      <h2>Sign {props.formtype} with email</h2>
      <input type="hidden" id="formtype" name="formtype" value={props.formtype} />
      <div>
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {props.formtype === "up" && <div className="field">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input id="confirmPassword" name="confirmPassword" type="password" />
      </div>}
      <div className="signinup-email-submit">
        <button type="submit" className="ui button">Submit</button>
      </div>
    </form>
  </div>
);

const Footer = (props) => (
  <div className="signinup-footer">
    {props.formtype === "up"
      ? <>
        {/* By signing up I agree to the <NavLink to="/terms">Terms</NavLink> and <NavLink to="/privacy">Privacy Policy</NavLink>. */}
        {/* <br /> */}
        Already have an account? Sign in <NavLink to="/signin">here</NavLink>.
      </>
      : <>
        Don't have an account? Sign up <NavLink to="/signup">here</NavLink>.
      </>
    }
  </div>
);


export default observer((props) => {

  const neomem = useNeomem();
  const auth = neomem.auth; //. for now

  // redirect to home if logged in
  if (neomem.currentUserId) {
    window.location = '#/';
  }

  const pathname = props.location.pathname; // from the url, ie '/signin' or '/signup'
  const formtype = (pathname === "/signin") ? "in" : "up";

  // user clicked on a provider button (google, facebook) - sign in or up
  const handleProviderButton = async (e) => {
    e.preventDefault();
    const provider = e.target.id; // eg 'Google', 'Facebook', 'Anonymous'
    const user = await auth.signInUp(provider); //. this will trigger app.jsx's event handler also?
    if (user) {
      console.log('user logged in - redirect to home', user);
      // neomem.setUser(user); //. capture email, name etc
      neomem.setCurrentUserId(user.id);
      window.location = '#/';
    } // else failed - stay here
  };

  // user clicked Submit for the email signin/up form
  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const form = e.target.elements; // dict of elements
    const formtype = form.formtype.value; // 'up' or 'in'
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword && form.confirmPassword.value;
    //. this will trigger the flow in app.jsx, so don't need following code?
    const user = await auth.signInUp('Email', formtype, { email, password, confirmPassword });
    if (user) {
      neomem.setCurrentUserId(user.id);
      window.location = '#/';
    }
  };

  return (
    <div className="signinup">
      <div className="signinup-contents">
        <ProviderButtons formtype={formtype} handleProviderButton={handleProviderButton} />
        <EmailForm formtype={formtype} handleSubmitEmail={handleSubmitEmail} />
      </div>
      <Footer formtype={formtype} />
    </div>
  );
});
