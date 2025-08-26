import { Component, OnInit } from '@angular/core';

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
  description?: string;
  date?: string;
  loadError?: boolean;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  
  // Sample images - replace with API call in future
  images: GalleryImage[] = [
    {
      id: 1,
      src: 'assets/images/gallery/chicken-1.jpg',
      alt: 'Healthy chicken in farm',
      title: 'Healthy Farm Chickens',
      category: 'chickens',
      description: 'Our healthy chickens enjoying the farm environment',
      date: '2024-01-15'
    },
    {
      id: 2,
      src: 'assets/images/gallery/farm-1.jpg',
      alt: 'Farm landscape',
      title: 'Farm Landscape',
      category: 'farm',
      description: 'Beautiful view of our farm during sunset',
      date: '2024-01-10'
    },
    {
      id: 3,
      src: 'assets/images/gallery/eggs-1.jpg',
      alt: 'Fresh farm eggs',
      title: 'Fresh Farm Eggs',
      category: 'products',
      description: 'Fresh eggs collected daily from our farm',
      date: '2024-01-12'
    },
    {
      id: 4,
      src: 'assets/images/gallery/equipment-1.jpg',
      alt: 'Farm equipment',
      title: 'Modern Farm Equipment',
      category: 'equipment',
      description: 'State-of-the-art equipment for efficient farming',
      date: '2024-01-08'
    },
    {
      id: 5,
      src: 'assets/images/gallery/workers-1.jpg',
      alt: 'Farm workers',
      title: 'Our Dedicated Team',
      category: 'team',
      description: 'Hardworking team ensuring quality care',
      date: '2024-01-05'
    },
    {
      id: 6,
      src: 'assets/images/gallery/facility-1.jpg',
      alt: 'Farm facility',
      title: 'Modern Farm Facility',
      category: 'facility',
      description: 'Clean and modern facilities for optimal conditions',
      date: '2024-01-03'
    }
  ];

  // Gallery images array
  filteredImages: GalleryImage[] = [];
  
  // Lightbox properties
  selectedImage: GalleryImage | null = null;
  showLightbox = false;
  currentImageIndex = 0;
  lightboxImageError = false;

  ngOnInit() {
    this.filteredImages = [...this.images];
  }

  // Handle image loading errors in gallery grid
  onImageError(event: Event, image: GalleryImage) {
    image.loadError = true;
  }

  // Handle image loading errors in lightbox
  onLightboxImageError(event: Event) {
    this.lightboxImageError = true;
  }

  // Handle thumbnail loading errors
  onThumbnailError(event: Event, image: GalleryImage) {
    // For thumbnails, we can just hide them or show a placeholder
    // For now, we'll just let them fail silently
  }

  // Open lightbox
  openLightbox(image: GalleryImage, index: number) {
    this.selectedImage = image;
    this.currentImageIndex = index;
    this.showLightbox = true;
    this.lightboxImageError = false; // Reset error state
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  // Close lightbox
  closeLightbox() {
    this.showLightbox = false;
    this.selectedImage = null;
    this.lightboxImageError = false;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  // Navigate to next image
  nextImage() {
    if (this.selectedImage) {
      const currentIndex = this.filteredImages.findIndex(img => img.id === this.selectedImage?.id);
      const nextIndex = (currentIndex + 1) % this.filteredImages.length;
      this.selectedImage = this.filteredImages[nextIndex];
      this.currentImageIndex = nextIndex;
      this.lightboxImageError = false; // Reset error state
    }
  }

  // Navigate to previous image
  previousImage() {
    if (this.selectedImage) {
      const currentIndex = this.filteredImages.findIndex(img => img.id === this.selectedImage?.id);
      const prevIndex = currentIndex === 0 ? this.filteredImages.length - 1 : currentIndex - 1;
      this.selectedImage = this.filteredImages[prevIndex];
      this.currentImageIndex = prevIndex;
      this.lightboxImageError = false; // Reset error state
    }
  }

  // Handle keyboard navigation
  onKeyDown(event: KeyboardEvent) {
    if (this.showLightbox) {
      switch (event.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
        case 'ArrowLeft':
          this.previousImage();
          break;
      }
    }
  }

  // Future method for API integration
  loadImagesFromAPI() {
    // TODO: Replace with actual API call
    // this.http.get<GalleryImage[]>('/api/gallery/images').subscribe(
    //   (images) => {
    //     this.images = images;
    //     this.filteredImages = [...this.images];
    //   }
    // );
  }
}
