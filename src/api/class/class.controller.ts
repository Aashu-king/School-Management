import { Request, Response } from "express";
import ClassService from "./class.service";

class ClassController {
    RegisterClass = async (req: Request, res: Response): Promise<void> => {
        try {
            const classData = req.body;
            const classInstance = await ClassService.RegisterClassService(classData);

            if (classInstance) {
                res.status(201).json(classInstance);
            } else {
                res.status(400).json({ error: "Failed to register class" });
            }
        } catch (error) {
            console.error("Error in RegisterClass:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    GetAllClasses = async (req: Request, res: Response): Promise<void> => {
        try {
            const classes = await ClassService.GetAllClassesService();

            if (classes) {
                res.status(200).json(classes);
            } else {
                res.status(404).json({ error: "No classes found" });
            }
        } catch (error) {
            console.error("Error in GetAllClasses:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    GetClassById = async (req: Request, res: Response): Promise<void> => {
        try {
            const classId = req.params.id;
            const classInstance = await ClassService.GetClassByIdService(classId);

            if (classInstance) {
                res.status(200).json(classInstance);
            } else {
                res.status(404).json({ error: `Class with ID ${classId} not found` });
            }
        } catch (error) {
            console.error("Error in GetClassById:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    UpdateClass = async (req: Request, res: Response): Promise<void> => {
        try {
            const classId = req.params.id;
            const classData = req.body;
            const updatedClass = await ClassService.UpdateClassService(classId, classData);

            if (updatedClass) {
                res.status(200).json(updatedClass);
            } else {
                res.status(400).json({ error: "Failed to update class" });
            }
        } catch (error) {
            console.error("Error in UpdateClass:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    DeleteClass = async (req: Request, res: Response): Promise<void> => {
        try {
            const classId = req.params.id;
            const deletedClass = await ClassService.DeleteClassService(classId);

            if (deletedClass) {
                res.status(200).json({ message: "Class deleted successfully" });
            } else {
                res.status(400).json({ error: "Failed to delete class" });
            }
        } catch (error) {
            console.error("Error in DeleteClass:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

export default new ClassController();
