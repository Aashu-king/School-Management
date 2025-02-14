import { Request, Response } from "express";
import StudentService from "./student.service";
import uploadMiddleware, { imageUpload, saveImage } from "../../common/multer.config";
import { Op } from "sequelize";

class StudentController {
    RegisterStudent = async (req: Request, res: Response): Promise<void> => {
        try {
          
                // Access form data (req.body) and file (req.file)
                const {filePath ,fileName} = await saveImage('image','uploads/students')(req,res)
                const studentData = req.body;
                const studentFile = req.file;
          
                // Proceed with student registration logic
                const student = await StudentService.RegisterStudentService(studentData, studentFile,filePath);
          
                if (student) {
                  res.status(201).json({ message : student});
                } else {
                  res.status(400).json({ error: "Failed to register student" });
                }
        } catch (error) {
            console.error("Error in RegisterStudent:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    GetAllStudents = async (req: Request, res: Response): Promise<void> => {
        try {
            // const {filePath ,fileName} = await saveImage('image','uploads/students')(req,res)
            const { studentName } = req.query;
            const whereCondition: any = {};
            if(studentName){
                whereCondition.firstName = { [Op.like]: `%${studentName}%` }
            }
            console.log("🚀 ~ StudentController ~ GetAllStudents= ~ whereCondition:", whereCondition)

            const students = await StudentService.GetAllStudentsService(whereCondition);

            if (students) {
                res.status(200).json(students);
            } else {
                res.status(404).json({ error: "No students found" });
            }
        } catch (error) {
            console.error("Error in GetAllStudents:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    GetStudentById = async (req: Request, res: Response): Promise<void> => {
        try {
            const studentId = req.params.id;
            const student = await StudentService.GetStudentByIdService(studentId);

            if (student) {
                res.status(200).json(student);
            } else {
                res.status(404).json({ error: `Student with ID ${studentId} not found` });
            }
        } catch (error) {
            console.error("Error in GetStudentById:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    UpdateStudent = async (req: Request, res: Response): Promise<void> => {
        try {
            const {filePath ,fileName} = await saveImage('image','uploads/students')(req,res)
            const studentData = req.body;
            const studentId = studentData.studentId;
            const studentFile = req.file
            const updatedStudent = await StudentService.UpdateStudentService(studentId, studentData,filePath);

            if (updatedStudent) {
                res.status(200).json(updatedStudent);
            } else {
                res.status(400).json({ error: "Failed to update student" });
            }
        } catch (error) {
            console.error("Error in UpdateStudent:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    DeleteStudent = async (req: Request, res: Response): Promise<void> => {
        try {
            const studentId = req.params.id;
            const deletedStudent = await StudentService.DeleteStudentService(studentId);            

            if (deletedStudent) {
                res.status(200).json({ status : true ,message: "Student deleted successfully" });
            } else {
                res.status(400).json({ error: "Failed to delete student" });
            }
          } catch (error) {
            console.error("Error in DeleteStudent:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    getTotalNumberOfStudent = async (req : Request,res : Response) : Promise<void> => {
        try {
            const student = await StudentService.getTotalNumberOfStudents()
            if (student) {
                res.status(200).json({ status : true ,data: student });
            } else {
                res.status(400).json({ error: "Failed to delete student" });
            }
        } catch (error) {
            console.error("Error in DeleteStudent:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default new StudentController();
