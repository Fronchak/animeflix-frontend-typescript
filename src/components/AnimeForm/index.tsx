import { useForm } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';
import { AnimeFormInputs } from '../../types/domain/AnimeFormInputs';
import { CategoryName } from '../../types/domain/CategoryName';
import { DefaultDataError } from '../../types/vendor/DefaultDataError';

type Props = {
  categories: CategoryName[];
  serverError?: DefaultDataError;
}

const AnimeForm = ({ categories, serverError }: Props) => {

  const { register, handleSubmit, formState: { errors } } = useForm<AnimeFormInputs>();
  const submit = useSubmit();

  const onSubmit = (inputs: AnimeFormInputs) => {
    console.log(inputs);
    const form = document.getElementById('form') as HTMLFormElement;
    submit(form);
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
              required: 'Campo obrigatório'
            }) }
            type="text"
            id="name"
            name="name"
            className={`form-control`}
            placeholder="Anime's name"
          ></input>
          <div className="invalid-feedback d-block">
            { errors.name?.message }
            { serverError?.errors?.find((fieldError) => fieldError.fieldName === 'name')?.message }
          </div>

        </div>
        <div className="mb-3">
          <select
            { ...register('categories', {
              required: 'Campo obrigatório'
            }) }
            className={`form-select`}
            id="categories"
            name="categories"
            multiple
          >
            <option value={0} disabled>Category</option>
            { categories.map((category) => <option key={category.id} value={category.id}>{ category.name }</option>) }
          </select>
          <div className="invalid-feedback d-block">
            { errors.categories?.message }
            { serverError?.errors?.find((fieldError) => fieldError.fieldName === 'categories')?.message }
          </div>
        </div>
        <div className="mb-3">
          <input
            { ...register('avaliation', {
              required: 'Campo obrigatório'
            }) }
            type="tel"
            className={`form-control`}
            name="avaliation"
            id="avaliation"
            placeholder='Avaliation [0 - 10]'
          ></input>
          <div className="invalid-feedback d-block">
            { errors.avaliation?.message }
            { serverError?.errors?.find((fieldError) => fieldError.fieldName === 'avaliation')?.message }
          </div>
        </div>
        <div className="mb-3">
          <input
            { ...register('lauchYear', {
              required: 'Campo obrigatório'
            }) }
            type="tel"
            className={`form-control`}
            name="lauchYear"
            id="lauchYear"
            placeholder='Lauch year'
          ></input>
          <div className="invalid-feedback d-block">
            { errors.lauchYear?.message }
            { serverError?.errors?.find((fieldError) => fieldError.fieldName === 'lauchYear')?.message }
          </div>
        </div>
        <div className="mb-3">
          <input
            { ...register('imgUrl', {
              required: 'Campo obrigatório'
            }) }
            type="text"
            className={`form-control`}
            name="imgUrl"
            id="imgUrl"
            placeholder='Image link'
          ></input>
          <div className="invalid-feedback d-block">
            { errors.imgUrl?.message }
            { serverError?.errors?.find((fieldError) => fieldError.fieldName === 'imgUrl')?.message }
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="mb-3">
          <textarea
            { ...register('synopsis', {
              required: 'Campo obrigatório'
            }) }
            className="form-control"
            id="synopsis"
            name="synopsis"
            rows={10}
            placeholder="Synopsis"
          ></textarea>
          <div className="invalid-feedback d-block">
            { errors.synopsis?.message }
            { serverError?.errors?.find((fieldError) => fieldError.fieldName === 'synopsis')?.message }
          </div>
        </div>
      </div>
      <div className="mb-3">
        <button type='submit' className="btn btn-primary">Send</button>
      </div>
    </Form>
  );
}

export default AnimeForm;
