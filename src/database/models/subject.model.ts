import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
  } from 'sequelize-typescript';
  
  @Table({ tableName: 'Subjects', timestamps: true })
  export class Subject extends Model {
    @Column({
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    })
    subjectId!: string;
  
    @Column({
      type: DataType.STRING(100),
      allowNull: false,
    })
    name!: string;
  
    @Column({
      type: DataType.TEXT,
    })
    description?: string;
  
    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt!: Date;
  }
  