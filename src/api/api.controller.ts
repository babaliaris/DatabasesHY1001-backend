import { Controller, Get, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { request } from 'http';
import { IncomeModel, LandModel, ProductionModel, UserModel } from 'src/core/types.models';
import { MysqlService } from 'src/services/mysql/mysql.service';

@Controller('api')
export class ApiController
{
    constructor (readonly mysql: MysqlService)
    {

    }

    @Post("add_user")
    async addUser(@Req() request: Request)
    {
        const {isBuyer} = request.query;

        try
        {
            let value;

            if (isBuyer === 'true')
            {
                value = await this.mysql.addBuyer(request.body);
            }


            else
            {
                value = await this.mysql.addFarmer(request.body);
            }

            return value;
        }

        catch(err)
        {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get("get_all_users")
    async getUsers(@Req() request: Request)
    {
        const {farmer} = request.query;
        
        try
        {
            const users: Array<UserModel> = await this.mysql.getUsers(farmer === 'true');

            return users;
        }

        catch(err)
        {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get("/get_user")
    async getFarmer(@Req() request: Request)
    {
        const {farmerId} = request.query;

        try
        {
            const user: UserModel = await this.mysql.getFarmer((farmerId as any) as number);

            return user;
        }

        catch(err)
        {   
            console.log(err);
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get("get_all_productions")
    async getProductions(@Req() request: Request)
    {
        const {farmerId} = request.query;
        
        try
        {
            const productions: Array<ProductionModel> = await this.mysql.getProductions((farmerId as any) as number);

            return productions;
        }

        catch(err)
        {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get("/get_production")
    async getProduction(@Req() request: Request)
    {
        const {productionId} = request.query;

        try
        {
            const production: ProductionModel = await this.mysql.getProduction((productionId as any) as number);

            return production;
        }

        catch(err)
        {   
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get("get_all_lands")
    async getLands(@Req() request: Request)
    {
        const {farmerId} = request.query;

        try
        {
            const lands: Array<LandModel> = await this.mysql.getLands((farmerId as any) as number);

            return lands;
        }

        catch(err)
        {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Get("get_all_incomes")
    async getIncomes(@Req() request: Request)
    {
        const {landId, productionId} = request.query;

        try
        {
            const incomes: Array<IncomeModel> = await this.mysql.getIncomes(landId as string, productionId as string);

            return incomes;
        }

        catch(err)
        {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    @Get("get_all_outcomes")
    async getOutcomes(@Req() request: Request)
    {
        const {landId, productionId} = request.query;

        try
        {
            const outcomes: Array<IncomeModel> = await this.mysql.getOutcomes(landId as string, productionId as string);

            return outcomes;
        }

        catch(err)
        {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Post("add_production")
    async addProduction(@Req() request: Request)
    {
        const {farmerId} = request.query;

        try
        {
            const value = this.mysql.addProduction(farmerId as string, request.body);

            return value;
        }

        catch(err)
        {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Post("add_land")
    async addLand(@Req() request: Request)
    {
        const {farmerId} = request.query;

        try
        {
            const value = this.mysql.addLand(farmerId as string, request.body);

            return value;
        }

        catch(err)
        {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Post("add_income")
    async addIncome(@Req() request: Request)
    {
        const {farmerId, landId, productionId} = request.query;

        try
        {
            const value = this.mysql.addIncome(farmerId as string, landId as string, productionId as string, request.body);

            return value;
        }

        catch(err)
        {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @Post("add_outcome")
    async addOutcome(@Req() request: Request)
    {
        const {farmerId, landId, productionId} = request.query;

        try
        {
            const value = this.mysql.addOutcome(farmerId as string, landId as string, productionId as string, request.body);

            return value;
        }

        catch(err)
        {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
