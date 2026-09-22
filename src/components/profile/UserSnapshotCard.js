import React from "react";

export default function UserSnapshotCard({ user }) {
  return (
    <div className="bg-white rounded-3xl p-5 flex items-center gap-4 shadow-sm">
      <div className="relative w-16 h-16 rounded-full overflow-hidden border border-slate-100">
        <img
          src={user.image || "/avatar.png"}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-900">{user.name}</h2>
        <p className="text-sm text-slate-400">{user.email}</p>
      </div>
    </div>
  );
}