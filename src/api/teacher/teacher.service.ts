import { FindOptions } from "sequelize";
import db from "../../database/models";
import { Teachers } from "../../database/models/teacher.model";
import { TeacherImages } from "../../database/models/teacherImage.model";

class TeacherService {
    // async RegisterTeacherService(teacherData: any,filePath : any) {
    //     const teacher = await Teachers.create(teacherData);
    //     return teacher;
    // }
    async RegisterTeacherService(studentData: any, filePath: any) {
        // const t = await db.sequelize.transaction();
        const teacher = await Teachers.create({
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            email: studentData.email,
            phone: studentData.phone,
            subjectSpecialization: studentData.subjectSpecialization,
            address: studentData.address,
        });
        TeacherImages.create({
            teacherId: teacher.teacherId,
            imageUrl: `https://school-management-production-5ffa.up.railway.app/${filePath}`
        })

        // await t.commit();
        return { success: true, message: 'Successfully stored the data' };
    }
    async GetAllTeachersService(
        whereCondition: any,
        page: number = 1,
        pageSize: number = 20
    ) {

        const options: FindOptions = {
            where: whereCondition,
            include: [
                {
                    model: TeacherImages,
                    attributes: ['imageId', 'imageUrl']
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            limit: pageSize,
            offset: (page - 1) * pageSize
        };

        return await Teachers.findAll(options);
    }

    async GetTeacherByIdService(teacherId: string) {
        const teacher = await Teachers.findByPk(teacherId,{include : [{model : TeacherImages, attributes: { exclude: ['createdAt', 'updatedAt'] }}]});
        return teacher;
    }

    async FindTecaher(gotData: any,teacherData: any) {

        // const teacher = await Teachers.findByPk(teacherId,{
        //     include : [{
        //         model : TeacherImages,
        //         attributes: { exclude: ['createdAt', 'updatedAt'] }
        //     }]
        // });
        // if(!teacher){
        //      throw new Error('No data Found')
        // }


        if (teacherData) {
            await gotData.update(teacherData);
            return gotData
        }
        return null;
    }

    async DeleteTeacherService(teacherId: string) {
        console.log('teacherId: ', teacherId);
        await TeacherImages.destroy({where : {teacherId : teacherId}})
        const teacher = await Teachers.findByPk(teacherId);
        if (teacher) {
            await teacher.destroy();
            return true;
        }
        return false;
    }

    async DeleteTeacherImages(teacherId: string) {
        console.log('teacherId: ', teacherId);
        const teacher = await TeacherImages.findOne({where : {teacherId : teacherId}});
        if (teacher) {
            console.log('teacher: ', teacher);
            await teacher.destroy();
            return true;
        }
        return false;
    }

    async CreateTeacherImages(teacherId : string,filePath : any){
        console.log('filePath: ', filePath);
        await TeacherImages.create({
            teacherId,
            imageUrl: `https://school-management-production-5ffa.up.railway.app/${filePath}`
        });
        return true
    }

}

export default new TeacherService();
