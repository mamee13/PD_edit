import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'

export default function ToolCard({ tool, index, onClick, size = 'sm' }) {
    const isLarge = size === 'lg'
    const isMedium = size === 'md'

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                delay: index * 0.15,
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
            whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`bento-card ${isLarge ? 'bento-card-lg' : ''} ${isMedium ? 'bento-card-md' : ''} cursor-pointer`}
        >
            {/* Background Gradient Blob */}
            <div
                className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                style={{ background: tool.color }}
            />

            <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                        <div className="flex items-start justify-between mb-6">
                            <motion.div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500"
                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                <tool.icon className="text-2xl" style={{ color: tool.color }} />
                            </motion.div>
                            <motion.div
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1 }}
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg">
                                    <FaArrowRight className="text-sm text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                </div>
                            </motion.div>
                        </div>

                        <motion.h3
                            className={`font-bold text-white mb-3 ${isLarge ? 'text-3xl' : 'text-xl'} leading-tight`}
                            whileHover={{ scale: 1.02 }}
                        >
                            {tool.name}
                        </motion.h3>
                        <p className="text-white/80 text-sm leading-relaxed max-w-[90%]">
                            {tool.description}
                        </p>
                </div>

                {isLarge && (
                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                    >
                        <motion.div
                            className="inline-flex items-center text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors cursor-pointer"
                            whileHover={{ x: 5 }}
                        >
                            Try it now
                            <motion.div
                                className="ml-2"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <FaArrowRight className="text-xs" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}
