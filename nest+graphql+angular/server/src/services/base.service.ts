export interface BaseService<T> {
    save(entity: T): Promise<T>;

    findAll(): Promise<Array<T>>;

    findOne(id: number): Promise<T>;
    
    remove(id: number): Promise<boolean>;
}