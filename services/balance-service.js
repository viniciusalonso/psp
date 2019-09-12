import { sequelize } from '../models';

class BalanceService {

    make() {
        let query = `select
        COALESCE
        (
            (
                select SUM(amount) from "Payables" where status = 'paid'
            ), 0
        ) as available,

            COALESCE(
                (
                    select SUM(amount) from "Payables" where status = 'waiting_funds'
                ), 0
            ) as waiting_funds
         FROM "Payables" limit 1`;


        return sequelize.query(query);
    }
}

export default BalanceService;
