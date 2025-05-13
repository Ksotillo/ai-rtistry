"use client";

import { Heart, MessageSquare, Eye } from "lucide-react";
import { Post, User } from "@/app/types";
import { animations } from "@/app/utils/constants";
import AvatarImage from "../ui/AvatarImage";

type PostCardProps = {
    post: Post & { comments?: { user: User; text: string; timeAgo: string }[] };
    currentUser: User;
    likedPosts: number[];
    activeCommentInput: number | null;
    openDropdownId: number | null;
    onLikeToggle: (id: number) => void;
    onCommentToggle: (id: number) => void;
    onDropdownToggle: (id: number) => void;
    onCommentSubmit: (id: number) => void;
    onSavePost: (id: number) => void;
    onHidePost: (id: number) => void;
    onReportPost: (id: number) => void;
    commentText: string;
    setCommentText: (text: string) => void;
};

export default function PostCard({
    post,
    currentUser,
    likedPosts,
    activeCommentInput,
    openDropdownId,
    onLikeToggle,
    onCommentToggle,
    onDropdownToggle,
    onCommentSubmit,
    onSavePost,
    onHidePost,
    onReportPost,
    commentText,
    setCommentText,
}: PostCardProps) {
    return (
        <div
            className={`rounded-xl overflow-hidden ${animations.fadeIn} ${
                post.id % 4 === 0
                    ? "bg-[#ffe8d9]"
                    : post.id % 3 === 0
                    ? "bg-[#daffee]"
                    : post.id % 2 === 0
                    ? "bg-[#fff5df]"
                    : "bg-[#dfebff]"
            }`}
        >
            <div className="p-3 sm:p-4">
                <div className="flex justify-between mb-4">
                    <div className="flex">
                        <AvatarImage
                            src={post.user.avatar}
                            alt={post.user.name}
                            width={40}
                            height={40}
                            className="rounded-full mr-2 sm:mr-3 w-8 h-8 sm:w-10 sm:h-10"
                        />
                        <div>
                            <h4 className="font-bold text-sm sm:text-base">{post.user.name}</h4>
                            <p className="text-gray-500 text-xs sm:text-sm">{post.timeAgo}</p>
                        </div>
                    </div>
                    <div className="relative">
                        <button className="text-gray-400 cursor-pointer" onClick={() => onDropdownToggle(post.id)}>
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="6" r="2" />
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="12" cy="18" r="2" />
                            </svg>
                        </button>

                        {openDropdownId === post.id && (
                            <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg py-2 w-48 z-10">
                                <button
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => onSavePost(post.id)}
                                >
                                    Save post
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => onHidePost(post.id)}
                                >
                                    Hide post
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => onReportPost(post.id)}
                                >
                                    Report post
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-sm sm:text-base">
                        {post.content}
                        {post.mentions &&
                            post.mentions.map((mention, idx) => (
                                <span key={idx}>
                                    {idx > 0 && ", "}
                                    <a href="#" className="ml-1 font-semibold text-blue-600 hover:underline cursor-pointer">
                                        {mention.name}
                                    </a>
                                </span>
                            ))}
                        {post.mentions && "!"}
                    </p>

                    {post.prompt && (
                        <div className="mt-2 p-3 bg-black/5 rounded-lg">
                            <p className="text-xs sm:text-sm font-medium mb-1">Prompt:</p>
                            <p className="text-xs sm:text-sm text-gray-700">{post.prompt}</p>
                            {post.model && (
                                <div className="mt-1 flex items-center">
                                    <span className="text-xs text-gray-500">Model: {post.model}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {post.images && post.images.length > 0 && (
                    <div
                        className={`grid ${
                            post.images.length === 1
                                ? "grid-cols-1"
                                : post.images.length === 2
                                ? "grid-cols-2"
                                : "grid-cols-2 sm:grid-cols-3"
                        } gap-2 mb-4`}
                    >
                        {post.images.map((img, idx) => (
                            <div
                                key={idx}
                                className={`${
                                    post.images.length > 2 && idx === 2 ? "hidden sm:block" : ""
                                } rounded-lg overflow-hidden h-36 sm:h-56 relative`}
                            >
                                <AvatarImage src={img} alt="Post image" fill className="object-cover" />
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                    <div className="flex items-center mr-3 sm:mr-6">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span>{post.likes}</span>
                    </div>

                    <button
                        className={`flex items-center mr-3 sm:mr-6 cursor-pointer ${likedPosts.includes(post.id) ? "text-red-500" : ""}`}
                        onClick={() => onLikeToggle(post.id)}
                    >
                        <Heart className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                        <span>Like</span>
                    </button>

                    <button
                        className={`flex items-center cursor-pointer ${activeCommentInput === post.id ? "text-blue-500" : ""}`}
                        onClick={() => onCommentToggle(post.id)}
                    >
                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        <span>Comment</span>
                    </button>
                </div>

                {post.comments && post.comments.length > 0 && (
                    <div className="mt-4">
                        <h5 className="text-sm font-semibold mb-3">Comments</h5>
                        <div className="space-y-3">
                            {post.comments.map((comment, idx) => (
                                <div key={idx} className="flex">
                                    <AvatarImage
                                        src={comment.user.avatar}
                                        alt={comment.user.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full mr-2 w-7 h-7"
                                    />
                                    <div className="bg-white rounded-xl p-2 flex-1">
                                        <div className="flex justify-between">
                                            <h6 className="text-xs font-semibold">{comment.user.name}</h6>
                                            <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                                        </div>
                                        <p className="text-xs mt-1">{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeCommentInput === post.id && (
                    <div className="mt-4">
                        <AvatarImage
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            width={32}
                            height={32}
                            className="rounded-full mr-2 w-8 h-8 inline-block"
                        />
                        <div className="inline-flex flex-1 w-[calc(100%-40px)]">
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                className="flex-1 bg-white border border-gray-200 rounded-l-full px-4 py-2 text-gray-700 focus:outline-none text-sm"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && onCommentSubmit(post.id)}
                            />
                            <button
                                className="bg-black text-white px-4 rounded-r-full flex items-center text-sm cursor-pointer"
                                onClick={() => onCommentSubmit(post.id)}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 