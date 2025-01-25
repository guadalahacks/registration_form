"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getLocalizedElement, languageState } from '../app/locale';

export default function RegistrationForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    email: "",
    password: "",
    countryOfResidence: "",
    school: "",
    major: "",
    classification: "",
    anticipatedGraduationYear: "",
    currentLevelOfStudy: "", // Add this to the form (Review)
    gender: "",
    hackathonsAttended: "",
    technicalSkills: [] as string[],
    dietaryRestrictions: [] as string[],
    hasTeam: false, // Add this to the form
    heardAboutGuadalahacks: "",  // Add this to the form
    shirtSize: "", // Add this only if we have money for shirts :c
    resume: null,
    additionalLinks: "",
    specialAccommodations: "", // Add this to the form
    followUpForAccessibility: false, // Add this to the form
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhoneNumber: "",
    emergencyContactEmail: "",
    additionalInfo: "",
    agreeToPolicy: false,
  })

  const totalSteps = 5

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement
      if (name === "agreeToPolicy") {
        setFormData((prev) => ({ ...prev, [name]: checkbox.checked }))
      } else {
        const skillsArray = [...(formData[name] as string[])]
        if (checkbox.checked) {
          skillsArray.push(value)
        } else {
          const index = skillsArray.indexOf(value)
          if (index > -1) {
            skillsArray.splice(index, 1)
          }
        }
        setFormData((prev) => ({ ...prev, [name]: skillsArray }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files?.[0] }))
    }
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreeToPolicy) {
      alert("Please agree to the data policy before submitting")
      return
    }
    setIsSubmitting(true)
  
    try {
      const response = await fetch('http://localhost:3000/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
  
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
  
      const result = await response.json()
      alert("Form submitted successfully!")
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
      alert("There was an error submitting the form")
    } finally {
      setIsSubmitting(false)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#E31C79] to-[#FF7B5F] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-white/10 rounded-full"
            animate={{
              x: [Math.random() * 100, Math.random() * 100],
              y: [Math.random() * 100, Math.random() * 100],
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-8 transition-all duration-300 hover:shadow-pink-500/20">
          <div className="mb-8">
            <motion.h1
              className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#E31C79] to-[#FF7B5F] text-transparent bg-clip-text"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Guadalahacks Registration
            </motion.h1>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
              <span>Step {step}</span>
              <div className="h-2 w-48 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#E31C79] to-[#FF7B5F]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span>{totalSteps}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div key={step} {...fadeInUp} transition={{ duration: 0.3 }} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#E31C79] focus:outline-none focus:ring-1 focus:ring-[#E31C79]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#E31C79] focus:outline-none focus:ring-1 focus:ring-[#E31C79]"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Age</label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#E31C79] focus:outline-none focus:ring-1 focus:ring-[#E31C79]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#E31C79] focus:outline-none focus:ring-1 focus:ring-[#E31C79]"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Country of Residence</label>
                      <input
                        type="text"
                        name="countryOfResidence"
                        value={formData.countryOfResidence}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#E31C79] focus:outline-none focus:ring-1 focus:ring-[#E31C79]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#E31C79] focus:outline-none focus:ring-1 focus:ring-[#E31C79]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Password must be 8 characters or longer"
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#E31C79] focus:outline-none focus:ring-1 focus:ring-[#E31C79]"
                        required
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">School</label>
                      <input
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#E31C79] focus:outline-none focus:ring-1 focus:ring-[#E31C79]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Major</label>
                      <input
                        type="text"
                        name="major"
                        value={formData.major}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#E31C79] focus:outline-none focus:ring-1 focus:ring-[#E31C79]"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Classification</label>
                        <select
                          name="classification"
                          value={formData.classification}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#E31C79] focus:outline-none focus:ring-1 focus:ring-[#E31C79]"
                          required
                        >
                          <option value="">Select...</option>
                          <option value="Freshman">Freshman</option>
                          <option value="Sophomore">Sophomore</option>
                          <option value="Junior">Junior</option>
                          <option value="Senior">Senior</option>
                          <option value="Graduate">Graduate</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                        <input
                          type="number"
                          name="anticipatedGraduationYear"
                          value={formData.anticipatedGraduationYear}
                          onChange={handleInputChange}
                          min={2024}
                          max={2030}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#E31C79] focus:outline-none focus:ring-1 focus:ring-[#E31C79]"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Technical Skills</label>
                      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                        {[
                          "Python",
                          "JavaScript",
                          "TypeScript",
                          "Java",
                          "C#",
                          "C",
                          "C++",
                          "Golang",
                          "R",
                          "Swift",
                          "Dart",
                          "Kotlin",
                          "Ruby",
                          "Rust",
                          "Scala",
                          "SQL",
                          "HTML",
                          "CSS",
                          "PHP",
                          "Elixir",
                          "Verilog",
                          "Haskell",
                          "Lua",
                          "Full Stack",
                          "Front End",
                          "Back End",
                          "Web",
                          "Mobile",
                          "Design",
                          "DevOps",
                          "Cloud",
                          "Data Science",
                          "Machine Learning",
                          "Databases",
                          "UI/UX",
                          "Generative AI",
                          "Data Visualization",
                          "Computer Graphics",
                          "Game Development",
                          "Cybersecurity",
                          "Data Structures",
                          "REST APIs",
                          "Software Testing",
                          "Microcontrollers",
                          "Computer Systems Programming",
                          "Computer Hardware",
                          "Operating Systems",
                          "AWS",
                          "Google Cloud",
                          "Microsoft Azure",
                          "Vercel",
                          "PostgreSQL",
                          "MongoDB",
                          "React",
                          "Angular",
                          "Vue.js",
                          "Svelte",
                          "Bootstrap",
                          "Ruby on Rails",
                          "Django",
                          "Firebase",
                          "Git",
                          "Unix/Linux",
                          "Jupyter Notebooks",
                          "Node.js",
                          "Docker",
                          "Kubernetes",
                          "Tensorflow",
                          "PyTorch",
                          "Flutter",
                          "React Native",
                        ].map((skill) => (
                          <label key={skill} className="inline-flex items-center">
                            <input
                              type="checkbox"
                              name="technicalSkills"
                              value={skill}
                              checked={formData.technicalSkills.includes(skill)}
                              onChange={handleInputChange}
                              className="h-4 w-4 rounded border-gray-300 text-[#E31C79] focus:ring-[#E31C79]"
                            />
                            <span className="ml-2 text-sm text-gray-600">{skill}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
                      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {[
                          "Vegan",
                          "Vegetarian",
                          "No Beef",
                          "No Pork",
                          "Halal",
                          "Kosher",
                          "Gluten-Free",
                          "Food Allergy",
                          "Other",
                        ].map((restriction) => (
                          <label key={restriction} className="inline-flex items-center">
                            <input
                              type="checkbox"
                              name="dietaryRestrictions"
                              value={restriction}
                              checked={formData.dietaryRestrictions.includes(restriction)}
                              onChange={handleInputChange}
                              className="h-4 w-4 rounded border-gray-300 text-[#E31C79] focus:ring-[#E31C79]"
                            />
                            <span className="ml-2 text-sm text-gray-600">{restriction}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Resume (PDF only)</label>
                      <input
                        type="file"
                        name="resume"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E31C79] file:text-white hover:file:bg-pink-600"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        Companies will use this resume to offer interviews for internships and full-time positions.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Portfolio Links</label>
                      <input
                        type="text"
                        name="additionalLinks"
                        value={formData.additionalLinks}
                        onChange={handleInputChange}
                        placeholder="GitHub, Devpost, personal website, LinkedIn, etc."
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#E31C79] focus:outline-none focus:ring-1 focus:ring-[#E31C79]"
                      />
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Emergency Contact Information</label>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <motion.input
                          {...fadeInUp}
                          transition={{ delay: 0.1 }}
                          type="text"
                          name="emergencyContactName"
                          value={formData.emergencyContactName}
                          onChange={handleInputChange}
                          placeholder="Contact Name"
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 transition-all duration-300 focus:border-[#E31C79] focus:outline-none focus:ring-2 focus:ring-[#E31C79]/50 hover:border-pink-300"
                          required
                        />
                        <motion.input
                          {...fadeInUp}
                          transition={{ delay: 0.2 }}
                          type="text"
                          name="emergencyContactRelationship"
                          value={formData.emergencyContactRelationship}
                          onChange={handleInputChange}
                          placeholder="Relationship"
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 transition-all duration-300 focus:border-[#E31C79] focus:outline-none focus:ring-2 focus:ring-[#E31C79]/50 hover:border-pink-300"
                          required
                        />
                        <motion.input
                          {...fadeInUp}
                          transition={{ delay: 0.3 }}
                          type="tel"
                          name="emergencyContactPhoneNumber"
                          value={formData.emergencyContactPhoneNumber}
                          onChange={handleInputChange}
                          placeholder="Phone Number"
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 transition-all duration-300 focus:border-[#E31C79] focus:outline-none focus:ring-2 focus:ring-[#E31C79]/50 hover:border-pink-300"
                          required
                        />
                        <motion.input
                          {...fadeInUp}
                          transition={{ delay: 0.4 }}
                          type="email"
                          name="emergencyContactEmail"
                          value={formData.emergencyContactEmail}
                          onChange={handleInputChange}
                          placeholder="Email"
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 transition-all duration-300 focus:border-[#E31C79] focus:outline-none focus:ring-2 focus:ring-[#E31C79]/50 hover:border-pink-300"
                          required
                        />
                      </div>
                    </div>

                    <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
                      <label className="block text-sm font-medium text-gray-700">Additional Information</label>
                      <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        rows={4}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 transition-all duration-300 focus:border-[#E31C79] focus:outline-none focus:ring-2 focus:ring-[#E31C79]/50 hover:border-pink-300"
                        placeholder="Anything else you would like us to know?"
                      />
                    </motion.div>

                    <motion.div {...fadeInUp} transition={{ delay: 0.6 }} className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        name="agreeToPolicy"
                        id="agreeToPolicy"
                        checked={formData.agreeToPolicy}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#E31C79] transition-all duration-300 focus:ring-[#E31C79] hover:border-pink-300"
                        required
                      />
                      <label htmlFor="agreeToPolicy" className="text-sm text-gray-600">
                        I agree to the processing of my personal data according to the{" "}
                        <a href="#" className="text-[#E31C79] hover:text-pink-700 underline">
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#E31C79] hover:text-pink-700 underline">
                          Terms of Service
                        </a>
                      </label>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="flex justify-between pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1 || isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 transition-all duration-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 hover:shadow-md"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </button>
              <button
                type={step === totalSteps ? "submit" : "button"}
                onClick={step === totalSteps ? undefined : nextStep}
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#E31C79] to-[#FF7B5F] transition-all duration-300 hover:from-[#FF7B5F] hover:to-[#E31C79] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E31C79] disabled:opacity-50 hover:shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : step === totalSteps ? (
                  "Submit"
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
