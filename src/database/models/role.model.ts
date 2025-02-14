import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    CreatedAt,
    UpdatedAt,
    HasMany,
  } from 'sequelize-typescript';
  import { User } from './user.model';
  
  @Table({ tableName: 'roles', timestamps: true })
  export class Role extends Model<Role> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    roleId!: string;
  
    @Column({
      type: DataType.STRING(50),
      allowNull: false,
      unique: true,
    })
    roleName!: string;
  
    @Column({
      type: DataType.TEXT,
      allowNull: true,
    })
    description?: string;
  
    @HasMany(() => User)
    users!: User[];
  
    @CreatedAt
    @Column(DataType.DATE)
    createdAt!: Date;
  
    @UpdatedAt
    @Column(DataType.DATE)
    updatedAt!: Date;
  }
  