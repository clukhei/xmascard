import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { MessageComponent } from './components/message.component';
import { CardComponent } from './components/card.component';
import { GameService } from './game.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Globals} from './scenes/constants'
const ROUTES: Routes = [
  {path: '', component:MessageComponent },
  {path: 'card', component: CardComponent},
  {path: '**', redirectTo: '' , pathMatch: 'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,

    CardComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {
      useHash:true
    }),
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private injector: Injector){
    Globals.injector = injector
  }
}
