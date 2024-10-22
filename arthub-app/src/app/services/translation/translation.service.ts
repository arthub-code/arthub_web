import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import ITranslate from '../../types/ITranslate';
import { catchError, lastValueFrom, map, Observable } from 'rxjs';
import { LANGUAGES } from '../../constants/IdTranslates';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: any = {};
  private defaultLang = 'en';
  private translateService = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  /**
   * @param text
   * @param targetLang
   *
   * Traduz mensagens para a lingua especificada.
   * A lingua traduzida por padrao é o português do Brasil e a lingua que será traduzida sempre será inglês.
   * Caso ocorra algum erro ao tentar traduzir o método lançará um erro no console do navegador e retornará a mensagem inglês original.
   *
   * @returns texto traduzido
   */
  async translateText(text: string, targetLang = 'pt'): Promise<string> {
    const params = {
      text,
      source_lang: "en",
      target_lang: targetLang
    };

    const url = `/translate?${new URLSearchParams(params).toString()}`;

    try {
      const responseTranslate: ITranslate | undefined = await this.http.get<ITranslate>(url).toPromise();
      return responseTranslate?.response?.translated_text || text;
    } catch (error) {
      console.error('Error:', error);
      return text;
    }
  }

  initTranslate() {
    let browserLang = this.getLang();
    this.translateService.setDefaultLang(browserLang);
    this.translateService.use(browserLang);
  }

  changeLang(lang: string) {
    this.translateService.use(lang);
  }

  async mlFormat(id: string, ...values: any[]): Promise<string> {
    let template: string = await this.ml(id);
    return template.replace(/%s/g, () => values.shift());
  }

  /**
   * Método para buscar a tradução de um id
   * @param id O ID da frase no arquivo de tradução
   * @returns Promise com a frase traduzida
   */
  ml(id: string): Promise<string> {
    const browserLang = this.getLang();

    return lastValueFrom(
      this.loadTranslations(browserLang).pipe(
        map(() => this.getTranslation(id))
      )
    );
  }

  /**
   * Carrega o arquivo de tradução JSON correspondente ao idioma fornecido
   * Se o idioma não for suportado, carrega o padrão (inglês)
   * @param lang O idioma a ser carregado
   */
  private loadTranslations(lang: string): Observable<void> {
    const languageToLoad = LANGUAGES.includes(lang) ? lang : this.defaultLang;
    const translationFile = `assets/i18n/${languageToLoad}.json`;

    console.log(`Loading translation file: ${translationFile}`); // Log para verificar o caminho do arquivo

    return this.http.get(translationFile).pipe(
      map((data) => {
        this.translations = data;
      }),
      catchError(() => {
        return this.http.get(`assets/i18n/${this.defaultLang}.json`).pipe(
          map((data) => {
            this.translations = data;
          })
        );
      })
    );
  }

  /**
   * Retorna a frase traduzida com base no ID ou texto chave fornecido
   * @param id O ID da frase no arquivo de tradução, podendo ser aninhado (ex: 'messages.error.validation_fieldIsRequired')
   * @returns A frase traduzida ou uma string vazia se o ID não for encontrado
   */
  private getTranslation(id: string): string {
    const keys = id.split('.');
    let translation = this.translations;

    for (const key of keys) {
      if (translation[key]) {
        translation = translation[key];
      } else {
        return '';
      }
    }

    return typeof translation === 'string' ? translation : '';
  }

  private getLang(): string {
    let browserLang = 'en';
    if (isPlatformBrowser(this.platformId)) {
      browserLang = navigator.language.split('-')[0];
    }
    return browserLang;
  }
}
