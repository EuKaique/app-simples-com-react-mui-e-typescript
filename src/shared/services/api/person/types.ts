export interface IPersonList {
    id: number;
    fullname: string;
    email: string;
    cityId: number;
}

export interface IPersonDetail {
    id: number;
    fullname: string;
    email: string;
    cityId: number;
}

export type TPersonWithTotalCount = {
    data: IPersonList[];
    totalCount: number;
}