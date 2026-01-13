export interface HeaderData {
    totalCols: number;
    leftBorderFromIndex: number;
    data: HeaderMainData;
    lastColDoubleSpace: boolean;
}

export type HeaderTypes = "heading" | "links_with_image" | "button" | "break" | "links_wo_image" | "image_only" | "image_with_button"; 

export interface HeaderLink {
    name: string;
    link: string;
    image?: string;
}

export interface HeaderItemData {
    text?: string;
    links?: Array<HeaderLink>;
    image?: string
    theme?: string;
    link?: string
}

export interface HeaderItem {
    type: HeaderTypes;
    data?: HeaderItemData;
    text?: string; // Some heading types have text directly on the object
}

export interface HeaderMainData {
    [key: string]: Array<HeaderItem>;
}
