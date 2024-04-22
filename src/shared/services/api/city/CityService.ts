import { Environment } from "../../../environment";
import { Api } from "../axios-config";
import { ICityDetail, TCityWithTotalCount } from "./types";

const getAll = async (page = 1, filter = ''): Promise<TCityWithTotalCount | Error> => {
    try {
        const urlRelative = `/cities?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&name_like=${filter}`;
        const { data, headers } = await Api.get(urlRelative);

        if(data) {
            return { data, totalCount: Number(headers['x-total-count'] || Environment.LIMIT_OF_LINES) };
        }
        return new Error('Erro ao listar registros');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao carregar os registros');
    }
};

const getById = async (id: number): Promise<ICityDetail | Error> => {
    try {
        const { data } = await Api.get(`/cities/${id}`);
        if(data) {
            return data;
        }
        return new Error('Erro ao buscar o registro');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao buscar o registro');
    }
};

const create = async (dados: Omit<ICityDetail, 'id'>): Promise<number | Error> => {
    try {
        const { data } = await Api.post('/cities', dados);
        if(data) {
            return data.id;
        }
        return new Error('Erro ao criar o registro');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o registro');
    }
};

const updateById = async (id: number, dados: ICityDetail): Promise<void | Error> => {
    try {
        await Api.put(`/cities/${id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro em atualizar registro');
    }
};

const removeById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/cities/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao excluir registro');
    }
};

export const CityService = {
    getAll,
    getById,
    create,
    updateById,
    removeById
}