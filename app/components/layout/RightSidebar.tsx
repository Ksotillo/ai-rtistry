"use client";

import { Recommendation, Story, Suggestion } from "@/app/types";
import Image from "next/image";
import Stories from "../sections/Stories";
import SidebarSuggestionCard from "../friends/SidebarSuggestionCard";

type RightSidebarProps = {
    stories: Story[];
    suggestions: Suggestion[];
    recommendations?: Recommendation[];
    onStoryClick: (story: Story) => void;
    onOpenSuggestions: () => void;
    onFollowUser: (id: number) => void;
};

export default function RightSidebar({ 
    stories,
    suggestions,
    recommendations = [],
    onStoryClick, 
    onOpenSuggestions,
    onFollowUser
}: RightSidebarProps) {
    return (
        <div className="hidden lg:block w-80 bg-white p-6 overflow-y-auto">
            <Stories stories={stories} onStoryClick={onStoryClick} />
            
            <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6">Artist Suggestions</h3>
                <div className="space-y-4">
                    {suggestions.map((suggestion) => (
                        <SidebarSuggestionCard 
                            key={suggestion.id} 
                            suggestion={suggestion} 
                            onFollowUser={onFollowUser} 
                        />
                    ))}
                    <button 
                        className="text-gray-500 text-sm mt-2 cursor-pointer hover:text-black transition-colors duration-200"
                        onClick={onOpenSuggestions}
                    >
                        See all
                    </button>
                </div>
            </div>

            {recommendations.length > 0 && (
                <div>
                    <h3 className="text-2xl font-bold mb-6">Trending Topics</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {recommendations.map((rec) => (
                            <div
                                key={rec.id}
                                className="bg-gray-100 rounded-xl p-4 flex flex-col items-center justify-center h-24 relative overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="absolute inset-0 transition-opacity duration-300">
                                    <Image
                                        src={rec.icon}
                                        alt={rec.title}
                                        fill
                                        className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                                    />
                                </div>
                                <span className="z-10 text-black font-medium truncate">{rec.title}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <h4 className="font-semibold mb-3">Popular Hashtags</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                                #AIArt
                            </span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                                #MidJourney
                            </span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                                #PromptEngineering
                            </span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                                #AIForGood
                            </span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                                #DeepLearning
                            </span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                                #StableDiffusion
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 