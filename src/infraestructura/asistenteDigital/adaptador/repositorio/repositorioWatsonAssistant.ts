import { RepositorioResponderMensaje } from '../../../../dominio/asistenteDigital/puerto/repositorio-responder-mensaje';
import { AsistenteDigitalAccionDTO } from '../../../../dominio/asistenteDigital/modelo/asistenteDigitalAccion.dto';
import { AsistenteDigitalRespuestaDTO } from '../../../../dominio/asistenteDigital/modelo/asistenteDigitalRespuesta.dto';
import AssistantV2 = require('ibm-watson/assistant/v2');
import { IamAuthenticator } from 'ibm-watson/auth';

const assistant = new AssistantV2({
  authenticator: new IamAuthenticator({
    apikey: 'e9l-U4aap25jE6lkaEzARVMdl9SkldKoGazoE8YxUnsW',
  }),
  version: '2020-04-01',
  url:
    'https://api.us-south.assistant.watson.cloud.ibm.com/instances/96274641-9a53-4f8f-b0f9-718769d00e81',
});

export class RepositorioWatsonAssistant implements RepositorioResponderMensaje {
  constructor(
    private readonly _watsonAssistant: AsistenteDigitalRespuestaDTO,
  ) {}

  async responderAccion( accion: AsistenteDigitalAccionDTO, sesionId: string): Promise<string> {
    console.log('WATSON: respuestaAccion.. ');
    //console.log(accion.inputs[0].intent); //traigo datos para trabajar con ellos
    console.log(accion.inputs[0].rawInputs[0].query); // ""
    //console.log(accion.conversation['conversationId']); // ""
    //console.log(accion.conversation['type']); // ""
    //console.log(accion.requestType); // ""
    const mensaje = accion.inputs[0].rawInputs[0].query;
    //implementar consuMo api
    let conversacionTextoRespuesta;
    await assistant.message({
        input: { text: mensaje },
        assistantId: '5509a595-3ef5-479d-9f96-8e4048015122',
        sessionId: sesionId,
      }).then(response => {
        conversacionTextoRespuesta = response.result.output.generic[0].text;
        console.log(conversacionTextoRespuesta);
      }).catch(err => {
        console.log(err);
      });
    //fin implementar condumo api
    const conversacionRespuesta = {
        'expectUserResponse': 'true',
        'expectedInputs': [ {
            'possibleIntents': [ { 'intent': 'actions.intent.TEXT' } ],
            'inputPrompt': {
                'richInitialPrompt': {
                    'items': [ { 'simpleResponse': { 'textToSpeech': conversacionTextoRespuesta } } ]
                }
            }
        } ],
        'conversationToken': sesionId
    }

    return JSON.stringify(conversacionRespuesta);
  }

  async generarSessionId(): Promise<string> {
    return new Promise(resolve => {
      let sessionId;
      assistant
        .createSession({
          assistantId: '5509a595-3ef5-479d-9f96-8e4048015122',
        })
        .then(res => {
          sessionId = res.result.session_id;
          resolve(sessionId.replace(/['"]+/g, ''));
        })
        .catch(err => {
          console.log(err);
        });
      return sessionId;
    });
  }
}
