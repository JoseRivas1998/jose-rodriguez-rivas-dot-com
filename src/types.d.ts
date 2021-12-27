export type PortfolioTechnology = {
    id: number;
    name: string;
}

export type PortfolioEntry = {
    id: number;
    name: string;
    year: number;
    description: string;
    imageUrl: string;
    targetUrl: string;
    onGoing: boolean;
    technologies: PortfolioTechnology[];
}
