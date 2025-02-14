    import { User } from "../../database/models/user.model";
import { UserImage } from "../../database/models/userImage.model";

    class RegistrationService{

        async RegiterUserRe(user : any,files : any,hashedpassword : any,IMAGE_URL : any){

            const store_user = await User.create({
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email,
                passwordHash : hashedpassword,
                roleId : user.roleId
            })

            const store_image = await UserImage.create({
                userId : store_user.userId,
                imageUrl : IMAGE_URL
            })
            return {
                store_user : store_user,
                store_image : store_image
            }
        }
        async getUsers(){
            
            const gotUser = await User.findAll()
            return gotUser
        }

        async getUsersById(userId : any){
            
            const gotUser = await User.findOne({where : { userId : userId},
                include : [
                    {model : UserImage, attributes : ['imageId','imageUrl']}
                ]
            })
            return gotUser
        }
        async getUsersByIdImage(userId : any){
            const gotUser = await User.findOne({where : { userId : userId},
            include : [
                {model : UserImage, attributes : ['imageId','imageUrl']}
            ],
            attributes : []
        })
            return gotUser
        }
    }

    export default new RegistrationService