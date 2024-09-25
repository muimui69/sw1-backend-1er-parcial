import { Module } from '@nestjs/common';
import { DiagramGateway } from './diagram.gateway';

@Module({
  providers: [DiagramGateway]
})
export class DiagramModule { }
