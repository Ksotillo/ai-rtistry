"use client";

import { useState, useRef } from "react";
import { toast } from "react-toastify";
import AvatarImage from "../ui/AvatarImage";
import { User } from "@/app/types";

type SettingsProps = {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  onDeleteAccount: () => void;
  showDeleteModal: boolean;
  setShowDeleteModal: (show: boolean) => void;
};

export default function Settings({
  currentUser,
  setCurrentUser,
  onDeleteAccount,
  showDeleteModal,
  setShowDeleteModal
}: SettingsProps) {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedUsername, setEditedUsername] = useState("");
  const [editedBio, setEditedBio] = useState("Product Designer and Developer based in New York");
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement>(null);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = () => {
    if (!editedName.trim() || !editedUsername.trim()) {
      toast.error("Name and username cannot be empty", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setCurrentUser({
      ...currentUser,
      name: editedName,
      username: editedUsername,
      avatar: profileImagePreview || currentUser.avatar,
    });

    setEditMode(false);
    toast.success("Profile updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedName(currentUser.name);
    setEditedUsername(currentUser.username);
    setProfileImagePreview(null);
  };

  const handleDeleteAccount = () => {
    onDeleteAccount();
  };

  // Initialize form values when currentUser changes
  useState(() => {
    setEditedName(currentUser.name);
    setEditedUsername(currentUser.username);
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
        <div>
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-all duration-200 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21h-9.5A2.25 2.25 0 014 18.75V8.25A2.25 2.25 0 016.25 6H11"
                />
              </svg>
              Edit
            </button>
          ) : null}
        </div>
      </div>

      <div className="py-6">
        {editMode ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center mb-6">
              <div
                className="relative w-32 h-32 mb-3 rounded-full overflow-hidden cursor-pointer border border-gray-200 group"
                onClick={() => profileImageInputRef.current?.click()}
              >
                <AvatarImage
                  src={profileImagePreview || currentUser.avatar}
                  alt={currentUser.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-500">Click to change profile photo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 border border-r-0 border-gray-200 rounded-l-lg">
                    @
                  </span>
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Artist Bio</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                rows={4}
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
              />
              <p className="mt-2 text-xs text-gray-500">
                Briefly describe your artistic style and AI tools you use
              </p>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-200 cursor-pointer"
                onClick={handleSaveProfile}
              >
                Save Changes
              </button>
              <button
                className="bg-white text-gray-700 border border-gray-200 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="relative w-28 h-28 md:mr-8 mx-auto md:mx-0 mb-4 md:mb-0">
                <AvatarImage
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h3
                  className="text-xl font-bold mb-1 group transition-all duration-300 cursor-pointer"
                >
                  <span className="relative inline-block">
                    {currentUser.name}
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-400 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-clip-text text-transparent pointer-events-none">
                      {currentUser.name}
                    </span>
                  </span>
                </h3>
                <p className="text-gray-500 mb-2">@{currentUser.username}</p>
                <span className="inline-block bg-[#f4f1f2] text-gray-700 px-3 py-1 rounded-full text-sm">
                  AI Artist
                </span>
              </div>
            </div>

            <div className="bg-[#f4f1f2] rounded-xl p-4">
              <h4 className="text-sm font-medium mb-2">Artist Bio</h4>
              <p className="text-gray-700">{editedBio}</p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-semibold mb-4">Account Information</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <h5 className="text-sm text-gray-500 mb-1">Email</h5>
                  <p className="font-medium">{currentUser.username}@example.com</p>
                </div>

                <div>
                  <h5 className="text-sm text-gray-500 mb-1">Account Created</h5>
                  <p className="font-medium">January 15, 2023</p>
                </div>

                <div>
                  <h5 className="text-sm text-gray-500 mb-1">Last Login</h5>
                  <p className="font-medium">Today</p>
                </div>

                <div>
                  <h5 className="text-sm text-gray-500 mb-1">Account Type</h5>
                  <p className="font-medium">Creator</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-10">
        <div className="pb-4 border-b border-gray-100">
          <h3 className="text-xl font-semibold">Preferences</h3>
        </div>

        <div className="py-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100">
              <div className="mb-3 sm:mb-0">
                <h4 className="font-medium mb-1">Email Notifications</h4>
                <p className="text-sm text-gray-500">Receive email updates about your account</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&apos;&apos;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="mb-3 sm:mb-0">
                <h4 className="font-medium mb-1">Show AI Model Information</h4>
                <p className="text-sm text-gray-500">Display AI model information with your artworks</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&apos;&apos;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="pb-4 border-b border-gray-100">
          <h3 className="text-xl font-semibold">Privacy & Security</h3>
        </div>

        <div className="py-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100">
              <div className="mb-3 sm:mb-0">
                <h4 className="font-medium mb-1">Private Account</h4>
                <p className="text-sm text-gray-500">Only approved followers can see your posts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&apos;&apos;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100">
              <div className="mb-3 sm:mb-0">
                <h4 className="font-medium mb-1">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&apos;&apos;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="mb-3 sm:mb-0">
                <h4 className="font-medium mb-1">Activity Status</h4>
                <p className="text-sm text-gray-500">Let other artists know when you're active</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&apos;&apos;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center border-t border-gray-100 pt-6">
        <button
          onClick={handleDeleteAccount}
          className="text-gray-500 hover:text-red-600 text-sm font-medium transition-colors duration-200 cursor-pointer"
        >
          Delete Account
        </button>
      </div>

      <input type="file" ref={profileImageInputRef} className="hidden" accept="image/*" onChange={handleProfileImageChange} />
      
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Delete Account</h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 