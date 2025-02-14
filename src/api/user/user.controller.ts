import { Request, Response } from "express";
import RegistrationService from "./user.service";
import bcrypt from 'bcrypt';

class RegistrationController{
    RegiterUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userData = req.body;
            console.log("yeryer",userData);
            
            const files = req.file;
            console.log("yeryereeeeeeeeeee",files);
            const hashedpassword = await bcrypt.hash(userData.password,12);
            console.log("🚀 ~ RegistrationController ~ RegiterUser= ~ hashedpassword:", hashedpassword)
            const IMAGE_URL = `http://localhost:9000/uploads/${files.filename}`;
            const user = await RegistrationService.RegiterUserRe(userData,files,hashedpassword,IMAGE_URL);

            if (user) {
                res.status(201).json(user);
            } else {
                res.status(400).json({ error: "Failed to register user" });
            }
        } catch (error) {
            console.error("Error in RegiterUser:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    GetRegisterUser = async (req : Request,res : Response) => {
        try {
            const getUser = await RegistrationService.getUsers()

            if (getUser) {
                res.status(201).json(getUser);
            } else {
                res.status(400).json({ error: "Failed to register user" });
            }
        } catch (error) {
            console.log("🚀 ~ RegistrationController ~ GetRegisterUser= ~ error:", error)
            
        }
    }

    GetRegisterUserById = async (req : Request,res : Response) => {
        try {
            const userId = req.params.userId
            const getUser = await RegistrationService.getUsersById(userId)

            if (getUser) {
                res.status(201).json(getUser);
            } else {
                res.status(400).json({ error: "Failed to register user" });
            }
        } catch (error) {
            console.log("🚀 ~ RegistrationController ~ GetRegisterUser= ~ error:", error)
            
        }
    }
    getRegisterUserByIdImage = async (req : Request,res : Response) => {
        try {
            const userId = req.params.userId
            const getUser = await RegistrationService.getUsersByIdImage(userId)

            if (getUser) {
                res.status(201).json(getUser);
            } else {
                res.status(400).json({ error: "Failed to register user" });
            }
        } catch (error) {
            console.log("🚀 ~ RegistrationController ~ getRegisterUserByIdImage= ~ error:", error)
            
        }
    }
}
        
export default new RegistrationController();