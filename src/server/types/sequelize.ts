import type {
  Association,
  Model,
  ModelAttributes,
  ModelCtor,
  ModelOptions,
  Sequelize,
} from 'sequelize';

export type ISequelize = Sequelize & {
  define<
    M extends Model,
    TCreationAttributes = M['_attributes'],
    TAssociations extends Record<string, Association> = Record<string, never>,
  >(
    modelName: string,
    attributes: ModelAttributes<M, TCreationAttributes>,
    options?: ModelOptions,
  ): ModelCtor<M> & { associations: TAssociations };
};
