import {Model} from 'sequelize';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface BaseGroup {
  name: string;
  permissions: Array<Permission>;
};

export interface Group extends BaseGroup {
  id: string;
}

export interface GroupInstance extends Model {
  id: string;
  name: string;
  permissions: Array<Permission>;
};
