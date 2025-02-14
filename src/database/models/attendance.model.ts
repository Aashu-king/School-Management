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
  
  @Table({ tableName: 'Attendance', timestamps: true })
  export class Attendance extends Model {
    @Column({
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    })
    attendanceId!: string;
  
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
      type: DataType.DATEONLY,
      allowNull: false,
    })
    date!: Date;
  
    @Column({
      type: DataType.ENUM('Present', 'Absent', 'Late', 'Excused'),
      allowNull: false,
    })
    status!: string;
  
    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt!: Date;
  }
  