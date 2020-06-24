//puerto
import { AsistenteDigitalAccionDTO } from '../modelo/asistenteDigitalAccion.dto'

export abstract class RepositorioResponderMensaje {
 abstract async generarSessionId():Promise <string>;
 abstract async responderAccion(accion: AsistenteDigitalAccionDTO, sesionId: string):Promise <string>;
}
 
 