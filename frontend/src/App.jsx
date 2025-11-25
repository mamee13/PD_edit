import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaFilePdf, FaCut, FaSync, FaCompress, FaFileAlt, FaImage, FaCheck, FaBolt, FaLock, FaArrowRight } from 'react-icons/fa'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ToolCard from './components/ToolCard'
import Workspace from './components/Workspace'
import './index.css'

const tools = [
  { id: 'merge', name: 'Merge PDFs', icon: FaFilePdf, description: 'Combine multiple PDF files into a single, organized document in seconds.', color: '#3b82f6', size: 'lg' },
  { id: 'compress', name: 'Compress PDF', icon: FaCompress, description: 'Reduce file size while maintaining quality.', color: '#f59e0b', size: 'md' },
  { id: 'split', name: 'Split PDF', icon: FaCut, description: 'Extract specific pages.', color: '#8b5cf6', size: 'sm' },
  { id: 'rotate', name: 'Rotate', icon: FaSync, description: 'Fix page orientation.', color: '#10b981', size: 'sm' },
  { id: 'extract-text', name: 'Extract Text', icon: FaFileAlt, description: 'Convert PDF to text.', color: '#ec4899', size: 'sm' },
  { id: 'extract-images', name: 'Get Images', icon: FaImage, description: 'Extract all images.', color: '#6366f1', size: 'sm' },
]

function App() {
  const [selectedTool, setSelectedTool] = useState(null)

  return (
    <div className="min-h-screen flex flex-col text-white selection:bg-cyan-500/30">
      <div className="aurora-bg" />
      <div className="particles" />
      <Navbar />

      <main className="flex-grow pt-24 relative z-10">
        <AnimatePresence mode="wait">
          {!selectedTool ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="max-w-7xl mx-auto px-6 lg:px-8 pb-20"
            >
              {/* Hero Section */}
              <div className="flex flex-col items-center text-center mb-32">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="glass-panel px-6 py-3 rounded-full mb-12"
                >
                  <span className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse inline-block" />
                  <span className="text-sm font-medium glow-text">v2.0 Now Live</span>
                  <span className="ml-2 px-2 py-1 bg-cyan-400/20 rounded-full text-xs font-semibold">NEW</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-8 leading-none"
                >
                  <span className="block glow-text">Master Your</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse">
                    PDF Workflow
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl md:text-2xl text-white/80 max-w-4xl mb-16 leading-relaxed"
                >
                  Transform your document workflow with
                  <span className="font-bold text-cyan-400"> lightning-fast</span> PDF tools.
                  Built for professionals who demand
                  <span className="font-bold text-purple-400"> perfection</span> and
                  <span className="font-bold text-pink-400"> privacy</span>.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 mb-24"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary group"
                  >
                    <span>Start Creating</span>
                    <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-ghost group"
                  >
                    <span>Watch Demo</span>
                    <motion.span className="ml-2 inline-block" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>▶</motion.span>
                  </motion.button>
                </motion.div>

                {/* Hero Visual */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.6, type: "spring" }}
                  className="relative w-full max-w-2xl mx-auto"
                >
                  <div className="glass-panel-strong p-8 rounded-3xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    <div className="grid grid-cols-3 gap-4">
                      {[...Array(9)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                          className="aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center"
                        >
                          <div className="w-6 h-6 bg-white/20 rounded-lg" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-pink-400 rounded-full blur-sm"
                  />
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-6 -left-6 w-6 h-6 bg-cyan-400 rounded-full blur-sm"
                  />
                </motion.div>
              </div>

              {/* Tools Showcase */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="mb-32"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mb-16"
                >
                  <motion.h2
                    className="text-4xl md:text-6xl font-bold mb-6 glow-text"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                  >
                    Powerful Tools Suite
                  </motion.h2>
                  <motion.p
                    className="text-xl text-white/70 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    Professional-grade PDF manipulation tools designed for modern workflows
                  </motion.p>
                </motion.div>

                <div className="bento-grid">
                  {tools.map((tool, index) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      index={index}
                      size={tool.size}
                      onClick={() => setSelectedTool(tool)}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Core Features */}
              <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-32"
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Why Choose <span className="glow-text">PDF Master</span>
                  </h2>
                  <p className="text-lg text-white/70 max-w-3xl mx-auto">
                    Experience the difference with tools designed for the modern professional
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: <FaBolt className="w-10 h-10" />,
                      gradient: 'from-yellow-400 to-orange-500',
                      title: "Lightning Fast",
                      desc: "Process documents in seconds, not minutes with our optimized algorithms",
                      detail: "Up to 10x faster than traditional tools"
                    },
                    {
                      icon: <FaLock className="w-10 h-10" />,
                      gradient: 'from-green-400 to-emerald-500',
                      title: "Secure & Private",
                      desc: "Your files are processed locally and never leave your device",
                      detail: "Zero data transmission to external servers"
                    },
                    {
                      icon: <FaCheck className="w-10 h-10" />,
                      gradient: 'from-cyan-400 to-blue-500',
                      title: "No Ads, No Limits",
                      desc: "Pure PDF tools without distractions or artificial restrictions",
                      detail: "Unlimited processing, always free"
                    }
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30, rotateX: -15 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2, duration: 0.6 }}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="glass-panel p-8 rounded-3xl text-center group cursor-pointer transform-gpu"
                    >
                      <motion.div
                        className={`bg-gradient-to-br ${feature.gradient} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                      <p className="text-white/80 mb-3 leading-relaxed">{feature.desc}</p>
                      <p className="text-sm text-cyan-400 font-semibold">{feature.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Impact Stats */}
              <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 glass-panel rounded-3xl -z-10"></div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center p-16"
                >
                  <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-6 glow-text"
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    Trusted Globally
                  </motion.h2>
                  <p className="text-lg text-white/70 mb-12">
                    Join thousands of professionals who trust PDF Master for their document workflows
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {[
                      { value: '1M+', label: 'Files Processed', icon: '📄', color: 'text-cyan-400' },
                      { value: '50k+', label: 'Active Users', icon: '👥', color: 'text-purple-400' },
                      { value: '99.9%', label: 'Uptime', icon: '⚡', color: 'text-pink-400' },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.15, duration: 0.8, type: "spring" }}
                        whileHover={{ scale: 1.1, rotateY: 10 }}
                        className="text-center group"
                      >
                        <motion.div
                          className="text-6xl md:text-7xl font-black mb-4 glow-text"
                          animate={{
                            textShadow: [
                              '0 0 20px rgba(56, 189, 248, 0.5)',
                              '0 0 40px rgba(168, 85, 247, 0.5)',
                              '0 0 20px rgba(56, 189, 248, 0.5)'
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          {stat.value}
                        </motion.div>
                        <motion.div
                          className="text-xl text-white/80 mb-2"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.15 }}
                        >
                          {stat.label}
                        </motion.div>
                        <motion.span
                          className="text-3xl block"
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        >
                          {stat.icon}
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="flex justify-center"
                  >
                    <motion.button
                      className="glass-panel px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Join Our Community →
                    </motion.button>
                  </motion.div>
                </motion.div>
              </motion.section>
            </motion.div>
          ) : (
            <Workspace
              key="workspace"
              tool={selectedTool}
              onBack={() => setSelectedTool(null)}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default App
