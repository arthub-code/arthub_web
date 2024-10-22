export default interface ITranslate {
  inputs ?: ITranslateInputs,
  response ?: ITranslateResponse
}

export interface ITranslateInputs {
  text?: string;
  source_lang?: string;
  target_lang?: string;
}

export interface ITranslateResponse {
  translated_text?: string;
}
