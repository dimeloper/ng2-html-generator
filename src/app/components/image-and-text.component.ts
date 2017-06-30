import { Component, Input } from '@angular/core';
import { Entry } from '../models/entry';

@Component({
  selector: 'image-and-text',
  templateUrl: './image-and-text.component.html'
})


export class ImageAndTextComponent {
  public entries: Entry[];
  public productTitle: string;
  public imageUrl: string;
  newEntry: Entry = new Entry();
  public generatedHtml: string;

  private productTitleLength: number = 0;
  private imageUrlLength: number = 0;

  constructor() {
    this.generatedHtml = '&nbsp;<h3 class=\"product-bdesc__title\"></h3><div class=\"product-bdesc__image\"><img src=\"\"/></div>';
    this.generatedHtml += '<ul class=\"product-bdesc__list\"></ul>';
    this.entries = [];
    this.productTitle = '';
    this.imageUrl = '';
  }

  onTitleChange() {
    let titleStart: number = this.generatedHtml.indexOf('<h3 class=\"product-bdesc__title\">');
    let titleEnd: number = this.generatedHtml.indexOf('</h3>');
    let isReduced: boolean = this.productTitleLength > this.productTitle.length ? true : false;
    let offset: number = (isReduced ? 6 : 5);
    this.generatedHtml = this.removeString(this.generatedHtml, titleStart + 33, this.productTitle.length + offset, isReduced);
    this.generatedHtml = this.injectString(this.generatedHtml, titleStart + 33, this.productTitle + '</h3>');
    this.productTitleLength = this.productTitle.length;
  }

  onImageUrlChange() {
    let imageUrlStart = this.generatedHtml.indexOf('bdesc__image\"><img src=');
    let imageUrlEnd = this.generatedHtml.indexOf('\"/></div>');
    let isReduced: boolean = this.imageUrlLength > this.imageUrl.length ? true : false
    let offset: number = (isReduced ? 10 : 9);
    this.generatedHtml = this.removeString(this.generatedHtml, imageUrlStart + 24, this.imageUrl.length + offset, isReduced);
    this.generatedHtml = this.injectString(this.generatedHtml, imageUrlStart + 24, this.imageUrl + '\"/></div>');
    this.imageUrlLength = this.imageUrl.length;
  }

  onSubmit() {
    this.newEntry.id = this.entries.length + 1;
    this.entries.push(this.newEntry);
    this.generatedHtml = this.generatedHtml.substring(0, this.generatedHtml.length - 5);
    this.generatedHtml += this.generateEnrichedEntry(this.newEntry, this.entries.length);
    this.generatedHtml += '</ul>';
    this.newEntry = new Entry();
  }

  showDeleteButton(): boolean {
    return this.entries.length > 0;
  }

  onDeleteRow() {
    this.entries.pop();
    let lastEntryLiStart: number = this.generatedHtml.lastIndexOf('<li ');
    console.log('start: ' + lastEntryLiStart);
    let lastEntryLiEnd: number = this.generatedHtml.lastIndexOf('</li>');
    console.log('end: ' + lastEntryLiEnd);
    let lastEntryLiLength = lastEntryLiEnd - lastEntryLiStart;
    console.log('length: ' + lastEntryLiLength);
    this.generatedHtml = this.generatedHtml.substring(0, this.generatedHtml.length - (lastEntryLiLength + 10));
    this.generatedHtml += '</ul>';
  }

  private generateEnrichedEntry(entry: Entry, index: number): string {
    let enrichedEntry: string = '';
    enrichedEntry += '<li class=\"product-bdesc__entry ' + (index % 2 === 0 ? 'dark' : '') + '\">'
    enrichedEntry += '<div class=\"product-bdesc__icon\"><img src=\"/hiotakis_energy/wp-content/uploads/2017/05/tick.png\"/></div><div class=\"product-bdesc__content\">';
    enrichedEntry += '<div class=\"product-bdesc__header\"><strong>' + entry.title + '</strong></div>';
    enrichedEntry += '<div class=\"product-bdesc__subtitle\">' + entry.value + '</div>';
    enrichedEntry += '</li>'
    return enrichedEntry;
  }

  removeString(str: string, startIndex: number, count: number, isReduced: boolean): string {
    return str.substr(0, startIndex) + str.substr(startIndex + count - (isReduced ? 0 : 1));
  }

  injectString(parentString: string, index: number, injectedString: string) {
    console.log(parentString.substr(index));
    return parentString.substr(0, index) + injectedString
      + parentString.substr(index);
  }
}
