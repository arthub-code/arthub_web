import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnDestroy, Output, Renderer2 } from '@angular/core';
import { SpinnerIosComponent } from '../../spinner/spinner-ios/spinner-ios.component';
import IMediaSeacher from '../../../../types/IMediaSeacher';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../../../services/translation/translation.service';
import UIGallerySearcher from '../../framework/UIGallerySearcher';
import { PrimaryButtonComponent } from "../../buttons/primary-button/primary-button.component";
import { generateComponentId } from '../../../../utils/crypto';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { ArtImageRef } from '../../../../model/ArtModel';
import ObjectSearch from '../../../../model/ObjectSearch';

export const MEDIA_SEARCHER = 'MediaSearcher';

@Component({
  selector: 'ui-gallery-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SpinnerIosComponent,
    PrimaryButtonComponent,
    ScrollingModule,
    TranslateModule,
    DialogModule
  ],
  templateUrl: './gallery-search.component.html',
  styleUrls: ['./gallery-search.component.scss']
})
export class GallerySearchComponent extends UIGallerySearcher implements OnDestroy {
  constructor(
    private cdRefToSuperClass: ChangeDetectorRef,
    private rendererToSuperClass: Renderer2,
    @Inject(MEDIA_SEARCHER) private mediaSearcherSon: IMediaSeacher,
    private translateServiceSon: TranslationService) {
    let loadMoreBtnId = generateComponentId('primary-gallery-seacrcher-loadmore-btn');
    let offsetToAdd = 5;
    super(cdRefToSuperClass, rendererToSuperClass, mediaSearcherSon, translateServiceSon, offsetToAdd, loadMoreBtnId);
  }
}
