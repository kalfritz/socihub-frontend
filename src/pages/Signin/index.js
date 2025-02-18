/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import faker from 'faker';
import logo from '~/assets/socihub-logo.svg';

import { signInRequest, signUpRequest } from '~/store/modules/auth/actions';
import { Logo } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insert a valid e-mail')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6)
    .required('Password is required'),
});

export default function Signin() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const handleSumit = ({ email, password }) => {
    dispatch(signInRequest(email, password));
  };
  const handleGenAccount = () => {
    const genUsername = faker.name.firstName().toLowerCase();
    const genEmail = faker.internet.email();
    const genPassword = faker.internet.password();
    dispatch(signUpRequest(genUsername, genEmail, genPassword));
  };
  return (
    <>
      <Logo src={logo} alt="SociHub" />
      <header>SociHub</header>
      <h3>Connect with your friends!</h3>

      <Form schema={schema} onSubmit={handleSumit}>
        <Input
          name="email"
          type="email"
          placeholder="Your e-mail"
          spellCheck="false"
        />
        <Input
          name="password"
          type="password"
          placeholder="Your secret password"
        />

        <button type="submit">{loading ? 'Signing in...' : 'Sign In'}</button>
        <Link to="/register">Create free account</Link>
      </Form>
      <div>
        <p>
          <span>⚡</span>Just testing the app?<span>⚡</span>
        </p>
        <button onClick={handleGenAccount} type="button">
          <span>✨</span>Generate a temporary account for me<span>✨</span>
        </button>
      </div>
    </>
  );
}
