import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '(978) 555-0123',
    href: 'tel:+19785550123',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@northshoreclean.com',
    href: 'mailto:hello@northshoreclean.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Beverly, MA 01915',
    href: null,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon–Sat: 7 AM – 7 PM',
    href: null,
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  function handleChange(field) {
    return (ev) => {
      setForm((p) => ({ ...p, [field]: ev.target.value }))
      setErrors((p) => ({ ...p, [field]: '' }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const e_ = validate()
    if (Object.keys(e_).length) { setErrors(e_); return }
    setSubmitted(true)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-medium text-primary-500 mb-1">Get in Touch</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-500 text-sm mt-2 max-w-md">
          Have a question or ready to schedule? We'd love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact info */}
        <div className="space-y-4">
          {contactInfo.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-card">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-4.5 h-4.5 text-primary-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">{label}</p>
                {href ? (
                  <a href={href} className="text-sm font-medium text-gray-900 hover:text-primary-500 transition-colors">
                    {value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-gray-900">{value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Map placeholder */}
          <div className="bg-gradient-to-br from-primary-50 to-teal-50 rounded-3xl h-40 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="w-8 h-8 text-primary-400 mx-auto mb-2" />
              <p className="text-sm font-medium">Beverly, MA 01915</p>
              <p className="text-xs text-gray-400">North Shore, Massachusetts</p>
            </div>
          </div>
        </div>

        {/* Form */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-card p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-500 text-sm">
              Thanks for reaching out, {form.name}. We'll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="bg-white rounded-3xl shadow-card p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 mb-1">Send us a message</h2>

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange('name')}
                className={`w-full px-4 py-3 bg-surface rounded-xl border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all ${
                  errors.name ? 'border-red-300' : 'border-gray-100'
                }`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange('email')}
                className={`w-full px-4 py-3 bg-surface rounded-xl border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all ${
                  errors.email ? 'border-red-300' : 'border-gray-100'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Phone <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <input
                type="tel"
                placeholder="(978) 555-0100"
                value={form.phone}
                onChange={handleChange('phone')}
                className="w-full px-4 py-3 bg-surface rounded-xl border border-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your cleaning needs..."
                value={form.message}
                onChange={handleChange('message')}
                className={`w-full px-4 py-3 bg-surface rounded-xl border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all resize-none ${
                  errors.message ? 'border-red-300' : 'border-gray-100'
                }`}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3.5 rounded-2xl transition-colors shadow-btn"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
