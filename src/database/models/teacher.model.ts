import { Column, CreatedAt, DataType, Default, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { TeacherImages } from "./teacherImage.model";
import { TeachersDetails } from "./teachers_details.model";

@Table({tableName : 'Teachers',timestamps : true})
export class Teachers extends Model{
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    teacherId !: string;

    @Column({
    type: DataType.STRING(100),
    allowNull: false,
    })
    firstName !: string

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        })
        lastName !: string

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    email !: string

    @Column({
        type : DataType.STRING,
        allowNull: false
    })
    phone !: string

    @Column({
        type : DataType.TEXT,
        allowNull : true,
    })
    subjectSpecialization !: string

    @Column({
        type : DataType.TEXT,
        allowNull : true,
    })
    address !: string

    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt!: Date;

    @HasMany(() => TeacherImages)
    images!: TeacherImages[];

    @HasMany(() => TeachersDetails)
    teacherDetails!: TeachersDetails[];
}