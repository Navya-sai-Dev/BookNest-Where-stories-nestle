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
      name: 'L Bhaskar',
      role: 'Full Stack Architect',
      age: 20,
      gender: 'Male',
      github: 'https://github.com/LEKKALA-BHASKAR',
      linkedin: 'www.linkedin.com/in/lekkala-bhaskar',
      email: 'mailto:bassnaidu1242@gmail.com',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
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
      name: 'J Dhanush',
      role: 'Frontend Specialist',
      age: 20,
      gender: 'Male',
      github: 'https://github.com/dhanush5575',
      linkedin: 'https://linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=jalla-dhanush-06175536b',
      email: 'mailto:jalladhanush636@gmail.com',
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
      name: 'G Jaya Prakash',
      role: 'Backend Engineer',
      age: 21,
      gender: 'Male',
      github: 'https://github.com/jayaprakash47',
      linkedin: 'https://www.linkedin.com/in/jaya-prakash-0b78032b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      email: 'mailto:Prakashjaya143143@gmail.com',
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
      name: 'M Deena',
      role: 'UI/UX Designer',
      age: 20,
      gender: 'Female',
      github: 'https://github.com/Deena-02',
      linkedin: 'https://www.linkedin.com/in/m-deena-1048032b6',
      email: 'mailto:dearsifengsgirl45@gmail.com',
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
