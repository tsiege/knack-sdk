import { FilterStatement } from './filters'
import { Readable } from 'stream'
export { FilterStatement } from './filters'

export interface GenericObject {
  [k: string]: any
}

export interface KnackConstructorArgs {
  apiKey: string
  appId: string
}

export interface AuthenticateArgs {
  email: string
  password: string
}

export interface KnackSession {
  session: {
    user: {
      approval_status: string
      empty_pass: boolean
      id: string
      profile_keys: string[]
      profile_objects: GenericObject[]
      token: string
      utility_key: string
      values: GenericObject
    }
  }
}

export interface ObjectPayload extends GenericObject {
  id: string
}

export interface ViewRecordPayload {
  record: ObjectPayload
  submit_key: string
}

export interface CreateRecordArgs {
  data: GenericObject
  objectKey: string
}

export interface CreateViewRecordArgs {
  data: GenericObject
  sceneKey: string
  viewKey: string
}

export interface GetRecordArgs {
  objectKey: string
  recordId: string
}

export interface GetRecordsArgs {
  filters?: FilterStatement
  format?: 'raw' | 'html' | 'both'
  objectKey: string
  page?: number
  rows_per_page?: number
  sort_field?: string
  sort_order?: 'asc' | 'desc'
}

export interface GetRecordsPayload {
  current_page: number
  records: ObjectPayload[]
  total_pages: number
  total_records: number
}

export interface UpdateRecordArgs {
  data: GenericObject
  objectKey: string
  recordId: string
}

export interface UpdateViewRecordArgs {
  data: GenericObject
  recordId: string
  sceneKey: string
  viewKey: string
}

export interface DeleteRecordArgs {
  objectKey: string
  recordId: string
}

export interface DeleteViewRecordArgs {
  recordId: string
  sceneKey: string
  viewKey: string
}

export interface DeletePayload {
  delete: boolean
}

export interface UploadFileArgs {
  fieldKey: string
  file: Readable
  objectKey: string
}

export interface UploadPayload {
  filename: string,
  id: string,
  public_url: string,
  size: number
  thumb_url: string,
  type: string,
}
