export interface CustomFieldModel {
  id: string
  name: string
  type: string
  value: string
  required: boolean
  readonly: boolean
  sensitive: boolean
  seekable: boolean
  hidden: boolean
}
