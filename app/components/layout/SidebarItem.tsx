"use client";

type SidebarItemProps = {
    icon: React.ReactNode;
    label: string;
    count?: number;
    isActive?: boolean;
    onClick?: () => void;
};

export default function SidebarItem({
    icon,
    label,
    count,
    isActive,
    onClick,
}: SidebarItemProps) {
    return (
        <li className="transform transition-transform duration-200 hover:translate-x-1">
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    if (onClick) onClick();
                }}
                className={`flex items-center p-4 rounded-lg mb-2 cursor-pointer transition-all duration-200 ${
                    isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
            >
                <div className={`w-6 h-6 mr-3 flex items-center justify-center transition-transform ${isActive ? "scale-110" : ""}`}>
                    {icon}
                </div>
                {label}
                {count && (
                    <span
                        className={`ml-auto ${
                            isActive ? "bg-white text-black" : "bg-gray-900 text-white"
                        } text-xs rounded-full w-5 h-5 flex items-center justify-center transition-colors duration-200`}
                    >
                        {count}
                    </span>
                )}
            </a>
        </li>
    );
} 