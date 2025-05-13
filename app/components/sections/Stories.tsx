"use client";

import { Story } from "@/app/types";
import AvatarImage from "../ui/AvatarImage";

type StoriesProps = {
    stories: Story[];
    onStoryClick: (story: Story) => void;
};

export default function Stories({ stories, onStoryClick }: StoriesProps) {
    return (
        <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">Stories</h3>
            <div className="grid grid-cols-2 gap-4">
                {stories.map((story) => (
                    <div
                        key={story.id}
                        className="rounded-xl overflow-hidden h-40 relative group cursor-pointer transition-all duration-300 hover:shadow-lg"
                        onClick={() => onStoryClick(story)}
                    >
                        <div className="absolute inset-0 transition-opacity duration-300">
                            <AvatarImage
                                src={story.image}
                                alt="AI artwork"
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                            <div className="bg-white rounded-full py-1 px-2 flex items-center transform transition-transform duration-300 group-hover:scale-105">
                                <AvatarImage
                                    src={story.user.avatar}
                                    alt={story.user.name}
                                    width={24}
                                    height={24}
                                    className="rounded-full mr-2"
                                />
                                <span className="text-black text-xs font-medium truncate">{story.user.name}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 