"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export const StarRating = ({ rating, onRatingChange }: StarRatingProps) => {
  const [hover, setHover] = useState(0);

  return (
    <div
      className="flex gap-2"
      role="radiogroup"
      aria-label="Rate your experience"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="text-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          aria-label={`${star} star${star === 1 ? "" : "s"}`}
          aria-checked={rating === star}
          role="radio"
        >
          <FaStar
            className={`transition-colors ${
              star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
};
