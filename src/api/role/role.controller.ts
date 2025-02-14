// role.controller.ts
import { Request, Response } from "express";
import RoleRegistrationService from "./role.service";

class RoleRegistrationController {
    // Create Role
    RegisterRole = async (req: Request, res: Response): Promise<void> => {
        console.log("🚀 ~ RoleRegistrationController ~ RegisterRole= ~ req:", req)
        try {
            const roleData = req.body;
            console.log("role",roleData);
            
            const role = await RoleRegistrationService.RegisterRoleService(roleData);

            if (role) {
                res.status(201).json(role);
            } else {
                res.status(400).json({ error: "Failed to register role" });
            }
        } catch (error) {
            console.error("Error in RegisterRole:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    // Get all roles
    GetAllRoles = async (req: Request, res: Response): Promise<void> => {
        try {
            const roles = await RoleRegistrationService.GetAllRolesService();

            if (roles) {
                res.status(200).json(roles);
            } else {
                res.status(404).json({ error: "No roles found" });
            }
        } catch (error) {
            console.error("Error in GetAllRoles:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    // Get role by ID
    GetRoleById = async (req: Request, res: Response): Promise<void> => {
        try {
            const roleId = req.params.roleId;
            console.log("🚀 ~ RoleRegistrationController ~ GetRoleById= ~ roleId:", roleId)
            const role = await RoleRegistrationService.GetRoleByIdService(roleId);

            if (role) {
                res.status(200).json(role);
            } else {
                res.status(404).json({ error: `Role with ID ${roleId} not found` });
            }
        } catch (error) {
            console.error("Error in GetRoleById:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    // Update role
    UpdateRole = async (req: Request, res: Response): Promise<void> => {
        try {
            const roleId = req.params.roleId;
            const roleData = req.body;
            const updatedRole = await RoleRegistrationService.UpdateRoleService(roleId, roleData);

            if (updatedRole) {
                res.status(200).json(updatedRole);
            } else {
                res.status(400).json({ error: "Failed to update role" });
            }
        } catch (error) {
            console.error("Error in UpdateRole:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    // Delete role
    DeleteRole = async (req: Request, res: Response): Promise<void> => {
        try {
            const roleId = req.params.id;
            const deletedRole = await RoleRegistrationService.DeleteRoleService(roleId);

            if (deletedRole) {
                res.status(200).json({ message: "Role deleted successfully" });
            } else {
                res.status(400).json({ error: "Failed to delete role" });
            }
        } catch (error) {
            console.error("Error in DeleteRole:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

export default new RoleRegistrationController();
