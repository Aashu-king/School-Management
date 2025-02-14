import { Request, Response } from "express";
import EnrollmentService from "./enrollement.service";

class EnrollmentController {
    RegisterEnrollment = async (req: Request, res: Response): Promise<void> => {
        try {
            const enrollmentData = req.body;
            const enrollment = await EnrollmentService.RegisterEnrollmentService(enrollmentData);

            if (enrollment) {
                res.status(201).json(enrollment);
            } else {
                res.status(400).json({ error: "Failed to register enrollment" });
            }
        } catch (error) {
            console.error("Error in RegisterEnrollment:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    GetAllEnrollments = async (req: Request, res: Response): Promise<void> => {
        try {
            const enrollments = await EnrollmentService.GetAllEnrollmentsService();

            if (enrollments) {
                res.status(200).json(enrollments);
            } else {
                res.status(404).json({ error: "No enrollments found" });
            }
        } catch (error) {
            console.error("Error in GetAllEnrollments:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    GetEnrollmentById = async (req: Request, res: Response): Promise<void> => {
        try {
            const enrollmentId = req.params.id;
            const enrollment = await EnrollmentService.GetEnrollmentByIdService(enrollmentId);

            if (enrollment) {
                res.status(200).json(enrollment);
            } else {
                res.status(404).json({ error: `Enrollment with ID ${enrollmentId} not found` });
            }
        } catch (error) {
            console.error("Error in GetEnrollmentById:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    UpdateEnrollment = async (req: Request, res: Response): Promise<void> => {
        try {
            const enrollmentId = req.params.id;
            const enrollmentData = req.body;
            const updatedEnrollment = await EnrollmentService.UpdateEnrollmentService(enrollmentId, enrollmentData);

            if (updatedEnrollment) {
                res.status(200).json(updatedEnrollment);
            } else {
                res.status(400).json({ error: "Failed to update enrollment" });
            }
        } catch (error) {
            console.error("Error in UpdateEnrollment:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    DeleteEnrollment = async (req: Request, res: Response): Promise<void> => {
        try {
            const enrollmentId = req.params.id;
            const deletedEnrollment = await EnrollmentService.DeleteEnrollmentService(enrollmentId);

            if (deletedEnrollment) {
                res.status(200).json({ message: "Enrollment deleted successfully" });
            } else {
                res.status(400).json({ error: "Failed to delete enrollment" });
            }
        } catch (error) {
            console.error("Error in DeleteEnrollment:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

export default new EnrollmentController();
