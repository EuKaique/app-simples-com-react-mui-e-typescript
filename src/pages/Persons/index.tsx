import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"

import { Box, Icon, IconButton, Pagination, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";

import { useDebounce } from "../../shared/hooks";
import { ListingTools } from "../../shared/components"
import { LayoutBase } from "../../shared/layouts"
import { IPersonList } from "../../shared/services/api/person/types";
import { PersonService } from "../../shared/services/api/person/PersonService";
import { Environment } from "../../shared/environment";

export const Persons = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const { debounce } = useDebounce();
   const navigate = useNavigate();

   const [rows, setRows] = useState<IPersonList[]>([]);
   const [totalCount, setTotalCount] = useState(0);
   const [isLoading, setIsLoading] = useState(true);

    const search = useMemo(() => {
        return searchParams.get('search') || '';
    }, [searchParams]);

    const page = useMemo(() => {
        return Number(searchParams.get('page') || 1);
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PersonService
                .getAll(page, search)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    } else {
                        setRows(result.data);
                        setTotalCount(result.totalCount);
                    }
                })
            })
    }, [search, page]);

    const handleSearchParams = (event: string) => {
        setSearchParams({ search: event, page: '1' }, { replace: true });
    }

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            PersonService
                .removeById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        setRows(oldRows => [
                            ...oldRows.filter(row => row.id !== id)
                        ]);
                        alert('Registro excluido com sucesso!');
                    }
                })
        }
    }

    return (
        <LayoutBase
            titulo="Pessoas" 
            barraDeFerramentas={
                <ListingTools
                    showButton 
                    showInput
                    textSearch={search}
                    onTextSearchChange={handleSearchParams}
                    onClickButton={() => navigate('/persons/form')}
                />
            }
        >
            {isLoading ? 
              <Box sx={{ m: 1, width: 'auto' }}>
                <Skeleton height={60}/>
                <Skeleton height={60} animation="wave" />
                <Skeleton height={60} animation={false} />
                <Skeleton height={60} />
                <Skeleton height={60} animation="wave" />
                <Skeleton height={60} animation={false} />
              </Box>
            : 
                totalCount > 0 ?
                <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome completo</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell width={100}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.fullname}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>
                                        <IconButton size="small" onClick={() => navigate(`/persons/form/${row.id}`)}>
                                            <Icon color="info">edit</Icon>
                                        </IconButton>
                                        <IconButton size="small" onClick={() => handleDelete(row.id)}>
                                            <Icon color="error">delete</Icon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Pagination
                                        page={page} 
                                        count={Math.ceil(totalCount / Environment.LIMIT_OF_LINES)}
                                        onChange={
                                            (_, newPage) => setSearchParams({ search, page: newPage.toString() },
                                             { replace: true }
                                            )
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                : 
                <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{Environment.LIST_NULL}</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            }
        </LayoutBase>
    )
}