  import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from 'sequelize-typescript';
  import { Role } from './role.model';
  import { UserImage } from './userImage.model';

  @Table({ tableName: 'Users', timestamps: true })
  export class User extends Model {
    @Column({
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    })
    userId!: string;

    @Column({
      type: DataType.STRING(100),
      allowNull: false,
    })
    firstName!: string;

    @Column({
      type: DataType.STRING(100),
      allowNull: false,
    })
    lastName!: string;

    @Column({
      type: DataType.STRING(150),
      allowNull: false,
      unique: true,
    })
    email!: string;

    @Column({
      type: DataType.STRING(255),
      allowNull: false,
    })
    passwordHash!: string;

    @ForeignKey(() => Role)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    roleId!: string;

    @BelongsTo(() => Role)
    role!: Role;

    @HasMany(() => UserImage)
    images!: UserImage[];

    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt!: Date;

    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt!: Date;
  }
    