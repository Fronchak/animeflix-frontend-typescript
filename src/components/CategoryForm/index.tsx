import { Form } from 'react-router-dom';
import CategoryFormImage from '../../assets/imgs/category-form-image.svg';

const CategoryForm = () => {
  return (
    <div className="container-xl p-2 p-sm-3 p-lg-4 p-xxl-5" id="category-form-container">
      <div className="row">
        <div className="col-12 col-md-6 d-none d-md-flex">
          <img src={ CategoryFormImage } alt="Forms" className="img-fluid d-100"></img>
        </div>
        <Form method='post' className="col-12 col-md-6">
          <h3>Category Form</h3>
          <div className="mb-3">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className={`form-control`}
            ></input>
          </div>
          <div className="mb-3">
            <textarea
              placeholder='Description'
              name='description'
              id="description"
              className={`form-control`}
              rows={10}
            ></textarea>
          </div>
          <div className="mb-3 text-align-end">
            <button type='submit' className="btn btn-success">Send</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CategoryForm;
