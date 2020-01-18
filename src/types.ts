export type GenericObject = {
  [k: string]: any
}

export type KnackConstructorArgs = {
  appId: string
  apiKey: string
}

export type AuthenticateArgs = {
  email: string
  password: string
}

export type KnackSession = {
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

export type CreateObjectArgs = {
  objectKey: string
  data: GenericObject
}

export type CreateObjectResponse = {
  id: string
  [k: string]: any
}
