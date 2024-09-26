import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';  // Asumiendo que tienes un esquema User

export type RoomDocument = Room & Document;

@Schema()
export class Room {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })  // ObjectId referencia a User
    host: User;

    @Prop()
    title: string;

    @Prop({ type: [Types.ObjectId], ref: 'User' })  // ObjectIds para los participantes (si es necesario)
    participants: Types.ObjectId[];

    @Prop()
    description: string;

    @Prop()
    code: string;

    @Prop()
    xml: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
