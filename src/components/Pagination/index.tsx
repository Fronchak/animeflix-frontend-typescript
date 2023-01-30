import ReactPaginate from 'react-paginate';
import './styles.css';

const Pagination = () => {
  return (
    <div className="bg-primary py-3">
      <ReactPaginate
        pageCount={10}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        containerClassName="pagination-container list-unstyled d-flex justify-content-center align-items-center mb-0"
        pageLinkClassName="pagination-item"
        breakLinkClassName="pagination-item"
        activeLinkClassName="pagination-item active-paginarion-item"
        previousLabel={<i className="bi bi-chevron-left"></i>}
        nextLabel={<i className="bi bi-chevron-right"></i>}
      />
    </div>
  );
}

export default Pagination;
