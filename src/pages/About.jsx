import { Link } from 'react-router-dom'
import { Shield, Leaf, Award, Users, ArrowRight } from 'lucide-react'
import { stats } from '../data/services'

const values = [
  {
    icon: Shield,
    title: 'Trustworthy & Reliable',
    desc: 'Every cleaner is background-checked, insured, and trained to our strict standards before entering your home or business.',
  },
  {
    icon: Leaf,
    title: 'Eco-Conscious',
    desc: 'We use only green-certified, non-toxic cleaning products — better for your space, your family, and the planet.',
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    desc: "We stand behind our work. If something isn't right, we'll come back and fix it at no additional charge.",
  },
  {
    icon: Users,
    title: 'Community First',
    desc: 'Locally owned and operated in Beverly, MA. We\'re your neighbors — and we care about our community.',
  },
]

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-500 to-accent-500 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-block bg-white/15 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
            About North Shore Clean
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Cleaning professionals you can count on
          </h1>
          <p className="text-white/80 leading-relaxed max-w-xl mx-auto">
            For over a decade, North Shore Clean has been the most trusted cleaning service on
            Massachusetts' North Shore — delivering spotless results to thousands of homes and
            businesses.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-primary-500">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-medium text-primary-500 mb-2">Our Story</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Built on the North Shore. Trusted across it.
            </h2>
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <p>
                North Shore Clean was founded with a simple mission: provide reliable, high-quality
                cleaning services that give people their time back. What started as a small
                residential cleaning operation in Beverly, MA has grown into a full-service
                commercial and residential cleaning company serving communities across the region.
              </p>
              <p>
                We built our reputation one clean home at a time. Today, over 2,400 clients trust
                us to keep their homes, offices, and businesses spotless — and we don't take that
                trust lightly.
              </p>
              <p>
                Every cleaner on our team is locally hired, thoroughly vetted, and continuously
                trained to meet our exacting standards. We treat every space as if it were our own.
              </p>
            </div>
          </div>

          {/* Visual placeholder */}
          <div className="bg-gradient-to-br from-primary-50 to-teal-50 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 h-64">
            <div className="text-6xl">✨</div>
            <p className="text-primary-600 font-semibold text-center">
              Massachusetts' Most Reputable<br />Commercial Cleaning Service
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-primary-500 mb-1">What We Stand For</p>
            <h2 className="text-2xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 bg-surface rounded-3xl p-5">
                <div className="w-11 h-11 bg-primary-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-primary-500 mb-1">Where We Serve</p>
          <h2 className="text-2xl font-bold text-gray-900">Service Areas</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            'Beverly', 'Salem', 'Gloucester', 'Marblehead', 'Peabody',
            'Danvers', 'Swampscott', 'Rockport', 'Ipswich', 'Newburyport',
          ].map((area) => (
            <span
              key={area}
              className="bg-white border border-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-full shadow-sm"
            >
              📍 {area}, MA
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-500 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-2xl font-bold mb-3">Join thousands of satisfied clients</h2>
          <p className="text-white/80 text-sm mb-8 max-w-md mx-auto">
            Experience the North Shore Clean difference. Book your first cleaning today.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-3.5 rounded-2xl hover:bg-primary-50 transition-colors shadow-lg"
          >
            Book a Cleaning <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
