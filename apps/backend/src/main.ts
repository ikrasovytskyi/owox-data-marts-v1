import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const logger = new Logger('Bootstrap');
const PATH_PREFIX = 'api';
const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.setGlobalPrefix(PATH_PREFIX);

  // Serve static files from Vite frontend (after build)
  const distPath = join(__dirname, '..', '..', 'web', 'dist');
  app.useStaticAssets(distPath);

  // Handle SPA fallback for client-side routing
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith(`/${PATH_PREFIX}`)) {
      next();
    } else {
      res.sendFile(join(distPath, 'index.html'));
    }
  });

  const port = process.env.PORT ? Number(process.env.PORT) : DEFAULT_PORT;
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err: unknown) => {
  logger.error('Application failed to start', err instanceof Error ? err.stack : String(err));
});
