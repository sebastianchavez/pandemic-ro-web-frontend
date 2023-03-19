export interface INews {
    idNews: number;
    image: string;
    inClient: boolean;
    inSlide: boolean;
    inWeb: boolean;
    link: string;
    description: string;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date;
} 