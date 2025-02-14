import { Request, Response } from "express";
import TeacherService from "./teacher.service";
import { saveImage } from "../../common/multer.config";
import { Op } from "sequelize";
import path from 'path';
import { promises as fs } from 'fs';
import { StudentImages } from "../../database/models/studentimage.model";
import { TeacherImages } from "../../database/models/teacherImage.model";

class TeacherController {
    RegisterTeacher = async (req: Request, res: Response): Promise<void> => {
        try {
            const { filePath, fileName } = await saveImage('image', 'uploads/teachers')(req, res)

            const teacherData = req.body;
            const teacher = await TeacherService.RegisterTeacherService(teacherData, filePath);

            if (teacher) {
                res.status(201).json(teacher);
            } else {
                res.status(400).json({ error: "Failed to register teacher" });
            }
        } catch (error) {
            console.error("Error in RegisterTeacher:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    GetAllTeachers = async (req: Request, res: Response): Promise<void> => {
        try {

            const { firstName } = req.query;
            const whereCondition: any = {};
            if (firstName) {
                whereCondition.firstName = { [Op.like]: `%${firstName}%` }
            }
            console.log("🚀 ~ StudentController ~ GetAllStudents= ~ whereCondition:", whereCondition)

            const teachers = await TeacherService.GetAllTeachersService(whereCondition);

            if (teachers) {
                res.status(200).json(teachers);
            } else {
                res.status(404).json({ error: "No teachers found" });
            }
        } catch (error) {
            console.error("Error in GetAllTeachers:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    GetTeacherById = async (req: Request, res: Response): Promise<void> => {
        try {
            const teacherId = req.params.id;
            const teacher = await TeacherService.GetTeacherByIdService(teacherId);

            if (teacher) {
                res.status(200).json(teacher);
            } else {
                res.status(404).json({ error: `Teacher with ID ${teacherId} not found` });
            }
        } catch (error) {
            console.error("Error in GetTeacherById:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    UpdateTeacher = async (req: Request, res: Response): Promise<void> => {
        try {
            const { filePath, fileName } = await saveImage('image', 'uploads/teachers')(req, res)
            console.log('filePath: ', filePath);
            const teacherData = req.body;
            const teacherId = teacherData.teacherId;
            console.log('teacherData: ', teacherData);
            if (teacherId && teacherData) {
                const gotData = await TeacherService.GetTeacherByIdService(teacherId);
                if (gotData) {
                    if (filePath && !teacherData.imageUrl) {
                        const existingImage = gotData.images?.[0];
                        console.log('existingImage: ', existingImage);
                        if (existingImage) {
                            const urlParts = new URL(existingImage.imageUrl);
                            const fullPath = path.join(
                                process.cwd(),
                                urlParts.pathname.substring(1)
                            );
                            console.log('fullPath: ', fullPath);
                            await fs.unlink(fullPath).catch(console.error);
                            await TeacherService.DeleteTeacherImages(teacherId)
                        } 
                        await TeacherService.CreateTeacherImages(teacherId,filePath)
                        
                    }
                } else {
                    res.status(400).json({ error: "No content found" });
                }
                const updateData = await gotData.update(teacherData);
                if (updateData) {
                    res.status(200).json(updateData);
                } else {
                    res.status(400).json({ error: "There might be some issue" });
                }
            } else {
                res.status(400).json({ error: "There might be some issues" });
            }
        } catch (error) {
            console.error("Error in UpdateTeacher:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    DeleteTeacher = async (req: Request, res: Response): Promise<void> => {
        try {
            const teacherId = req.params.id;
            const deletedTeacher = await TeacherService.DeleteTeacherService(teacherId);

            if (deletedTeacher) {
                res.status(200).json({ message: "Teacher deleted successfully" });
            } else {
                res.status(400).json({ error: "Failed to delete teacher" });
            }
        } catch (error) {
            console.error("Error in DeleteTeacher:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

export default new TeacherController();
