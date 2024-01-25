import { THUMBNAILS } from "./constants";

// utility function to join classes together
export function classNames( ...classes: string[] ) {
    return classes.filter( Boolean ).join(' ')
}

// utility function to get a random thumbnail for a post
export function getRandomThumbnail() {
    const thumb = THUMBNAILS[ Math.floor( Math.random() * THUMBNAILS.length ) ];
    return thumb;
}