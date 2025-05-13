"use client";

import { X } from "lucide-react";
import { Suggestion } from "@/app/types";
import SuggestionCard from "./SuggestionCard";

type SuggestionsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    suggestions: Suggestion[];
    onFollowUser: (id: number) => void;
};

export default function SuggestionsModal({ isOpen, onClose, suggestions, onFollowUser }: SuggestionsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-5 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold">Recommended AI Artists to Follow</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black cursor-pointer"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-5 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {suggestions.map((suggestion) => (
                            <SuggestionCard
                                key={suggestion.id}
                                suggestion={suggestion}
                                onFollowUser={onFollowUser}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 