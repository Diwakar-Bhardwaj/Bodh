"use client";

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


// Helper component to render star ratings dynamically
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};


const RatingTable = () => {
  const [rating, setRating] = useState([]);

  const fetchRating = async () => {
    try {
      const res = await fetch("/api/admin/rating");

      const result = await res.json();

      if (result.success) {
        setRating(result.data);
      }
      else toast.error(result.message);
    } catch (error) {
      console.log("Failed to laod rating : ", error);
      toast.error("Check your internet connection");
    }
  }

  useEffect(() => {
    fetchRating();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Dashboard Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Customer Rating</h2>
          <p className="text-sm text-gray-500 mt-1">Monitor ratings, sentiment, and user experience issues.</p>
        </div>

        {/* Master Wrapper */}
        <div className="overflow-hidden bg-white shadow-xs sm:rounded-xl border border-gray-200">

          {/* 1. Desktop View (Full Analytics Table Layout) */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-1/6 px-6 py-4 font-semibold text-gray-900">User</th>
                  <th className="w-28 px-6 py-4 font-semibold text-gray-900">Rating</th>
                  <th className="w-1/3 px-6 py-4 font-semibold text-gray-900">Review</th>
                  <th className="w-24 px-6 py-4 font-semibold text-gray-900 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {rating.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors align-top">
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 truncate">{item.name}</div>
                      <div className="text-xs text-gray-400 truncate mt-0.5">{item.email}</div>
                    </td>
                    {/* Rating */}
                    <td className="px-6 py-4">
                      <StarRating rating={item.rating} />
                    </td>
                    {/* Message */}
                    <td className="px-6 py-4 text-gray-600 whitespace-normal break-words leading-relaxed">
                      {item.review_text ? (
                        item.review_text
                      ) : (
                        <span className="text-gray-400 italic text-xs">No extra thoughts shared</span>
                      )}
                    </td>
                    {/* Date */}
                    <td className="px-6 py-4 text-gray-400 text-xs text-right whitespace-nowrap">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. Mobile & Tablet View (Modern Feedback Feed Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden p-4 bg-gray-50/50">
            {rating.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-xl shadow-xs border border-gray-200 flex flex-col gap-3.5">

                {/* User details Header */}
                <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{item.email}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                    {new Date(item.created_at).toLocaleString()}
                  </span>
                </div>

                {/* Meta details (Rating & Tags) */}
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-100/70">
                  <StarRating rating={item.rating} />
                </div>

                {/* Content text */}
                <div>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-normal break-words">
                    {/* ✅ FIXED: Changed item.message/item.review_text logic to render safely on mobile */}
                    {item.review_text ? (
                      item.review_text
                    ) : (
                      <span className="text-gray-400 italic text-xs">No extra thoughts shared</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default RatingTable;