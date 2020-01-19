# knack-sdk
An unofficial SDK for working with the [Knack](https://www.knack.com/) [API](https://www.knack.com/developer-documentation/). For more information about Knack and their products click [here](https://www.knack.com/), and for documentation on their API click [here](https://www.knack.com/developer-documentation/).

## Install
```bash
npm install knack-sdk
```

## Setup and Usage
```ts
import Knack from 'knack-sdk'

const knack = new Knack({ appId: 'your-app-id', apiKey: 'your-api-key' })

const record = await knack.createRecord({ objectKey: 'object_123', data: { field_234: 'field data' } })
const foundRecord = await knack.getRecord({ objectKey: 'object_123', recordId: record.id })
const updatedRecord = await knack.updateRecord({ objectKey: 'object_123', recordId: record.id, data: { field_234: 'better field data' } })
const { deleted } = await knack.deleteRecord({ objectKey: 'object_123', recordId: record.id })
```


## API

- [`constructor`](#constructor)
- [`#authenticate`](#authenticate)
- [`#createRecord`](#createRecord)
- [`#createViewRecord`](#createViewRecord)
- [`#deleteRecord`](#deleteRecord)
- [`#deleteViewRecord`](#deleteViewRecord)
- [`#getRecord`](#getRecord)
- [`#getRecords`](#getRecords)
- [`#updateRecord`](#updateRecord)
- [`#updateViewRecord`](#updateViewRecord)
- [`#uploadFile`](#uploadFile)

### constructor
The constructor function of the Knack Class. It only requires your `apiKey` and `apiId`. Returns an instance of the Knack Class.

```ts
new Knack({ appId: 'your-app-id', apiKey: 'your-api-key' })
```

### authenticate
Authenticate a user via their email and password, and stores their token for internal use.

```ts
knack.authenticate({ email: 'user@email.com', password: 'password' })
```

### createRecord
Creates a record in the Object of your choice.

```ts
const record = await knack.createRecord({ objectKey: 'object_123', data: { field_234: 'field data' } })
```

### createViewRecord
Creates a record in the Object of your choice, limited to a User's view.
```ts
const record = await knack.createViewRecord({ sceneKey: 'scene_123', viewKey: 'scene_134', data: { field_234: 'field data' } })
```

### deleteRecord
Deletes a record by object key and record id.
```ts
const { deleted } = await knack.deleteRecord({ objectKey: 'object_123', recordId: '123abc' })
```

### deleteViewRecord
Deletes a record based on a users' allowed actions.
```ts
const { deleted } = await knack.deleteRecord({ sceneKey: 'scene_123', viewKey: 'scene_134', recordId: '123abc' })
```

### getRecord
Gets a record by object key and record id.
```ts
const record = await knack.getRecord({ objectKey: 'object_123', recordId: '123abc' })
```

### getRecords
Gets record by object key and filters. Supports pagination and sorting.
```ts
const {
  current_page,
  records,
  total_pages,
  total_records
} = await knack.getRecords({
  objectKey: 'object_123',
  filters: {
    match: 'and',
    rules: [{
      field: 'field_31',
      operator: 'contains',
      value: 'from',
      field_name: 'Companies Name'
    }]
  }
})
```

### updateRecord
Updates a record for a type of Object.
```ts
const record = await knack.updateRecord({ objectKey: 'object_123', recordId: '123abc', data: { field_234: 'new field data' } })
```

### updateViewRecord
Updates a record of a type of Object, limited to a User's view.
```ts
const record = await knack.updateViewRecord({ sceneKey: 'scene_123', viewKey: 'scene_134', recordId: '123abc', data: { field_234: 'new field data' } })
```

### uploadFile
Uploads a file or image to a record in a designated field. File must be a readable stream.
```ts
const file = fs.createReadStream('path/to/your/file.jpg')
const record = await knack.uploadFile({ objectKey: 'object_123', fieldKey: 'field_234', file })
```

