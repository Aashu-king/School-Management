import { Sequelize } from "sequelize-typescript";
import { User } from "./user.model";
import { UserImage } from "./userImage.model";
import { Role } from "./role.model";
import { ClassImages } from "./classesImage.model";
import { Classes } from "./classes.model";
import { Student } from "./students.model";
import { StudentImages } from "./studentimage.model";
import { TeacherImages } from "./teacherImage.model";
import { Teachers } from "./teacher.model";
import { Enrollments } from "./enrollement.model";
import { Attendance } from "./attendance.model";
import { Grade } from "./grade.model";
import { Subject } from "./subject.model";
import { ParentDetails } from "./parent_details.model";
import { TeachersDetails } from "./teachers_details.model";

const sequelize = new Sequelize({
  username: "root",
  password: "Aashutosh@123",
  database: "education",
  host: "127.0.0.1",
  dialect: "mysql",
  models : [User,UserImage,Role,ClassImages,Classes,Student,StudentImages,TeacherImages,Teachers,Enrollments,Attendance,Grade,Subject,ParentDetails,TeachersDetails]
})

const db = {
  sequelize : sequelize
}

export default db