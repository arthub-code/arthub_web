import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimarySelectComponent } from '../../../../../UI/selects/primary-select/primary-select.component';
import { PrimaryButtonComponent } from '../../../../../UI/buttons/primary-button/primary-button.component';
import { ThirdButtonComponent } from '../../../../../UI/buttons/third-button/third-button.component';
import { SecondaryInputComponent } from '../../../../../UI/inputs/secondary-input/secondary-input.component';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ThirdInputComponent } from "../../../../../UI/inputs/third-input/third-input.component";
import { FileInputComponent } from '../../../../../UI/inputs/file-input/file-input.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../../../../../services/translation/translation.service';
import ApiResponse from '../../../../../../types/IApiResponse';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'content-artes-andamento-modal-registrar-arte',
  standalone: true,
  imports: [CommonModule, 
            FileInputComponent, 
            PrimarySelectComponent, 
            PrimaryButtonComponent,
            ThirdButtonComponent, 
            SecondaryInputComponent, 
            CalendarModule, 
            FormsModule, 
            FloatLabelModule, 
            ThirdButtonComponent, 
            ThirdInputComponent,
            HttpClientModule,
            TranslateModule
          ],
  templateUrl: './modal-registrar-arte.component.html',
  styleUrl: './modal-registrar-arte.component.scss'
})
export class ModalRegistrarArteComponent implements OnInit {
  payloadCreatedArt: CreatedArt = new CreatedArt();
  dateRange!: Date[];
  dateDefinitionStatus: boolean = true;
  stage: boolean = true;
  isBrowser: boolean;
  optionsSelect: { Value: string, Text: string }[] = [{Value: "PUBLIC", Text: "Publico"},{Value: "PRIVATE", Text: "Privado"},{Value: "NOT_LISTED", Text: "Só com link"}];

  constructor(
    private cliente: HttpClient, 
    private router: Router,
    private translate: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.translate.initTranslate();
  }

  NextOrBackStage(){
    if(!this.stage)
      this.stage = true;
    else
      this.stage = false;
  }

  DisableDate = (): void => {
    if(!this.dateDefinitionStatus)
       this.dateDefinitionStatus = true;
    else
       this.dateDefinitionStatus = false;
  };

  CreateArt() {
    this.cliente.post<ApiResponse>('http://localhost:8080/art/v1/create', this.payloadCreatedArt)
    .pipe(
      map(async (response: ApiResponse) => {
        if (response && response.data) {
        }
        return 'Sua conta foi requisitada com sucesso. Enviamos um email de confirmação, estamos no aguardo de sua resposta.';
      })
    )
    .subscribe(
      async (translatedMessage: Promise<string | undefined>) => {
        const successMessage = await translatedMessage;
      },
      async (error: any) => {
        let errerResponse: ApiResponse = error?.error;
      }
    );
  }
}

export class FileData {
  base64!: string | null;
  fileName!: string | null;
  contentType!: string | null;
}

export class ArtImageRef {
  uploadType!: string;
  fileData!: FileData;
  imageLink!: string;
}


export class CreatedArt {
  artName!: string;
  haveSchedule!: boolean;
  startScheduleDate!: string;
  endScheduleDate!: string;
  userAccountType!: string;
  artImageRef!: ArtImageRef[]; 
}
