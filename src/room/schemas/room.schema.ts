import { Invitation } from '@/common/types/room.type';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { UserRole } from '../../common/enums/user-role.enum';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    host: User;

    @Prop({ required: true })
    title: string;


    @Prop([{
        user: { type: Types.ObjectId, ref: 'User', required: true },
        role: { type: String, enum: UserRole, default: 'COLLABORATOR' }
    }])
    participants: Array<{ user: Types.ObjectId, role: string }>;


    @Prop([{
        email: { type: String, required: true },
        status: { type: String, enum: ['PENDING', 'ACCEPTED'], default: 'PENDING' },
    }])
    invitations: Invitation[]

    @Prop({ default: true })
    isOpen: boolean;

    @Prop()
    description?: string;

    @Prop()
    code?: string;

    @Prop()
    xml?: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
