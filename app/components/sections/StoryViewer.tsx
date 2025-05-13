"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Story } from "@/app/types";
import AvatarImage from "../ui/AvatarImage";

type StoryViewerProps = {
    activeStory: Story | null;
    onClose: () => void;
};

export default function StoryViewer({ activeStory, onClose }: StoryViewerProps) {
    const [storyProgress, setStoryProgress] = useState(0);
    const [storyTimer, setStoryTimer] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (activeStory) {
            if (storyTimer) {
                clearInterval(storyTimer);
            }

            const timer = setInterval(() => {
                setStoryProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        onClose();
                        return 0;
                    }
                    return prev + (100 / 7000) * 100;
                });
            }, 100);

            setStoryTimer(timer);

            return () => {
                clearInterval(timer);
            };
        }
    }, [activeStory, onClose]);

    if (!activeStory) return null;

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-20 text-white bg-transparent p-2 rounded-full cursor-pointer hover:bg-white hover:bg-opacity-20 transition-all"
            >
                <X size={28} />
            </button>

            <div className="relative w-full max-w-lg h-screen max-h-[80vh]">
                <div className="w-full h-full relative overflow-hidden rounded-2xl">
                    <div className="absolute top-4 left-4 right-4 h-1.5 bg-gray-500/50 z-10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-100 ease-linear"
                            style={{ width: `${storyProgress}%` }}
                        ></div>
                    </div>

                    <AvatarImage
                        src={activeStory.image}
                        alt="Story"
                        fill
                        className="object-cover"
                        style={{ borderRadius: "16px" }}
                    />

                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full py-2 px-4 flex items-center shadow-md z-10 w-auto max-w-[90%]">
                        <AvatarImage
                            src={activeStory.user.avatar}
                            alt={activeStory.user.name}
                            width={32}
                            height={32}
                            className="rounded-full mr-3"
                        />
                        <div className="text-black">
                            <h4 className="font-semibold text-sm">{activeStory.user.name}</h4>
                            <p className="text-xs text-gray-500">@{activeStory.user.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 