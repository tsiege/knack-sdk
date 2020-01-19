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
  DeleteViewRecordArgs
} from './types'

const knackUrl = 'https://api.knack.com/v1/'

export default class Knack {
  private apiKey: string
  private appId: string
  private token: string
  constructor(args: KnackConstructorArgs) {
    assertType<KnackConstructorArgs>(args)
    const { appId, apiKey } = args
    this.appId = appId
    this.apiKey = apiKey
  }

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

  createRecord(args: CreateRecordArgs) {
    assertType<CreateRecordArgs>(args)
    const { objectKey, data: json } = args
    return this.request<ObjectPayload>(`objects/${objectKey}/records`, {
      method: 'POST',
      json
    })
  }

  createViewRecord(args: CreateViewRecordArgs) {
    assertType<CreateViewRecordArgs>(args)
    const { sceneKey, viewKey, data: json } = args
    return this.request<ViewRecordPayload>(
      `pages/${sceneKey}/views/${viewKey}/records`,
      { method: 'POST', json }
    )
  }

  deleteRecord(args: DeleteRecordArgs) {
    assertType<DeleteRecordArgs>(args)
    const { objectKey, recordId } = args
    return this.request<DeletePayload>(`objects/${objectKey}/records/${recordId}`, {
      method: 'DELETE'
    })
  }

  deleteViewRecord(args: DeleteViewRecordArgs) {
    assertType<DeleteViewRecordArgs>(args)
    const { sceneKey, viewKey, recordId } = args
    return this.request<DeletePayload>(
      `pages/${sceneKey}/views/${viewKey}/records/${recordId}`,
      { method: 'DELETE' }
    )
  }

  getRecord(args: GetRecordArgs) {
    assertType<GetRecordArgs>(args)
    const { objectKey, recordId } = args
    return this.request<ObjectPayload>(
      `objects/${objectKey}/records/${recordId}`
    )
  }

  getRecords(args: GetRecordsArgs) {
    assertType<GetRecordsArgs>(args)
    const { filters, format, objectKey, page, rows_per_page, sort_field, sort_order } = args
    const searchParams = {
      ...(filters && { filters: JSON.stringify(filters) }),
      ...(format && { format }),
      ...(page && { page }),
      ...(rows_per_page && { rows_per_page }),
      ...(sort_field && { sort_field }),
      ...(sort_order && { sort_order })
    }
    return this.request<GetRecordsPayload>(
      `objects/${objectKey}/records`,
      { method: 'GET', searchParams }
    )
  }

  updateRecord(args: UpdateRecordArgs) {
    assertType<UpdateRecordArgs>(args)
    const { objectKey, data: json, recordId } = args
    return this.request<ObjectPayload>(`objects/${objectKey}/records/${recordId}`, {
      method: 'PUT',
      json
    })
  }

  updateViewRecord(args: UpdateViewRecordArgs) {
    assertType<UpdateViewRecordArgs>(args)
    const { sceneKey, viewKey, data: json, recordId } = args
    return this.request<ViewRecordPayload>(
      `pages/${sceneKey}/views/${viewKey}/records/${recordId}`,
      { method: 'PUT', json }
    )
  }

  private async request<response>(
    path: string,
    { method = 'GET', json, searchParams }: { json?: GenericObject; method: Method; searchParams?: GenericObject } = {
      method: 'GET'
    }
  ) {
    const { body } = await got(path, {
      prefixUrl: knackUrl,
      headers: {
        'X-Knack-Application-Id': this.appId,
        'X-Knack-REST-API-Key': this.apiKey,
        token: this.token
      },
      method,
      ...(json && { json }),
      ...(searchParams && { searchParams })
    })

    return JSON.parse(body) as response
  }
}
