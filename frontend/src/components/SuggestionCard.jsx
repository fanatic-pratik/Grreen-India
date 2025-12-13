import React, { useState } from "react";

const SuggestionCard = ({ suggestion, onFeedback, photoId }) => {
  const [feedbackGiven, setFeedbackGiven] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedback = async (feedbackType) => {
    setIsSubmitting(true);
    try {
      await onFeedback(photoId, suggestion.id, feedbackType);
      setFeedbackGiven(feedbackType);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "product":
        return "bg-blue-100 text-blue-800";
      case "action":
        return "bg-green-100 text-green-800";
      case "tip":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      {/* Title & Type */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-800">
          {suggestion?.title || "Suggestion"}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
            suggestion?.type
          )}`}
        >
          {suggestion?.type || "info"}
        </span>
      </div>

      {/* Content */}
      <p className="text-gray-600 mb-4 leading-relaxed">
        {suggestion?.content || "No description available."}
      </p>

      {/* Impact */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 font-medium">Impact:</span>
          <span className="text-sm text-gray-800">
            {typeof suggestion?.impactScore === "number"
              ? suggestion.impactScore.toFixed(2)
              : "N/A"}
          </span>
        </div>

        {/* Feedback */}
        {!feedbackGiven ? (
          <div className="flex space-x-2">
            <button
              onClick={() => handleFeedback("helpful")}
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              Helpful
            </button>

            <button
              onClick={() => handleFeedback("not_helpful")}
              disabled={isSubmitting}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              Not Helpful
            </button>
          </div>
        ) : (
          <div className="px-4 py-2 rounded-lg bg-green-100 text-green-800 text-sm font-medium">
            Feedback submitted ✓
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestionCard;
