"use client";

import { useState, useRef } from "react";
import { MessageSquare, Paperclip, Send } from "lucide-react";
import { User, Chat, Message } from "@/app/types";
import AvatarImage from "../ui/AvatarImage";
import { toast } from "react-toastify";

type MessagesProps = {
    currentUser: User;
};

export default function Messages({ currentUser }: MessagesProps) {
    const [chats, setChats] = useState<Chat[]>([
        {
            id: 1,
            user: {
                id: 101,
                name: "Emily Johnson",
                username: "emilyjohnson",
                avatar: "https://avatars.githubusercontent.com/u/2198736?v=4",
            },
            messages: [
                {
                    id: 1,
                    sender: {
                        id: 101,
                        name: "Emily Johnson",
                        username: "emilyjohnson",
                        avatar: "https://avatars.githubusercontent.com/u/2198736?v=4",
                    },
                    receiver: currentUser,
                    text: "Hi there! How's your project coming along?",
                    time: "10:20 AM",
                    isRead: true,
                },
                {
                    id: 2,
                    sender: currentUser,
                    receiver: {
                        id: 101,
                        name: "Emily Johnson",
                        username: "emilyjohnson",
                        avatar: "https://avatars.githubusercontent.com/u/2198736?v=4",
                    },
                    text: "Hey Emily! It's going well, thanks for asking. I'm just finishing up the UI design.",
                    time: "10:22 AM",
                    isRead: true,
                },
                {
                    id: 3,
                    sender: {
                        id: 101,
                        name: "Emily Johnson",
                        username: "emilyjohnson",
                        avatar: "https://avatars.githubusercontent.com/u/2198736?v=4",
                    },
                    receiver: currentUser,
                    text: "That's great! Can't wait to see it. Are we still meeting tomorrow?",
                    time: "10:25 AM",
                    isRead: false,
                },
            ],
            unreadCount: 1,
        },
        {
            id: 2,
            user: {
                id: 102,
                name: "Michael Torres",
                username: "michael_t",
                avatar: "https://avatars.githubusercontent.com/u/6712348?v=4",
            },
            messages: [
                {
                    id: 1,
                    sender: {
                        id: 102,
                        name: "Michael Torres",
                        username: "michael_t",
                        avatar: "https://avatars.githubusercontent.com/u/6712348?v=4",
                    },
                    receiver: currentUser,
                    text: "Hey, did you see the new design system docs?",
                    time: "Yesterday",
                    isRead: true,
                },
                {
                    id: 2,
                    sender: currentUser,
                    receiver: {
                        id: 102,
                        name: "Michael Torres",
                        username: "michael_t",
                        avatar: "https://avatars.githubusercontent.com/u/6712348?v=4",
                    },
                    text: "Not yet! I'll check them out today.",
                    time: "Yesterday",
                    isRead: true,
                },
            ],
            unreadCount: 0,
        },
        {
            id: 3,
            user: {
                id: 103,
                name: "Sarah Miller",
                username: "sarahm",
                avatar: "https://avatars.githubusercontent.com/u/3198726?v=4",
            },
            messages: [
                {
                    id: 1,
                    sender: {
                        id: 103,
                        name: "Sarah Miller",
                        username: "sarahm",
                        avatar: "https://avatars.githubusercontent.com/u/3198726?v=4",
                    },
                    receiver: currentUser,
                    text: "Are we still on for coffee this weekend?",
                    time: "2 days ago",
                    isRead: true,
                },
            ],
            unreadCount: 0,
        },
        {
            id: 4,
            user: {
                id: 104,
                name: "David Lee",
                username: "davidlee",
                avatar: "https://avatars.githubusercontent.com/u/8126734?v=4",
            },
            messages: [
                {
                    id: 1,
                    sender: currentUser,
                    receiver: {
                        id: 104,
                        name: "David Lee",
                        username: "davidlee",
                        avatar: "https://avatars.githubusercontent.com/u/8126734?v=4",
                    },
                    text: "Hey David, can you send me those project files?",
                    time: "3 days ago",
                    isRead: true,
                },
                {
                    id: 2,
                    sender: {
                        id: 104,
                        name: "David Lee",
                        username: "davidlee",
                        avatar: "https://avatars.githubusercontent.com/u/8126734?v=4",
                    },
                    receiver: currentUser,
                    text: "Sure thing! I'll email them to you right away.",
                    time: "3 days ago",
                    isRead: true,
                },
                {
                    id: 3,
                    sender: {
                        id: 104,
                        name: "David Lee",
                        username: "davidlee",
                        avatar: "https://avatars.githubusercontent.com/u/8126734?v=4",
                    },
                    receiver: currentUser,
                    text: "Just sent them. Let me know if you need anything else!",
                    time: "3 days ago",
                    isRead: true,
                },
            ],
            unreadCount: 0,
        },
        {
            id: 5,
            user: {
                id: 105,
                name: "Jessica Wang",
                username: "jwang",
                avatar: "https://avatars.githubusercontent.com/u/1976342?v=4",
            },
            messages: [
                {
                    id: 1,
                    sender: {
                        id: 105,
                        name: "Jessica Wang",
                        username: "jwang",
                        avatar: "https://avatars.githubusercontent.com/u/1976342?v=4",
                    },
                    receiver: currentUser,
                    text: "Hi! Just wanted to remind you about our team meeting tomorrow at 2pm.",
                    time: "4 days ago",
                    isRead: true,
                },
                {
                    id: 2,
                    sender: currentUser,
                    receiver: {
                        id: 105,
                        name: "Jessica Wang",
                        username: "jwang",
                        avatar: "https://avatars.githubusercontent.com/u/1976342?v=4",
                    },
                    text: "Thanks for the reminder! I'll be there.",
                    time: "4 days ago",
                    isRead: true,
                },
            ],
            unreadCount: 0,
        },
    ]);

    const [activeChat, setActiveChat] = useState<Chat | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Set initial active chat
    useState(() => {
        if (chats.length > 0 && !activeChat) {
            setActiveChat(chats[0]);
        }
    });

    // Scroll to bottom of chat when activeChat changes
    useState(() => {
        if (chatContainerRef.current && activeChat) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    });

    const handleSendMessage = () => {
        if (!newMessage.trim() || !activeChat) return;

        const newMessageObj: Message = {
            id: Date.now(),
            sender: currentUser,
            receiver: activeChat.user,
            text: newMessage,
            time: "Just now",
            isRead: true,
        };

        const updatedChats = chats.map((chat) =>
            chat.id === activeChat.id
                ? {
                      ...chat,
                      messages: [...chat.messages, newMessageObj],
                      lastMessage: newMessageObj,
                  }
                : chat
        );

        setChats(updatedChats);
        setActiveChat(updatedChats.find((chat) => chat.id === activeChat.id) || null);
        setNewMessage("");
    };

    const handleChatSelect = (chat: Chat) => {
        if (chat.id === activeChat?.id) return;

        const updatedChats = chats.map((c) =>
            c.id === chat.id
                ? {
                      ...c,
                      messages: c.messages.map((msg) => ({
                          ...msg,
                          isRead: true,
                      })),
                      unreadCount: 0,
                  }
                : c
        );

        setChats(updatedChats);
        setActiveChat(updatedChats.find((c) => c.id === chat.id) || null);
    };

    return (
        <div className="h-full flex">
            <div className="w-80 border-r border-gray-200 h-full">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Messages</h2>
                </div>
                <div className="overflow-y-auto h-[calc(100%-60px)]">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                                activeChat?.id === chat.id ? "bg-gray-50" : ""
                            }`}
                            onClick={() => handleChatSelect(chat)}
                        >
                            <div className="flex items-center">
                                <div className="relative">
                                    <AvatarImage
                                        src={chat.user.avatar}
                                        alt={chat.user.name}
                                        width={48}
                                        height={48}
                                        className="rounded-full mr-3"
                                    />
                                    {chat.unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {chat.unreadCount}
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-semibold truncate">{chat.user.name}</h3>
                                        <span className="text-xs text-gray-500">
                                            {chat.messages[chat.messages.length - 1]?.time}
                                        </span>
                                    </div>
                                    <p
                                        className={`text-sm truncate ${
                                            chat.unreadCount > 0 ? "font-semibold text-black" : "text-gray-500"
                                        }`}
                                    >
                                        {chat.messages[chat.messages.length - 1]?.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col h-full">
                {activeChat ? (
                    <>
                        <div className="p-4 border-b border-gray-200 flex items-center">
                            <AvatarImage
                                src={activeChat.user.avatar}
                                alt={activeChat.user.name}
                                width={40}
                                height={40}
                                className="rounded-full mr-3"
                            />
                            <div>
                                <h3 className="font-semibold">{activeChat.user.name}</h3>
                                <p className="text-xs text-gray-500">@{activeChat.user.username}</p>
                            </div>
                        </div>

                        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                            {activeChat.messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${
                                        message.sender.id === currentUser.id ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    {message.sender.id !== currentUser.id && (
                                        <AvatarImage
                                            src={message.sender.avatar}
                                            alt={message.sender.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full mr-2 self-end"
                                        />
                                    )}
                                    <div
                                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                                            message.sender.id === currentUser.id
                                                ? "bg-black text-white rounded-br-none"
                                                : "bg-gray-100 text-gray-800 rounded-bl-none"
                                        }`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                        <span
                                            className={`text-xs block mt-1 ${
                                                message.sender.id === currentUser.id
                                                    ? "text-gray-300 text-right"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {message.time}
                                        </span>
                                    </div>
                                    {message.sender.id === currentUser.id && (
                                        <AvatarImage
                                            src={message.sender.avatar}
                                            alt={message.sender.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full ml-2 self-end"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-gray-200">
                            <div className="flex items-center space-x-2">
                                <div className="relative">
                                    <input
                                        type="file"
                                        className="hidden"
                                        id="attachFile"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                toast.info(`Selected file: ${e.target.files[0].name}`, {
                                                    position: "top-right",
                                                    autoClose: 2000,
                                                });
                                            }
                                        }}
                                        accept="image/*,.pdf,.doc,.docx"
                                    />
                                    <button
                                        onClick={() => document.getElementById("attachFile")?.click()}
                                        className="text-gray-400 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer flex items-center justify-center"
                                    >
                                        <Paperclip size={20} />
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                />
                                <button
                                    className={`w-10 h-10 flex items-center justify-center rounded-full ${
                                        newMessage.trim() ? "bg-black text-white" : "bg-gray-100 text-gray-400"
                                    } transition-colors duration-200 cursor-pointer`}
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                >
                                    <Send
                                        size={18}
                                        className={`transform rotate-45 ml-[-3px] ${newMessage.trim() ? "" : "opacity-50"}`}
                                    />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                            <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                            <p>Select a chat to start messaging</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 