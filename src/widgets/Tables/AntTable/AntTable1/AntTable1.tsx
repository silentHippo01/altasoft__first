import { useEffect, useState } from 'react';
import cls from './AntTable1.module.scss';
import { Table, TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

interface DataType {
    id: number;
    name: string;
    gender: string;
    status: string;
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: (name: string) => `${name}`,
        width: '20%',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
            { text: 'Male', value: 'Male' },
            { text: 'Female', value: 'Female' },
            { text: 'Unknown', value: 'Unknown' },
        ],
        width: '20%',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        filters: [
            { text: 'alive', value: 'alive' },
            { text: 'dead', value: 'dead' },
            { text: 'Unknown', value: 'Unknown' },
        ],
        width: '20%',
    }
]

export const AntTable1 = () => {
    const [characters, setCharacters] = useState();
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState();
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        }
    })

    const fetchCharacter = async (page: number) => {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
                .then(res => res.json());
            setCharacters(response.results)
            setInfo(response.info)
            setLoading(false);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    //@ts-ignore
                    total: response?.info.pages,
                }
            })
        } catch (e) {
            throw new Error(e);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchCharacter(tableParams.pagination.current);
        console.log(tableParams);
    }, [])

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue>,
        sorter: SorterResult<DataType>,
    ) => {
        setTableParams({
            //@ts-ignore
            pagination,
            filters,
            ...sorter,
        })
    }

    return (
        <div>
            <Table
                columns={columns}
                dataSource={characters}
                rowKey={(record) => record.id}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
};
