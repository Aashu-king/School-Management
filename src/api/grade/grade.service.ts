import { Grade } from "../../database/models/grade.model";

class GradeService {
    async RegisterGradeService(gradeData: any) {
        const grade = await Grade.create(gradeData);
        return grade;
    }

    async GetAllGradesService() {
        const grades = await Grade.findAll();
        return grades;
    }

    async GetGradeByIdService(gradeId: string) {
        const grade = await Grade.findByPk(gradeId);
        return grade;
    }

    async UpdateGradeService(gradeId: string, gradeData: any) {
        const grade = await Grade.findByPk(gradeId);
        if (grade) {
            await grade.update(gradeData);
            return grade;
        }
        return null;
    }

    async DeleteGradeService(gradeId: string) {
        const grade = await Grade.findByPk(gradeId);
        if (grade) {
            await grade.destroy();
            return true;
        }
        return false;
    }
}

export default new GradeService();
