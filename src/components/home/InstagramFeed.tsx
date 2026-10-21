const instagramPosts = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop',
];

export function InstagramFeed() {
  return (
    <section className="py-12 sm:py-16 border-t border-brand-100 dark:border-brand-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-500 dark:text-brand-400 mb-2">
            @houseofwear
          </p>
          <h2 className="text-2xl sm:text-3xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>
            Follow Our Journey
          </h2>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
          {instagramPosts.map((post, i) => (
            <a
              key={i}
              href="https://instagram.com/houseofwear"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded overflow-hidden bg-brand-100 dark:bg-brand-800"
            >
              <img
                src={post}
                alt={`Instagram post ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-2xl">
                  ❤️
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
