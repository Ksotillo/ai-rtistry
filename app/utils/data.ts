import { Suggestion } from "@/app/types";

export const generateRandomUsers = (startId: number, count: number): Suggestion[] => {
    const suggestions: Suggestion[] = [];

    const firstNames = ["Alex", "Jamie", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Charlie", "Avery", "Quinn"];
    const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];

    for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const randomUserId = Math.floor(Math.random() * 1000000);

        suggestions.push({
            id: startId + i,
            user: {
                id: startId + i + 10,
                name: `${firstName} ${lastName}`,
                username: `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
                avatar: `https://avatars.githubusercontent.com/u/${randomUserId}?v=4`,
            },
            followed: false,
        });
    }

    return suggestions;
}; 