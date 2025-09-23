export interface Release {
    id: string;
    score: number;
    "status-id"?: string;
    "packaging-id"?: string;
    "artist-credit-id"?: string;
    count?: number;
    title: string;
    status?: string;
    packaging?: string;
    "text-representation"?: {
        language?: string;
        script?: string;
    };
    "artist-credit": {
        name: string;
        artist: {
            id: string;
            name: string;
            "sort-name": string;
            disambiguation?: string;
        };
    }[];
    "release-group"?: {
        id: string;
        "type-id"?: string;
        "primary-type-id"?: string;
        title: string;
        "primary-type"?: string;
        "secondary-types"?: string[];
        "secondary-type-ids"?: string[];
    };
    date?: string;
    country?: string;
    "release-events"?: {
        date?: string;
        area?: {
            id: string;
            name: string;
            "sort-name": string;
            "iso-3166-1-codes": string[];
        };
    }[];
    barcode?: string;
    "label-info"?: {
        label: {
            id: string;
            name: string;
        };
    }[];
    "track-count"?: number;
    media?: {
        id: string;
        format?: string;
        "disc-count"?: number;
        "track-count"?: number;
    }[];
}

export interface ArtistCredit {
    name: string;
    artist: {
        id: string;
        name: string;
        "sort-name": string;
        disambiguation?: string;
    };
}


export interface Releases {
    created: string;
    offset: number;
    "artist-credit": ArtistCredit[];
    releases: Release[];
}
