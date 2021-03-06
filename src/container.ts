import express = require('express');
import { createContainer, asClass } from "awilix"; 
import { scopePerRequest } from 'awilix-express';
import { TestService } from "./services/test.service";
import { SubscriptionMySQLRepository } from './services/repositories/implementation/mysql/subscription.respository';

export default (app: express.Application) => {
    const container = createContainer({
        injectionMode: "CLASSIC",
    });

    container.register({
        //repositories
        subscptionRepository: asClass(SubscriptionMySQLRepository).singleton(),

        //services
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
}