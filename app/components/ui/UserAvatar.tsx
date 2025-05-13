"use client";

import AvatarImage from "./AvatarImage";
import { User } from "@/app/types";

type UserAvatarProps = {
    user: User;
    size?: "sm" | "md" | "lg";
    showStatus?: boolean;
};

export default function UserAvatar({ user, size = "md", showStatus = false }: UserAvatarProps) {
    const sizes = {
        sm: { width: 32, height: 32, className: "w-8 h-8" },
        md: { width: 40, height: 40, className: "w-10 h-10" },
        lg: { width: 48, height: 48, className: "w-12 h-12" },
    };

    const { width, height, className } = sizes[size];

    return (
        <div className="relative group">
            {showStatus && (
                <>
                    <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-orange-300 group-hover:animate-spin group-hover:scale-110 transition-all duration-500"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-teal-400 group-hover:animate-pulse group-hover:scale-125 transition-all duration-500"></div>
                </>
            )}
            <div className="relative overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
                <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                    width={width}
                    height={height}
                    className={`rounded-full ${className} ${showStatus ? "border-2 border-white z-10 relative" : ""}`}
                />
                {showStatus && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
            </div>
        </div>
    );
} 