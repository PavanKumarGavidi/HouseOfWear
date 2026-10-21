import { useState } from 'react';
import { Star, Camera, Send, ThumbsUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { twMerge } from '../../utils/cn';

interface Review {
  id: string;
  user: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

interface ReviewsSectionProps {
  productId: string;
  avgRating: number;
  reviewCount: number;
}

// Mock reviews
const mockReviews: Review[] = [
  {
    id: '1',
    user: 'Arjun S.',
    rating: 5,
    title: 'Perfect fit and quality',
    body: 'Absolutely love this shirt! The fabric is premium and the fit is perfect. I\'ve ordered multiple colors and they all fit consistently. Highly recommend!',
    date: '2024-01-10',
    verified: true,
    helpful: 24,
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&h=200&fit=crop'],
  },
  {
    id: '2',
    user: 'Priya M.',
    rating: 4,
    title: 'Great quality, runs slightly large',
    body: 'The quality is excellent and the fabric feels luxurious. However, I found it runs slightly large. Consider sizing down if you prefer a slimmer fit.',
    date: '2024-01-08',
    verified: true,
    helpful: 18,
  },
  {
    id: '3',
    user: 'Rahul K.',
    rating: 5,
    title: 'Worth every rupee',
    body: 'Premium quality that justifies the price. The stitching is perfect and the color hasn\'t faded after multiple washes. Will definitely buy again.',
    date: '2024-01-05',
    verified: true,
    helpful: 12,
  },
];

const ratingDistribution = [
  { stars: 5, count: 145, percentage: 65 },
  { stars: 4, count: 52, percentage: 23 },
  { stars: 3, count: 18, percentage: 8 },
  { stars: 2, count: 6, percentage: 3 },
  { stars: 1, count: 3, percentage: 1 },
];

export function ReviewsSection({ productId, avgRating, reviewCount }: ReviewsSectionProps) {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <section className="mt-12 border-t border-brand-200 dark:border-brand-700 pt-8">
      <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Overall Rating */}
        <div className="text-center md:text-left">
          <div className="flex items-baseline gap-2 justify-center md:justify-start">
            <span className="text-5xl font-bold">{avgRating.toFixed(1)}</span>
            <span className="text-sm text-brand-600 dark:text-brand-400">out of 5</span>
          </div>
          <div className="flex items-center gap-1 mt-2 justify-center md:justify-start">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={twMerge(
                  'w-5 h-5',
                  star <= Math.round(avgRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-brand-300 dark:text-brand-600'
                )}
              />
            ))}
          </div>
          <p className="text-sm text-brand-600 dark:text-brand-400 mt-2">
            Based on {reviewCount} reviews
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map((rating) => (
            <div key={rating.stars} className="flex items-center gap-3">
              <span className="text-sm w-12">{rating.stars} star</span>
              <div className="flex-1 h-2 bg-brand-100 dark:bg-brand-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400"
                  style={{ width: `${rating.percentage}%` }}
                />
              </div>
              <span className="text-sm text-brand-600 dark:text-brand-400 w-8">
                {rating.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Button */}
      <div className="mb-6">
        <Button onClick={() => setShowWriteReview(!showWriteReview)}>
          Write a Review
        </Button>
      </div>

      {/* Write Review Form */}
      {showWriteReview && (
        <div className="border border-brand-200 dark:border-brand-700 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
          
          {/* Star Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Your Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setNewRating(star)}
                  className="p-1"
                >
                  <Star
                    className={twMerge(
                      'w-6 h-6 transition-colors',
                      (hoverRating || newRating) >= star
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-brand-300 dark:text-brand-600'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Review Title</label>
            <input
              type="text"
              placeholder="Summarize your experience"
              className="w-full px-3 py-2 border border-brand-200 dark:border-brand-700 rounded-lg bg-white dark:bg-brand-900"
            />
          </div>

          {/* Review Body */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Your Review</label>
            <textarea
              rows={4}
              placeholder="Share your thoughts about this product..."
              className="w-full px-3 py-2 border border-brand-200 dark:border-brand-700 rounded-lg bg-white dark:bg-brand-900"
            />
          </div>

          {/* Photo Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Add Photos (Optional)</label>
            <button className="flex items-center gap-2 px-4 py-2 border border-brand-200 dark:border-brand-700 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-800 transition-colors">
              <Camera className="w-4 h-4" />
              <span className="text-sm">Upload Photos</span>
            </button>
          </div>

          <div className="flex gap-3">
            <Button>Submit Review</Button>
            <Button variant="outline" onClick={() => setShowWriteReview(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b border-brand-200 dark:border-brand-700 pb-6 last:border-0">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={twMerge(
                          'w-4 h-4',
                          star <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-brand-300 dark:text-brand-600'
                        )}
                      />
                    ))}
                  </div>
                  <h4 className="font-semibold">{review.title}</h4>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium">{review.user}</span>
                  {review.verified && (
                    <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
              </div>
              <span className="text-sm text-brand-500">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>

            {/* Review Body */}
            <p className="text-sm text-brand-700 dark:text-brand-300 mb-3">{review.body}</p>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-3">
                {review.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Review photo ${i + 1}`}
                    className="w-20 h-20 rounded object-cover"
                  />
                ))}
              </div>
            )}

            {/* Helpful Button */}
            <button className="flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400 hover:text-brand-900 dark:hover:text-white transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
