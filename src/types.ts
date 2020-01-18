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

export interface ObjectResponse {
  id: string
  [k: string]: any
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
