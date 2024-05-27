import { Request, Response } from "express";
import { db } from "../../db/db";
import { VideoCreatePayload, VideoEntity, VideoUpdateEntity } from "../../models/videos.model";
import dayjs from "dayjs";

export const getVideos = (request: Request, response: Response) => {
  response.status(200).json(db.videos);
  return;
}

export const createVideo = (request: Request<any, any, VideoCreatePayload>, response: Response) => {
  const { body: {
    title,
    author,
    availableResolutions,
  }} = request;

  const creationDate = new Date().toISOString();
  const publicationDate = dayjs(creationDate).add(1, 'day').toISOString()
  const newId = db.videos.length + 1;
  const newVideo: VideoEntity = {
    id: newId,
    title: title,
    author: author,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: creationDate,
    publicationDate: publicationDate,
    availableResolutions: availableResolutions,
  }

  db.videos.push(newVideo);

  response.status(201).json(newVideo);
  return;
}

export const getVideoById = (request: Request, response: Response) => {
  const { params: { id } } = request
  const videoById = db.videos.find((currentVideo) =>  currentVideo.id === Number(id));
  if (videoById) {
    response.status(200);
    response.send(videoById).json();
  }

  
  response.status(404).send('Video not found');
}

export const updateVideo = (request: Request<any, any, VideoUpdateEntity>, response: Response) => {
  const { params: { id }, body } = request;
  const videoByIdIndex = db.videos.findIndex((currentVideo) =>  currentVideo.id === Number(id));
  if (videoByIdIndex > -1) {
    const updatedEntity = {
      ...db.videos[videoByIdIndex],
      ...body
    }
    db.videos[videoByIdIndex] = updatedEntity; 
    response.status(204).json(updatedEntity);
  }
  response.status(404).send('Video not found');
}

export const removeVideo = (request: Request, response: Response) => {
  const { params: { id } } = request;
  const videoByIdIndex = db.videos.findIndex((currentVideo) => currentVideo.id === Number(id));
  if (videoByIdIndex > -1) {
    db.videos.splice(videoByIdIndex, 1);
    response.status(204).send();
  }
  response.status(404).send();
}