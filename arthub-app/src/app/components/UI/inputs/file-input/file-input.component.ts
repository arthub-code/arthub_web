import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import UIInput from '../../framework/UIInput';
import { ArtImageRef, FileData } from '../../../../model/ArtModel';

@Component({
  selector: 'ui-file-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss'
})
export class FileInputComponent extends UIInput {
  @Input() bUseInternalVisualizer: boolean = true;
  @Output() imageSelected = new EventEmitter<ArtImageRef>();
  selectedImages: string[] = [];
  isDragging: boolean = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault(); // Necessário para permitir o drop
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault(); // Evita que o navegador abra os arquivos
    this.isDragging = false;

    if (event.dataTransfer?.files) {
      this.processFiles(event.dataTransfer.files);
    }
  }

  private processFiles(files: FileList): void {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if(this.bUseInternalVisualizer) {
          this.selectedImages.push(e.target.result);
        } else {
          const fileData: FileData = {
            base64: e.target.result,
            fileName: file.name,
            contentType: file.type
          };
          const artImageRef: ArtImageRef = {
            uploadType: 'LOCAL',
            fileData: fileData,
            imageLink: ''
          };
          this.imageSelected.emit(artImageRef);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);
  }
}
