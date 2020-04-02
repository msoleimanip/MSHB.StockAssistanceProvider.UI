export class Feed {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
}

export class Enclosure {
    link: string;
    type: string;
    length: number;
}

export class Item {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
    enclosure: Enclosure;
    categories: any[];
}

export class FeedViewModel {
    status: string;
    feed: Feed;
    items: Item[];
}