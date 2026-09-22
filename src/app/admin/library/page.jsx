

"use client";
import React, { useState, useEffect } from "react";
import { BookOpen, Check } from "lucide-react";

export default function AdminDashboard() {
  const [mode, setMode] = useState("book");
  const [booksList, setBooksList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // Tracks the currently active book for chapters

  const [bookData, setBookData] = useState({ title: "", slug: "", imageUrl: "", desc: "", countLabel: "" });
  const [chapData, setChapData] = useState({ num: "", title: "", slug: "", content: "" });

  // Load existing books list from the database
  const fetchBooks = () => {
    fetch("/api/library")
      .then((res) => res.json())
      .then((data) => {
        if (data.books) setBooksList(data.books);
      })
      .catch((err) => console.error("Error fetching books:", err));
  };

  useEffect(() => {
    fetchBooks();
  }, [mode]);

  const handleAddBook = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/library", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "book",
        title: bookData.title,
        slug: bookData.slug,
        imageUrl: bookData.imageUrl,
        description: bookData.desc,
        countLabel: bookData.countLabel
      }),
    });
    if (res.ok) {
      alert("Book Saved successfully!");
      setBookData({ title: "", slug: "", imageUrl: "", desc: "", countLabel: "" });
      fetchBooks();
    }
  };

  const handleAddChapter = async (e) => {
    e.preventDefault();
    if (!selectedBook) {
      alert("Please select a book from the list first.");
      return;
    }

    const res = await fetch("/api/admin/library", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "chapter",
        bookId: selectedBook.id, // Sends selected book's database ID
        chapterNumber: chapData.num,
        title: chapData.title,
        slug: chapData.slug,
        content: chapData.content
      }),
    });
    if (res.ok) {
      alert(`Chapter Added to ${selectedBook.title}!`);
      setChapData({ num: "", title: "", slug: "", content: "" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 max-w-md mx-auto space-y-4">
      {/* Tab Navigation */}
      <div className="flex bg-white p-1.5 rounded-xl border border-slate-200 gap-2">
        <button onClick={() => setMode("book")} className={`flex-1 py-2 text-xs font-bold rounded-lg ${mode === "book" ? "bg-blue-900 text-white" : "text-slate-500"}`}>+ Create Book</button>
        <button onClick={() => setMode("chapter")} className={`flex-1 py-2 text-xs font-bold rounded-lg ${mode === "chapter" ? "bg-blue-900 text-white" : "text-slate-500"}`}>+ Add Chapter</button>
      </div>

      {/* MODE 1: CREATE A BOOK */}
      {mode === "book" ? (
        <form onSubmit={handleAddBook} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
          <h2 className="font-black text-sm text-slate-800">Create New Book</h2>
          <input type="text" placeholder="Title (e.g., Ramayan)" required className="w-full bg-slate-50 border-0 rounded-xl p-3 text-xs" value={bookData.title} onChange={e => setBookData({ ...bookData, title: e.target.value })} />
          <input type="text" placeholder="Slug (e.g., ramayan)" required className="w-full bg-slate-50 border-0 rounded-xl p-3 text-xs" value={bookData.slug} onChange={e => setBookData({ ...bookData, slug: e.target.value })} />
          <input
            type="text"
            placeholder="Image Path URL (e.g., /images/bhagavad-gita.png)"
            className="w-full bg-slate-50 border-0 rounded-xl p-3 text-xs"
            value={bookData.imageUrl}
            onChange={e => setBookData({ ...bookData, imageUrl: e.target.value })}
          />
          <input type="text" placeholder="Description Text..." className="w-full bg-slate-50 border-0 rounded-xl p-3 text-xs" value={bookData.desc} onChange={e => setBookData({ ...bookData, desc: e.target.value })} />
          <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold text-xs">Publish Book</button>
        </form>
      ) : (
        /* MODE 2: ADD CHAPTER */
        <div className="space-y-4">

          {/* STEP 1: Select Book List Area */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wide">1. Select Target Book ({booksList.length})</h3>
            <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
              {booksList.length === 0 ? (
                <p className="text-xs text-slate-400 font-medium">No books available. Create a book first.</p>
              ) : (
                booksList.map((book) => {
                  const isSelected = selectedBook?.id === book.id;
                  return (
                    <div
                      key={book.id}
                      onClick={() => setSelectedBook(book)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${isSelected ? "border-blue-600 bg-blue-50/60" : "border-slate-100 bg-slate-50 hover:bg-slate-100"}`}
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} className={isSelected ? "text-blue-900" : "text-slate-400"} />
                        <span className={`font-bold ${isSelected ? "text-blue-900" : "text-slate-700"}`}>{book.title}</span>
                      </div>
                      {isSelected ? (
                        <span className="flex items-center gap-1 text-[10px] bg-blue-900 text-white font-bold px-2 py-0.5 rounded-full"><Check size={10} /> Active</span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 hover:text-slate-600">Select</span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* STEP 2: Input Fields for Chapter Content */}
          <form onSubmit={handleAddChapter} className={`bg-white p-5 rounded-2xl border border-slate-200 space-y-3 transition-opacity ${!selectedBook ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
            <div className="flex justify-between items-center">
              <h2 className="font-black text-sm text-slate-800">2. Add Chapter Details</h2>
              {selectedBook && <span className="text-[11px] bg-slate-100 px-2.5 py-1 rounded-md text-slate-700 font-bold">Target: {selectedBook.title}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-slate-400 pl-1 uppercase">Chapter Index Number</span>
              <input type="number" placeholder="e.g., 1" required className="w-full bg-slate-50 border-0 rounded-xl p-3 text-xs font-bold" value={chapData.num} onChange={e => setChapData({ ...chapData, num: e.target.value })} />
            </div>

            <input type="text" placeholder="Chapter Title" required className="w-full bg-slate-50 border-0 rounded-xl p-3 text-xs" value={chapData.title} onChange={e => setChapData({ ...chapData, title: e.target.value })} />
            <input type="text" placeholder="Chapter Slug (e.g., chapter-1)" required className="w-full bg-slate-50 border-0 rounded-xl p-3 text-xs" value={chapData.slug} onChange={e => setChapData({ ...chapData, slug: e.target.value })} />
            <textarea placeholder="Write or paste your full chapter text content here..." required rows={5} className="w-full bg-slate-50 border-0 rounded-xl p-3 text-xs font-medium" value={chapData.content} onChange={e => setChapData({ ...chapData, content: e.target.value })} />

            <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold text-xs shadow-md shadow-blue-900/10 hover:bg-blue-950">Publish Chapter Content</button>
          </form>

        </div>
      )}
    </div>
  );
}