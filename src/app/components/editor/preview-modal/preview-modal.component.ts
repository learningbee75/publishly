import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.scss']
})
export class PreviewModalComponent {
  @ViewChild('modal', { static: true }) modal!: ElementRef<HTMLDivElement>;
  preview: any = {};

  open(previewObj: any) {
    this.preview = previewObj;
    // @ts-ignore
    const modal = new window.bootstrap.Modal(this.modal.nativeElement);
    modal.show();
  }
}
