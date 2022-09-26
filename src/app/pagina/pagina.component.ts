import { Component, NgModule, OnInit } from '@angular/core';

import { catchError } from 'rxjs/operators';

import { ApiService } from '../services/api.service';

import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss']
})

export class PaginaComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private reactiveFormsModule: ReactiveFormsModule
  ) {}

  public textForm: FormGroup;
  public apiGreeting = '';
  public apiDateTime = '';
  public text = '';

  ngOnInit(): void {
    this.getDateTime();
    this.apiService.getHello().pipe(
      catchError((err) => {
        this.apiGreeting = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        this.apiGreeting = response.mensagem;
      }
    });

    this.textForm = this.formBuilder.group({
      text: ''
    });
  }

  onSubmit(data): void {
    this.apiService.sendText(data.text);
    this.text = data.text;
  }

  private getDateTime(): any {
    this.apiService.getDateTime().pipe(
      catchError((err) => {
        console.log(err);
        this.apiDateTime = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        this.apiDateTime = response.date;
      }
    });
  }

}
