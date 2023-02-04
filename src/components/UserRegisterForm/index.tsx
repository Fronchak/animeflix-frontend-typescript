import { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Link, ActionFunctionArgs, redirect, useSubmit, useActionData } from "react-router-dom";
import { toast } from "react-toastify";
import { UserRegisterInputs, UserRegisterInputsKeys } from "../../types/domain/UserRegisterInputs";
import { DefaultDataError } from "../../types/vendor/DefaultDataError";
import { RequestError } from "../../types/vendor/RequestError";
import { getTokenData, isAuthenticated, requestBackend } from "../../util/request";
import './styles.css';

export const action = async({ request }: ActionFunctionArgs) => {

  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    const config: AxiosRequestConfig = {
      url: 'users',
      method: 'post',
      data
    }
    await requestBackend(config);
    toast.success("Account create with success");
    return redirect('/auth');
  }
  catch(e) {
    toast.error('Error when try to create account!');
    const obj = e as RequestError;
    return obj.response.data;
  }
}

const UserRegisterForm = () => {

  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<UserRegisterInputs>();
  const [wasSubmited, setWasSubmited] = useState<boolean>(false);
  const serverError = useActionData() as  DefaultDataError;
  console.log(serverError);
  const submit = useSubmit();

  const getServerError = (fieldName: UserRegisterInputsKeys) => {
    return serverError?.errors?.find((fieldError) => fieldError.fieldName === fieldName)?.message;
  }

  const serverErrorObj = {
    email: getServerError('email'),
    password: getServerError('password'),
    confirmPassword: getServerError('confirmPassword')
  }

  const onSubmit = (inputs: UserRegisterInputs) => {
    const form = document.getElementById('user-register-form') as HTMLFormElement;
    const password = inputs.password;
    const confirmPassword = inputs.confirmPassword;
    console.log(password, confirmPassword);
    if(password !== confirmPassword) {
      console.log('Passwords are diferent');
      setError("password", {
        message: "Passwords must be the same"
      });
      setError("confirmPassword", {
        message: "Passwords must be the same"
      });
      return;
    }
    submit(form);
  }

  const getInputClassName = (fieldName: UserRegisterInputsKeys) => {
    return wasSubmited ? ((errors[fieldName]?.message || serverErrorObj[fieldName]) ? 'is-invalid' : 'is-valid') : '';
  }

  return (
    <div className="col-12" id="user-register-form-container">
      <h1 className="mb-4">Create Account</h1>
      <h1 className="mb-4">{ getTokenData()?.user_name }</h1>
      <h1>{ isAuthenticated() ? 'Authenticated' : 'Not Authenticated' }</h1>
      <div
        className={`alert alert-danger ${serverError ? 'd-block' : 'd-none'}`}
        role="alert"
      >
        <i className="bi bi-exclamation-triangle-fill me-2"></i>{ serverError?.message }
      </div>
      <Form method="post" id="user-register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
              { ...register('email', {
                required: 'Required field',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: `Invalid email`
                }
              })}
            type="email"
            id="email"
            name="email"
            placeholder="Choose your best email"
            className={`form-control ${getInputClassName("email")}`}
          ></input>
          <div className="invalid-feedback d-block">
            { serverErrorObj['email'] }
          </div>
          <div className="invalid-feedback d-block">
            { errors.email?.message }
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            { ...register('password', {
              required: 'Required field',
              minLength: {
                value: 6,
                message: 'Password should have at least 6 letters'
              }
            }) }
            type="password"
            id="password"
            name="password"
            className={`form-control ${getInputClassName("password")}`}
          ></input>
          <div className="invalid-feedback d-block">
            { serverErrorObj['password'] }
          </div>
          <div className="invalid-feedback d-block">
            { errors.password?.message }
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
          <input
            { ...register('confirmPassword', {
              required: 'Required field',
              minLength: {
                value: 6,
                message: 'Password should have at least 6 letters'
              }
            }) }
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`form-control ${ getInputClassName("confirmPassword") }`}
          ></input>
          <div className="invalid-feedback d-block">
            { serverErrorObj['confirmPassword'] }
          </div>
          <div className="invalid-feedback d-block">
            { errors.confirmPassword?.message }
          </div>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary" onClick={() => setWasSubmited(true)}>Create account</button>
        </div>
        <p>Already have an account? <Link to={"/auth"}>Click here</Link> to login</p>
      </Form>
    </div>
  );
}

export default UserRegisterForm;
