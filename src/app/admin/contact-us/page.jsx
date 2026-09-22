"use client";

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';



const MessageTable = () => {

  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessage = async () => {

    try {
      const res = await fetch("/api/admin/contact-us");

      const result = await res.json();

      if(result.success) {
        setMessage(result.data);
      }
      else toast.error(result.message);

    } catch (error) {
      console.log("Failed to load message : ", error);
      toast.error("Check your internet connection");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessage();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm font-medium text-slate-500 animate-pulse">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Stored Messages</h2>
          <p className="text-sm text-gray-500 mt-1">Review user submissions, inquiries, and bug reports.</p>
        </div>

        {/* Responsive Container */}
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl border border-gray-200">
          
          {/* 1. Desktop View (Table Layout) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-1/5 px-6 py-4 font-semibold text-gray-900">Sender</th>
                  <th className="w-1/4 px-6 py-4 font-semibold text-gray-900">Subject</th>
                  <th className="w-2/5 px-6 py-4 font-semibold text-gray-900">Message</th>
                  <th className="w-24 px-6 py-4 font-semibold text-gray-900 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {message.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors align-top">
                    {/* Name & Email Column */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 truncate">{item.name}</div>
                      <div className="text-xs text-gray-400 truncate mt-0.5">{item.email}</div>
                    </td>
                    {/* Subject Column */}
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.subject}
                    </td>
                    {/* Message Column - Breaks words cleanly without stretching the layout */}
                    <td className="px-6 py-4 text-gray-600 whitespace-normal break-words leading-relaxed">
                      {item.message}
                    </td>
                    {/* Date Column */}
                    <td className="px-6 py-4 text-gray-400 text-xs text-right whitespace-nowrap">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. Mobile View (Card Layout) */}
          <div className="grid grid-cols-1 gap-4 md:hidden p-4 bg-gray-50/50">
            {message.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-xl shadow-xs border border-gray-200 flex flex-col gap-3">
                {/* Header info */}
                <div className="flex justify-between items-start border-b border-gray-100 pb-2.5">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{item.email}</p>
                  </div>
                  <span className="text-[10px] bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-md whitespace-nowrap">
                    {new Date(item.created_at).toLocaleString()}
                  </span>
                </div>
                
                {/* Content */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Subject</h4>
                  <p className="text-sm font-medium text-gray-900">{item.subject}</p>
                </div>
                
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Message</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 leading-relaxed whitespace-normal break-words">
                    {item.message}
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

export default MessageTable;