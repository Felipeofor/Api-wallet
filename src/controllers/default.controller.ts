import { Request, Response } from 'express';
import { GET, route } from 'awilix-express';
import { TestService } from '../services/test.service';


export class DefaultController {
    constructor(private readonly testService: TestService) {
    }

    @GET()
    public index(req: Request, res: Response) {
        res.send('Hello world');
    }
  }
