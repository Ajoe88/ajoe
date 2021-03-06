import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
// eslint-disable-next-line
import { AppModule } from './app.module'
import {
  swaggerPath,
  swaggerDocumentOptions,
  swaggerSetupOptions,
  // eslint-disable-next-line
} from './swagger'

const { PORT = 3000, NODE_ENV } = process.env

async function main() {
  const app = await NestFactory.create(AppModule, { cors: true })

  // app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  )

  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions)

  SwaggerModule.setup(swaggerPath, app, document, swaggerSetupOptions)

  void app.listen(PORT)
  console.log(`listen app on: ${PORT} and env:  ${NODE_ENV}`, )

  return app
}

module.exports = main()
