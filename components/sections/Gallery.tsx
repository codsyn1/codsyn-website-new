export default function Gallery() {
  const images = [
    { id: 1, category: "Web Design" },
    { id: 2, category: "Mobile Apps" },
    { id: 3, category: "CRM Systems" },
    { id: 4, category: "E-commerce" },
    { id: 5, category: "Dashboards" },
    { id: 6, category: "Landing Pages" }
  ]

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Showcase of our design and development work
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group overflow-hidden rounded-lg">
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <p className="text-gray-500">{image.category}</p>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-semibold">{image.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
