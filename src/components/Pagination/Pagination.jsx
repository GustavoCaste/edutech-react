import styles from './Pagination.module.css'

// Mostra a primeira, a última e as vizinhas da página atual, com reticências entre os saltos
function getPageItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = [1, currentPage - 1, currentPage, currentPage + 1, totalPages]
    .filter((page, index, list) => page >= 1 && page <= totalPages && list.indexOf(page) === index)
    .sort((a, b) => a - b)

  return pages.flatMap((page, index) => {
    const previous = pages[index - 1]
    return previous && page - previous > 1 ? [`gap-${page}`, page] : [page]
  })
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const items = getPageItems(currentPage, totalPages)
  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage >= totalPages

  return (
    <nav className={styles.pagination} aria-label="Paginação">
      <button
        type="button"
        className={styles.control}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        aria-label="Página anterior"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M10 4L6 8l4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className={styles.controlText}>Anterior</span>
      </button>

      <ol className={styles.pages}>
        {items.map((item) =>
          typeof item === 'string' ? (
            <li key={item} className={styles.gap} aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={styles.page}
                onClick={() => onPageChange(item)}
                aria-current={item === currentPage ? 'page' : undefined}
                aria-label={`Página ${item}`}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ol>

      <button
        type="button"
        className={styles.control}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        aria-label="Próxima página"
      >
        <span className={styles.controlText}>Próxima</span>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </nav>
  )
}

export default Pagination
