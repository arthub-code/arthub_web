import { generateComponentId } from "../utils/crypto";

export default class ObjectSearch {
  id: string = '';
  thumbnailLink: string = '';
  regularImageLink: string = '';
  caption: string = '';

  constructor(thumbnailLink: string, regularImageLink: string, caption: string) {
    this.id = generateComponentId("objSh_" + caption.replaceAll(" ", "-") + "_" + new Date());
    this.thumbnailLink = thumbnailLink;
    this.regularImageLink = regularImageLink;
    this.caption = caption;
  }
}
