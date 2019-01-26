import {Pipe, PipeTransform} from '@angular/core';
import {Book} from '../../../model/book';

@Pipe({
  name: 'comboBox'
})
export class ComboBoxPipe implements PipeTransform {

  transform(dataToSort: Book[], columnNameToSort: string, columnToSort2: string, stringToSort: string): any[] {
    let sortedData: Book[] = [];
    // for (let i = 0; i < dataToSort.length; ++i) {
    //   if (dataToSort[i][columnNameToSort].search(new RegExp(stringToSort, 'i')) > -1 ||
    //     dataToSort[i][columnToSort2].search(new RegExp(stringToSort, 'i')) > -1) {
    //     sortedData.push(dataToSort[i]);
    //   }
    // }

    sortedData = dataToSort.filter(function (el) {
      return el[columnNameToSort].search(new RegExp(stringToSort, 'i')) > -1 ||
        el[columnToSort2].search(new RegExp(stringToSort, 'i')) > -1;
    });

    return sortedData;
  }

}
