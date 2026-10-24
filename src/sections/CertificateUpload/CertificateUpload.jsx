import { useEffect, useId, useRef, useState } from 'react'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { useToast } from '../../hooks/useToast'
import styles from './CertificateUpload.module.css'

const ACCEPTED_TYPES = ['application/pdf', 'image/png', 'image/jpeg']
const MAX_FILE_SIZE = 5 * 1024 * 1024
const UPLOAD_INTERVAL_MS = 150

const STATUS_LABELS = {
  idle: 'Aguardando envio',
  uploading: 'Enviando certificado',
  done: 'Envio concluído',
}

function CertificateUpload() {
  const { showToast } = useToast()
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('idle')
  const inputRef = useRef(null)
  const inputId = useId()

  // Simula o envio do arquivo aumentando o progresso em intervalos
  useEffect(() => {
    if (status !== 'uploading') return

    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress = Math.min(currentProgress + 4 + Math.random() * 8, 100)
      setProgress(currentProgress)

      if (currentProgress === 100) {
        clearInterval(interval)
        setStatus('done')
        showToast({
          type: 'success',
          title: 'Certificado enviado',
          message: `${file.name} foi enviado para análise.`,
        })
      }
    }, UPLOAD_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [status, file, showToast])

  function resetUpload() {
    setFile(null)
    setProgress(0)
    setStatus('idle')
    if (inputRef.current) inputRef.current.value = ''
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0]
    if (!selectedFile) return

    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      showToast({ type: 'error', title: 'Formato não aceito', message: 'Envie o certificado em PDF, PNG ou JPG.' })
      resetUpload()
      return
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      showToast({ type: 'error', title: 'Arquivo muito grande', message: 'O certificado deve ter no máximo 5 MB.' })
      resetUpload()
      return
    }

    setFile(selectedFile)
    setProgress(0)
    setStatus('idle')
  }

  function handleUpload() {
    if (!file) {
      showToast({ type: 'error', title: 'Nenhum arquivo selecionado', message: 'Escolha o certificado antes de enviar.' })
      return
    }

    setProgress(0)
    setStatus('uploading')
  }

  function handleCancel() {
    resetUpload()
    showToast({ type: 'info', title: 'Envio cancelado', message: 'Nenhum arquivo foi enviado.' })
  }

  return (
    <section id="certificado" className="surface" aria-labelledby="certificado-titulo">
      <h2 id="certificado-titulo" className={styles.title}>
        Validar horas complementares
      </h2>
      <p className={styles.description}>
        Envie o certificado de um curso concluído. Aceitamos PDF, PNG ou JPG de até 5 MB.
      </p>

      <label htmlFor={inputId} className={styles.dropzone}>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="visually-hidden"
          onChange={handleFileChange}
          disabled={status === 'uploading'}
        />
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 16V4m0 0L7 9m5-5l5 5M5 15v3a2 2 0 002 2h10a2 2 0 002-2v-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.fileName}>{file ? file.name : 'Escolher arquivo'}</span>
        <span className={styles.hint}>{file ? 'Clique para trocar o arquivo' : 'PDF, PNG ou JPG'}</span>
      </label>

      <div className={styles.progress}>
        <ProgressBar value={progress} label={STATUS_LABELS[status]} />
      </div>

      <div className={styles.actions}>
        {status === 'done' ? (
          <button type="button" className="btn btn-secondary" onClick={resetUpload}>
            Enviar outro certificado
          </button>
        ) : (
          <>
            <button type="button" className="btn btn-primary" onClick={handleUpload} disabled={status === 'uploading'}>
              Enviar certificado
            </button>
            {status === 'uploading' && (
              <button type="button" className="btn btn-ghost" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default CertificateUpload
