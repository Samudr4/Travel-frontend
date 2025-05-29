import React, { useState, useEffect } from 'react';
import { getTours, deleteReview } from '../../apiService';
import { TravelPackage, Review as ReviewType } from '../../types';
import LoadingSpinner from '../../components/LoadingSpinner';
import { StarIconSolid } from '../../components/icons/StarIconSolid';

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<(ReviewType & { packageName: string })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchAllReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getTours();
        const allReviews: (ReviewType & { packageName: string })[] = [];
        response.data.forEach((pkg: TravelPackage & { reviews: ReviewType[] }) => {
          (pkg.reviews || []).forEach((review) => {
            allReviews.push({ ...review, packageName: pkg.name });
          });
        });
        setReviews(allReviews);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load reviews.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllReviews();
  }, []);

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter(r => r.id !== reviewId));
    } catch (err: any) {
      alert('Failed to delete review.');
    }
  };

  const filteredReviews = filter
    ? reviews.filter(r => r.packageName.toLowerCase().includes(filter.toLowerCase()) || r.userName.toLowerCase().includes(filter.toLowerCase()))
    : reviews;

  return (
    <div className="p-4 md:p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary">Manage Reviews</h1>
          <p className="text-text-light mt-1">View and moderate all user reviews across all packages.</p>
        </div>
        <input
          type="text"
          placeholder="Filter by package or user..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="p-2.5 border border-neutral-darkest/30 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm min-w-[220px]"
        />
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner message="Loading reviews..." size="lg" />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 mb-4 p-2 bg-red-100 border border-red-300 rounded-md">Error: {error}</p>
      ) : filteredReviews.length === 0 ? (
        <div className="text-center py-16 bg-white p-8 rounded-xl shadow-lg border border-neutral-light">
          <p className="text-xl font-semibold text-text-light mb-3">No reviews found.</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-xl overflow-x-auto border border-neutral-light/50">
          <table className="w-full min-w-[900px] text-sm text-left text-text">
            <thead className="text-xs text-text-dark uppercase bg-neutral-lightest border-b border-neutral-light">
              <tr>
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Comment</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((review) => (
                <tr key={review.id} className="bg-white border-b border-neutral-light hover:bg-neutral-lightest/60 transition-colors duration-150">
                  <td className="px-6 py-4 font-medium text-text whitespace-nowrap">{review.packageName}</td>
                  <td className="px-6 py-4">{review.userName}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <StarIconSolid key={i} className="w-4 h-4 text-yellow-500 mr-0.5" />
                      ))}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate" title={review.comment}>{review.comment}</td>
                  <td className="px-6 py-4">{new Date(review.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleDelete(review.id)} className="font-medium text-error hover:text-red-700 transition-colors duration-150 px-2 py-1 rounded-md hover:bg-error/10">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminReviews; 