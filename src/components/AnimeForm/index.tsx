import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';
import { AnimeFormInputs, AnimeFormInputsKeys } from '../../types/domain/AnimeFormInputs';
import { CategoryName } from '../../types/domain/CategoryName';
import { DefaultDataError } from '../../types/vendor/DefaultDataError';

type Props = {
  categories: CategoryName[];
  serverError?: DefaultDataError;
}

const AnimeForm = ({ categories, serverError }: Props) => {

  const { register, handleSubmit, formState: { errors } } = useForm<AnimeFormInputs>();
  const [wasSubmited, setWasSubmited] = useState<boolean>(false);
  const submit = useSubmit();

  const getServerError = (fieldName: AnimeFormInputsKeys) => {
    return serverError?.errors?.find((fieldError) => fieldError.fieldName === fieldName)?.message;
  }

  const getInputClassName = (fieldName: AnimeFormInputsKeys) => {
    return wasSubmited ? ((errors[fieldName]?.message || serverErrorObj[fieldName]) ? 'is-invalid' : 'is-valid') : '';
  }

  let serverErrorObj = {
    name: getServerError('name'),
    synopsis: getServerError('synopsis'),
    lauchYear: getServerError('lauchYear'),
    avaliation: getServerError('avaliation'),
    imgUrl: getServerError('imgUrl'),
    categories: getServerError('categories')
  }

  const name = 'name';

  const onSubmit = (inputs: AnimeFormInputs) => {
    console.log(inputs);
    const form = document.getElementById('form') as HTMLFormElement;
    submit(form);
  }

  const onButtonClick = () => {
    serverErrorObj = {
      name: '',
      synopsis: '',
      lauchYear: '',
      avaliation: '',
      imgUrl: '',
      categories: ''
    }
  }

  return (
    <Form method='post' className="row m-0" onSubmit={handleSubmit(onSubmit)} id="form">
      <div className="col-12 mb-4">
        <h2>Dados no Anime</h2>
      </div>
      <div className="col-12">
      <div
        className={`alert alert-danger ${serverError ? 'd-block' : 'd-none'}`}
        role="alert"
      >
        <i className="bi bi-exclamation-triangle-fill me-2"></i>{ serverError?.message }
      </div>
      </div>

      <div className="col-12 col-md-6">
        <div className="mb-3">
          <input
            { ...register('name', {
              required: 'Required field',
              pattern: {
                value: /[\S]+/,
                message: `Name's cannot be empty`
              }
            }) }
            type="text"
            id="name"
            name="name"
            className={`form-control ${getInputClassName('name')}`}
            placeholder="Anime's name"
          ></input>
          <div className="invalid-feedback d-block">
            { errors.name?.message }
          </div>
          <div className="invalid-feedback d-block">
            { serverErrorObj[name] }
          </div>
        </div>
        <div className="mb-3">
          <select
            { ...register('categories', {
              required: 'Required field'
            }) }
            className={`form-select ${getInputClassName('categories')}`}
            id="categories"
            name="categories"
            multiple
          >
            { categories.map((category) => <option key={category.id} value={category.id}>{ category.name }</option>) }
          </select>
          <div className="invalid-feedback d-block">
            { errors.categories?.message }
          </div>
          <div className="invalid-feedback d-block">
            { serverErrorObj.categories }
          </div>
        </div>
        <div className="mb-3">
          <input
            { ...register('avaliation', {
              required: 'Required field',
              max: {
                value: 10,
                message: 'Choose a avaliation between 0 and 10'
              },
              min: {
                value: 0,
                message: 'Choose a avaliation between 0 and 10'
              }
            }) }
            type="tel"
            className={`form-control ${getInputClassName('avaliation')}`}
            name="avaliation"
            id="avaliation"
            placeholder='Avaliation [0 - 10]'
          ></input>
          <div className="invalid-feedback d-block">
            { errors.avaliation?.message }
          </div>
          <div className="invalid-feedback d-block">
            { serverErrorObj.avaliation }
          </div>
        </div>
        <div className="mb-3">
          <input
            { ...register('lauchYear', {
              required: 'Required field',
              min: {
                value: 1980,
                message: 'Lauch year must be between 1980 and 2023'
              },
              max: {
                value: 2023,
                message: 'Lauch year must be between 1980 and 2023'
              }
            }) }
            type="tel"
            className={`form-control ${getInputClassName('lauchYear')}`}
            name="lauchYear"
            id="lauchYear"
            placeholder='Lauch year'
          ></input>
          <div className="invalid-feedback d-block">
            { errors.lauchYear?.message }
          </div>
          <div className="invalid-feedback d-block">
            { serverErrorObj.lauchYear }
          </div>
        </div>
        <div className="mb-3">
          <input
            { ...register('imgUrl', {
              required: 'Required field',
              pattern: {
                value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                message: 'Invalid link'
              }
            }) }
            type="text"
            className={`form-control ${getInputClassName('imgUrl')}`}
            name="imgUrl"
            id="imgUrl"
            placeholder='Image link'
          ></input>
          <div className="invalid-feedback d-block">
            { errors.imgUrl?.message }
          </div>
          <div className="invalid-feedback d-block">
            { serverErrorObj.imgUrl }
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="mb-3">
          <textarea
            { ...register('synopsis', {
              required: 'Required field',
              pattern: {
                value: /[\S]+/,
                message: `Synopsis's cannot be empty`
              }
            }) }
            className={`form-control ${getInputClassName('synopsis')}`}
            id="synopsis"
            name="synopsis"
            rows={10}
            placeholder="Synopsis"
          ></textarea>
          <div className="invalid-feedback d-block">
            { errors.synopsis?.message }
          </div>
          <div className="invalid-feedback d-block">
            { serverErrorObj.synopsis }
          </div>
        </div>
      </div>
      <div className="mb-3">
        <button type='submit' className="btn btn-primary" onClick={() => setWasSubmited(true)}>Send</button>
      </div>
    </Form>
  );
}

export default AnimeForm;
