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
  import { Student } from './students.model';
  import { Classes } from './classes.model';
  
  @Table({ tableName: 'Grades', timestamps: true })
  export class Grade extends Model {
    @Column({
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    })
    gradeId!: string;
  
    @ForeignKey(() => Student)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    studentId!: string;
  
    @BelongsTo(() => Student)
    student!: Student;
  
    @ForeignKey(() => Classes)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    classId!: string;
  
    @BelongsTo(() => Classes)
    class!: Classes;
  
    @Column({
      type: DataType.STRING(5),
      allowNull: false,
    })
    grade!: string;
  
    @Column({
      type: DataType.TEXT,
    })
    comments?: string;
  
    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt!: Date;
  }
  