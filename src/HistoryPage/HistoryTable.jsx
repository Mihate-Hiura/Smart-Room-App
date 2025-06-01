import { useSearchParams } from "react-router-dom";

function HistoryTable({ data, col2Name = "Value", itemsPerPage = 10 }) {
  // Get the current pagination page from the URL query parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  
  // Calculate which items to show based on current page
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    setSearchParams({ page });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{col2Name}</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((entry, index) => (
            <tr key={index}>
              <td>{startIndex + index + 1}</td>
              <td>{entry.value}</td>
              <td>{new Date(entry.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          {currentPage > 1 && (
            <button className="page-btn" onClick={() => goToPage(currentPage - 1)}>
              Prev
            </button>
          )}
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <button className="page-btn" onClick={() => goToPage(currentPage + 1)}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default HistoryTable;