interface IConfig
{
    port: string;
    db: {
        username:   string;
        password:   string;
        host:       string;
        port:       string;
        database:   string;
    }
}

export const config: IConfig =
{
    port: process.env.PORT || "6969",
    db: {
        username:   "postgres",
        password:   "password",
        host:       "localhost",
        port:       "5432",
        database:   "techtest"
    }
}