import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { signInSuccess, signFailure, signOut } from './actions';
import history from '~/services/history';
import { decode } from 'jsonwebtoken';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Baerer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { username, email, password } = payload;
    const response = yield call(api.post, 'users', {
      username,
      email,
      password,
    });
    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Baerer ${token}`;
    yield put(signInSuccess(token, user));
    history.push('/');
  } catch (err) {
    toast.error('Falha ao criar conta. Tente novamente');
    yield put(signFailure());
  }
}

export function* setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    if (decode(token).exp < Date.now() / 1000) {
      yield put(signOut());
    } else {
      api.defaults.headers.Authorization = `Baerer ${token}`;
    }
  }
}

export function signOutHistory() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOutHistory),
]);
