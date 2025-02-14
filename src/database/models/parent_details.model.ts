import { AllowNull, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Student } from "./students.model";

@Table({ tableName: 'parents_details', timestamps: true })
export class ParentDetails extends Model {
    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
    parentId !: string

    @ForeignKey(() => Student)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    studentId!: string;

    @BelongsTo(() => Student)
    student!: Student;

    @Column({ type: DataType.TEXT, allowNull: false })
    fullName!: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    relation!: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    bloodgroup!: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    phonenumber!: string;


    @Column({
        type: DataType.DATEONLY,
        allowNull: false,
    })
    dob!: Date;



    @Column({ type: DataType.TEXT, allowNull: false })
    address!: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    worksAt!: string;

    @Column({ type: DataType.STRING(100), allowNull: false })
    worksAs!: string;

    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt!: Date;
}