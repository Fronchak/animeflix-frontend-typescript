import { Form, useFetcher, useSubmit } from "react-router-dom";
import { AnimeFilterData } from "../../types/domain/AnimeFilterData";
import { CategoryName } from "../../types/domain/CategoryName";
import './styles.css';

type Props = {
  categories: CategoryName[];
  defaultValues: AnimeFilterData;
  handleClearFilter: Function;
}

const AnimeFilter = ({ categories, defaultValues, handleClearFilter }: Props) => {
  const fetcher = useFetcher();
  const submit = useSubmit();

  return (
    <div id="product-filter-container" className="col-12 py-2">
      <fetcher.Form className="row">
        <div className="col-12 col-md-5 col-xl-6 mb-2 mb-md-0">
          <input
            type="text"
            name="filter"
            id="filter"
            placeholder="Search"
            className="form-control"
            onChange={(event) => submit(event.currentTarget.form)}
            defaultValue={ defaultValues.filter }
          ></input>
        </div>
        <div className="col-9 col-md-5">
          <select
            className="form-select"
            id="categoryId"
            name="categoryId"
            onChange={(event) => submit(event.currentTarget.form)}
            defaultValue={ defaultValues.categoryId }
          >
            <option value={0}>Category</option>
            { categories.map((category) => <option key={category.id} value={category.id}>{ category.name }</option>) }
          </select>
        </div>
        <div className="col-3 col-md-2 col-xl-1">
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={() => handleClearFilter()}
          >
            Clear
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}

export default AnimeFilter;
