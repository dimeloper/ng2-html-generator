import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { ShortDescriptionComponent } from './components/short-description.component';
import { ImageAndTextComponent } from './components/image-and-text.component';
import { LongDescriptionComponent } from './components/long-description.component';

@NgModule({
  declarations: [
    AppComponent,
    ShortDescriptionComponent,
    ImageAndTextComponent,
    LongDescriptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
