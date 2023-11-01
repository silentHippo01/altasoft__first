import { gql, useQuery } from "@apollo/client";
import { MTable1 } from "./MTable1/MTable1";
import { MTable2 } from "./MTable2/MTable2";
import { MTable3 } from "./MTable3/MTable3";
import { getCharacters } from "./model/getCharacters";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const MTable = () => {

    const { loading, error, data } = useQuery(getCharacters);
    const queryClient = new QueryClient();

    return (
        <div>
            {/* <MTable1 />
            <MTable2 /> */}
            <QueryClientProvider client={queryClient}>
                <MTable3
                    // isLoading={loading}
                    // error={error}
                    charactersData={data}
                />
            </QueryClientProvider>
        </div>
    );
};
