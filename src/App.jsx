import { useState } from 'react'
import Header from './layout/Header/Header'
import Footer from './layout/Footer/Footer'
import Hero from './sections/Hero/Hero'
import CourseCatalog from './sections/CourseCatalog/CourseCatalog'
import CourseDetails from './sections/CourseDetails/CourseDetails'
import CertificateUpload from './sections/CertificateUpload/CertificateUpload'
import FaqSection from './sections/FaqSection/FaqSection'
import { useToast } from './hooks/useToast'
import { courses } from './data/courses'
import { instructors } from './data/instructors'
import { faqItems } from './data/faq'

function App() {
  const { showToast } = useToast()
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0].id)
  const [enrolledIds, setEnrolledIds] = useState([])

  const selectedCourse = courses.find((course) => course.id === selectedCourseId)

  function handleViewDetails(courseId) {
    setSelectedCourseId(courseId)
    document.getElementById('detalhes')?.scrollIntoView()
    document.getElementById('detalhes-titulo')?.focus({ preventScroll: true })
  }

  function handleEnroll(course) {
    if (enrolledIds.includes(course.id)) {
      showToast({
        type: 'info',
        title: 'Matrícula já realizada',
        message: `Você já está matriculado em ${course.title}.`,
      })
      return
    }

    setEnrolledIds((current) => [...current, course.id])
    showToast({
      type: 'success',
      title: 'Matrícula confirmada',
      message: `Você foi matriculado em ${course.title}.`,
    })
  }

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />

      <main id="conteudo">
        <Hero courseCount={courses.length} />

        <CourseCatalog
          courses={courses}
          selectedCourseId={selectedCourseId}
          enrolledIds={enrolledIds}
          onViewDetails={handleViewDetails}
          onEnroll={handleEnroll}
        />

        <div className="container section split">
          <CourseDetails
            course={selectedCourse}
            instructor={instructors[selectedCourse.instructorId]}
            isEnrolled={enrolledIds.includes(selectedCourse.id)}
            onEnroll={handleEnroll}
          />
          <CertificateUpload />
        </div>

        <FaqSection items={faqItems} />
      </main>

      <Footer />
    </>
  )
}

export default App
