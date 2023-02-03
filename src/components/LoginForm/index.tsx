import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActionFunctionArgs, Form, Link, redirect, useNavigate } from 'react-router-dom';
import { getAuthData, requestBackendLogin, saveAuthData } from '../../util/request';
import './styles.css';

export const action = async({ request }: ActionFunctionArgs) => {
  console.log('Passou pelo action do login');
  return redirect('/animes');
}

type FormData = {
  username: string,
  password: string
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [ wasSubmited, setWasSubmited ] = useState(false);

  const onSubmit = (formData: FormData) => {
    console.log(formData);
    requestBackendLogin(formData)
      .then((response) => {
        console.log('SUCESSO!', response);
        saveAuthData(response.data);
        console.log(getAuthData());
      })
      .catch((e) => {
        console.log('ERROR!', e);
      })
  }

  return (
    <div className="container py-3" id="login-form-container">
      <div className="row">
        <div className="col-12 mb-5">
          <h1>Faça o seu login</h1>
        </div>
        <Form method='post' onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="username">Email</label>
            <input
              { ...register("username", {
                required: 'Campo obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido'
                }

              }) }
              type="email"
              name="username"
              id="username"
              className={`form-control ${ errors.username ? 'is-invalid' : wasSubmited ? 'is-valid' : ''}`}
              placeholder="exemplo@gmail.com"></input>
            <div className="invalid-feedback">
              { errors.username?.message }
            </div>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="password">Senha</label>
            <input
              { ...register("password", {
                required: 'Campo obrgatório',
                minLength: {
                  value: 6,
                  message: 'Senha deve possuir pelo menos 6 caracteres'
                }
              }) }
              type="password"
              name="password"
              id="password"
              className={`form-control ${ errors.password ? 'is-invalid' : wasSubmited ? 'is-valid' : ''}`}
            ></input>
            <div className="invalid-feedback">
              { errors.password?.message }
            </div>
          </div>
          <div className="col-12 mb-3">
            <button
              onClick={() => setWasSubmited(true)}
              type="submit" className="btn btn-primary">Entrar</button>
          </div>
          <p>Doesn't have an account? <Link to="register">Click here</Link></p>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
