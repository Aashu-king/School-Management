import { config } from "../../config/config";
import db from "../../database/models";
import { ParentDetails } from "../../database/models/parent_details.model";
import { StudentImages } from "../../database/models/studentimage.model";
import { Student } from "../../database/models/students.model";
import path from 'path';
import { promises as fs } from 'fs';
import { FindOptions } from "sequelize";
import { Op } from "sequelize";

class StudentService {
    async RegisterStudentService(studentData: any, file: any, filePath: any) {
        const t = await db.sequelize.transaction();
        const student = await Student.create({
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            email: studentData.email,
            phone: studentData.phone,
            dob: studentData.dob,
            anymedicalcondition: studentData.anymedicalcondition,
            gender: studentData.gender,
            address: studentData.address,
            bloodgroup: studentData.bloodgroup,
            rollNo: studentData.rollNo,
            registrationdate: studentData.registrationdate,
            status: studentData.status
        }, { transaction: t });
        const parentsDetails = JSON.parse(studentData.parents_details);
        const finalArray = parentsDetails.map((ele: any) => ({
            studentId: student.studentId,
            ...ele
        }));

        const [addedParentDetails, addedImageDetails] = await Promise.all([
            ParentDetails.bulkCreate(finalArray, { transaction: t }),
            StudentImages.create({
                studentId: student.studentId,
                imageUrl: `http://localhost:${process.env.PORT || 3000}/${filePath}`
            }, { transaction: t })
        ])

        await t.commit();
        return { success: true, message: 'Successfully stored the data' };
    }

    async GetAllStudentsService(
        whereCondition: any,
        page: number = 1,
        pageSize: number = 20
    ) {
        const options: FindOptions = {
            where: whereCondition,
            include: [
                {
                    model: StudentImages,
                    attributes: ['imageId', 'imageUrl']
                },
                {
                    model: ParentDetails,
                    attributes: ['parentId', 'fullName', 'phonenumber']
                }
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            limit: pageSize,
            offset: (page - 1) * pageSize
        };

        return await Student.findAll(options);
    }

    async GetStudentByIdService(studentId: string) {
        const student = await Student.findByPk(studentId, { include: [{ model: StudentImages, attributes: { exclude: ['createdAt', 'updatedAt'] } }, { model: ParentDetails, attributes: { exclude: ['createdAt', 'updatedAt'] } }], attributes: { exclude: ['createdAt', 'updatedAt'] } });
        return student;
    }

    async UpdateStudentService(studentId: string, studentData: any, filePath: any) {
        const t = await db.sequelize.transaction();

        try {
            const student = await Student.findByPk(studentId, {
                include: [{
                    model: StudentImages,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {
                    model: ParentDetails,
                    attributes: ['parentId']
                }]
                ,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                transaction: t
            });

            if (!student) {
                throw new Error('Student not found');
            }

            // Handle image update
            if (filePath) {
                const existingImage = student.images?.[0];

                if (existingImage) {
                    const urlParts = new URL(existingImage.imageUrl);
                    const fullPath = path.join(
                        process.cwd(),
                        urlParts.pathname.substring(1)
                    );

                    await fs.unlink(fullPath).catch(console.error);
                    await StudentImages.destroy({
                        where: { studentId },
                        transaction: t
                    });
                }

                await StudentImages.create({
                    studentId,
                    imageUrl: `http://localhost:${process.env.PORT || 3000}/${filePath}`
                }, { transaction: t });
            }

            if (studentData.parents_details) {
                const parentsDetails = JSON.parse(studentData.parents_details);
                let array_of_parent_to_keep = []
                const keptParentIds = parentsDetails
                    .filter(p => p.parentId)
                    .map(p => p.parentId);

                await ParentDetails.destroy({
                    where: {
                        studentId: studentId,
                        parentId: {
                            [Op.notIn]: keptParentIds
                        }
                    },
                    transaction: t
                });

                const parentPromises = parentsDetails.map(parent => {
                    if (parent.parentId) {
                        return ParentDetails.update(parent, {
                            where: {
                                parentId: parent.parentId,
                                studentId: studentId
                            },
                            transaction: t
                        });
                    } else {
                        return ParentDetails.create({
                            ...parent,
                            studentId: studentId
                        }, { transaction: t });
                    }
                });

                await Promise.all(parentPromises);
            } else {
                const deleteParentsDetails = ParentDetails.destroy({ where: { studentId: studentId }, transaction: t })
            }

            await student.update(studentData, { transaction: t });

            await t.commit();
            return student;
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    async DeleteStudentService(studentId: string) {
        const t = await db.sequelize.transaction();
        const studentImage = await StudentImages.findOne({ where: { studentId }, transaction: t });

        await Promise.all([
            ParentDetails.destroy({ where: { studentId }, transaction: t }),
            StudentImages.destroy({ where: { studentId }, transaction: t }),
            Student.destroy({ where: { studentId: studentId }, transaction: t })
        ]);

        await t.commit();

        if (studentImage) {
            const b = studentImage.imageUrl.split('/');
            const fullPath = path.join(process.cwd(), b.slice(3, 5).join('/'), b[5]);
            fs.unlink(fullPath);
        }

        return true;

    }

    async getTotalNumberOfStudents() {
        try {
            const currentDate = new Date();
    
            const firstDayLastMonth = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() - 1, 1));
            const lastDayLastMonth = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 0, 23, 59, 59, 999));
    
            const firstDayCurrentMonth = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 1));
            const lastDayCurrentMonth = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1, 0, 23, 59, 59, 999));
            const [totalAdmissions, pastMonthAdmissions,currentMonthAdmissions] = await Promise.all([
                 Student.count({ where: { status: 'Active' } }),
            
                 Student.count({
                    where: {
                        status: 'Active',
                        createdAt: { [Op.between]: [firstDayLastMonth, lastDayLastMonth] }
                    }
                }),
        
                  Student.count({
                    where: {
                        status: 'Active',
                        createdAt: { [Op.between]: [firstDayCurrentMonth, lastDayCurrentMonth] }
                    }
                })
            ])
            
    
            let percentChange : any = 0;
            let difference = currentMonthAdmissions - pastMonthAdmissions;
            let message = "No change in admissions";
    
            if (pastMonthAdmissions > 0) {
                percentChange = ((difference / pastMonthAdmissions) * 100).toFixed(2);
            }
    
            if (difference > 0) {
                message = `There is an increase in admissions by ${percentChange}% from last month`;
            } else if (difference < 0) {
                message = `There is a decrease in admissions by ${Math.abs(percentChange)}% from last month`;
            }
    
            return {
                totalAdmissions,
                percentage: message,
                difference: `${Math.abs(difference)} admissions`
            };
        } catch (error) {
            throw error;
        }
    }
    
}

export default new StudentService();
