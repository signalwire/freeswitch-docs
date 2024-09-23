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
        apiKey: "HX0xo8DICPwi0uQTawpaB8XG8I6RzxdP",
    },

    // Optional: Typesense search parameters: https://typesense.org/docs/0.24.0/api/search.html#search-parameters
    typesenseSearchParameters: {},

    // Optional
    contextualSearch: true,
};
