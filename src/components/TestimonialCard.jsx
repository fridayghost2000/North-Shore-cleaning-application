import { Star } from 'lucide-react'

export default function TestimonialCard({ testimonial }) {
  const { name, location, rating, text, service, avatar } = testimonial

  return (
    <div className="bg-white rounded-3xl p-5 shadow-card flex flex-col gap-4 min-w-[280px]">
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-gray-600 leading-relaxed">"{text}"</p>

      {/* Footer */}
      <div className="flex items-center gap-3 pt-1 border-t border-gray-50">
        <div className="w-9 h-9 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
          {avatar}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{name}</p>
          <p className="text-xs text-gray-400">{location} · {service}</p>
        </div>
      </div>
    </div>
  )
}
