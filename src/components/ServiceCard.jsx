import { Link } from 'react-router-dom'
import { Star, Clock, ArrowRight } from 'lucide-react'

export default function ServiceCard({ service, compact = false }) {
  const { id, title, shortDesc, price, duration, rating, reviews, icon, iconBg } = service

  if (compact) {
    return (
      <Link
        to={`/services/${id}`}
        className="group flex items-center gap-4 bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all"
      >
        <div className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center text-xl flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm truncate">{title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{shortDesc}</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span className="text-primary-500 font-semibold text-sm">from ${price}</span>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary-500 transition-colors" />
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/services/${id}`}
      className="group bg-white rounded-3xl p-5 shadow-card hover:shadow-card-hover transition-all flex flex-col gap-4"
    >
      {/* Icon */}
      <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center text-2xl`}>
        {icon}
      </div>

      {/* Title & desc */}
      <div>
        <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2">{shortDesc}</p>
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Clock className="w-3.5 h-3.5" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span className="font-medium text-gray-700">{rating}</span>
          <span className="text-gray-400">({reviews})</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-50">
        <span className="text-primary-500 font-bold text-lg">from ${price}</span>
        <span className="text-xs bg-primary-50 text-primary-500 font-medium px-3 py-1 rounded-full group-hover:bg-primary-500 group-hover:text-white transition-colors">
          Book Now
        </span>
      </div>
    </Link>
  )
}
