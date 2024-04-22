export interface ICityList {
    id: number;
    name: string;
}

export interface ICityDetail {
    id: number;
    name: string;
}

export type TCityWithTotalCount = {
    data: ICityList[];
    totalCount: number;
}