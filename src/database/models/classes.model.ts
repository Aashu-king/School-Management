import { BelongsTo, Column, CreatedAt, DataType, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Teachers } from "./teacher.model";

@Table({tableName : 'Classes',timestamps : true})
export class Classes extends Model{
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    classId !: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
    })
    className !: string

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description !: string

    @ForeignKey(() => Teachers)
    @Column({
      type: DataType.UUID,
      allowNull: false,
    })
    teacherId!: string;
  
    @BelongsTo(() => Teachers)
    teacher!: Teachers;

    @Column({
        type : DataType.DATE,
        allowNull: false
    })
    startDate !: Date

    @Column({
        type : DataType.DATE,
        allowNull: false
    })
    endDate !: Date

    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt!: Date;
}