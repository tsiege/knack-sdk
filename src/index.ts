import FormData from 'form-data'
import got, { Method } from 'got'
import { assertType } from 'typescript-is'
import {
  KnackConstructorArgs,
  AuthenticateArgs,
  KnackSession,
  ObjectPayload,
  GenericObject,
  CreateRecordArgs,
  CreateViewRecordArgs,
  GetRecordArgs,
  GetRecordsArgs,
  GetRecordsPayload,
  UpdateRecordArgs,
  UpdateViewRecordArgs,
  ViewRecordPayload,
  DeleteRecordArgs,
  DeletePayload,
  DeleteViewRecordArgs,
  UploadFileArgs,
  UploadPayload
} from './types'

const knackUrl = 'https://api.knack.com/v1/'

export default class Knack {
  private apiKey: string
  private appId: string
  private token: string
  /**
   * Constructor for the Knack class
   * @param args - KnackConstructorArgs
   * @param args.appId - The id of your Knack Application
   * @param args.apiKey - The API key of your Knack Application
   * @returns Promise<Knack Instance>
   */
  constructor(args: KnackConstructorArgs) {
    assertType<KnackConstructorArgs>(args)
    const { appId, apiKey } = args
    this.appId = appId
    this.apiKey = apiKey
  }
  /**
   * Authenticate a user via their email and password
   * @param args - AuthenticateArgs
   * @param args.email - User's email
   * @param args.password - User's password
   * @returns Promise<void>
   */
  async authenticate(args: AuthenticateArgs) {
    assertType<AuthenticateArgs>(args)
    const {
      session: {
        user: { token }
      }
    } = await this.request<KnackSession>(`applications/${this.appId}/session`, {
      method: 'POST',
      json: args
    })
    this.token = token
  }
  /**
   * Creates a record in the Object of your choice
   * @param args - CreateRecordArgs
   * @param args.objectKey - The desired Object where this record will live
   * @param args.data - JSON pojo of field keys with corresponding data
   * @returns Promise<ObjectPayload>
   */
  createRecord(args: CreateRecordArgs) {
    assertType<CreateRecordArgs>(args)
    const { objectKey, data: json } = args
    return this.request<ObjectPayload>(`objects/${objectKey}/records`, {
      method: 'POST',
      json
    })
  }
  /**
   * Creates a record in the Object of your choice, limited to a User's view
   * @param args - CreateViewRecordArgs
   * @param args.sceneKey - The scene key
   * @param args.viewKey - The view key
   * @param args.data - JSON pojo of field keys with corresponding data
   * @returns Promise<ViewRecordPayload>
   */
  createViewRecord(args: CreateViewRecordArgs) {
    assertType<CreateViewRecordArgs>(args)
    const { sceneKey, viewKey, data: json } = args
    return this.request<ViewRecordPayload>(
      `pages/${sceneKey}/views/${viewKey}/records`,
      { method: 'POST', json }
    )
  }
  /**
   * Deletes a record by object key and record id
   * @param args - DeleteRecordArgs
   * @param args.objectKey - The Object where this record lives
   * @param args.recordId - The Record's ID that it to be deleted
   * @returns Promise<DeletePayload>
   */
  deleteRecord(args: DeleteRecordArgs) {
    assertType<DeleteRecordArgs>(args)
    const { objectKey, recordId } = args
    return this.request<DeletePayload>(`objects/${objectKey}/records/${recordId}`, {
      method: 'DELETE'
    })
  }
  /**
   * Deletes a record based on a users' allowed actions
   * @param args - DeleteViewRecordArgs
   * @param args.sceneKey - The scene key
   * @param args.viewKey - The view key
   * @param args.recordId - The Record's ID that it to be deleted
   * @returns Promise<DeletePayload>
   */
  deleteViewRecord(args: DeleteViewRecordArgs) {
    assertType<DeleteViewRecordArgs>(args)
    const { sceneKey, viewKey, recordId } = args
    return this.request<DeletePayload>(
      `pages/${sceneKey}/views/${viewKey}/records/${recordId}`,
      { method: 'DELETE' }
    )
  }
  /**
   * Gets a record by object key and record id
   * @param args - GetRecordArgs
   * @param args.objectKey - The Object where this record lives
   * @param args.recordId - The Record's ID that it to be deleted
   * @returns Promise<ObjectPayload>
   */
  getRecord(args: GetRecordArgs) {
    assertType<GetRecordArgs>(args)
    const { objectKey, recordId } = args
    return this.request<ObjectPayload>(
      `objects/${objectKey}/records/${recordId}`
    )
  }
  /**
   * Gets record by object key and filters. Supports pagination and sorting
   * @param args - GetRecordsArgs
   * @param args.objectKey - The Object where this record lives
   * @param [args.format] - Format of the response `raw`, `html`, or `both`
   * @param [args.filters] - Filter rules for narrowing your results
   * @param [args.page] - Page you're requesting
   * @param [args.rowsPerPage] - Number of rows per page
   * @param [args.sortField] - Field to sort results on
   * @param [args.sortOrder] - Ascending (`asc`) or Descending (`desc`)
   * @returns Promise<GetRecordsPayload>
   */
  getRecords(args: GetRecordsArgs) {
    assertType<GetRecordsArgs>(args)
    const { filters, format, objectKey, page, rowsPerPage, sortField, sortOrder } = args
    const searchParams = {
      ...(filters && { filters: JSON.stringify(filters) }),
      ...(format && { format }),
      ...(page && { page }),
      ...(rowsPerPage && { rows_per_page: rowsPerPage }),
      ...(sortField && { sort_field: sortField }),
      ...(sortOrder && { sort_order: sortOrder })
    }
    return this.request<GetRecordsPayload>(
      `objects/${objectKey}/records`,
      { method: 'GET', searchParams }
    )
  }
  /**
   * Updates a record for a type of Object
   * @param args - UpdateRecordArgs
   * @param args.objectKey - The desired Object where this record is
   * @param args.recordId - The Record's ID that it to be updated
   * @param args.data - JSON pojo of field keys with corresponding data
   * @returns Promise<ObjectPayload>
   */
  updateRecord(args: UpdateRecordArgs) {
    assertType<UpdateRecordArgs>(args)
    const { objectKey, data: json, recordId } = args
    return this.request<ObjectPayload>(`objects/${objectKey}/records/${recordId}`, {
      method: 'PUT',
      json
    })
  }
  /**
   * Updates a record of a type of Object, limited to a User's view
   * @param args - UpdateViewRecordArgs
   * @param args.sceneKey - The scene key
   * @param args.viewKey - The view key
   * @param args.data - JSON pojo of field keys with corresponding data
   * @returns Promise<ViewRecordPayload>
   */
  updateViewRecord(args: UpdateViewRecordArgs) {
    assertType<UpdateViewRecordArgs>(args)
    const { sceneKey, viewKey, data: json, recordId } = args
    return this.request<ViewRecordPayload>(
      `pages/${sceneKey}/views/${viewKey}/records/${recordId}`,
      { method: 'PUT', json }
    )
  }
  /**
   * Uploads a file or image to a record in a designated field
   * @param args - UploadFileArgs
   * @param args.objectKey - The desired Object where this record will live
   * @param args.fieldKey - The desired Field where this file will be added
   * @param args.file - Readable Stream of the file you wish to upload
   * @returns Promise<ObjectPayload>
   */
  async uploadFile(args: UploadFileArgs) {
    assertType<string>(args.fieldKey)
    assertType<string>(args.objectKey)
    const { fieldKey, objectKey, file } = args
    const form = new FormData()
    form.append('files', file)
    const { id } = await this.request<UploadPayload>(`applications/${this.appId}/assets/file/upload`, {
      body: form,
      method: 'POST'
    })
    return this.createRecord({ objectKey, data: { [fieldKey]: id } })
  }

  private async request<response>(
    path: string,
    { method = 'GET', json, searchParams, body: submittedBody }: {
      body?: FormData
      json?: GenericObject
      method: Method
      searchParams?: GenericObject
    } = {
      method: 'GET'
    }
  ) {
    const { body } = await got(path, {
      prefixUrl: knackUrl,
      headers: {
        'X-Knack-Application-Id': this.appId,
        'X-Knack-REST-API-Key': this.apiKey,
        token: this.token,
      },
      method,
      ...(submittedBody && { body: submittedBody }),
      ...(json && { json }),
      ...(searchParams && { searchParams })
    })

    return JSON.parse(body) as response
  }
}
