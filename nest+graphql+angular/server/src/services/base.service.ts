export interface BaseService<T> {
  save: (entity: T) => Promise<T>

  findAll: () => Promise<T[]>

  findOne: (email: string) => Promise<T>

  remove: (id: number) => Promise<boolean>
}
