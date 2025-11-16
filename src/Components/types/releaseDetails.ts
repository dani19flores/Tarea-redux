export interface ReleaseDetails {
    id: string;
    title: string;
    status?: string;
    date?: string;
    country?: string;
    barcode?: string;
    "track-count"?: number;

    "artist-credit": {
        name: string;
        artist: {
            id: string;
            name: string;
            "sort-name": string;
            disambiguation?: string;
        };
    }[];

    "label-info"?: {
        label: {
            id: string;
            name: string;
        };
    }[];

    media?: {
        id: string;
        format: string;
        "track-count": number;
        "disc-count": number;
    }[];
}
