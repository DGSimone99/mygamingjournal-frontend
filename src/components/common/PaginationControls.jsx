import { Pagination } from "react-bootstrap";

function PaginationControls({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];
  const maxVisible = 9;

  const startPage = Math.max(0, currentPage - Math.floor(maxVisible / 2));
  const endPage = Math.min(totalPages - 1, startPage + maxVisible - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination className="justify-content-center">
      <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0} />

      {startPage > 0 && (
        <>
          <Pagination.Item onClick={() => onPageChange(1)}>1</Pagination.Item>
          <Pagination.Ellipsis disabled />
        </>
      )}

      {pageNumbers.map((page) => (
        <Pagination.Item key={page} active={page === currentPage} onClick={() => onPageChange(page)}>
          {page + 1}
        </Pagination.Item>
      ))}

      {endPage < totalPages - 1 && (
        <>
          <Pagination.Ellipsis disabled />
          <Pagination.Item onClick={() => onPageChange(totalPages - 1)}>{totalPages}</Pagination.Item>
        </>
      )}

      <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} />
    </Pagination>
  );
}

export default PaginationControls;
