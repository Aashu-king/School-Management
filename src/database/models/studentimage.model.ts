import { BelongsTo, Column, CreatedAt, DataType, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Student } from "./students.model";

@Table({tableName : 'studentImages',timestamps : true})

export class StudentImages extends Model{
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    imageId !: string;

    @ForeignKey(() => Student)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    studentId!: string;

    @BelongsTo(() => Student)
    students!: Student;
  
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