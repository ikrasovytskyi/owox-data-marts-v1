import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const distPath = join(__dirname, '..', '..', 'web', 'dist');

  // Serve static files from Vite frontend (after build)
  app.useStaticAssets(distPath);

  // Handle SPA fallback for client-side routing
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api')) {
      next();
    } else {
      res.sendFile(join(distPath, 'index.html'));
    }
  });

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err: unknown) => {
  logger.error('Application failed to start', err instanceof Error ? err.stack : String(err));
});
