"use client";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import React, { useState } from "react";

interface StarRatingProps {
  id?: string;
  count?: number;
  value: string;
  onValueChange: (rating: string) => void;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  id,
  count = 5,
  value,
  onValueChange,
  className,
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  const numericValue = parseInt(value, 10) || 0;
  const stars = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div id={id} className={cn("flex items-center gap-1", className)}>
      {stars.map((star) => (
        <Star
          key={star}
          className={cn(
            "cursor-pointer transition-colors",
            (hoverValue || numericValue) >= star
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          )}
          onClick={() => onValueChange(star.toString())}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(undefined)}
        />
      ))}
    </div>
  );
};
