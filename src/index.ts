import got, { Method } from 'got'
import { assertType } from 'typescript-is'
import { KnackConstructorArgs, AuthenticateArgs, KnackSession, CreateObjectResponse, GenericObject, CreateObjectArgs } from './types'

const knackUrl = 'https://api.knack.com/v1/'

export default class Knack {
  private appId: string
  private apiKey: string
  private token: string
  constructor(args: KnackConstructorArgs) {
    assertType<KnackConstructorArgs>(args)
    const { appId, apiKey } = args
    this.appId = appId
    this.apiKey = apiKey
  }

  private async request<response>(path: string, { method, json }: { method: Method, json: GenericObject }) {
      const { body } = await got(path, {
        prefixUrl: knackUrl,
        headers: {
          'X-Knack-Application-Id': this.appId,
          'X-Knack-REST-API-Key': this.apiKey,
          token: this.token
        },
        method,
        json
      })

      return JSON.parse(body) as response
  }

  async authenticate(args: AuthenticateArgs) {
    assertType<AuthenticateArgs>(args)
    const { session: { user: { token } } } = await this.request<KnackSession>(`applications/${this.appId}/session`, { method: 'POST', json: args })
    this.token = token
  }

  createObject(args: CreateObjectArgs) {
    assertType<CreateObjectArgs>(args)
    const { objectKey, data: json } = args
    return this.request<CreateObjectResponse>(`objects/${objectKey}/records`, { method: 'POST', json })
  }

}


