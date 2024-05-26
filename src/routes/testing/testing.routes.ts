import {Router} from 'express';
import { RouteUrls } from '../../constants/routes';
import { deleteAllData } from '../../controllers/testing/testing.controller';

export const testingRouter = Router()

testingRouter.delete(RouteUrls.ROOT, deleteAllData);
