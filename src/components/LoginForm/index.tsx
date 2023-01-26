import { useForm } from 'react-hook-form';
import { ActionFunctionArgs, Form, redirect, useNavigate } from 'react-router-dom';

export const action = async({ request }: ActionFunctionArgs) => {
  console.log('Passou pelo action do login');
  return redirect('/animes');
}

type FormData = {
  username: string,
  password: string
}

const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();


  const onSubmit = (formData: FormData) => {
    console.log(formData);
    navigate('/')
  }

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-12 mb-5">
          Faça o seu login
        </div>
        <Form method='post' onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="username">Email</label>
            <input
              { ...register("username") }
              type="email"
              name="username"
              id="username"
              className="form-control"
              placeholder="exemplo@gmail.com"></input>
            <div className="invalid-feedback">
              Campo obrigatório.
            </div>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="password">Senha</label>
            <input
              { ...register("password") }
              type="password"
              name="password"
              id="password"
              className="form-control"
            ></input>
            <div className="invalid-feedback">
              Campo obrigatório.
            </div>
          </div>
          <div className="col-12 mb-3">
            <button type="submit" className="btn btn-primary">Entrar</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
