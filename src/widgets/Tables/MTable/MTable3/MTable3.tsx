import { ApolloError } from "@apollo/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
    MRT_ColumnDef,
    MRT_ColumnFiltersState,
    MRT_SortingState,
    MRT_Virtualizer,
    MRT_VisibilityState,
    MaterialReactTable,
    useMaterialReactTable
} from "material-react-table";
import { useCallback, useEffect, useMemo, useRef, useState, type UIEvent, } from "react";

export type Person = {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
};

interface Character {
    id?: number;
    name?: string;
    status?: string;
    species?: string;
    type?: string;
    gender?: string;
    origin?: {
        name: string,
        url: string,
    },
    location: {
        name: string,
        url: string,
    }
    image?: string;
    episode?: string[];
    url?: string;
    created?: string;
}

// interface CharactersResponse {
//     characters?: {
//         info?: {
//             __typename?: string,
//             count?: number,
//             pages?: number,
//             next?: number,
//             prev?: number,
//         }
//         results?: Character[];
//     }
// }

interface CharactersResponse {
    info?: {
        count?: number,
        pages?: number,
        next?: number,
        prev?: number,
    },
    results?: Character[];
}

interface MTable3Props {
    // isLoading: boolean,
    // error: ApolloError;
    charactersData: CharactersResponse;
}

export const MTable3 = (props: MTable3Props) => {

    const {
        // isLoading,
        // error,
        charactersData
    } = props;
    // const data = charactersData?.characters?.results;

    const columns = useMemo<MRT_ColumnDef<Character>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'id',
            },
            {
                accessorKey: 'name',
                header: 'Имя',
            },
            {
                accessorKey: 'gender',
                header: 'Пол',
            },
            {
                accessorKey: 'species',
                header: 'Разновидность',
            },
        ],
        []
    )

    const [columnOrder, setColumnOrder] = useState(columns.map((c) => c.accessorKey))
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>({})
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [page, setPage] = useState(0);


    const rowVirtualizerInstanceRef = useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const { data, fetchNextPage, isError, isFetching, isLoading } = useInfiniteQuery<CharactersResponse>({
        queryKey: ['table-data', columnFilters, sorting],
        queryFn: async ({ pageParam }) => {
            const url = new URL(`https://rickandmortyapi.com/api/character/?page=${pageParam}`);
            url.searchParams.set('start', `${(pageParam as number) * 25}`);
            url.searchParams.set('size', `${50}`);
            url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
            url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

            const response = await fetch(url.href);
            const json = (await response.json()) as CharactersResponse;
            return json;
        },
        initialPageParam: 0,
        getNextPageParam: (_lastGroup, groups) => groups.length,
        refetchOnWindowFocus: false,
    })

    const flatData = useMemo(
        () => data?.pages.flatMap((page) => page?.results) ?? [],
        [data],
    )

    const totalDBRowCount = data?.pages?.[0]?.info.count;
    const totalFetched = flatData.length;

    const fetchMoreOnBottomReached = useCallback(
        (containerRefElement?: HTMLDivElement | null) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
                console.log('scrollHeight ' + scrollHeight)
                console.log('scrollTop ' + scrollTop)
                console.log('clientHeight ' + clientHeight)
                console.log(isFetching);
                console.log("totalFetched" + totalFetched);
                console.log("totalDBRowCount" + totalDBRowCount);
                // scrollHeight - длина скрола с уже подгруженными данными
                // scrollTop - сколько прокрутили 
                // clientHeight - сколько клиент видит, то есть высота таблицы
                if (
                    scrollHeight - scrollTop - clientHeight < 400 &&
                    !isFetching &&
                    totalFetched < totalDBRowCount
                ) {
                    fetchNextPage();
                }
            }
        },
        [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
    )

    useEffect(() => {
        //scroll to the top of the table when the sorting changes
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting, columnFilters]);

    useEffect(() => {
        fetchMoreOnBottomReached(tableContainerRef.current);
    }, [fetchMoreOnBottomReached]);

    const firstRender = useRef(true);

    useEffect(() => {
        const columnOrder = JSON.parse(localStorage.getItem('columnOrder'));
        const columnFilters = JSON.parse(localStorage.getItem('MRT_columnsFilter'));
        const columnVisibility = JSON.parse(localStorage.getItem('MRT_columnVisibility'));
        const sorting = JSON.parse(localStorage.getItem('MRT_sorting'));

        if (columnOrder) {
            setColumnOrder(columnOrder)
        }

        if (columnFilters) {
            setColumnFilters(columnFilters);
        }

        if (columnVisibility) {
            setColumnVisibility(columnVisibility)
        }

        if (sorting) {
            setSorting(sorting)
        }

        firstRender.current = false;
    }, [])

    useEffect(() => {
        if (firstRender.current) return;
        localStorage.setItem('columnOrder', JSON.stringify(columnOrder))
    }, [columnOrder]);

    useEffect(() => {
        if (firstRender.current) return;
        localStorage.setItem('MRT_columnsFilter', JSON.stringify(columnFilters))
        console.log(columnFilters)
    }, [columnFilters]);

    useEffect(() => {
        if (firstRender.current) return;
        localStorage.setItem('MRT_columnVisibility', JSON.stringify(columnVisibility))
        console.log(columnVisibility)
    }, [columnVisibility]);

    useEffect(() => {
        if (firstRender.current) return;
        localStorage.setItem('MRT_sorting', JSON.stringify(sorting))
        console.log(sorting)
    }, [sorting]);

    // const table = useMaterialReactTable({
    //     columns,
    //     data,
    //     enableColumnOrdering: true,
    //     state: {
    //         columnOrder,
    //         columnFilters,
    //         columnVisibility,
    //         sorting,
    //         isLoading
    //     },
    //     onColumnOrderChange: setColumnOrder,
    //     onColumnFiltersChange: setColumnFilters,
    //     onColumnVisibilityChange: setColumnVisibility,
    //     onSortingChange: setSorting,
    // })



    return (
        <>
            {/* <MaterialReactTable table={table} /> */}
            <MaterialReactTable
                columns={columns}
                // data={data ? data : []}
                data={flatData}
                enableRowNumbers
                enableColumnOrdering={true}
                state={{
                    columnOrder,
                    columnFilters,
                    columnVisibility,
                    sorting,
                    isLoading,
                    showAlertBanner: isError,
                    showProgressBars: isFetching,
                }}
                onColumnOrderChange={setColumnOrder}
                onColumnFiltersChange={setColumnFilters}
                onColumnVisibilityChange={setColumnVisibility}
                onSortingChange={setSorting}
                rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
                rowVirtualizerOptions={{ overscan: 4 }}
                enablePagination={false}
                enableRowVirtualization
                manualSorting
                muiTableContainerProps={{
                    ref: tableContainerRef, //get access to the table container element
                    sx: { maxHeight: '600px' }, //give the table a max height
                    onScroll: (
                        event: UIEvent<HTMLDivElement>, //add an event listener to the table container element
                    ) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
                }}
                muiToolbarAlertBannerProps={
                    isError
                        ? {
                            color: 'error',
                            children: 'Error loading data',
                        }
                        : undefined
                }
            />
        </>
    );
};
