"use client";

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


// Component to dynamically color-code the experience ratings
const ExperienceBadge = ({ rating }) => {
  const styles = {
    'Excellent': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Good': 'bg-green-50 text-green-700 border-green-200',
    'Okay': 'bg-amber-50 text-amber-700 border-amber-200',
    'Bad': 'bg-orange-50 text-orange-700 border-orange-200',
    'Very Bad': 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${styles[rating] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
      {rating}
    </span>
  );
};

const BodhFeedbackTable = () => {
  const [feedback, setFeedback] = useState([]);
  
  const fetchFeedback = async () => {
    try {
      const res = await fetch("/api/admin/feedback");

      const result = await res.json();

      if(result.success) {
        setFeedback(result.data);
      }
      else toast.error(result.message);

    } catch (error) {
      console.log("failed to load feedback : ", error);
      toast.error("Check your internet connection");
    }
  }

  useEffect(() => {
    fetchFeedback();
  }, [])
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Bodh Feedback Header */}
        <div className="mb-6 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Bodh User Feedback</h2>
          <p className="text-sm text-gray-500 mt-1">
            "Your feedback helps us improve Bodh and serve you better"
          </p>
        </div>

        {/* Layout Container */}
        <div className="overflow-hidden bg-white shadow-xs sm:rounded-xl border border-gray-200">
          
          {/* 1. Desktop Layout (Table) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-1/4 px-6 py-4 font-semibold text-gray-900">User</th>
                  <th className="w-40 px-6 py-4 font-semibold text-gray-900">Experience</th>
                  <th className="w-2/5 px-6 py-4 font-semibold text-gray-900">Comments</th>
                  <th className="w-28 px-6 py-4 font-semibold text-gray-900 text-right">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {feedback.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors align-top">
                    {/* User Identity */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 truncate">{item.name}</div>
                      <div className="text-xs text-gray-400 truncate mt-0.5">{item.email}</div>
                    </td>
                    {/* Experience Level */}
                    <td className="px-6 py-4">
                      <ExperienceBadge rating={item.experience} />
                    </td>
                    {/* Optional Comment */}
                    <td className="px-6 py-4 text-gray-600 whitespace-normal break-words leading-relaxed">
                      {item.comment ? (
                        item.comment
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

          {/* 2. Mobile Layout (Cards) */}
          <div className="grid grid-cols-1 gap-4 md:hidden p-4 bg-gray-50/50">
            {feedback.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-xl shadow-xs border border-gray-200 flex flex-col gap-3">
                
                {/* Mobile Header */}
                <div className="flex justify-between items-start border-b border-gray-100 pb-2.5">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{item.email}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">
                    {new Date(item.created_at).toLocaleString()}
                  </span>
                </div>
                
                {/* Mobile Experience Level */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400 font-medium">Experience:</span>
                  <ExperienceBadge rating={item.experience} />
                </div>
                
                {/* Mobile Comments Block */}
                <div className="mt-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    User Thoughts
                  </span>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 leading-relaxed whitespace-normal break-words">
                    {item.comment ? item.comment : "No optional feedback provided."}
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

export default BodhFeedbackTable;
