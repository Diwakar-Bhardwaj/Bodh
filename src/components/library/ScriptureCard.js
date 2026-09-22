// import React from 'react';
// import Link from 'next/link';
// import { ChevronRight } from 'lucide-react';

// export default function ScriptureCard({ book }) {
//   return (
//     <Link
//       href={`/library/${book.id}`}
//       className="bg-white  border border-slate-200/50 hover:border-slate-300 p-4 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-all group active:scale-[0.99]"
//     >
//       <div className="flex items-center gap-4">
//         {/* Book Thumbnail Graphic */}
//         <div className={`w-14 h-14 bg-gradient-to-br ${book.bgColor || 'from-amber-500 to-orange-600'} text-white text-xl font-bold rounded-xl flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform`}>
//           {book.icon}
//         </div>
        
//         {/* Meta Descriptions */}
//         <div className="space-y-1">
//           <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-900 transition-colors">
//             {book.title}
//           </h4>
//           <p className="text-[11px] text-slate-400 font-bold tracking-tight">
//             {book.total_chapters} {book.total_chapters === 1 ? 'Chapter' : 'Chapters'}
//           </p>
          
//           {/* Progress Loading Bar */}
//           <div className="w-32 bg-slate-100 h-1 rounded-full overflow-hidden mt-1.5">
//             <div 
//               className="bg-blue-900 h-full rounded-full transition-all duration-300" 
//               style={{ width: `${book.progress || 30}%` }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Navigation Action Arrow */}
//       <div className="p-1 rounded-full bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-blue-900 group-hover:bg-blue-50 transition-all">
//         <ChevronRight size={16} />
//       </div>
//     </Link>
//   );
// }


import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // ✅ Next.js high-performance media wrapper
import { ChevronRight } from 'lucide-react';

export default function ScriptureCard({ book }) {
  const totalChapters = Number(book?.total_chapters || 0);
  const chaptersRead = Number(book?.chapters_read || 0);
  const progressPercent = totalChapters > 0 
    ? Math.min(Math.round((chaptersRead / totalChapters) * 100), 100) 
    : 0;
  return (
    <Link
      href={`/library/${book.id}`}
      className="bg-white border border-slate-100 p-3.5 rounded-2xl flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all active:scale-[0.99] group"
    >
      <div className="flex items-center gap-4">
        
        {/* Professional Image Wrapper Frame */}
        <div className="w-14 h-14 rounded-2xl overflow-hidden relative bg-slate-50 border border-slate-100 shadow-2xs shrink-0">
          <Image
            src={book.image_url || '/images/default-scripture.png'} 
            alt={`${book.title} emblem`}
            fill // Tells Next.js to fill up the parent 14x14 frame bounds completely
            sizes="56px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={book.id <= 3} // Performance boost: prioritizing initial view images
          />
        </div>
        
        {/* Text descriptions blocks layout */}
        <div className="space-y-1">
          <h4 className="text-sm font-black text-slate-900 leading-none group-hover:text-blue-900 transition-colors">
            {book.title}
          </h4>
          
          <p className="text-[11px] text-slate-400 font-bold tracking-tight">
            {book.total_chapters} {book.total_chapters === 1 ? 'Chapter' : 'Chapters'}
          </p>
          
          {/* Bottom horizontal track progress line */}
         <div className="w-28 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
            <div 
              className="bg-[#0A1D87] h-full rounded-full transition-all duration-300" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
        </div>
      </div>

      <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors mr-1" />
    </Link>
  );
}