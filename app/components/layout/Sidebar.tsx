"use client";

import { User } from "@/app/types";
import { fonts } from "@/app/utils/constants";
import UserAvatar from "../ui/UserAvatar";
import SidebarItem from "./SidebarItem";
import { Home as HomeIcon, MessageSquare, Users, Settings } from "lucide-react";

type SidebarProps = {
    currentUser: User;
    activeSection: string;
    onSectionChange: (section: string) => void;
};

export default function Sidebar({ currentUser, activeSection, onSectionChange }: SidebarProps) {
    return (
        <div className="hidden md:flex w-64 bg-white p-6 flex-col">
            <div className="flex items-center mb-10" onClick={() => onSectionChange("settings")}>
                <UserAvatar user={currentUser} size="lg" showStatus={true} />
                <div>
                    <button className="group transition-all duration-300 cursor-pointer">
                        <h3 className="font-bold relative inline-block" style={{ fontFamily: fonts.heading }}>
                            {currentUser.name}
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-400 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-clip-text text-transparent pointer-events-none">
                                {currentUser.name}
                            </span>
                        </h3>
                        <p className="text-gray-500 text-sm">@{currentUser.username}</p>
                    </button>
                </div>
            </div>

            <nav className="flex-1">
                <ul className="space-y-3">
                    <SidebarItem
                        icon={
                            activeSection === "newsfeed" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                </svg>
                            ) : (
                                <HomeIcon className="w-4 h-4" />
                            )
                        }
                        label="News Feed"
                        isActive={activeSection === "newsfeed"}
                        onClick={() => onSectionChange("newsfeed")}
                    />
                    <SidebarItem
                        icon={
                            activeSection === "messages" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                                    <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                                </svg>
                            ) : (
                                <MessageSquare className="w-4 h-4" />
                            )
                        }
                        label="Messages"
                        count={6}
                        isActive={activeSection === "messages"}
                        onClick={() => onSectionChange("messages")}
                    />
                    <SidebarItem
                        icon={
                            activeSection === "friends" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                                </svg>
                            ) : (
                                <Users className="w-4 h-4" />
                            )
                        }
                        label="Friends"
                        count={3}
                        isActive={activeSection === "friends"}
                        onClick={() => onSectionChange("friends")}
                    />
                    <SidebarItem
                        icon={
                            activeSection === "settings" ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path
                                        fillRule="evenodd"
                                        d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <Settings className="w-4 h-4" />
                            )
                        }
                        label="Settings"
                        isActive={activeSection === "settings"}
                        onClick={() => onSectionChange("settings")}
                    />
                </ul>
            </nav>
        </div>
    );
} 