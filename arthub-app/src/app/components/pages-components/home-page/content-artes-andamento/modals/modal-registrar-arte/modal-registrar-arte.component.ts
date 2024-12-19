import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimaryButtonComponent } from '../../../../../UI/buttons/primary-button/primary-button.component';
import { ThirdButtonComponent } from '../../../../../UI/buttons/third-button/third-button.component';
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
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { TabPanel } from '../../../../../UI/framework/UITabview';
import { PrimaryTabviewComponent } from "../../../../../UI/tabview/primary-tabview/primary-tabview.component";
import { DevianartTabContentComponent } from './devianart-tab-content/devianart-tab-content.component';
import { ArtImageRef, CreatedArt } from '../../../../../../model/ArtModel';
import { UiPrimaryVisualizerComponent } from '../../../../../UI/visualizer/ui-primary-visualizer/ui-primary-visualizer.component';

@Component({
  selector: 'content-artes-andamento-modal-registrar-arte',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryButtonComponent,
    ThirdButtonComponent,
    CalendarModule,
    FormsModule,
    FloatLabelModule,
    ThirdButtonComponent,
    ThirdInputComponent,
    HttpClientModule,
    TranslateModule,
    TabViewModule,
    AvatarModule,
    PrimaryTabviewComponent,
    UiPrimaryVisualizerComponent
  ],
  templateUrl: './modal-registrar-arte.component.html',
  styleUrls: ['./modal-registrar-arte.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalRegistrarArteComponent implements OnInit {
  @ViewChild('pinterestTemplate') pinterestTemplate!: TemplateRef<any>;
  @ViewChild('uploadTemplate') uploadTemplate!: TemplateRef<any>;

  payloadCreatedArt: CreatedArt = new CreatedArt();
  artImageRefs: ArtImageRef[] = [];
  dateRange!: Date[];
  dateDefinitionStatus: boolean = true;
  stage: boolean = true;
  isBrowser: boolean;
  optionsSelect: { Value: string, Text: string }[] = [
    { Value: "PUBLIC", Text: "Público" },
    { Value: "PRIVATE", Text: "Privado" },
    { Value: "NOT_LISTED", Text: "Só com link" }
  ];

  imageRefsTabs: TabPanel[] = [];
  initialized = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private cliente: HttpClient,
    private router: Router,
    private translate: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngOnInit(): Promise<void> {
    await this.translate.initTranslate();

    // Espera que a criação das abas esteja completa antes de seguir
    await this.createTabTemplates();

    // Após completar a criação, marque como inicializado
    this.initialized = true;

    // Agora, as abas devem ter as traduções carregadas corretamente, então podemos atualizar os títulos
    await Promise.all(
      this.imageRefsTabs.map(async (tab) => {
        tab.title = await this.translate.ml(tab.mlId);
        return tab;
      })
    ).then((updatedTabs) => {
      this.imageRefsTabs = updatedTabs;
    });
  }

  async createTabTemplates(): Promise<void> {
    // Carregar as traduções necessárias antes de definir os valores dos inputs
    const labelMl = await this.translate.ml("pages.home.modal_register_art.txt_fileLabel");
    const subLabelMl = await this.translate.ml("pages.home.modal_register_art.txt_fileSublabel");

    this.imageRefsTabs = [
      {
        mlId: "pages.register.txt_deviceUpload",
        tabId: "uploadTemplate",
        title: "",
        icon: "",
        component: FileInputComponent,
        inputs: {
          label: labelMl,
          subLabel: subLabelMl,
          bUseInternalVisualizer: false
        }
      },
      {
        mlId: "pages.register.txt_devianartUpload",
        tabId: "devianartTemplate",
        title: "",
        icon: "",
        component: DevianartTabContentComponent,
        inputs: {
          bUseInternalVisualizer: false
        }
      }
    ];
  }

  NextOrBackStage() {
    this.stage = !this.stage;
    //this.cdr.detectChanges();
  }

  DisableDate = (): void => {
    this.dateDefinitionStatus = !this.dateDefinitionStatus;
  };

  CreateArt() {
    this.cliente.post<ApiResponse>('http://localhost:8080/art/v1/create', this.payloadCreatedArt)
      .pipe(
        map(async (response: ApiResponse) => {
          if (response && response.data) {
            // Handle response data
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
