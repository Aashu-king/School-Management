import { BelongsTo, Column, CreatedAt, DataType, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Student } from "./students.model";
import { Classes } from "./classes.model";

@Table({tableName : 'Enrollments',timestamps : true})

export class Enrollments extends Model{
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    enrollmentId !: string;

    @ForeignKey(() => Student)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    studentId!: string;

    @BelongsTo(() => Student)
    students!: Student;

    @ForeignKey(() => Classes)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    classId!: string;

    @BelongsTo(() => Classes)
    class!: Classes;
  
    @Column({
        type : DataType.DATE,
        allowNull : false
    })
    enrollmentDate !: Date
  
    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt!: Date;
}