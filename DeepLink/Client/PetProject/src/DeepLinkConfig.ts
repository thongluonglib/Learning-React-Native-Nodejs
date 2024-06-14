const config = {
    screens: {
        Home: {
            path: "home",
        },
        Profile: {
            path: "profile/:id",
            parse: {
                id: (id) => `${id}`,
            },
        },
        Notifications: "notifications",
        Settings: "settings",
    },
};

const DeepLinkConfig = {
    prefixes: ["demo://app"],
    config,
};

export default DeepLinkConfig;