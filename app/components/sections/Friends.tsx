"use client";

import { useState } from "react";
import AvatarImage from "../ui/AvatarImage";
import FriendCard from "../friends/FriendCard";
import { User, Suggestion } from "@/app/types";

type FriendsProps = {
  friends: User[];
  allSuggestions: Suggestion[];
  fonts: {
    heading: string;
    body: string;
  };
  onFollowUser: (id: number) => void;
  onRemoveFriend: (friendId: number) => void;
  onMessageFriend: (friend: User) => void;
};

export default function Friends({
  friends,
  allSuggestions,
  fonts,
  onFollowUser,
  onRemoveFriend,
  onMessageFriend
}: FriendsProps) {
  const [activeFriendsFilter, setActiveFriendsFilter] = useState<"friends" | "suggestions">("friends");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold" style={{ fontFamily: fonts.heading }}>
          AI Artists
        </h2>

        <div className="flex">
          <button
            onClick={() => setActiveFriendsFilter("friends")}
            className={`cursor-pointer mr-6 transition-colors duration-200 hover:text-black ${
              activeFriendsFilter === "friends" ? "text-black font-semibold" : "text-gray-500"
            }`}
          >
            Following
          </button>
          <button
            onClick={() => setActiveFriendsFilter("suggestions")}
            className={`cursor-pointer transition-colors duration-200 hover:text-black ${
              activeFriendsFilter === "suggestions" ? "text-black font-semibold" : "text-gray-500"
            }`}
          >
            Discover Artists
          </button>
        </div>
      </div>

      {activeFriendsFilter === "friends" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              onRemoveFriend={onRemoveFriend}
              onMessageFriend={onMessageFriend}
            />
          ))}
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="flex flex-col items-center bg-white rounded-xl border border-gray-200 p-4"
              >
                <div className="relative w-20 h-20 mb-3">
                  <AvatarImage
                    src={suggestion.user.avatar}
                    alt={suggestion.user.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg" style={{ fontFamily: fonts.heading }}>
                  {suggestion.user.name}
                </h4>
                <p className="text-gray-500 text-sm">@{suggestion.user.username}</p>
                <p className="text-gray-600 text-sm my-2 text-center">Suggested based on your interests</p>
                <button
                  onClick={() => onFollowUser(suggestion.id)}
                  className={`px-6 py-2 rounded-full mt-2 cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    suggestion.followed
                      ? "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700"
                      : "bg-black text-white hover:bg-gray-800 hover:shadow-lg"
                  }`}
                >
                  {suggestion.followed ? "Following" : "Follow"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 