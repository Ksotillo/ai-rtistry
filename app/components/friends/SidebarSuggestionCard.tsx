"use client";

import { Suggestion } from "@/app/types";
import UserAvatar from "../ui/UserAvatar";

type SidebarSuggestionCardProps = {
    suggestion: Suggestion;
    onFollowUser: (id: number) => void;
};

export default function SidebarSuggestionCard({ suggestion, onFollowUser }: SidebarSuggestionCardProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <UserAvatar user={suggestion.user} size="md" />
                <div className="max-w-[120px] ml-3">
                    <h4 className="font-medium truncate">{suggestion.user.name}</h4>
                    <p className="text-gray-500 text-sm truncate">@{suggestion.user.username}</p>
                </div>
            </div>
            <button
                onClick={() => onFollowUser(suggestion.id)}
                className={`px-3 py-1 text-xs rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    suggestion.followed
                        ? "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700"
                        : "bg-black text-white hover:bg-gray-800 hover:shadow-lg"
                }`}
            >
                {suggestion.followed ? "Followed" : "Follow"}
            </button>
        </div>
    );
} 