import { Enrollments } from "../../database/models/enrollement.model";

class EnrollmentService {
    async RegisterEnrollmentService(enrollmentData: any) {
        const enrollment = await Enrollments.create(enrollmentData);
        return enrollment;
    }

    async GetAllEnrollmentsService() {
        const enrollments = await Enrollments.findAll();
        return enrollments;
    }

    async GetEnrollmentByIdService(enrollmentId: string) {
        const enrollment = await Enrollments.findByPk(enrollmentId);
        return enrollment;
    }

    async UpdateEnrollmentService(enrollmentId: string, enrollmentData: any) {
        const enrollment = await Enrollments.findByPk(enrollmentId);
        if (enrollment) {
            await enrollment.update(enrollmentData);
            return enrollment;
        }
        return null;
    }

    async DeleteEnrollmentService(enrollmentId: string) {
        const enrollment = await Enrollments.findByPk(enrollmentId);
        if (enrollment) {
            await enrollment.destroy();
            return true;
        }
        return false;
    }
}

export default new EnrollmentService();
