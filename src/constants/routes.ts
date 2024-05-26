export enum RouteUrls {
  ROOT = '/',
  API = 'api',
  VIDEOS = '/videos',
  TESTING = '/testing/all-data',
  ID = '/:id',
  HOMETASK_ONE = '/hometask_01'
} 


export const Endpoints = {
  VIDEOS: RouteUrls.HOMETASK_ONE + RouteUrls.ROOT + RouteUrls.API + RouteUrls.VIDEOS,
  TESTING: RouteUrls.HOMETASK_ONE + RouteUrls.ROOT + RouteUrls.API + RouteUrls.TESTING,
}