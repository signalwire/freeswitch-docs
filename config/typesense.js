module.exports = {
    // Replace this with the name of your index/collection.
    // It should match the "index_name" entry in the scraper's "config.json" file.
    typesenseCollectionName: "freeswitch-docs",

    typesenseServerConfig: {
        nodes: [
            {
                host: "typesense.signalwire.cloud",
                protocol: "https",
                exports: 443,
            },
        ],
        apiKey: "3BGfXh8sbHygzha5XXFhFYAbW8Qw5vpT",
    },

    // Optional: Typesense search parameters: https://typesense.org/docs/0.24.0/api/search.html#search-parameters
    typesenseSearchParameters: {},

    // Optional
    contextualSearch: true,
};
