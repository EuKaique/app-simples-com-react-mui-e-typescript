import { Environment } from "../../../environment";
import { Api } from "../axios-config";
import { IPersonDetail, TPersonWithTotalCount } from "./types";

const getAll = async (page = 1, fullname = ''): Promise<TPersonWithTotalCount | Error> => {
    try {
        const urlRelative = `/persons?_page=${page}&_limit=${Environment.LIMIT_OF_LINES}&fullname_like=${fullname}`;
        const { data, headers } = await Api.get(urlRelative);

        if(data) {
            return { data, totalCount: Number(headers['x-total-count'] || Environment.LIMIT_OF_LINES) };
        }
        return new Error('Erro ao listar registros');
    } catch (error) {
        return new Error((error as { message: string }).message || 'Erro ao carregar os registros');
    }
};

const getById = async (id: number): Promise<IPersonDetail | Error> => {
    try {
        const { data } = await Api.get(`/persons/${id}`);
        if(data) {
            return data;
        }
        return new Error('Erro ao buscar o registro');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao buscar o registro');
    }
};

const create = async (dados: Omit<IPersonDetail, 'id'>): Promise<number | Error> => {
    try {
        const { data } = await Api.post('/persons', dados);
        if(data) {
            return data.id;
        }
        return new Error('Erro ao criar o registro');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o registro');
    }
};

const updateById = async (id: number, dados: IPersonDetail): Promise<void | Error> => {
    try {
        await Api.put(`/persons/${id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro em atualizar registro');
    }
};

const removeById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/persons/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao excluir registro');
    }
};

export const PersonService = {
    getAll,
    getById,
    create,
    updateById,
    removeById
}