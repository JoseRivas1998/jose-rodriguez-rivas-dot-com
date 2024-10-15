export type PortfolioTechnology = {
  id: number;
  name: string;
};

export type PortfolioEntry = {
  id: number;
  name: string;
  year: number;
  description: string;
  imageUrl: string;
  targetUrl: string;
  isOnGoing: boolean;
  technologies: PortfolioTechnology[];
};

export type Certification = {
  id: number;
  title: string;
  link: string;
  imageUrl: string;
  issueDate: string;
  expirationDate: string | null;
};
