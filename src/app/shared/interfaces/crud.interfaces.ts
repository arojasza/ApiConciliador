export type CrudOptions = 'CREATE' | 'EDIT' | 'DELETE';

export type CrudHandler = {
  [key in CrudOptions]: Function;
};

export interface CrudCommand<T> {
  method: CrudOptions;
  parameters: T ;
}
