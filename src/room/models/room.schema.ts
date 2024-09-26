import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/models/user.schema';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    host: User;

    @Prop({ required: true })
    title: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })  // Referencia a múltiples usuarios (participantes)
    participants: User[];


    @Prop({ default: true })
    isOpen: boolean;

    @Prop()
    description?: string;

    @Prop()
    code: string;

    @Prop()
    xml?: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
