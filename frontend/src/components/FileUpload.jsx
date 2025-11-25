import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUpload, FaTimes, FaFilePdf } from 'react-icons/fa'

export default function FileUpload({ onFilesSelected, multiple = false, accept = '.pdf' }) {
    const [isDragging, setIsDragging] = useState(false)
    const [files, setFiles] = useState([])

    const handleDrag = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])

    const handleDragIn = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }, [])

    const handleDragOut = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const droppedFiles = Array.from(e.dataTransfer.files)
        const validFiles = droppedFiles.filter(file => file.type === 'application/pdf')

        if (validFiles.length > 0) {
            const newFiles = multiple ? validFiles : [validFiles[0]]
            setFiles(newFiles)
            onFilesSelected(newFiles)
        }
    }, [multiple, onFilesSelected])

    const handleFileInput = (e) => {
        const selectedFiles = Array.from(e.target.files)
        setFiles(selectedFiles)
        onFilesSelected(selectedFiles)
    }

    const removeFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index)
        setFiles(newFiles)
        onFilesSelected(newFiles)
    }

    return (
        <div className="w-full">
            <div
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`upload-zone ${isDragging ? 'dragging' : ''}`}
            >
                <FaUpload className={`text-5xl mx-auto mb-4 transition-all ${isDragging ? 'text-white scale-110' : 'text-gray-500'
                    }`} />

                <h3 className="text-lg font-semibold text-white mb-2">
                    {isDragging ? 'Drop files here' : 'Upload PDF files'}
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                    Drag and drop or click to browse
                </p>

                <label className="btn-primary cursor-pointer inline-block">
                    Choose Files
                    <input
                        type="file"
                        accept={accept}
                        multiple={multiple}
                        onChange={handleFileInput}
                        className="hidden"
                    />
                </label>

                {multiple && (
                    <p className="text-xs text-gray-500 mt-4">
                        You can select multiple files
                    </p>
                )}
            </div>

            <AnimatePresence>
                {files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 space-y-3"
                    >
                        <p className="text-sm text-gray-400 mb-3">
                            {files.length} file{files.length > 1 ? 's' : ''} selected
                        </p>

                        {files.map((file, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.05 }}
                                className="file-item group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                                        <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FaFilePdf className="text-lg text-red-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-white truncate text-sm">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {(file.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFile(index)}
                                        className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                                    >
                                        <FaTimes className="text-sm" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
