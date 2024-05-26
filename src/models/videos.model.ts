export type AvailableResolutions = 'P144'| 'P240'| 'P360'| 'P480'| 'P720'| 'P1080'| 'P1440'| 'P2160';

export type VideoCreatePayload = {
  title: string;
  author: string;
  availableResolutions: AvailableResolutions[];
}

export interface VideoEntity {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: AvailableResolutions[] | null;
}

export interface VideoErrorResponse {
  errorMessages: {
    message: string;
    field: string;
  }[];
}

export interface VideoUpdateEntity extends Omit<VideoEntity, 'id' | 'createdAt'> {}