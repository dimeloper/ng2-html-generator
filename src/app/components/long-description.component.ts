import { Component, Input } from '@angular/core';
import { Entry } from '../models/entry';

@Component({
  selector: 'long-description',
  templateUrl: './long-description.component.html'
})


export class LongDescriptionComponent {
  public descTitle: string;
  public descSubtitle: string;
  public producedJs: string;

  public entries: Entry[];
  newEntry: Entry = new Entry();
  public generatedHtml: string;

  private descTitleLength: number = 0;
  private descSubtitleLength: number = 0;

  constructor() {
    this.generatedHtml = '<h3 class=\"product-bdesc__tech-title\"></h3>\n\n<h4 class=\"product-bdesc__tech-subtitle\"></h4>\n<ul class=\"product-desc__list\"></ul>';
    this.producedJs = '<h4 id=\"id2308\" class=\"product-bdesc__tech-subtitle collapseomatic colomat-visited\">Όλα τα χαρακτηριστικά</h4><h4 id=\"swap-id2308\" class=\"product-bdesc__tech-subtitle colomat-swap\" style=\"display: none;\">Λιγότερα χαρακτηριστικά</h4>';
    this.producedJs += '<script type=\"text/javascript\">\nvar button = document.getElementById(\'id2308\');\nbutton.onclick=function(){var fadeElement = document.getElementsByClassName(\'collapse-fade\')[0];\nif(fadeElement.style.visibility === \'visible\' || fadeElement.style.visibility === \'\') {fadeElement.style.visibility = \'hidden\';} else {fadeElement.style.visibility = \'visible\';}}\n</script>';
    this.entries = [];
    this.descTitle = '';
    this.descSubtitle = '';
  }

  onTitleChange() {
    let titleStart: number = this.generatedHtml.indexOf('<h3 class=\"product-bdesc__tech-title\">');
    let titleEnd: number = this.generatedHtml.indexOf('</h3>');
    let isReduced: boolean = this.descTitleLength > this.descTitle.length ? true : false;
    let offset: number = (isReduced ? 6 : 5);
    this.generatedHtml = this.removeString(this.generatedHtml, titleStart + 38, this.descTitle.length + offset, isReduced);
    this.generatedHtml = this.injectString(this.generatedHtml, titleStart + 38, this.descTitle + '</h3>');
    this.descTitleLength = this.descTitle.length;
  }

  onSubtitleChange() {
    let titleStart: number = this.generatedHtml.indexOf('<h4 class=\"product-bdesc__tech-subtitle\">');
    let titleEnd: number = this.generatedHtml.indexOf('</h4>');
    let isReduced: boolean = this.descSubtitleLength > this.descSubtitle.length ? true : false;
    let offset: number = (isReduced ? 6 : 5);
    this.generatedHtml = this.removeString(this.generatedHtml, titleStart + 41, this.descSubtitle.length + offset, isReduced);
    this.generatedHtml = this.injectString(this.generatedHtml, titleStart + 41, this.descSubtitle + '</h4>');
    this.descSubtitleLength = this.descSubtitle.length;
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
    let lastEntryLiEnd:number = this.generatedHtml.lastIndexOf('</li>');
    let lastEntryLiLength = lastEntryLiEnd - lastEntryLiStart;

    this.generatedHtml = this.generatedHtml.substring(0, this.generatedHtml.length - (lastEntryLiLength + 10));
    this.generatedHtml += '</ul>';
  }

  onDeleteSection() {
    this.entries = [];
    this.descTitle = '';
    this.descSubtitle = '';
    this.generatedHtml = '<h3 class=\"product-bdesc__tech-title\"></h3>\n\n<h4 class=\"product-bdesc__tech-subtitle\"></h4>';
    this.generatedHtml += '<div class=\"collapsable-bdesc__container\"><div id=\"collapse-fade\" class=\"collapse-fade\"></div><div id=\"target-id2308\" class=\"collapseomatic_content\" style=\"display: none;\">';
    this.generatedHtml += '\n<ul class=\"product-desc__list\"></ul>';

  }

  private generateEnrichedEntry(entry: Entry, index: number): string {
      let enrichedEntry: string = '';
      enrichedEntry += '<li class=\"product-desc__entry '+(index % 2 === 0 ? 'dark' : '' )+'\">'
      enrichedEntry += '<div class=\"product-desc__icon\"></div>';
      enrichedEntry += '<div class=\"product-desc__title small\">'+ entry.title +'</div>';
      enrichedEntry += '<div class=\"product-desc__text\">'+ entry.value +'</div>';
      enrichedEntry += '</li>'
      return enrichedEntry;
  }

  private removeString(str: string, startIndex: number, count: number, isReduced: boolean): string {
    return str.substr(0, startIndex) + str.substr(startIndex + count - (isReduced ? 0 : 1));
  }

  private injectString(parentString: string, index: number, injectedString: string) {
    return parentString.substr(0, index) + injectedString
      + parentString.substr(index);
  }

}
