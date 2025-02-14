import { Request, Response } from "express";
import GradeService from "./grade.service";

class GradeController {
    RegisterGrade = async (req: Request, res: Response): Promise<void> => {
        try {
            const gradeData = req.body;
            const grade = await GradeService.RegisterGradeService(gradeData);

            if (grade) {
                res.status(201).json(grade);
            } else {
                res.status(400).json({ error: "Failed to register grade" });
            }
        } catch (error) {
            console.error("Error in RegisterGrade:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    GetAllGrades = async (req: Request, res: Response): Promise<void> => {
        try {
            const grades = await GradeService.GetAllGradesService();

            if (grades) {
                res.status(200).json(grades);
            } else {
                res.status(404).json({ error: "No grades found" });
            }
        } catch (error) {
            console.error("Error in GetAllGrades:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    GetGradeById = async (req: Request, res: Response): Promise<void> => {
        try {
            const gradeId = req.params.id;
            const grade = await GradeService.GetGradeByIdService(gradeId);

            if (grade) {
                res.status(200).json(grade);
            } else {
                res.status(404).json({ error: `Grade with ID ${gradeId} not found` });
            }
        } catch (error) {
            console.error("Error in GetGradeById:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    UpdateGrade = async (req: Request, res: Response): Promise<void> => {
        try {
            const gradeId = req.params.id;
            const gradeData = req.body;
            const updatedGrade = await GradeService.UpdateGradeService(gradeId, gradeData);

            if (updatedGrade) {
                res.status(200).json(updatedGrade);
            } else {
                res.status(400).json({ error: "Failed to update grade" });
            }
        } catch (error) {
            console.error("Error in UpdateGrade:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    DeleteGrade = async (req: Request, res: Response): Promise<void> => {
        try {
            const gradeId = req.params.id;
            const deletedGrade = await GradeService.DeleteGradeService(gradeId);

            if (deletedGrade) {
                res.status(200).json({ message: "Grade deleted successfully" });
            } else {
                res.status(400).json({ error: "Failed to delete grade" });
            }
        } catch (error) {
            console.error("Error in DeleteGrade:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

export default new GradeController();
