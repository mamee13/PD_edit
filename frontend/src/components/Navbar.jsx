import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-3 cursor-pointer"
                    >
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-lg font-black text-white">P</span>
                        </div>
                        <h1 className="text-xl font-bold text-slate-900">PDF Master</h1>
                    </motion.div>

                    {/* Desktop Menu */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="hidden md:flex items-center space-x-8"
                    >
                        <motion.a
                            href="#features"
                            className="nav-link"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            Features
                        </motion.a>
                        <motion.a
                            href="#tools"
                            className="nav-link"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            Tools
                        </motion.a>
                        <motion.a
                            href="#about"
                            className="nav-link"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            About
                        </motion.a>
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 20px rgba(79, 70, 229, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all"
                        >
                            Get Started
                        </motion.button>
                    </motion.div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-slate-900 p-2"
                    >
                        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200"
                >
                    <div className="px-6 py-6 space-y-4">
                        <a href="#features" className="block text-slate-600 hover:text-slate-900 transition-colors py-2">
                            Features
                        </a>
                        <a href="#tools" className="block text-slate-600 hover:text-slate-900 transition-colors py-2">
                            Tools
                        </a>
                        <a href="#about" className="block text-slate-600 hover:text-slate-900 transition-colors py-2">
                            About
                        </a>
                        <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700">
                            Get Started
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    )
}
