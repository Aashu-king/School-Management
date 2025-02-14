import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    HasMany,
  } from 'sequelize-typescript';
  import { Enrollments } from './enrollement.model';
  import { Attendance } from './attendance.model';
  import { Grade } from './grade.model';
import { StudentImages } from './studentimage.model';
import { ParentDetails } from './parent_details.model';
  
  @Table({ tableName: 'Students', timestamps: true })
  export class Student extends Model {
    @Column({
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV4,
    })
    studentId!: string;
  
    @Column({ type: DataType.STRING(100), allowNull: false })
    firstName!: string;
  
    @Column({ type: DataType.STRING(100), allowNull: false })
    lastName!: string;
  
    @Column({ type: DataType.STRING(150), allowNull: false, unique: true })
    email!: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    phone!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    bloodgroup!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    rollNo!: string;

    @Column({ type: DataType.DATE, allowNull: false })
    dob!: Date;
    
    @Column({ type: DataType.DATE, allowNull: false })
    registrationdate!: Date;
    
    @Column({ type: DataType.ENUM('Male', 'Female', 'Other'), allowNull: false })
    gender!: string;
  
    @Column({ type: DataType.TEXT })
    address?: string;
  
    @Column({
      type: DataType.ENUM('Active', 'Inactive'),
      allowNull: false,
      defaultValue: 'Active',
    })
    status!: string;
  
    @HasMany(() => Enrollments)
    enrollments!: Enrollments[];
  
    @HasMany(() => Attendance)
    attendanceRecords!: Attendance[];
  
    @HasMany(() => Grade)
    grades!: Grade[];

    @HasMany(() => StudentImages)
    images!: StudentImages[];

    @HasMany(() => ParentDetails)
    parents!: ParentDetails[];
  
    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt!: Date;
  }
  