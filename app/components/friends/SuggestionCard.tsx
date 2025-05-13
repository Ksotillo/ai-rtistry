"use client";

import { CheckCircle } from "lucide-react";
import { Suggestion } from "@/app/types";
import { animations } from "@/app/utils/constants";
import UserAvatar from "../ui/UserAvatar";

type SuggestionCardProps = {
    suggestion: Suggestion;
    onFollowUser: (id: number) => void;
};

export default function SuggestionCard({ suggestion, onFollowUser }: SuggestionCardProps) {
    return (
        <div
            className={`flex items-center justify-between p-3 border rounded-lg hover:shadow-sm transition-all duration-300 ${animations.fadeIn} hover:translate-y-[-2px]`}
        >
            <div className="flex items-center">
                <UserAvatar user={suggestion.user} size="md" />
                <div className="ml-3">
                    <h4 className="font-medium">{suggestion.user.name}</h4>
                    <p className="text-gray-500 text-sm">@{suggestion.user.username}</p>
                </div>
            </div>
            <button
                onClick={() => onFollowUser(suggestion.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
                    suggestion.followed
                        ? "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700"
                        : "bg-black text-white hover:bg-gray-800 hover:shadow-lg"
                }`}
            >
                {suggestion.followed ? (
                    <span className="flex items-center">
                        <CheckCircle size={16} className="mr-1" />
                        Followed
                    </span>
                ) : (
                    "Follow"
                )}
            </button>
        </div>
    );
} 