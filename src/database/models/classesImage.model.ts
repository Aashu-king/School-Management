import { BelongsTo, Column, CreatedAt, DataType, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

import { Classes } from "./classes.model";

@Table({tableName : 'classImages',timestamps : true})

export class ClassImages extends Model{
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    imageId !: string;

    @ForeignKey(() => Classes)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    classId!: string;

    @BelongsTo(() => Classes)
    class!: Classes;
  
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