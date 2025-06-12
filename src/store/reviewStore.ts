// store/reviewStore.ts
import { create } from "zustand";

interface Review {
  id: number;
  username: string;
  date: string;
  rating: number;
  content: string;
  images: string[];
  likes: number;
  isMyReview: boolean;
  surveyAnswers?: Record<string, string>;
}

interface ReviewStore {
  newReview: Review | null;
  setNewReview: (review: Review | null) => void;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  newReview: null,
  setNewReview: (review) => set({ newReview: review }),
}));
