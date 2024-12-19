import { Observable } from "rxjs";
import ObjectSearch from "../model/ObjectSearch";

export default interface IMediaSeacher {
  searchImage(query: string, offset: string): Observable<ObjectSearch[]>
}
