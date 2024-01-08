import { Injectable } from '@nestjs/common';
import * as mysql from "@mysql/xdevapi";

import { IncomeModel, LandModel, OutcomeModel, ProductionModel, UserModel } from 'src/core/types.models';

@Injectable()
export class MysqlService
{
    private readonly session_config = {user: "agro_admin", password: "0401", schema: "agro_trade"};

    constructor()
    {
        mysql.getSession(this.session_config)
    }

    addFarmer(user: UserModel): Promise<boolean>
    {   
        return new Promise( async (res, rej)=>
        {
            try
            {
                const session: mysql.Session = await mysql.getSession(this.session_config);

                const sql_string = `call add_farmer(
                    ${user.userID},\
                    "${user.name}",\
                    "${user.surname}",\
                    ${user.street ? `"${user.street}"` : null},\
                    ${user.city ? `"${user.city}"` : null},\
                    ${user.zip ? `"${user.zip}"` : null});`;

                await session.sql(sql_string).execute();

                session.close();

                res(true);
            }

            catch(err)
            {
                rej(err);
            }

        });
    }



    addBuyer(user: UserModel): Promise<boolean>
    {   
        return new Promise( async (res, rej)=>
        {
            try
            {
                const session: mysql.Session = await mysql.getSession(this.session_config);

                const sql_string = `call add_buyer(
                    ${user.userID},\
                    "${user.name}",\
                    "${user.surname}",\
                    ${user.street ? `"${user.street}"` : null},\
                    ${user.city ? `"${user.city}"` : null},\
                    ${user.zip ? `"${user.zip}"` : null});`;

                await session.sql(sql_string).execute();

                session.close();

                res(true);
            }

            catch(err)
            {
                rej(err);
            }

        });

    }


    getUsers(farmer: boolean): Promise<Array<UserModel>>
    {   
        return new Promise( async (res, rej)=>
        {
            try
            {
                const session: mysql.Session = await mysql.getSession(this.session_config);
                
                let sql_string;

                if (farmer == true)
                    sql_string = `SELECT * from tb_farmers;`;

                else
                    sql_string = `SELECT * from tb_buyers;`;

                console.log(`[getUsers]: ${sql_string}`);

                const result = await session.sql(sql_string).execute();

                let users: Array<UserModel> = [];

                result.fetchAll().forEach((row)=>
                {
                    users.push({
                        userID  :row[0] as number,
                        name    :row[1] as string,
                        surname :row[2] as string,
                        street  :row[3] as string,
                        city    :row[4] as string,
                        zip     :row[5] as string,
                        isBuyer :!farmer
                    });
                });


                session.close();

                res(users);
            }

            catch(err)
            {
                rej(err);
            }

        });

    }




    getFarmer(farmerId: number): Promise<UserModel>
    {   
        return new Promise( async (res, rej)=>
        {
            try
            {
                const session: mysql.Session = await mysql.getSession(this.session_config);
                
                let sql_string = `SELECT * from tb_farmers WHERE m_userID=${farmerId};`;

                const result = await session.sql(sql_string).execute();

                const row = result.fetchOne();

                let farmer: UserModel =
                {
                        userID  :row[0] as number,
                        name    :row[1] as string,
                        surname :row[2] as string,
                        street  :row[3] as string,
                        city    :row[4] as string,
                        zip     :row[5] as string,
                        isBuyer :false
                };


                session.close();

                res(farmer);
            }

            catch(err)
            {
                rej(err);
            }

        });
    }




    getProductions(farmerId: number): Promise<Array<ProductionModel>>
    {   
        return new Promise( async (res, rej)=>
        {
            try
            {
                const session: mysql.Session = await mysql.getSession(this.session_config);
                
                let sql_string = `call get_productions(${farmerId});`;

                const result = await session.sql(sql_string).execute();

                let productions: Array<ProductionModel> = [];

                
                result.fetchAll().forEach((row)=>
                {
                    productions.push({
                        id          :row[0] as number,
                        name        :row[1] as string,
                        year        :row[2] as string,
                        totalIncome :row[3] as number,
                        totalOutcome:row[4] as number,
                        cleanIncome :row[5] as number,
                        totalWeight :row[6] as number,
                        userId      : farmerId
                    });
                });


                session.close();

                res(productions);
            }

            catch(err)
            {
                rej(err);
            }

        });
    }

    getProduction(productionId: number): Promise<ProductionModel>
    {   
        return new Promise( async (res, rej)=>
        {
            try
            {
                const session: mysql.Session = await mysql.getSession(this.session_config);
                
                let sql_string = `SELECT * from tb_productions WHERE m_id=${productionId};`;

                const result = await session.sql(sql_string).execute();

                const row = result.fetchOne();

                let production: ProductionModel =
                {
                        id          : row[0] as number,
                        name        : row[1] as string,
                        year        : row[2] as string,
                        totalIncome : row[3] as number,
                        totalOutcome: row[4] as number,
                        cleanIncome : row[5] as number,
                        totalWeight : row[6] as number,
                        userId      : row[7] as number,
                };


                session.close();

                res(production);
            }

            catch(err)
            {
                rej(err);
            }

        });
    }


    getLands(farmerId: number): Promise<Array<LandModel>>
    {   
        return new Promise( async (res, rej)=>
        {
            try
            {
                const session: mysql.Session = await mysql.getSession(this.session_config);
                
                let sql_string = `SELECT * from tb_lands WHERE m_farmerId=${farmerId};`;

                const result = await session.sql(sql_string).execute();

                let lands: Array<LandModel> = [];

                result.fetchAll().forEach((row)=>
                {
                    lands.push({
                        id          : row[0] as number,
                        name        : row[1] as string,
                        seedType    : row[2] as string,
                        latitude    : row[3] as number,
                        longitude   : row[4] as number,
                        userId      : farmerId
                    });
                });


                session.close();

                res(lands);
            }

            catch(err)
            {
                rej(err);
            }

        });
    }




    getIncomes(productionId: number): Promise<Array<IncomeModel>>
    {   
        return new Promise( async (res, rej)=>
        {
            try
            {
                const session: mysql.Session = await mysql.getSession(this.session_config);
                
                let sql_string = `SELECT * FROM tb_incomes WHERE m_productionId=${productionId};`;

                const result = await session.sql(sql_string).execute();

                let incomes: Array<IncomeModel> = [];

                
                result.fetchAll().forEach((row)=>
                {

                    incomes.push({
                        id              : row[0] as number,
                        name            : row[1] as string,
                        value           : row[2] as number,
                        valueType       : row[3] as string,
                        productionId    : row[4] as number,
                        landId          : row[5] as number
                    });
                });


                session.close();

                res(incomes);
            }

            catch(err)
            {
                rej(err);
            }

        });
    }




    getOutcomes(productionId: number): Promise<Array<OutcomeModel>>
    {   
        return new Promise( async (res, rej)=>
        {
            try
            {
                const session: mysql.Session = await mysql.getSession(this.session_config);
                
                let sql_string = `SELECT * FROM tb_outcomes WHERE m_productionId=${productionId};`;

                const result = await session.sql(sql_string).execute();

                let outcomes: Array<OutcomeModel> = [];

                
                result.fetchAll().forEach((row)=>
                {

                    outcomes.push({
                        id              : row[0] as number,
                        name            : row[1] as string,
                        value           : row[2] as number,
                        valueType       : row[3] as string,
                        productionId    : row[4] as number,
                        landId          : row[5] as number
                    });
                });


                session.close();

                res(outcomes);
            }

            catch(err)
            {
                rej(err);
            }

        });
    }



    /*
    	CREATE DEFINER='agro_farmer'@'localhost' PROCEDURE add_production(
        IN name_ CHAR(40),
        IN year_ INT,
        IN farmerId BIGINT -- Is guranteed to be the users actual id. Backend should retrieve it from a token hash.
        )
    */
    addProduction(farmerId: string, production: ProductionModel): Promise<boolean>
    {   
        return new Promise( async (res, rej)=>
        {
            try
            {
                const session: mysql.Session = await mysql.getSession(this.session_config);

                const sql_string = `call add_production(
                    "${production.name}",\
                    ${production.year},\
                    ${farmerId});`;

                await session.sql(sql_string).execute();

                session.close();

                res(true);
            }

            catch(err)
            {
                rej(err);
            }

        });
    }



    /*
    IN name_ CHAR(40),
    IN latitude REAL,
    IN longitude REAL,
    IN seedType ENUM('OLIVES','WHEAT','PEACHES','TOMATOES', 'CUCUMBERS', 'NUTS', 'CABBAGES', 'OTHER'),
    IN farmerId BIGINT -- Is guranteed to be the users actual id. Backend should retrieve it from a token hash.
    */
    addLand(farmerId: string, land: LandModel): Promise<boolean>
    {   
        return new Promise( async (res, rej)=>
        {
            try
            {
                const session: mysql.Session = await mysql.getSession(this.session_config);

                const sql_string = `call add_land(
                    "${land.name}",\
                    ${land.latitude},\
                    ${land.longitude},\
                    "${land.seedType}",\
                    ${farmerId});`;

                await session.sql(sql_string).execute();

                session.close();

                res(true);
            }

            catch(err)
            {
                rej(err);
            }

        });
    }
}
