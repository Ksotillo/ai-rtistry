"use client";

import { useState, useRef } from "react";
import { ImageIcon, MapPin, Send, X } from "lucide-react";
import { Post, User } from "@/app/types";
import { toast } from "react-toastify";
import { animations, fonts } from "@/app/utils/constants";
import PostCard from "../posts/PostCard";
import UserAvatar from "../ui/UserAvatar";
import AvatarImage from "../ui/AvatarImage";

type NewsFeedProps = {
    currentUser: User;
    posts: Post[];
    likedPosts: number[];
    activeCommentInput: number | null;
    openDropdownId: number | null;
    commentText: string;
    activeFeedFilter: string;
    onFeedFilterChange: (filter: string) => void;
    onLikeToggle: (id: number) => void;
    onCommentToggle: (id: number) => void;
    onDropdownToggle: (id: number) => void;
    onCommentSubmit: (id: number) => void;
    onSavePost: (id: number) => void;
    onHidePost: (id: number) => void;
    onReportPost: (id: number) => void;
    setCommentText: (text: string) => void;
    onPostSubmit: (postText: string, promptText: string, selectedModel: string, selectedImages: string[], selectedLocation: string | null) => void;
};

export default function NewsFeed({
    currentUser,
    posts,
    likedPosts,
    activeCommentInput,
    openDropdownId,
    commentText,
    activeFeedFilter,
    onFeedFilterChange,
    onLikeToggle,
    onCommentToggle,
    onDropdownToggle,
    onCommentSubmit,
    onSavePost,
    onHidePost,
    onReportPost,
    setCommentText,
    onPostSubmit,
}: NewsFeedProps) {
    // Post creation state
    const [postText, setPostText] = useState("");
    const [promptText, setPromptText] = useState("");
    const [selectedModel, setSelectedModel] = useState("midjourney");
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
    const [showPromptInput, setShowPromptInput] = useState(false);
    const [showLocationInput, setShowLocationInput] = useState(false);
    const [locationInput, setLocationInput] = useState("");
    
    const imageInputRef = useRef<HTMLInputElement>(null);
    const locationInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            setSelectedImages([...selectedImages, ...newImages]);
            toast.success(`${newImages.length} image${newImages.length > 1 ? "s" : ""} selected!`, {
                position: "top-right",
                autoClose: 2000,
            });
        }
    };

    const handleTogglePromptInput = () => {
        setShowPromptInput(!showPromptInput);
    };

    const handleToggleLocationInput = () => {
        setShowLocationInput(true);
        setIsLocationPickerOpen(!isLocationPickerOpen);

        if (!showLocationInput) {
            setTimeout(() => {
                locationInputRef.current?.focus();
            }, 100);
        }
    };

    const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocationInput(e.target.value);
    };

    const handleLocationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (locationInput.trim()) {
            handleLocationSelect(locationInput);
        }
    };

    const handleLocationSelect = (location: string) => {
        setSelectedLocation(location);
        setIsLocationPickerOpen(false);
        setShowLocationInput(false);
        setLocationInput("");
        toast.info(`Location set to: ${location}`, {
            position: "top-right",
            autoClose: 2000,
        });
    };

    const clearSelectedItems = () => {
        setSelectedImages([]);
        setSelectedLocation(null);
    };

    const handlePostSubmit = () => {
        if (!postText.trim() && selectedImages.length === 0) {
            toast.error("Please write something or add an image to share", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        // Call the parent component's post submission handler
        onPostSubmit(postText, promptText, selectedModel, selectedImages, selectedLocation);

        // Clear form
        setPostText("");
        setPromptText("");
        clearSelectedItems();
    };

    return (
        <div className="p-6">
            {/* Feed header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ fontFamily: fonts.heading }}>
                    Feed
                </h2>

                <div className="flex">
                    <button
                        onClick={() => onFeedFilterChange("recents")}
                        className={`cursor-pointer mr-6 transition-all duration-200 relative ${
                            activeFeedFilter === "recents"
                                ? "text-black font-semibold"
                                : "text-gray-500 hover:text-gray-800"
                        }`}
                    >
                        Recent
                        {activeFeedFilter === "recents" && (
                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black rounded-full animate-fadeIn"></span>
                        )}
                    </button>
                    <button
                        onClick={() => onFeedFilterChange("friends")}
                        className={`cursor-pointer mr-6 transition-all duration-200 relative ${
                            activeFeedFilter === "friends"
                                ? "text-black font-semibold"
                                : "text-gray-500 hover:text-gray-800"
                        }`}
                    >
                        Artists I Follow
                        {activeFeedFilter === "friends" && (
                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black rounded-full animate-fadeIn"></span>
                        )}
                    </button>
                    <button
                        onClick={() => onFeedFilterChange("popular")}
                        className={`cursor-pointer transition-all duration-200 relative ${
                            activeFeedFilter === "popular"
                                ? "text-black font-semibold"
                                : "text-gray-500 hover:text-gray-800"
                        }`}
                    >
                        Trending
                        {activeFeedFilter === "popular" && (
                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black rounded-full animate-fadeIn"></span>
                        )}
                    </button>
                </div>
            </div>

            {/* Post creation form */}
            <div className={`bg-[#f4f1f2] rounded-xl p-4 mb-6 ${animations.fadeIn}`}>
                <div className="relative flex items-center">
                    <div className="absolute left-0 z-10">
                        <UserAvatar user={currentUser} size="sm" />
                    </div>
                    <input
                        type="text"
                        placeholder="Share your AI artwork..."
                        className="flex-1 bg-white rounded-full py-2 pl-16 pr-12 text-gray-700 focus:outline-none focus:ring-1 focus:ring-black transition-all duration-200"
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                    />
                </div>

                {showPromptInput && (
                    <div className={`mt-3 ${animations.slideUp}`}>
                        <textarea
                            placeholder="Enter your prompt here..."
                            className="w-full bg-white rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-black border border-gray-200 min-h-24 transition-all duration-200"
                            value={promptText}
                            onChange={(e) => setPromptText(e.target.value)}
                        />
                        <div className="mt-2 flex items-center">
                            <span className="text-sm text-gray-600 mr-2">AI Model:</span>
                            <select
                                className="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all duration-200"
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                            >
                                <option value="midjourney">Midjourney</option>
                                <option value="dalle">DALL-E</option>
                                <option value="stable-diffusion">Stable Diffusion</option>
                                <option value="leonardo">Leonardo</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                )}

                {selectedImages.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                        {selectedImages.map((img, idx) => (
                            <div key={idx} className="relative rounded-lg h-24 overflow-hidden">
                                <AvatarImage
                                    src={img}
                                    alt="Selected image"
                                    width={96}
                                    height={144}
                                    className="object-cover"
                                />
                                <button
                                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                                    onClick={() => setSelectedImages(selectedImages.filter((_, i) => i !== idx))}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {selectedLocation && (
                    <div className="mt-3 flex items-center bg-white rounded-full px-3 py-2 text-sm">
                        <MapPin className="text-gray-500 w-4 h-4 mr-2" />
                        <span className="text-gray-700">{selectedLocation}</span>
                        <button className="ml-auto text-gray-500 cursor-pointer" onClick={() => setSelectedLocation(null)}>
                            <X size={14} />
                        </button>
                    </div>
                )}

                {showLocationInput && !selectedLocation && (
                    <div className="mt-3">
                        <form onSubmit={handleLocationSubmit} className="flex">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    ref={locationInputRef}
                                    type="text"
                                    className="bg-white w-full pl-10 pr-4 py-2 border border-gray-200 rounded-l-lg focus:outline-none"
                                    placeholder="Enter your location"
                                    value={locationInput}
                                    onChange={handleLocationInputChange}
                                />
                            </div>
                            <button type="submit" className="bg-gray-800 text-white px-4 rounded-r-lg cursor-pointer">
                                Add
                            </button>
                        </form>
                    </div>
                )}

                {isLocationPickerOpen && !selectedLocation && (
                    <div className="mt-3 bg-white rounded-lg shadow-lg p-3">
                        <h4 className="text-sm font-semibold mb-2">Popular locations:</h4>
                        <div className="space-y-2">
                            {["New York, USA", "London, UK", "Tokyo, Japan", "Sydney, Australia", "Paris, France"].map(
                                (location) => (
                                    <button
                                        key={location}
                                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg flex items-center cursor-pointer"
                                        onClick={() => handleLocationSelect(location)}
                                    >
                                        <MapPin className="text-gray-500 w-4 h-4 mr-2" />
                                        {location}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                )}

                <div className="flex mt-4 justify-between flex-wrap">
                    <div className="flex space-x-2 sm:space-x-4 mb-2 sm:mb-0">
                        <button
                            className="flex items-center text-gray-600 text-sm sm:text-base cursor-pointer transition-all duration-200 hover:text-black transform active:scale-95"
                            onClick={() => imageInputRef.current?.click()}
                        >
                            <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                            <span>Add Art</span>
                        </button>
                        <button
                            className="flex items-center text-gray-600 text-sm sm:text-base cursor-pointer transition-all duration-200 hover:text-black transform active:scale-95"
                            onClick={handleTogglePromptInput}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                />
                            </svg>
                            <span>{showPromptInput ? "Hide Prompt" : "Add Prompt"}</span>
                        </button>
                        <button
                            className="flex items-center text-gray-600 text-sm sm:text-base cursor-pointer transition-all duration-200 hover:text-black transform active:scale-95"
                            onClick={handleToggleLocationInput}
                        >
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                            <span>Location</span>
                        </button>
                    </div>
                    <div className="flex items-center">
                        <select className="mr-3 text-sm sm:text-base bg-transparent text-gray-500 cursor-pointer focus:outline-none focus:text-black transition-colors duration-200">
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                        <button
                            className="bg-black text-white px-3 sm:px-5 py-1 sm:py-2 rounded-full flex items-center text-sm sm:text-base cursor-pointer transition-all duration-300 hover:bg-gray-800 transform active:scale-95"
                            onClick={handlePostSubmit}
                        >
                            <Send className="w-4 h-4 mr-2" />
                            <span>Share Art</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* File input hidden */}
            <input type="file" ref={imageInputRef} className="hidden" accept="image/*" multiple onChange={handleImageSelect} />
            
            {/* Posts list */}
            <div className="space-y-6">
                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        currentUser={currentUser}
                        likedPosts={likedPosts}
                        activeCommentInput={activeCommentInput}
                        openDropdownId={openDropdownId}
                        onLikeToggle={onLikeToggle}
                        onCommentToggle={onCommentToggle}
                        onDropdownToggle={onDropdownToggle}
                        onCommentSubmit={onCommentSubmit}
                        onSavePost={onSavePost}
                        onHidePost={onHidePost}
                        onReportPost={onReportPost}
                        commentText={commentText}
                        setCommentText={setCommentText}
                    />
                ))}
            </div>
        </div>
    );
} 