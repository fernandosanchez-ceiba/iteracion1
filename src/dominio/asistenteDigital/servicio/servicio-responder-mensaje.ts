import { Injectable } from '@nestjs/common';
import { RepositorioResponderMensaje } from '../puerto/repositorio-responder-mensaje'
import { AsistenteDigitalAccionDTO } from './../modelo/asistenteDigitalAccion.dto';

let sesionId

@Injectable()
export class ServicioInterpretarMensaje {
  private _repositorioResponderMensaje: RepositorioResponderMensaje; 

  constructor(repositorioResponderMensaje: RepositorioResponderMensaje ) {
    this._repositorioResponderMensaje = repositorioResponderMensaje;
  }

  async interpretarAccion(accion: AsistenteDigitalAccionDTO): Promise <string>  {
    if(!sesionId){
      sesionId= await this._repositorioResponderMensaje.generarSessionId();
    }     
    console.log("id sesion desde servicio: " + sesionId);    
    return await this._repositorioResponderMensaje.responderAccion(accion, sesionId);
  }
}  