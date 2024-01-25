import Link from "next/link";

// LinkButton is a wrapper around the Link component from next/link
export default function LinkButton(
    {
        href, 
        className, 
        content
    } : {
        href: string,
        className: string,
        content: string
    }
) {
    return <Link href={href} className={className}>{content}</Link>;
}