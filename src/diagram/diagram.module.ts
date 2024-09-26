import { Module } from '@nestjs/common';
import { DiagramService } from './diagram.service';
import { DiagramGateway } from './diagram.gateway';

@Module({
  providers: [DiagramService, DiagramGateway],
  exports: [DiagramService],
})
export class DiagramModule { }
