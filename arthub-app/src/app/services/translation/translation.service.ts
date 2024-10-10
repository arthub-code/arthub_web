import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ITranslate from '../../types/ITranslate';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private workerUrl = 'https://655.mtis.workers.dev/translate';

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

    // Monta a URL para a requisição
    const url = `/translate?${new URLSearchParams(params).toString()}`;

    try {
      const responseTranslate: ITranslate | undefined = await this.http.get<ITranslate>(url).toPromise();
      return responseTranslate?.response?.translated_text || text;
    } catch (error) {
      console.error('Error:', error);
      return text;
    }
  }

  ml(text: string) {
    // verificar linguagem do navegador
    // aplicar i18n... buscando no dicionario de palavras chaves das linguagens
    // retornar mensagem traduzida
  }
}
