"use client";

import { User } from "@/app/types";
import { animations } from "@/app/utils/constants";
import UserAvatar from "../ui/UserAvatar";

type FriendCardProps = {
    friend: User;
    onRemoveFriend: (id: number) => void;
    onMessageFriend: (friend: User) => void;
};

export default function FriendCard({ friend, onRemoveFriend, onMessageFriend }: FriendCardProps) {
    return (
        <div
            className={`bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center transition-all duration-300 ${animations.fadeIn} hover:shadow-md hover:border-gray-300`}
        >
            <UserAvatar user={friend} size="lg" />
            <h3 className="font-semibold mt-3 mb-1">{friend.name}</h3>
            <p className="text-gray-500 text-sm mb-4">@{friend.username}</p>
            <div className="flex space-x-2 w-full">
                <button
                    className="flex-1 bg-black text-white py-2 rounded-lg text-sm cursor-pointer transition-all duration-200 transform active:scale-95 hover:bg-gray-800"
                    onClick={() => onMessageFriend(friend)}
                >
                    Message
                </button>
                <button
                    className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm cursor-pointer"
                    onClick={() => onRemoveFriend(friend.id)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
} 