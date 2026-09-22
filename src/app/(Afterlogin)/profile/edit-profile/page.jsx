

"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, User, Mail, AtSign, Camera, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormActionButtons from "@/components/FormActionButtons";

export default function EditProfilePage() {

  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const router = useRouter();

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    image: "",
  });

  const [profileImage, setProfileImage] = useState("/avatar.png");

  // FETCH USER DATA
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const res = await fetch("/api/profile");

      const data = await res.json();

      setFormData({
        name: data.name || "",
        email: data.email || "",
        username: data.username || "",
        image: data.image || "",
      });

      setProfileImage(data.image || "/avatar.png");

    } catch (error) {

      console.log("Error fetching profile:", error);
    }
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);

    setProfileImage(previewUrl);
  };

  // OPEN FILE PICKER
  const triggerImageUpload = () => {
    fileInputRef.current.click();
  };

  // BACK BUTTON
  const handleBack = () => {
    window.history.back();
  };

  // SUBMIT UPDATE

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;

      // Upload image to Cloudinary
      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append("file", selectedFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await uploadRes.json();

        // ✅ FIXED: Safely handle upload errors without trapping the button loading state
        if (!uploadRes.ok || !uploadResult.success) {
          toast.error(uploadResult.error || "Image upload failed");
          setLoading(false); // Make sure button unlocked
          return;
        }

        imageUrl = uploadResult.imageUrl;
      }

      // Update profile in MySQL
      const res = await fetch("/api/profile/edit-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          username: formData.username,
          image: imageUrl,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        router.push("/profile");
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };



  return (

    <div className="min-h-screen bg-[#F7F1F3] dark:bg-black dark:text-white text-slate-800 font-sans pb-12">

      {/* Sticky App Header */}
      <div className="bg-[#F7F1F3] dark:bg-black dark:text-white pt-3 px-4 flex items-center max-w-md mx-auto relative">
        <button
          type="button"
          onClick={handleBack}
          className="p-2 hover:bg-slate-200/60 rounded-full transition absolute left-2"
        >
          <ChevronLeft className="w-6 h-6 text-slate-800 dark:text-white" />
        </button>

        <h1 className="text-xl font-bold text-center w-full dark:text-white text-slate-900 tracking-tight">
          Edit Profile
        </h1>

      </div>

      <div className="max-w-md mx-auto px-5 mt-2">

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center text-center my-6">

          <div className="relative w-36 h-36">

            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-200">

              <img
                src={profileImage || "/avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />

            </div>

            {/* HIDDEN FILE INPUT */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            {/* CAMERA BUTTON */}
            <button
              type="button"
              onClick={triggerImageUpload}
              className="absolute bottom-1 right-1 p-2.5 bg-[#0A1D87] text-white rounded-full border-4 border-[#F9F8FA] shadow-md hover:bg-[#071563] active:scale-95 transition"
            >
              <Camera className="w-4 h-4" />
            </button>

          </div>

          <button
            type="button"
            onClick={triggerImageUpload}
            className="mt-3 text-xs font-bold text-[#0A1D87] dark:text-white hover:underline"
          >
            Change Photo
          </button>

        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>

            <h3 className="text-m font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Personal Information
            </h3>

            <div className="space-y-4">

              {/* NAME */}
              <div className="flex items-center bg-white border border-slate-50 rounded-2xl p-2 shadow-sm focus-within:border-[#7B61FF] transition">

                <div className="p-3 bg-[#F0EDFF] text-[#7B61FF] rounded-xl ml-1">
                  <User className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0 px-3 py-1">

                  <label className="block text-[11px] font-semibold text-slate-400">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm font-bold text-slate-800 focus:outline-none pt-0.5"
                  />

                </div>

              </div>

              {/* EMAIL */}
              <div className="flex items-center bg-white border border-slate-50 rounded-2xl p-2 shadow-sm focus-within:border-[#7B61FF] transition">

                <div className="p-3 bg-[#F0EDFF] text-[#7B61FF] rounded-xl ml-1">
                  <Mail className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0 px-3 py-1">

                  <label className="block text-[11px] font-semibold text-slate-400">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm font-bold text-slate-800 focus:outline-none pt-0.5"
                  />

                </div>

              </div>

              {/* USERNAME */}
              <div className="flex items-center bg-white border border-slate-50 rounded-2xl p-2 shadow-sm focus-within:border-[#7B61FF] transition">

                <div className="p-3 bg-[#F0EDFF] text-[#7B61FF] rounded-xl ml-1">
                  <AtSign className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0 px-3 py-1">

                  <label className="block text-[11px] font-semibold text-slate-400">
                    Username (Optional)
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm font-bold text-slate-800 focus:outline-none pt-0.5"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* BUTTONS  of changes and cancel*/}
          <FormActionButtons
            submitText="Save Changes"
            loading={loading}
            onCancel={handleBack}
          />

        </form>

      </div>

    </div>
  );
}