import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
  import { User } from './user.model';
  
  @Table({ tableName: 'UserImages', timestamps: true })
  export class UserImage extends Model {
    @Column({
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    })
    imageId!: string;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    userId!: string;
  
    @BelongsTo(() => User)
    user!: User;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    imageUrl!: string;
  
    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt!: Date;
  }
  