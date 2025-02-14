import { Request, Response } from "express";
import SubjectService from "./subject.service";

class SubjectController {
    RegisterSubject = async (req: Request, res: Response): Promise<void> => {
        try {
            const subjectData = req.body;
            const subject = await SubjectService.RegisterSubjectService(subjectData);

            if (subject) {
                res.status(201).json(subject);
            } else {
                res.status(400).json({ error: "Failed to register subject" });
            }
        } catch (error) {
            console.error("Error in RegisterSubject:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    GetAllSubjects = async (req: Request, res: Response): Promise<void> => {
        try {
            const subjects = await SubjectService.GetAllSubjectsService();

            if (subjects) {
                res.status(200).json(subjects);
            } else {
                res.status(404).json({ error: "No subjects found" });
            }
        } catch (error) {
            console.error("Error in GetAllSubjects:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    GetSubjectById = async (req: Request, res: Response): Promise<void> => {
        try {
            const subjectId = req.params.id;
            const subject = await SubjectService.GetSubjectByIdService(subjectId);

            if (subject) {
                res.status(200).json(subject);
            } else {
                res.status(404).json({ error: `Subject with ID ${subjectId} not found` });
            }
        } catch (error) {
            console.error("Error in GetSubjectById:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    UpdateSubject = async (req: Request, res: Response): Promise<void> => {
        try {
            const subjectId = req.params.id;
            const subjectData = req.body;
            const updatedSubject = await SubjectService.UpdateSubjectService(subjectId, subjectData);

            if (updatedSubject) {
                res.status(200).json(updatedSubject);
            } else {
                res.status(400).json({ error: "Failed to update subject" });
            }
        } catch (error) {
            console.error("Error in UpdateSubject:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    DeleteSubject = async (req: Request, res: Response): Promise<void> => {
        try {
            const subjectId = req.params.id;
            const deletedSubject = await SubjectService.DeleteSubjectService(subjectId);

            if (deletedSubject) {
                res.status(200).json({ message: "Subject deleted successfully" });
            } else {
                res.status(400).json({ error: "Failed to delete subject" });
            }
        } catch (error) {
            console.error("Error in DeleteSubject:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

export default new SubjectController();
