import * as yup from 'yup';
import {
  REQUIRED_TEXT,
  SUPPORTED_SIZE,
  SUPPORTED_FORMAT
} from 'constants/global';
import { UploadFile } from 'antd';

export type RegisterThirdStepForm = {
  POI: UploadFile<any> | undefined;
  CWC1: UploadFile<any> | undefined;
  POI2: UploadFile<any> | undefined;
  POA: UploadFile<any> | undefined;
  director_appointment: UploadFile<any> | undefined;
  notarized_attorny: UploadFile<any> | undefined;
  assocation_articles: UploadFile<any> | undefined;
};
export type RegThirdStep = {
  id?: string | undefined;
  'docs[POI]': UploadFile<any> | undefined;
  'docs[CWC1]': UploadFile<any> | undefined;
  'docs[POI2]': UploadFile<any> | undefined;
  'docs[POA]': UploadFile<any> | undefined;
  'docs[director_appointment]': UploadFile<any> | undefined;
  'docs[notarized_attorny]': UploadFile<any> | undefined;
  'docs[assocation_articles]': UploadFile<any> | undefined;
};

export const reqDocSchema = yup.object().shape({
  POI: yup
    .mixed<File>()
    .required(REQUIRED_TEXT)
    .test('fileSize', 'The file is too large', (file: any) => {
      return file && file.size <= SUPPORTED_SIZE;
    })
    .test('fileType', 'Unsupported file format', (value) =>
      SUPPORTED_FORMAT.includes(value?.type || '')
    ),
  CWC1: yup
    .mixed<File>()
    .required(REQUIRED_TEXT)
    .test('fileSize', 'The file is too large', (file: any) => {
      return file && file.size <= SUPPORTED_SIZE;
    })
    .test('fileType', 'Unsupported file format', (value) =>
      SUPPORTED_FORMAT.includes(value?.type || '')
    ),
  POI2: yup
    .mixed<File>()
    .required(REQUIRED_TEXT)
    .test('fileSize', 'The file is too large', (file: any) => {
      return file && file.size <= SUPPORTED_SIZE;
    })
    .test('fileType', 'Unsupported file format', (value) =>
      SUPPORTED_FORMAT.includes(value?.type || '')
    ),
  POA: yup
    .mixed<File>()
    .required(REQUIRED_TEXT)
    .test('fileSize', 'The file is too large', (file: any) => {
      return file && file.size <= SUPPORTED_SIZE;
    })
    .test('fileType', 'Unsupported file format', (value) =>
      SUPPORTED_FORMAT.includes(value?.type || '')
    ),
  director_appointment: yup
    .mixed<File>()
    .required(REQUIRED_TEXT)
    .test('fileSize', 'The file is too large', (file: any) => {
      return file && file.size <= SUPPORTED_SIZE;
    })
    .test('fileType', 'Unsupported file format', (value) =>
      SUPPORTED_FORMAT.includes(value?.type || '')
    ),
  notarized_attorny: yup
    .mixed<File>()
    .required(REQUIRED_TEXT)
    .test('fileSize', 'The file is too large', (file: any) => {
      return file && file.size <= SUPPORTED_SIZE;
    })
    .test('fileType', 'Unsupported file format', (value) =>
      SUPPORTED_FORMAT.includes(value?.type || '')
    ),
  assocation_articles: yup
    .mixed<File>()
    .required(REQUIRED_TEXT)
    .test('fileSize', 'The file is too large', (file: any) => {
      return file && file.size <= SUPPORTED_SIZE;
    })
    .test('fileType', 'Unsupported file format', (value) =>
      SUPPORTED_FORMAT.includes(value?.type || '')
    )
});
