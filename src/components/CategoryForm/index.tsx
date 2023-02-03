import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useSubmit } from 'react-router-dom';
import CategoryFormImage from '../../assets/imgs/category-form-image.svg';
import { Category } from '../../types/domain/Category';
import { CategoryFormInputs, CategoryFormInputsKeys } from '../../types/domain/CategoryFormInputs';
import { DefaultDataError } from '../../types/vendor/DefaultDataError';
import './styles.css';

type Props = {
  defaultValues?: Category;
  serverError?: DefaultDataError;
}

const CategoryForm = ({ defaultValues, serverError }: Props) => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CategoryFormInputs>();

  const [wasSubmited, setWasSubmited] = useState<boolean>(false);
  const submit = useSubmit();

  useEffect(() => {
    if(defaultValues) {
      setValue('name', defaultValues.name);
      setValue('description', defaultValues.description);
    }
  }, []);

  const getServerError = (fieldName: CategoryFormInputsKeys) => {
    return serverError?.errors?.find((fieldError) => fieldError.fieldName === fieldName)?.message;
  }

  const serverErrorObj = {
    name: getServerError('name'),
    description: getServerError('description'),
  }

  const onSubmit = (inputs: CategoryFormInputs) => {
    const form = document.getElementById('category-form') as HTMLFormElement;
    submit(form);
  }

  const getInputClassName = (fieldName: CategoryFormInputsKeys) => {
    return wasSubmited ? ((errors[fieldName]?.message || serverErrorObj[fieldName]) ? 'is-invalid' : 'is-valid') : '';
  }

  return (
    <div className="container-xl p-2 p-sm-3 p-lg-4 p-xxl-5 card" id="category-form-container">
      <div className="row">
        <div className="col-12 col-md-6 d-none d-md-flex">
          <img src={ CategoryFormImage } alt="Forms" className="img-fluid d-100"></img>
        </div>
        <Form method='post' className="col-12 col-md-6" id="category-form" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="mb-3">Category Form</h3>
          <div>
            <div
              className={`alert alert-danger ${serverError ? 'd-block' : 'd-none'}`}
              role="alert"
            >
              <i className="bi bi-exclamation-triangle-fill me-2"></i>{ serverError?.message }
            </div>
          </div>
          <div className="mb-3">
            <input
              { ...register('name', {
                required: 'Required field',
                pattern: {
                  value: /[\S]+/,
                  message: `Name's cannot be empty`
                }
              })}
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className={`form-control ${getInputClassName('name')}`}
            ></input>
          <div className="invalid-feedback d-block">
            { serverErrorObj['name'] }
          </div>
            <div className="invalid-feedback d-block">
              { errors.name?.message }
            </div>
          </div>
          <div className="mb-3">
            <textarea
              { ...register('description', {
                required: 'Required field',
                pattern: {
                  value: /[\S]+/,
                  message: `Description's cannot be empty`
                }
              }) }
              placeholder='Description'
              name='description'
              id="description"
              className={`form-control ${getInputClassName('description')}`}
              rows={10}
            ></textarea>
            <div className="invalid-feedback d-block">
              { serverErrorObj['description'] }
            </div>
            <div className="invalid-feedback d-block">
              { errors.description?.message }
            </div>
          </div>
          <div className="mb-3 text-end">
            <button type='submit' className="btn btn-success" onClick={() => setWasSubmited(true)}>Send</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CategoryForm;
