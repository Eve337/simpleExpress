import { AvailableResolutions, ResolutionsSet, VideoCreatePayload, VideoErrorResponse, VideoUpdatePayload } from "../models/videos.model";

const checkStringField = (fieldValue: string, fieldName: string, limit: number) => {
  const error = {
    message: '',
    field: fieldName,
  }

  if (typeof fieldValue !== 'string') {
    error.message = 'Invalid type';
    return error;
  }

  if (fieldValue.length > limit) {
    error.message = 'Invalid field length';
    return error;
  }

  return null;
}

const checkResolutions = (availableResolutions: AvailableResolutions[]) => {
  const error = {
    message: '',
    field: 'availableResolutions',
  }
  if (!Array.isArray(availableResolutions)) {
    error.message = 'Invalid type';
    return error;
  }
  if (!availableResolutions.length) {
    error.message = 'Need to add at least 1 resolution';
    return error;
  }
  availableResolutions.forEach((currentResolution) => {
    if (!ResolutionsSet.has(currentResolution)) {
      error.message = 'Invalid resolution';
    }
  });

  return error.message ? error : null;
}

const checkDownloadAvailability = (canBeDownloaded: boolean) => {
  const error = {
    message: '',
    field: 'canBeDownloaded',
  }
  if (typeof canBeDownloaded !== 'boolean') {
    error.message = 'Invalid type';
    return error;
  }
  return null;
}

const checkAgeRestriction = (age: number | null) => {
  const error = {
    message: '',
    field: 'minAgeRestriction',
  }
  if (age === null) {
    return null;
  }

  if (typeof age !== 'number') {
    error.message = 'Invalid type';
    return error;
  } 
  if (age < 1 || age > 18) {
    error.message = 'Invalid age';
    return error; 
  }
  return null;
}

const checkDate = (isoDate: string, fieldName: string) => {
  const error = {
    message: '',
    field: fieldName,
  }
  if (String(isoDate).length < 8) {
    error.message = 'Invalid date';
    return error;
  }

  if (isNaN(Date.parse(isoDate)) != false) {
    error.message = 'Invalid date';
    return error;
  }
  return null;
}


export const checkIsValidPayload = (payload: (VideoUpdatePayload | VideoCreatePayload), isUpdateReq: boolean) => {
  const { title, author, availableResolutions } = payload;
  const errors: VideoErrorResponse = { errorsMessages: [] };
  const checkedTitle = checkStringField(title, 'title', 40);
  const checkedAuthor = checkStringField(author, 'author', 20);
  const checkedResolutions = checkResolutions(availableResolutions);



  const errorsArr: ({ message: string; field: string; }| null) [] = [
    checkedTitle, checkedAuthor, checkedResolutions
  ];
 
  if (isUpdateReq) {
    const typedPayload = payload as VideoUpdatePayload;
    if ('canBeDownloaded' in typedPayload) errorsArr.push(checkDownloadAvailability(typedPayload.canBeDownloaded)); 
    if ('minAgeRestriction' in typedPayload) errorsArr.push(checkAgeRestriction(typedPayload.minAgeRestriction)); 
    if ('createdAt' in typedPayload) errorsArr.push(checkDate(typedPayload.createdAt, 'createdAt'));
    if ('publicationDate' in typedPayload) errorsArr.push(checkDate(typedPayload.publicationDate, 'publicationDate'));
  }
  
  errors.errorsMessages = errorsArr.filter((currentError) => currentError !== null) as { message: string; field: string; }[];
  return errors;
}