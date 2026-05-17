import { HttpLink } from "@apollo/client";
import {
    registerApolloClient,
    ApolloClient,
    InMemoryCache,
} from "@apollo/client-integration-nextjs";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache({
            typePolicies: {
                Pokemon: {
                    keyFields: ["id"],
                }
            }
        }),
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_POKEMON_API,
            fetchOptions: { next: { revalidate: 3600 } }, // Revalidate every 1 hour
        }),
    });
});