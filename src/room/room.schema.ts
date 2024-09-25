import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    host: User;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    participants: User[];

    @Prop({ required: true, unique: true })
    code: string;

    @Prop()
    xml: string;

    @Prop()
    description: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
