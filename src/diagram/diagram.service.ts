import { Injectable } from '@nestjs/common';

interface ShapeData {
    id: string;
    name: string;
    tabColor: string;
    position: { x: number; y: number };
    columns: any[];
}

@Injectable()
export class DiagramService {
    private shapes: Map<string, ShapeData> = new Map();

    // Método para registrar una forma agregada
    logShapeAdd(data: ShapeData) {
        this.shapes.set(data.id, data);
        console.log(`Shape added with ID: ${data.id}`);
    }

    // Método para actualizar la posición de una forma existente
    logShapeMove(data: { id: string; position: { x: number; y: number } }) {
        const shape = this.shapes.get(data.id);
        if (shape) {
            shape.position = data.position;
            this.shapes.set(data.id, shape);
            console.log(`Shape moved with ID: ${data.id}`);
        }
    }

    // Método para eliminar una forma
    logShapeRemove(data: { id: string }) {
        this.shapes.delete(data.id);
        console.log(`Shape removed with ID: ${data.id}`);
    }

    // Método para obtener todas las formas, útil si necesitas sincronizar el estado completo
    getAllShapes(): ShapeData[] {
        return Array.from(this.shapes.values());
    }
}
