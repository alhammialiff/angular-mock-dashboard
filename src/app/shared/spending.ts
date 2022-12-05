import { SpentItem } from "./spentitem";

export class Spending{
    id: string;
    date: string;
    thisMonth: number;
    prevMonth: number;
    rollingAverage4: number;
    items: SpentItem[];
}