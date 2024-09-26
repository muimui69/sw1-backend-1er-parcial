import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
    COLLABORATOR = 'COLLABORATOR',
    HOST = 'HOST',
}

registerEnumType(UserRole, {
    name: 'UserRole',
});
