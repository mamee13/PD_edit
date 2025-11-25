import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaSpinner, FaDownload, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'
import axios from 'axios'
import FileUpload from './FileUpload'

const API_BASE = 'http://localhost:3000/api'

export default function Workspace({ tool, onBack }) {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({
        pages: '1',
        angle: '90',
    })

    const handleProcess = async () => {
        if (files.length === 0) {
            setError('Please select at least one file')
            return
        }

        setLoading(true)
        setError(null)
        setResult(null)

        try {
            const formData = new FormData()

            if (tool.id === 'merge') {
                files.forEach(file => formData.append('files', file))
            } else {
                formData.append('file', files[0])
            }

            if (tool.id === 'split') {
                formData.append('pages', options.pages)
            } else if (tool.id === 'rotate') {
                formData.append('angle', options.angle)
            }

            const response = await axios.post(`${API_BASE}/${tool.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            setResult(response.data)
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const renderOptions = () => {
        switch (tool.id) {
            case 'split':
                return (
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Pages to Extract
                        </label>
                        <input
                            type="text"
                            value={options.pages}
                            onChange={(e) => setOptions({ ...options, pages: e.target.value })}
                            className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors text-sm"
                            placeholder="e.g., 1-3 or 1,3,5"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Use ranges (1-3) or comma-separated values (1,3,5)
                        </p>
                    </div>
                )
            case 'rotate':
                return (
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-400 mb-2">
                            Rotation Angle
                        </label>
                        <select
                            value={options.angle}
                            onChange={(e) => setOptions({ ...options, angle: e.target.value })}
                            className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/20 transition-colors text-sm cursor-pointer"
                        >
                            <option value="90" className="bg-[#1a1a1a]">90° Clockwise</option>
                            <option value="180" className="bg-[#1a1a1a]">180°</option>
                            <option value="270" className="bg-[#1a1a1a]">270° (90° Counter-clockwise)</option>
                        </select>
                    </div>
                )
            default:
                return null
        }
    }

    const renderResult = () => {
        if (!result) return null

        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="result-card"
            >
                <div className="flex items-start mb-6">
                    <FaCheckCircle className="text-green-500 text-2xl mr-3 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Success!</h3>
                        <p className="text-sm text-gray-400">{result.message}</p>
                    </div>
                </div>

                {result.text && (
                    <div className="bg-[#1a1a1a] p-4 rounded-xl mb-4 border border-white/5">
                        <h4 className="font-medium text-white mb-2 text-sm">Extracted Text:</h4>
                        <pre className="whitespace-pre-wrap text-xs text-gray-400 leading-relaxed">
                            {result.text}
                        </pre>
                    </div>
                )}

                {result.downloadUrl && (
                    <a
                        href={`http://localhost:3000${result.downloadUrl}`}
                        download
                        className="btn-primary inline-flex items-center text-sm"
                    >
                        <FaDownload className="mr-2" />
                        Download Result
                    </a>
                )}

                {result.images && result.images.length > 0 && (
                    <div>
                        <h4 className="font-medium text-white mb-3 text-sm">
                            Extracted Images ({result.count}):
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {result.images.map((img, idx) => (
                                <a
                                    key={idx}
                                    href={`http://localhost:3000${img}`}
                                    download
                                    className="btn-secondary text-xs flex items-center justify-center"
                                >
                                    <FaDownload className="mr-2 text-xs" />
                                    Image {idx + 1}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
            <button
                onClick={onBack}
                className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors text-sm group"
            >
                <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Tools
            </button>

            <div className="glass-card-strong">
                {/* Tool Header */}
                <div className="flex items-center mb-8 pb-8 border-b border-white/5">
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mr-4"
                        style={{ backgroundColor: `${tool.color}15` }}
                    >
                        <tool.icon className="text-3xl" style={{ color: tool.color }} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">
                            {tool.name}
                        </h2>
                        <p className="text-sm text-gray-400">
                            {tool.description}
                        </p>
                    </div>
                </div>

                {renderOptions()}

                <FileUpload
                    onFilesSelected={setFiles}
                    multiple={tool.id === 'merge'}
                />

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="error-card mt-6 flex items-start"
                        >
                            <FaExclamationCircle className="text-red-500 text-2xl mr-3 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-semibold text-white mb-1 text-sm">Error</h4>
                                <p className="text-sm text-gray-400">{error}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {result && <div className="mt-8">{renderResult()}</div>}

                <button
                    onClick={handleProcess}
                    disabled={loading || files.length === 0}
                    className="btn-primary w-full mt-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm py-3"
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin mr-2" />
                            Processing...
                        </>
                    ) : (
                        `Process ${tool.name}`
                    )}
                </button>
            </div>
        </div>
    )
}
