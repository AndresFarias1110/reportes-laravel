import { Pipe, PipeTransform } from '@angular/core';
import { Incidencia } from '../interfaces/incidenca';
@Pipe({
  name: 'filterIncidenca'
})
export class IncidenciaPipe implements PipeTransform {

	transform(incidencias: Array<Incidencia>, input: string): any {
      // console.log('value FilterUsersPipe:', value);
      // console.log('input:', input, ' allUsers:', allUsers)

      if (input && incidencias) {
          input = input.toLowerCase();
          return incidencias.filter(function(incidencia:Incidencia){
            if ((incidencia.idRec + '').indexOf(input) > -1 ||
				incidencia.responsable.toLowerCase().indexOf(input) > -1 ||
				incidencia.empresa.toLowerCase().indexOf(input) > -1) {
                return incidencia;
            }
          })
      }
      return incidencias;
    }
}
