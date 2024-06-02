export type AvailableResolutions = 'P144' | 'P240' | 'P360' | 'P480' | 'P720' | 'P1080' | 'P1440' | 'P2160';

export const ResolutionsSet = new Set<AvailableResolutions>(['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'])

export interface VideoCreatePayload {
  title: string;
  author: string;
  availableResolutions: AvailableResolutions[];
}

export interface VideoUpdatePayload extends VideoCreatePayload {
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
}

export interface VideoEntity {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: AvailableResolutions[];
}

export interface VideoErrorResponse {
  errorsMessages: {
    message: string;
    field: string;
  }[];
}

export interface VideoUpdateEntity extends Omit<VideoEntity, 'id'> {}