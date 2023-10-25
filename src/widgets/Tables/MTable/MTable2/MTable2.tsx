import { useEffect, useState } from 'react';
import cls from './MTable2.module.scss';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';


export const MTable2 = () => {

    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(0);
    const [info, setInfo] = useState();
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchCharacter = async (page: number) => {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
                .then(res => res.json());
            setCharacters(response.results)
            setInfo(response.info)
        } catch (e) {
            throw new Error(e);
        }
    }

    useEffect(() => {
        fetchCharacter(page);
    }, [page])

    console.log(characters);
    console.log(info);

    const columns = [
        {
            id: 'id',
            label: 'id',
            width: 20,
        },
        {
            id: 'name',
            label: 'name',
            width: 200,
        },
        {
            id: 'gender',
            label: 'gender',
            width: 200,
        },
        {
            id: 'status',
            label: 'status',
            width: 200,
        }

    ]

    const handleChangePage = (event: unknown, newPage: number) => {
        console.log(page)
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <Typography variant='h6' component={'h3'} sx={{ mb: '20px', mt: '30px' }}>
                Таблица из базовой версии MUI, с динамической подгрузкой
            </Typography>
            <TableContainer sx={{ maxWidth: 730 }}>
                <Table>
                    <TableHead >
                        <TableRow hover>
                            {
                                columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align='center'
                                    >
                                        {column.label}

                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            characters
                                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(character => {
                                    return (
                                        <TableRow>
                                            {
                                                columns.map(column => {
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            style={{ minWidth: column.width }}
                                                            align='center'
                                                        >
                                                            {character[column.id]}
                                                        </TableCell>
                                                    )
                                                })
                                            }
                                        </TableRow>
                                    )
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                rowsPerPage={rowsPerPage}
                component="div"
                //@ts-ignore
                count={info ? info?.pages : 10}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};
