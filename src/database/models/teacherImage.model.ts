import { BelongsTo, Column, CreatedAt, DataType, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

import { Teachers } from "./teacher.model";

@Table({tableName : 'teacherImages',timestamps : true})

export class TeacherImages extends Model{
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    imageId !: string;

    @ForeignKey(() => Teachers)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    teacherId!: string;

    @BelongsTo(() => Teachers)
    teacher!: Teachers;
  
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