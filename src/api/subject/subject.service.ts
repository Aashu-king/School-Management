import { Subject } from "../../database/models/subject.model";

class SubjectService {
    async RegisterSubjectService(subjectData: any) {
        const subject = await Subject.create(subjectData);
        return subject;
    }

    async GetAllSubjectsService() {
        const subjects = await Subject.findAll();
        return subjects;
    }

    async GetSubjectByIdService(subjectId: string) {
        const subject = await Subject.findByPk(subjectId);
        return subject;
    }

    async UpdateSubjectService(subjectId: string, subjectData: any) {
        const subject = await Subject.findByPk(subjectId);
        if (subject) {
            await subject.update(subjectData);
            return subject;
        }
        return null;
    }

    async DeleteSubjectService(subjectId: string) {
        const subject = await Subject.findByPk(subjectId);
        if (subject) {
            await subject.destroy();
            return true;
        }
        return false;
    }
}

export default new SubjectService();
