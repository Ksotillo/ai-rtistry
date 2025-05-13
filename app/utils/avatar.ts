// Avatar utility functions

export function isGithubAvatarUrl(url: string): boolean {
    return url.includes("avatars.githubusercontent.com");
}

export function stabilizeAvatarUrl(url: string): string {
    if (isGithubAvatarUrl(url)) {
        const match = url.match(/\/u\/(\d+)/);
        if (match) {
            return `https://avatars.githubusercontent.com/u/${match[1]}?v=4`;
        }
    }
    return url;
} 