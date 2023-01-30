import ReactPaginate from 'react-paginate';
import './styles.css';

type Props = {
  activePage: number;
  pageCount: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ activePage, pageCount, pageRangeDisplayed = 3, marginPagesDisplayed = 1, onPageChange }: Props) => {
  return (
    <div className="bg-primary py-3">
      <ReactPaginate
        forcePage={activePage}
        pageCount={pageCount}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={marginPagesDisplayed}
        containerClassName="pagination-container list-unstyled d-flex justify-content-center align-items-center mb-0"
        pageLinkClassName="pagination-item"
        breakLinkClassName="pagination-item"
        activeLinkClassName="pagination-item active-paginarion-item"
        previousLabel={<i className="bi bi-chevron-left"></i>}
        nextLabel={<i className="bi bi-chevron-right"></i>}
        disabledClassName='inactive-arrow'
        onPageChange={(page) => onPageChange(page.selected)}
      />
    </div>
  );
}

export default Pagination;
