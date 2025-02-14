
import { Table, Column, DataType, ForeignKey, CreatedAt, UpdatedAt, Model } from "sequelize-typescript";
import { Teachers } from "./teacher.model";

@Table({ tableName: 'teachers_details', timestamps: true })
export class TeachersDetails extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  detailId!: string;

  @ForeignKey(() => Teachers)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  teacherId!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  martialStatus!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  husbandName?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  wifeName?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  bloodgroup?: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dob!: Date;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  degree!: string;

  @Column({
    type: DataType.ENUM('Active', 'Inactive'),
    allowNull: false,
    defaultValue: 'Active',
  })
  status!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  joinedIn!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  leftAt?: Date;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  worksAs!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  pastExperience?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  resume?: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt!: Date;
}