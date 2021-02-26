import { Pool } from 'pg';
import { config } from "../config"

export default new Pool({
    max: 20,
    connectionString: 'postgres://' + config.db.username + ':' + config.db.password + '@' + config.db.host + ':' + config.db.port + '/' + config.db.database,
    idleTimeoutMillis: 30000
});