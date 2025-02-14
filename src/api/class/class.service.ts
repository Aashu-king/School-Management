import { Classes} from "../../database/models/classes.model";

class ClassService {
    async RegisterClassService(classData: any) {
        const classInstance = await Classes.create(classData);
        return classInstance;
    }

    async GetAllClassesService() {
        const classes = await Classes.findAll();
        return classes;
    }

    async GetClassByIdService(classId: string) {
        const classInstance = await Classes.findByPk(classId);
        return classInstance;
    }

    async UpdateClassService(classId: string, classData: any) {
        const classInstance = await Classes.findByPk(classId);
        if (classInstance) {
            await classInstance.update(classData);
            return classInstance;
        }
        return null;
    }

    async DeleteClassService(classId: string) {
        const classInstance = await Classes.findByPk(classId);
        if (classInstance) {
            await classInstance.destroy();
            return true;
        }
        return false;
    }
}

export default new ClassService();
