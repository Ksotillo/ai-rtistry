/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { stabilizeAvatarUrl, isGithubAvatarUrl } from "@/app/utils/avatar";

type AvatarImageProps = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
    fill?: boolean;
};

export default function AvatarImage({
    src,
    alt,
    width,
    height,
    className,
    style,
    fill,
}: AvatarImageProps) {
    const stableUrl = stabilizeAvatarUrl(src);

    if (isGithubAvatarUrl(stableUrl)) {
        return (
            <img
                src={stableUrl}
                alt={alt}
                width={width}
                height={height}
                className={`${className || ""} ${fill ? "object-cover w-full h-full" : ""}`}
                style={{
                    ...(width && !fill ? { width: `${width}px` } : {}),
                    ...(height && !fill ? { height: `${height}px` } : {}),
                    ...style,
                }}
            />
        );
    }

    if (fill) {
        return <Image src={stableUrl} alt={alt} fill className={className || ""} style={style} />;
    }

    return <Image src={stableUrl} alt={alt} width={width!} height={height!} className={className || ""} style={style} />;
} 