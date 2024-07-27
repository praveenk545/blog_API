import { RolesBuilder } from "nest-access-control";

export enum UserRoles{
    Admin='Admin',
    Reader='Reader'

}
export const roles:RolesBuilder=new RolesBuilder()

roles.grant(UserRoles.Reader).readAny(["newpost"])
.grant(UserRoles.Admin)
.extend(UserRoles.Reader)
.updateAny(["newpost"])
.createAny(["newpost"])
.deleteAny(["newpost"])