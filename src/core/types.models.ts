
export type UserModel = {
    userID: number,
    name: string,
    surname: string,
    street: string,
    city: string,
    zip: string,
    isBuyer: boolean
};


export type WarehouseModel = {
    id: number,
    totalValue: number,
    seedType: string,
    userId: number
};


export type ProductionModel = {
    id: number,
    name: string,
    year: string,
    totalIncome: number,
    totalOutcome: number,
    totalWeight: number,
    cleanIncome: number,
    userId: number
};


export type LandModel = {
    id: number,
    name: string,
    seedType: string,
    latitude: number,
    longitude: number,
    userId: number
};


export type IncomeModel = {
    id: number,
    name: string,
    value: number,
    valueType: string,
    productionId: number,
    landId: number
};


export type OutcomeModel = {
    id: number,
    name: string,
    value: number,
    valueType: string,
    productionId: number,
    landId: number
};


export type ToolModel = {
    id: number,
    name: string,
    type: string,
    boughtConst: number,
    boughtDate: string,
    userId: number
};


export type MaintenanceModel = {
    id: number,
    name: string,
    description: string,
    totalCost: number,
    date: string,
    productionId: number
};


export type ProductModel = {
    productID: number,
    desc: string,
    name: string,
    price: number,
    warehouseId: number
};


export type OrderModel = {
    orderID: number,
    submitDate: string,
    receivedDate: string,
    hasCompleted: boolean,
    hasCancelled: boolean,
    totalPayment: number,
    buyerId: number
};


export const seedTypes: Array<string> = [
    'OLIVES',
    'WHEAT',
    'PEACHES',
    'TOMATOES',
    'CUCUMBERS',
    'NUTS',
    'CABBAGES',
    'OTHER'
];


export const valueTypes: Array<string> = [
    'CURRENCY',
    'WEIGHT',
    'VOLUME'
];


export const toolTypes: Array<string> = [
    'VEHICLE',
    'TRACTOR_EQUIPMENT',
    'OTHER'
];