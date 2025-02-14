import { Role } from "../../database/models/role.model";

class RoleRegistrationService {
    // Register new role
    async RegisterRoleService(role: any) {
        const createdRole = await Role.create({
            roleName : role.roleName,
            description : role.description
        });
        return createdRole;
    }

    // Get all roles
    async GetAllRolesService() {
        const roles = await Role.findAll();
        return roles;
    }

    // Get role by ID
    async GetRoleByIdService(roleId: string) {
        const role = await Role.findByPk(roleId);
        return role;
    }

    // Update role
    async UpdateRoleService(roleId: string, roleData: any) {
        const role = await Role.findByPk(roleId);

        if (role) {
            await role.update(roleData);
            return role;
        } else {
            return null;
        }
    }

    // Delete role
    async DeleteRoleService(roleId: string) {
        const role = await Role.findByPk(roleId);

        if (role) {
            await role.destroy();
            return true;
        } else {
            return false;
        }
    }
}

export default new RoleRegistrationService();
