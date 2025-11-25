import { motion } from 'framer-motion'
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative mt-20 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-lg font-black text-white">P</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">PDF Master</h3>
                        </div>
                        <p className="text-sm text-slate-600 mb-6 max-w-md leading-relaxed">
                            Professional PDF tools for modern workflows. Transform, optimize, and manage your documents with ease.
                        </p>
                        <div className="flex space-x-3">
                            <a
                                href="#"
                                className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-all"
                            >
                                <FaGithub size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-all"
                            >
                                <FaTwitter size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-all"
                            >
                                <FaLinkedin size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-all"
                            >
                                <FaEnvelope size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-slate-900 font-semibold mb-4 text-sm">Product</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Features</a>
                            </li>
                            <li>
                                <a href="#tools" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Tools</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">API</a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-slate-900 font-semibold mb-4 text-sm">Resources</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Documentation</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Help Center</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Privacy</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Terms</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-200">
                    <p className="text-sm text-slate-500 text-center">
                        © {currentYear} PDF Master. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
