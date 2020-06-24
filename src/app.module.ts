import { Module } from '@nestjs/common';  
import { InfraestructuraModule } from './infraestructura/infraestructura.module'; 

@Module({ // @Module codigo raiz que contiene controladores servicios etc .. 
  imports: [InfraestructuraModule],
})
export class AppModule {}