import { Component, Input } from '@angular/core';
import { Entry } from '../models/entry';

@Component({
  selector: 'long-description',
  templateUrl: './long-description.component.html'
})


export class LongDescriptionComponent {
  public entries: Entry[];
  newEntry: Entry = new Entry();
  public generatedHtml: string;

  constructor() {
    this.generatedHtml = '<ul class=\"product-desc__list\"></ul>';
    this.entries = [];
  }

  onSubmit() {
    this.newEntry.id = this.entries.length + 1;
    this.entries.push(this.newEntry);
    this.generatedHtml = this.generatedHtml.substring(0, this.generatedHtml.length - 5);
    this.generatedHtml += this.generateEnrichedEntry(this.newEntry, this.entries.length);
    this.generatedHtml += '</ul>';
    this.newEntry = new Entry();
  }

  showDeleteButton():boolean {
    return this.entries.length > 0;
  }

  onDeleteRow() {
    this.entries.pop();
    let lastEntryLiStart:number = this.generatedHtml.lastIndexOf('<li ');
    console.log('start: '+ lastEntryLiStart);
    let lastEntryLiEnd:number = this.generatedHtml.lastIndexOf('</li>');
console.log('end: '+ lastEntryLiEnd);
    let lastEntryLiLength = lastEntryLiEnd - lastEntryLiStart;
    console.log('length: '+ lastEntryLiLength);
    this.generatedHtml = this.generatedHtml.substring(0, this.generatedHtml.length - (lastEntryLiLength + 10));
    this.generatedHtml += '</ul>';
  }

  private generateEnrichedEntry(entry: Entry, index: number): string {
      let enrichedEntry: string = '';
      enrichedEntry += '<li class=\"product-desc__entry '+(index % 2 === 0 ? 'dark' : '' )+'\">'
      enrichedEntry += '<div class=\"product-desc__icon\"><img src=\"/hiotakis_energy/wp-content/uploads/2017/05/tick.png\" /></div>';
      enrichedEntry += '<div class=\"product-desc__title small\">'+ entry.title +'</div>';
      enrichedEntry += '<div class=\"product-desc__text\">'+ entry.value +'</div>';
      enrichedEntry += '</li>'
      return enrichedEntry;
  }

}
