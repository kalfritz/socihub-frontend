import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';
//import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-email válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6)
    .required('A senha é obrigatória'),
});

export default function Signin() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const handleSumit = ({ email, password }) => {
    dispatch(signInRequest(email, password));
  };
  return (
    <>
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
    </>
  );
}
