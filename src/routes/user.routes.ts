import express from "express";
import RegistrationController from "../api/user/user.controller";
import roleController from "../api/role/role.controller";
import uploadMiddleware, { saveImage } from "../common/multer.config";
import AuthController from "../api/authentication/login";
import studentController from "../api/student/student.controller";
import multer from "multer";
import path from 'path'
import teacherController from "../api/teacher/teacher.controller";

const routes = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/student/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ 
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB limit
    }
  });
  

routes.post('/auth/login', AuthController.login);
routes.post('/auth/logout', AuthController.logout);
routes.get('/auth/me', AuthController.getCurrentUser);

routes.post('/user',uploadMiddleware.singleImage, RegistrationController.RegiterUser)
routes.get('/userImage/:userId',uploadMiddleware.singleImage, RegistrationController.getRegisterUserByIdImage)
routes.get('/user/:userId',uploadMiddleware.singleImage, RegistrationController.GetRegisterUserById)
routes.get('/user',uploadMiddleware.singleImage, RegistrationController.GetRegisterUser)
routes.post('/role', roleController.RegisterRole)
routes.get('/role', roleController.GetAllRoles)
routes.get('/role/:roleId', roleController.GetRoleById)
routes.put('/role/:roleId', roleController.UpdateRole)
routes.delete('/role/:roleId', roleController.DeleteRole)

routes.post('/createStudent',studentController.RegisterStudent)
routes.get('/getStudent',uploadMiddleware.singleImage,studentController.GetAllStudents)
routes.get('/totalNoStudents',uploadMiddleware.singleImage,studentController.getTotalNumberOfStudent)
routes.delete('/deleteStudent/:id',uploadMiddleware.singleImage,studentController.DeleteStudent)
routes.get('/getByIDStudent/:id',uploadMiddleware.singleImage,studentController.GetStudentById)
routes.put('/updateStudent',studentController.UpdateStudent)

routes.post('/createTeacher',teacherController.RegisterTeacher)
routes.get('/getTeachers',uploadMiddleware.singleImage,teacherController.GetAllTeachers)
routes.delete('/deleteTeachers/:id',uploadMiddleware.singleImage,teacherController.DeleteTeacher)
routes.get('/getById/:id',uploadMiddleware.singleImage,teacherController.GetTeacherById)
routes.put('/updateTeachers',teacherController.UpdateTeacher)

export default routes;