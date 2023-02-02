import { Form, useSubmit, useFetcher } from "react-router-dom";
import './styles.css';

type Props = {
  filter: string,
  onClearFilter: Function
}

const CategoryFilter = ({ filter, onClearFilter }: Props) => {

  const submit = useSubmit();
  const fetcher = useFetcher();

  return (
    <fetcher.Form id="category-filter-form" className="col-12">
      <div className="row">
        <div className="col-8 col-sm-9 col-md-10">
          <input
            type="search"
            id="filter"
            name="filter"
            className="form-control"
            placeholder="Search"
            defaultValue={filter}
            onChange={(event) => submit(event.currentTarget.form)}
          ></input>
        </div>
        <div className="col-4 col-sm-3 col-md-2">
          <button type="button" className="btn btn-secondary w-100" onClick={() => onClearFilter()}>Clear</button>
        </div>
      </div>
    </fetcher.Form>
  );
}

export default CategoryFilter;
