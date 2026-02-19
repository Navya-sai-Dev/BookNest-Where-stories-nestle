import { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, Heart, Code, Layout, Database, Palette } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/UI/Card'

const TeamPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredMember, setHoveredMember] = useState(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const teamMembers = [
    {
      name: 'A Navya sai',
      role: 'Full Stack Architect',
      age: 21,
      gender: 'Female',
      email: 'mailto:navyareddy3012005@gmail.com',
      image: 'data:image/jpeg;base64,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',
      bio: 'Orchestrates the entire MERN stack with expertise in both frontend and backend development. Implements robust system architecture and ensures seamless integration between components.',
      skills: ['React.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT Auth'],
      contributions: [
        'Designed application architecture',
        'Implemented authentication system',
        'Optimized database queries',
        'Led team coordination'
      ],
      accentColor: 'from-blue-600 to-indigo-600'
    },
    {
      name: 'A Madhavan',
      role: 'Frontend Specialist',
      age: 20,
      gender: 'Male',
      email: 'mailto:arurumadhavan563@gmail.com',
      image: 'https://media.istockphoto.com/id/1310896133/photo/happy-smiling-afro-businessman-using-laptop-at-the-desk-in-office.webp?s=2048x2048&w=is&k=20&c=OH8w-cpAU4KOrHri2kfA1w3rQ6EKyhAeXwb9pnGy9kM=',
      bio: 'Crafts responsive and interactive user interfaces with React. Implements state management and ensures optimal performance of frontend components.',
      skills: ['React.js', 'Redux', 'Tailwind CSS', 'Framer Motion', 'Axios', 'Formik'],
      contributions: [
        'Developed responsive layouts',
        'Implemented animations',
        'Optimized component rendering',
        'Integrated API calls'
      ],
      accentColor: 'from-emerald-600 to-teal-600'
    },
    {
      name: 'C Raja Sekhar',
      role: 'Backend Engineer',
      age: 21,
      gender: 'Male',
      email: 'mailto:Ganar3215@gmail.com',
      image: 'https://images.pexels.com/photos/5926375/pexels-photo-5926375.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Builds scalable server-side applications with Node.js and Express. Designs efficient database schemas and implements secure API endpoints.',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs', 'JWT'],
      contributions: [
        'Created API endpoints',
        'Implemented data validation',
        'Optimized database operations',
        'Set up authentication middleware'
      ],
      accentColor: 'from-amber-600 to-orange-600'
    },
    {
      name: 'A Jyothsna',
      role: 'UI/UX Designer',
      age: 20,
      gender: 'Female',
      email: 'mailto:Ajyothsna77@gmail.com',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Transforms concepts into beautiful, user-friendly interfaces using Figma. Ensures consistent design language and optimal user experience across the application.',
      skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Wireframing', 'User Testing'],
      contributions: [
        'Designed all screens',
        'Created design system',
        'Conducted user research',
        'Optimized user flows'
      ],
      accentColor: 'from-purple-600 to-pink-600'
    }
  ]

  const techStack = [
    { name: 'MongoDB', icon: <Database className="w-5 h-5" />, color: 'bg-green-500' },
    { name: 'Express.js', icon: <Code className="w-5 h-5" />, color: 'bg-gray-500' },
    { name: 'React', icon: <Layout className="w-5 h-5" />, color: 'bg-blue-500' },
    { name: 'Node.js', icon: <Code className="w-5 h-5" />, color: 'bg-green-600' },
    { name: 'Figma', icon: <Palette className="w-5 h-5" />, color: 'bg-purple-500' },
    { name: 'Tailwind CSS', icon: <Layout className="w-5 h-5" />, color: 'bg-cyan-400' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md text-gray-800 px-5 py-1.5 rounded-full text-xs font-medium mb-8 shadow-lg border border-gray-200/50"
          >
            <span className="tracking-wider">MERN STACK TEAM</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-medium text-gray-900 mb-6 tracking-tight leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Developers</span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500"
            >
              Behind the Code
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light"
          >
            A dedicated team of MERN stack specialists and designers building modern web applications with cutting-edge technologies.
          </motion.p>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-medium text-center mb-8 text-gray-800">Our Technology Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md border border-gray-100"
              >
                <div className={`p-3 rounded-full ${tech.color} text-white mb-3`}>
                  {tech.icon}
                </div>
                <span className="font-medium text-gray-700">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Members */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.6, ease: 'easeOut' }
                }
              }}
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
              className="relative"
            >
              <Card className="p-0 overflow-hidden bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    animate={{ scale: hoveredMember === index ? 1.05 : 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-medium tracking-tight">{member.name}</h3>
                    <p className="text-sm text-gray-200 font-light">{member.role}</p>
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${member.accentColor}`} />
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>Age: {member.age}</span>
                    <span>{member.gender}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed font-light mb-4">{member.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">Key Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, i) => (
                        <span key={i} className="text-xs px-3 py-1 bg-gray-100 text-gray-800 rounded-full font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h4 className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-2">Contributions</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      {member.contributions.map((contribution, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-emerald-500 mr-1">•</span>
                          <span>{contribution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-center space-x-4 pt-4 mt-4 border-t border-gray-100">
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-gray-800 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.email} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </Card>

              <AnimatePresence>
                {hoveredMember === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute -top-4 right-4 px-4 py-2 rounded-full text-white text-xs font-medium tracking-wider shadow-lg bg-gradient-to-r ${member.accentColor}`}
                  >
                    {member.role.toUpperCase()}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Development Process */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-24"
        >
          <Card className="p-8 bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-lg">
            <h2 className="text-2xl font-medium text-center mb-8 text-gray-800">Our Development Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <Palette className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">Design Phase</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Using Figma, we create wireframes, prototypes, and high-fidelity designs to ensure optimal user experience before any code is written.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-purple-100 rounded-full mr-4">
                    <Code className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">Frontend Development</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Building responsive interfaces with React, Tailwind CSS, and Framer Motion to bring the designs to life with smooth animations and interactions.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-green-100 rounded-full mr-4">
                    <Database className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800">Backend Development</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Developing robust APIs with Node.js and Express, with MongoDB for data storage, ensuring security, scalability, and performance.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Final Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-gray-300/50 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gray-300/50 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-gray-300/50 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-gray-300/50 rounded-br-xl" />
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 ml-3 tracking-tight">Built with the MERN Stack</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto font-light mb-8">
              We combine MongoDB, Express, React, and Node.js to build full-stack JavaScript applications with seamless data flow and excellent performance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              {techStack.map((tech, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 ${tech.color} rounded-full`}></div>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default TeamPage
