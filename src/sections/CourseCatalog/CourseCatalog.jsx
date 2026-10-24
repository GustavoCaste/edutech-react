import { useMemo, useState } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown'
import Pagination from '../../components/Pagination/Pagination'
import CourseItem from '../../components/CourseItem/CourseItem'
import styles from './CourseCatalog.module.css'

const PAGE_SIZE = 5

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Mais relevantes' },
  { value: 'price', label: 'Menor preço' },
  { value: 'rating', label: 'Melhor avaliação' },
  { value: 'hours', label: 'Menor carga horária' },
]

const SORTERS = {
  relevance: () => 0,
  price: (a, b) => a.price - b.price,
  rating: (a, b) => b.rating - a.rating,
  hours: (a, b) => a.hours - b.hours,
}

function CourseCatalog({ courses, selectedCourseId, enrolledIds, onViewDetails, onEnroll }) {
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('relevance')
  const [currentPage, setCurrentPage] = useState(1)

  const categoryOptions = useMemo(() => {
    const categories = [...new Set(courses.map((course) => course.category))]
    return [{ value: 'all', label: 'Todas as áreas' }, ...categories.map((name) => ({ value: name, label: name }))]
  }, [courses])

  const filteredCourses = useMemo(() => {
    const list = category === 'all' ? courses : courses.filter((course) => course.category === category)
    return [...list].sort(SORTERS[sortBy])
  }, [courses, category, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE))
  const firstIndex = (currentPage - 1) * PAGE_SIZE
  const pageCourses = filteredCourses.slice(firstIndex, firstIndex + PAGE_SIZE)

  function handleCategoryChange(option) {
    setCategory(option.value)
    setCurrentPage(1)
  }

  function handleSortChange(option) {
    setSortBy(option.value)
    setCurrentPage(1)
  }

  function handlePageChange(page) {
    setCurrentPage(page)
    document.getElementById('catalogo')?.scrollIntoView()
  }

  return (
    <section id="catalogo" className="section" aria-labelledby="catalogo-titulo">
      <div className="container">
        <div className={styles.toolbar}>
          <div>
            <h2 id="catalogo-titulo" className="section-title">
              Catálogo de cursos
            </h2>
            <p className="section-description">Filtre por área e ordene como preferir.</p>
          </div>

          <div className={styles.filters}>
            <Dropdown label="Área" options={categoryOptions} value={category} onSelect={handleCategoryChange} />
            <Dropdown label="Ordenar por" options={SORT_OPTIONS} value={sortBy} onSelect={handleSortChange} />
          </div>
        </div>

        <p className={styles.summary} aria-live="polite">
          {filteredCourses.length === 0
            ? 'Nenhum curso encontrado nessa área.'
            : `Mostrando ${firstIndex + 1}–${firstIndex + pageCourses.length} de ${filteredCourses.length} cursos`}
        </p>

        <ul className={styles.list}>
          {pageCourses.map((course) => (
            <CourseItem
              key={course.id}
              course={course}
              isSelected={course.id === selectedCourseId}
              isEnrolled={enrolledIds.includes(course.id)}
              onViewDetails={onViewDetails}
              onEnroll={onEnroll}
            />
          ))}
        </ul>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </section>
  )
}

export default CourseCatalog
