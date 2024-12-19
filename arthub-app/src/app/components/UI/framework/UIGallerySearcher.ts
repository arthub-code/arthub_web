import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from "@angular/core";
import UIComponent from "../UIComponent";
import IMediaSeacher from "../../../types/IMediaSeacher";
import { TranslationService } from "../../../services/translation/translation.service";
import ObjectSearch from "../../../model/ObjectSearch";
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from "rxjs";
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { ArtImageRef } from "../../../model/ArtModel";

@Directive()
export default class UIGallerySearcher extends UIComponent  implements OnInit, OnDestroy {
  @ViewChild('imageContainer', { static: false }) imageContainerRef!: ElementRef;
  @ViewChild(CdkVirtualScrollViewport) viewportRef!: CdkVirtualScrollViewport;

  protected loading: boolean = false;
  protected loadingLoadMore: boolean = false;
  protected images: ObjectSearch[] = [];
  protected selectedImages: ObjectSearch[] = [];
  showingImages: boolean = false;
  searchQuery: string = '';
  offset: number = 0;
  loadMoreButtonId: string = '';
  imageNotFound: string = '';
  bUpdateImageNotFoundMsg: boolean = false;
  showImageCardModal: boolean = false;
  imageSelected: ObjectSearch | null = null;
  @Input() bUseInternalVisualizer: boolean = true;
  @Output() imageSelectedEmitter = new EventEmitter<ArtImageRef>();

  private searchSubject: Subject<string> = new Subject<string>();
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private mediaSearcher: IMediaSeacher,
    private translateService: TranslationService,
    private offsetAdder: number,
    loadMoreButtonSup: string
  ) {
    super();
    this.loadMoreButtonId = loadMoreButtonSup;
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => this.searchImages(query));
  }


  /* Class Commons */

  ngOnInit(): void {
    this.translateService.initTranslate();

    this.updateImageNotFoundMsg('components.ui-gallery-search.txt_searchYourReference', 'No images found.');
    this.bUpdateImageNotFoundMsg = false;

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.showImageCardModal) {
      this.preventModalClose(event);
    }
  };


  /* Seacher */

  onSearchQueryChange(query: string): void {
    this.searchSubject.next(query);
  }

  searchImages(query: string): void {
    if (query) {
      this.loading = true;

      if (!this.bUpdateImageNotFoundMsg) {
        this.updateImageNotFoundMsg('components.ui-gallery-search.txt_imageNotFound', "Search your reference.");
      }

      this.mediaSearcher.searchImage(query, this.offset + "")
        .subscribe(results => {
          this.images = results;
          this.loading = false;
          this.showingImages = true;
        });
    } else {
      if (this.bUpdateImageNotFoundMsg) {
        this.updateImageNotFoundMsg('components.ui-gallery-search.txt_searchYourReference', 'No images found.');
        this.bUpdateImageNotFoundMsg = false;
      }
    }
  }

  onScroll(index: number): void {
    const viewport = this.viewportRef.elementRef.nativeElement;
    const totalItems = this.images.length;
    const viewportHeight = viewport.clientHeight;
    const contentHeight = viewport.scrollHeight;
    const scrollTop = viewport.scrollTop;

    const isAtBottom = scrollTop + viewportHeight >= contentHeight - 200;

    if (isAtBottom && !this.loadingLoadMore) {
      this.loadMore(this.offset);
    }
  }

  loadMore(offset: number): void {
    if (this.searchQuery) {
      this.loadingLoadMore = true;

      const offsetAdded = offset + this.offsetAdder;
      this.offset = offsetAdded;

      // Simulação de uma busca por imagens com base no offset
      this.mediaSearcher.searchImage(this.searchQuery, offsetAdded + "").subscribe((results) => {
        this.images = [...this.images, ...results]; // Adiciona novas imagens ao array existente
        this.loadingLoadMore = false;
        this.showingImages = true;
      });
    }
  }

  updateImageNotFoundMsg(key: string, defaultMsg: string): void {
    this.translateService.ml(key)
      .then(msg => this.imageNotFound = msg)
      .catch(err => this.imageNotFound = defaultMsg);
    this.bUpdateImageNotFoundMsg = true;
  }

  removeImage(i: number) {

  }

  selectImage(image: ObjectSearch | null): void {
    if(image != null) {
      if(this.bUseInternalVisualizer) {
        if(this.selectedImages.length > 0) {
          for(let i = 0; i <= this.selectedImages.length; i++) {
            if(this.selectedImages[i].id != image.id) {
              this.selectedImages.push(image);
              this.closeImageCardModal();
              break;
            }
          }
        } else {
          this.selectedImages.push(image);
          this.closeImageCardModal();
        }
      } else {
        const artImageRef: ArtImageRef = {
          uploadType: 'URL',
          fileData: {
            base64: null,
            fileName: null,
            contentType: null
          },
          imageLink: image.regularImageLink
        };
        this.imageSelectedEmitter.emit(artImageRef);
        this.closeImageCardModal();
      }
    } else {
      Promise.resolve(
        this.translateService.ml("components.ui-gallery-search.txt_errorOnSelectImage")
      )
      .then(phrase => window.alert(phrase))
      .catch(err => window.alert("ERROR: " + err))
    }
  }


  /* Image Card Modal */

  openImageCardModal(id: string) {
    setTimeout(() => {
      if(!this.imageSelected) {
        for(let i = 0; i <= this.images.length; i++ ) {
          if(this.images[i].id === id) {
            this.imageSelected = this.images[i];
            break;
          }
        }
      }
      this.showImageCardModal = true;
      this.cdRef.detectChanges();
    }, 200);
  }

  preventModalClose(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeImageCardModal();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  closeImageCardModal() {
    setTimeout(() => {
      this.imageSelected = null;
      this.showImageCardModal = false;
      this.cdRef.detectChanges();
    }, 200);
  }
}
