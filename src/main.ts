import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
const PORT = parseInt(process.env.PORT)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(PORT, () => {
    console.log(`🚀 Application running at port ${PORT}`)
  })
}
bootstrap();
