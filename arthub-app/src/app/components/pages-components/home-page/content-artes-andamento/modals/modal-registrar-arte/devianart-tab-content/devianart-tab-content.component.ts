import { Component, EventEmitter, Output } from '@angular/core';
import { GallerySearchComponent, MEDIA_SEARCHER } from "../../../../../../UI/gallery/gallery-search/gallery-search.component";
import { DevianArtService } from '../../../../../../../services/devianart/devianart.service';
import { ArtImageRef } from '../../../../../../../model/ArtModel';

@Component({
  selector: 'app-devianart-tab-content',
  standalone: true,
  imports: [GallerySearchComponent],
  providers: [
    { provide: MEDIA_SEARCHER, useClass: DevianArtService }
  ],
  templateUrl: './devianart-tab-content.component.html',
  styleUrl: './devianart-tab-content.component.scss'
})
export class DevianartTabContentComponent {
  @Output() imageSelected = new EventEmitter<ArtImageRef>();

  onImageSelected(image: ArtImageRef): void {
    if (image) {
      this.imageSelected.emit(image);
    }
  }
}
