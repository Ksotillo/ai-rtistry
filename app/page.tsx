"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Search } from "lucide-react";
import { User, Post, Story, Suggestion, Recommendation } from "./types";
import { generateRandomUsers } from "./utils/data";

// Components
import MobileMenu from "./components/layout/MobileMenu";
import Sidebar from "./components/layout/Sidebar";
import NewsFeed from "./components/sections/NewsFeed";
import Messages from "./components/sections/Messages";
import Friends from "./components/sections/Friends";
import Settings from "./components/sections/Settings";
import StoryViewer from "./components/sections/StoryViewer";
import SuggestionsModal from "./components/friends/SuggestionsModal";
import RightSidebar from "./components/layout/RightSidebar";

export default function Home() {
    const [currentUser, setCurrentUser] = useState<User>({
        id: 1,
        name: "Bogdan Nikitin",
        username: "nikitinteam",
        avatar: "https://avatars.githubusercontent.com/u/59017652?v=4",
    });

    const [activeSection, setActiveSection] = useState("newsfeed");
    const [activeFeedFilter, setActiveFeedFilter] = useState("friends");

    const [likedPosts, setLikedPosts] = useState<number[]>([]);
    const [activeCommentInput, setActiveCommentInput] = useState<number | null>(null);
    const [commentText, setCommentText] = useState("");
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

    // Posts data
    const [friendsPosts, setFriendsPosts] = useState<(Post & { comments?: { user: User; text: string; timeAgo: string }[] })[]>([
        {
            id: 1,
            user: {
                id: 2,
                name: "George Lobko",
                username: "georgelobko",
                avatar: "https://avatars.githubusercontent.com/u/383979?v=4",
            },
            content: "Created this surreal cityscape with towering crystal structures and floating islands.",
            prompt: "A futuristic cityscape with crystal spires and floating islands, 8k, hyperrealistic, cinematic lighting",
            model: "Midjourney v6",
            images: ["https://picsum.photos/id/29/600/400", "https://picsum.photos/id/30/600/400"],
            likes: 6355,
            timeAgo: "2 hours ago",
            mentions: [
                { name: "Silena", username: "silena" },
                { name: "Olya", username: "olya" },
            ],
            reactions: [
                { emoji: "🔥", count: 1 },
                { emoji: "😍", count: 1 },
                { emoji: "😱", count: 1 },
                { emoji: "❤️", count: 1 },
            ],
            comments: [
                {
                    user: {
                        id: 10,
                        name: "Maria K.",
                        username: "mariak",
                        avatar: "https://avatars.githubusercontent.com/u/1410106?v=4",
                    },
                    text: "Stunning! What settings did you use for the lighting?",
                    timeAgo: "1 hour ago",
                },
            ],
        },
        {
            id: 2,
            user: {
                id: 3,
                name: "Vitaliy Boyko",
                username: "vitaliyboyko",
                avatar: "https://avatars.githubusercontent.com/u/1410106?v=4",
            },
            content: "My latest portrait series exploring emotional depth through AI. Tried a new technique with detailed prompting.",
            prompt: "Portrait of a weathered explorer with deep emotional eyes, detailed skin texture, cinematic lighting, 8k, photorealistic",
            model: "DALL-E 3",
            images: ["https://picsum.photos/id/65/600/400"],
            likes: 129,
            timeAgo: "3 hours ago",
            comments: [],
        },
    ]);

    const [recentsPosts, setRecentsPosts] = useState<(Post & { comments?: { user: User; text: string; timeAgo: string }[] })[]>([
        {
            id: 3,
            user: {
                id: 11,
                name: "Alex Morgan",
                username: "alexmorgan",
                avatar: "https://avatars.githubusercontent.com/u/6270131?v=4",
            },
            content: "My latest experiment with surreal landscapes and glowing creatures.",
            prompt: "Bioluminescent creatures in a surreal alien landscape, fantastical, 8k, cinematic lighting, hyper-detailed",
            model: "Stable Diffusion XL",
            images: ["https://picsum.photos/id/1/600/400"],
            likes: 421,
            timeAgo: "20 minutes ago",
            comments: [],
        },
        {
            id: 4,
            user: {
                id: 12,
                name: "Sophia Chen",
                username: "sophiachen",
                avatar: "https://avatars.githubusercontent.com/u/18194757?v=4",
            },
            content: "Just finished this cyberpunk cityscape series. The neon lighting was particularly challenging to get right.",
            prompt: "Cyberpunk cityscape at night, neon lights reflecting on wet streets, dense urban environment, flying cars, 8k, detailed, cinematic",
            model: "DALL-E 3",
            images: ["https://picsum.photos/id/24/600/400"],
            likes: 87,
            timeAgo: "Just now",
            comments: [
                {
                    user: {
                        id: 13,
                        name: "James Peterson",
                        username: "jamesp",
                        avatar: "https://avatars.githubusercontent.com/u/16659427?v=4",
                    },
                    text: "The reflections on the wet pavement are incredible! What resolution did you generate at?",
                    timeAgo: "5 minutes ago",
                },
            ],
        },
    ]);

    const [popularPosts, setPopularPosts] = useState<(Post & { comments?: { user: User; text: string; timeAgo: string }[] })[]>([
        {
            id: 5,
            user: {
                id: 14,
                name: "Mike Tyson",
                username: "ironmike",
                avatar: "https://avatars.githubusercontent.com/u/3765077?v=4",
            },
            content: "My new fantasy character series. This warrior was generated after 20+ iterations to get the right composition.",
            prompt: "Epic fantasy warrior with glowing magical armor, battle-worn, standing on mountain peak at sunset, ultra-detailed, photorealistic, dramatic lighting",
            model: "Midjourney v6",
            images: ["https://picsum.photos/id/26/600/400", "https://picsum.photos/id/27/600/400"],
            likes: 8947,
            timeAgo: "2 days ago",
            comments: [
                {
                    user: {
                        id: 15,
                        name: "Roberto Carlos",
                        username: "roberto11",
                        avatar: "https://avatars.githubusercontent.com/u/9335367?v=4",
                    },
                    text: "Incredible detail on the armor! 🔥",
                    timeAgo: "1 day ago",
                },
                {
                    user: {
                        id: 16,
                        name: "Luna Smith",
                        username: "lunasmith",
                        avatar: "https://avatars.githubusercontent.com/u/5041065?v=4",
                    },
                    text: "Would you mind sharing your negative prompts too? I've been struggling with armor textures.",
                    timeAgo: "12 hours ago",
                },
            ],
        },
        {
            id: 6,
            user: {
                id: 17,
                name: "Emma Watson",
                username: "emmaw",
                avatar: "https://avatars.githubusercontent.com/u/7489775?v=4",
            },
            content: "My entry for the #AIForGood challenge - visualizing sustainable future cities using generative AI.",
            prompt: "Sustainable futuristic city with vertical gardens, solar panels, flying electric vehicles, people cycling, clean energy infrastructure, utopian, photorealistic, 8k",
            model: "Leonardo AI",
            images: ["https://picsum.photos/id/10/600/400"],
            likes: 12546,
            timeAgo: "5 days ago",
            comments: [],
        },
    ]);

    const [posts, setPosts] = useState<(Post & { comments?: { user: User; text: string; timeAgo: string }[] })[]>(friendsPosts);

    useEffect(() => {
        if (activeFeedFilter === "recents") {
            setPosts(recentsPosts);
        } else if (activeFeedFilter === "friends") {
            setPosts(friendsPosts);
        } else if (activeFeedFilter === "popular") {
            setPosts(popularPosts);
        }
    }, [activeFeedFilter, friendsPosts, recentsPosts, popularPosts]);

    // Stories data
    const [stories] = useState<Story[]>([
        {
            id: 1,
            user: {
                id: 4,
                name: "Anatoly P.",
                username: "anatolyp",
                avatar: "https://avatars.githubusercontent.com/u/3765077?v=4",
            },
            image: "https://picsum.photos/id/24/400/500",
        },
        {
            id: 2,
            user: {
                id: 5,
                name: "Lolita Earns",
                username: "lolitaearns",
                avatar: "https://avatars.githubusercontent.com/u/9335367?v=4",
            },
            image: "https://picsum.photos/id/25/400/500",
        },
        {
            id: 3,
            user: {
                id: 8,
                name: "Marcus Chen",
                username: "marcuschen",
                avatar: "https://avatars.githubusercontent.com/u/5041065?v=4",
            },
            image: "https://picsum.photos/id/28/400/500",
        },
        {
            id: 4,
            user: {
                id: 10,
                name: "Samira Ahmed",
                username: "samira_art",
                avatar: "https://avatars.githubusercontent.com/u/7489775?v=4",
            },
            image: "https://picsum.photos/id/29/400/500",
        },
    ]);

    // Friends & Suggestions data
    const [suggestionsModalOpen, setSuggestionsModalOpen] = useState(false);
    const [allSuggestions, setAllSuggestions] = useState<Suggestion[]>([]);
    
    const [suggestions, setSuggestions] = useState<Suggestion[]>([
        {
            id: 1,
            user: {
                id: 6,
                name: "Nick Shelburne",
                username: "nickshelburne",
                avatar: "https://avatars.githubusercontent.com/u/16659427?v=4",
            },
            followed: false,
        },
        {
            id: 2,
            user: {
                id: 7,
                name: "Brittni Lando",
                username: "brittnilando",
                avatar: "https://avatars.githubusercontent.com/u/6655696?v=4",
            },
            followed: false,
        },
        {
            id: 3,
            user: {
                id: 8,
                name: "Ivan Shevchenko",
                username: "ivanshevchenko",
                avatar: "https://avatars.githubusercontent.com/u/8460711?v=4",
            },
            followed: false,
        },
    ]);

    // Recommendations data
    const [recommendations] = useState<Recommendation[]>([
        {
            id: 1,
            title: "AI Art",
            icon: "https://picsum.photos/id/20/200/200",
        },
        {
            id: 2,
            title: "Prompting",
            icon: "https://picsum.photos/id/21/200/200",
        },
        {
            id: 3,
            title: "Digital Art",
            icon: "https://picsum.photos/id/22/200/200",
        },
        {
            id: 4,
            title: "Illustration",
            icon: "https://picsum.photos/id/23/200/200",
        },
    ]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const moreSuggestions = [...suggestions, ...generateRandomUsers(4, 20)];
            setAllSuggestions(moreSuggestions);
        }
    }, [suggestions]);

    // Story viewing
    const [activeStory, setActiveStory] = useState<Story | null>(null);

    const handleStoryClick = (story: Story) => {
        setActiveStory(story);
    };

    const closeStory = () => {
        setActiveStory(null);
    };

    // Post interaction handlers
    const handleLikeToggle = (postId: number) => {
        if (likedPosts.includes(postId)) {
            setLikedPosts(likedPosts.filter((id) => id !== postId));
            setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes - 1 } : post)));
        } else {
            setLikedPosts([...likedPosts, postId]);
            setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)));
        }
    };

    const handleCommentToggle = (postId: number) => {
        setActiveCommentInput(activeCommentInput === postId ? null : postId);
        setCommentText("");
    };

    const handleCommentSubmit = (postId: number) => {
        if (commentText.trim()) {
            const updatedPosts = posts.map((post) =>
                post.id === postId
                    ? {
                          ...post,
                          comments: [
                              ...(post.comments || []),
                              {
                                  user: currentUser,
                                  text: commentText,
                                  timeAgo: "Just now",
                              },
                          ],
                      }
                    : post
            );

            if (activeFeedFilter === "recents") {
                setRecentsPosts(updatedPosts.filter((post) => recentsPosts.some((p) => p.id === post.id)));
            } else if (activeFeedFilter === "friends") {
                setFriendsPosts(updatedPosts.filter((post) => friendsPosts.some((p) => p.id === post.id)));
            } else if (activeFeedFilter === "popular") {
                setPopularPosts(updatedPosts.filter((post) => popularPosts.some((p) => p.id === post.id)));
            }

            setPosts(updatedPosts);
            setCommentText("");
            setActiveCommentInput(null);
        }
    };

    const toggleDropdown = (postId: number) => {
        setOpenDropdownId(openDropdownId === postId ? null : postId);
    };

    const hidePost = (postId: number) => {
        setPosts(posts.filter((post) => post.id !== postId));
        setOpenDropdownId(null);
        toast.success("Post hidden successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const savePost = () => {
        toast.success("Post saved to bookmarks", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        setOpenDropdownId(null);
    };

    const reportPost = () => {
        toast.info("Post reported. We'll review it shortly.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        setOpenDropdownId(null);
    };

    const handleFollowUser = (id: number) => {
        setSuggestions(
            suggestions.map((suggestion) => (suggestion.id === id ? { ...suggestion, followed: !suggestion.followed } : suggestion))
        );

        setAllSuggestions(
            allSuggestions.map((suggestion) => (suggestion.id === id ? { ...suggestion, followed: !suggestion.followed } : suggestion))
        );

        const suggestion = suggestions.find((s) => s.id === id) || allSuggestions.find((s) => s.id === id);
        if (suggestion) {
            const isNowFollowed = !suggestion.followed;
            toast.success(isNowFollowed ? `You are now following ${suggestion.user.name}` : `You unfollowed ${suggestion.user.name}`, {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    // Handle post submission for creating new posts
    const handlePostSubmit = (postText: string, promptText: string, selectedModel: string, selectedImages: string[], selectedLocation: string | null) => {
        if (!postText.trim() && selectedImages.length === 0) {
            toast.error("Please write something or add an image to share", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        // Create a new post object
        const newPost = {
            id: Date.now(), // Use timestamp as a simple unique ID
            user: currentUser,
            content: postText,
            prompt: promptText,
            model: selectedModel,
            images: selectedImages,
            likes: 0,
            timeAgo: "Just now",
            comments: [],
        };

        // Add location if provided
        if (selectedLocation) {
            newPost.location = selectedLocation;
        }

        // Add the new post to the appropriate post list based on active filter
        if (activeFeedFilter === "friends") {
            setFriendsPosts([newPost, ...friendsPosts]);
        } else if (activeFeedFilter === "recents") {
            setRecentsPosts([newPost, ...recentsPosts]);
        } else if (activeFeedFilter === "popular") {
            setPopularPosts([newPost, ...popularPosts]);
        }

        // Update the current posts view
        setPosts([newPost, ...posts]);

        toast.success("AI artwork shared successfully!", {
            position: "top-right",
            autoClose: 3000,
        });
    };

    // Friends data
    const [friends, setFriends] = useState<User[]>([
        {
            id: 201,
            name: "Marco Steuer",
            username: "marcosteuer",
            avatar: "https://avatars.githubusercontent.com/u/8460711?v=4",
        },
        {
            id: 202,
            name: "Chen Li",
            username: "chenli",
            avatar: "https://avatars.githubusercontent.com/u/3198726?v=4",
        },
        {
            id: 203,
            name: "Sophia James",
            username: "sophiaj",
            avatar: "https://avatars.githubusercontent.com/u/7489775?v=4",
        },
        {
            id: 204,
            name: "David Ortiz",
            username: "davidortiz",
            avatar: "https://avatars.githubusercontent.com/u/16659427?v=4",
        },
    ]);

    // Settings data
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const handleDeleteAccount = () => {
        setShowDeleteModal(false);
        toast.success("Account deletion request submitted", {
            position: "top-right",
            autoClose: 3000,
        });
    };

    const handleRemoveFriend = (friendId: number) => {
        setFriends(friends.filter((friend) => friend.id !== friendId));
        toast.success("Friend removed successfully", {
            position: "top-right",
            autoClose: 3000,
        });
    };

    const handleMessageFriend = (friend: User) => {
        setActiveSection("messages");
        toast.info(`Opening chat with ${friend.name}`, {
            position: "top-right",
            autoClose: 2000,
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <ToastContainer />

            {/* Mobile header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center">
                    <h1 className="text-xl font-bold">AIrtistry</h1>
                    <span className="ml-1 text-xs bg-gradient-to-r from-purple-500 via-pink-400 to-teal-400 text-transparent bg-clip-text font-semibold">
                        AI Art Platform
                    </span>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="w-10 h-10 flex items-center justify-center text-gray-600 cursor-pointer">
                        <Search size={20} />
                    </button>
                    <MobileMenu currentUser={currentUser} activeSection={activeSection} onSectionChange={setActiveSection} />
                </div>
            </div>

            {/* Story viewer modal */}
            <StoryViewer 
                activeStory={activeStory}
                onClose={closeStory}
            />

            {/* Suggestions modal */}
            <SuggestionsModal 
                isOpen={suggestionsModalOpen}
                onClose={() => setSuggestionsModalOpen(false)}
                suggestions={allSuggestions}
                onFollowUser={handleFollowUser}
            />

            <div className="flex h-[calc(100vh-60px)] md:h-screen">
                {/* Sidebar (desktop) */}
                <Sidebar 
                    currentUser={currentUser} 
                    activeSection={activeSection} 
                    onSectionChange={setActiveSection} 
                />

                {/* Main content */}
                <div className="flex-1 bg-white overflow-y-auto">
                    {activeSection === "newsfeed" ? (
                        <NewsFeed
                            currentUser={currentUser}
                            posts={posts}
                            likedPosts={likedPosts}
                            activeCommentInput={activeCommentInput}
                            openDropdownId={openDropdownId}
                            commentText={commentText}
                            activeFeedFilter={activeFeedFilter}
                            onFeedFilterChange={setActiveFeedFilter}
                            onLikeToggle={handleLikeToggle}
                            onCommentToggle={handleCommentToggle}
                            onDropdownToggle={toggleDropdown}
                            onCommentSubmit={handleCommentSubmit}
                            onSavePost={savePost}
                            onHidePost={hidePost}
                            onReportPost={reportPost}
                            setCommentText={setCommentText}
                            onPostSubmit={handlePostSubmit}
                        />
                    ) : activeSection === "messages" ? (
                        <Messages currentUser={currentUser} />
                    ) : activeSection === "friends" ? (
                        <Friends 
                            friends={friends}
                            allSuggestions={allSuggestions}
                            fonts={{ heading: "system-ui", body: "system-ui" }}
                            onFollowUser={handleFollowUser}
                            onRemoveFriend={handleRemoveFriend}
                            onMessageFriend={handleMessageFriend}
                        />
                    ) : (
                        <Settings 
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            onDeleteAccount={handleDeleteAccount}
                            showDeleteModal={showDeleteModal}
                            setShowDeleteModal={setShowDeleteModal}
                        />
                    )}
                </div>

                {/* Right sidebar (only visible on desktop and for newsfeed) */}
                {activeSection === "newsfeed" && (
                    <RightSidebar 
                        stories={stories}
                        suggestions={suggestions}
                        recommendations={recommendations}
                        onStoryClick={handleStoryClick}
                        onOpenSuggestions={() => setSuggestionsModalOpen(true)}
                        onFollowUser={handleFollowUser}
                    />
                )}
            </div>
        </div>
    );
}
