import {Router} from 'express'
import { createVideo, getVideoById, getVideos, removeVideo, updateVideo } from '../../controllers/videos/videos.controller'
import { RouteUrls } from '../../constants/routes'

export const videosRouter = Router()

videosRouter.get(RouteUrls.ROOT, getVideos);
videosRouter.get(RouteUrls.ID, getVideoById);
videosRouter.post(RouteUrls.ROOT, createVideo);
videosRouter.put(RouteUrls.ID, updateVideo);
videosRouter.delete(RouteUrls.ID, removeVideo);
