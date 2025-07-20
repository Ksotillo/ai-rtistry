"use client";

import { useState, useEffect } from "react";
import { Menu, X, Home as HomeIcon, MessageSquare, Users, Bell, Settings } from "lucide-react";
import { MobileMenuProps } from "@/app/types/index";
import AvatarImage from "../ui/AvatarImage";

export default function MobileMenu({ currentUser, activeSection, onSectionChange }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isOpen && !target.closest(".mobile-menu-content") && !target.closest(".mobile-menu-trigger")) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const handleSectionChange = (section: string) => {
        onSectionChange(section);
        setIsOpen(false);
    };

    return (
        <>
            <button
                className="md:hidden mobile-menu-trigger flex items-center justify-center w-10 h-10 text-gray-600 cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <Menu size={24} />
            </button>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
                    <div className="mobile-menu-content fixed inset-y-0 left-0 max-w-[280px] w-full bg-white shadow-lg transform transition-transform duration-300 z-50">
                        <div className="flex items-center justify-between p-4 border-b">
                            <div className="flex items-center">
                                <div className="relative w-10 h-10 mr-3">
                                    <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-orange-300"></div>
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-teal-400"></div>
                                    <AvatarImage
                                        src={currentUser.avatar}
                                        alt={currentUser.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full border-2 border-white z-10 relative"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">{currentUser.name}</h3>
                                    <p className="text-gray-500 text-xs">@{currentUser.username}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>
                        <nav className="p-4">
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        onClick={() => handleSectionChange("newsfeed")}
                                        className={`flex items-center w-full p-3 rounded-lg cursor-pointer ${
                                            activeSection === "newsfeed" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        <HomeIcon
                                            className={`w-5 h-5 mr-3 ${activeSection === "newsfeed" ? "text-white" : "text-gray-700"}`}
                                        />
                                        News Feed
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleSectionChange("messages")}
                                        className={`flex items-center w-full p-3 rounded-lg cursor-pointer ${
                                            activeSection === "messages" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        <MessageSquare
                                            className={`w-5 h-5 mr-3 ${activeSection === "messages" ? "text-white" : "text-gray-700"}`}
                                        />
                                        Messages
                                        <span className="ml-auto bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            6
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleSectionChange("friends")}
                                        className={`flex items-center w-full p-3 rounded-lg cursor-pointer ${
                                            activeSection === "friends" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        <Users className={`w-5 h-5 mr-3 ${activeSection === "friends" ? "text-white" : "text-gray-700"}`} />
                                        Friends
                                        <span className="ml-auto bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            3
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleSectionChange("notifications")}
                                        className={`flex items-center w-full p-3 rounded-lg cursor-pointer ${
                                            activeSection === "notifications" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        <Bell
                                            className={`w-5 h-5 mr-3 ${activeSection === "notifications" ? "text-white" : "text-gray-700"}`}
                                        />
                                        Notifications
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleSectionChange("settings")}
                                        className={`flex items-center w-full p-3 rounded-lg cursor-pointer ${
                                            activeSection === "settings" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        <Settings
                                            className={`w-5 h-5 mr-3 ${activeSection === "settings" ? "text-white" : "text-gray-700"}`}
                                        />
                                        Settings
                                    </button>
                                </li>
                            </ul>
                        </nav>
                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                            <button className="w-full py-2 bg-black text-white rounded-lg cursor-pointer">Sign Out</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
} 