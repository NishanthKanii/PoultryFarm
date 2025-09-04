import { Component, Inject, PLATFORM_ID, HostListener, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ViewportScroller } from '@angular/common';
import { FarmInfoService } from '../services/farm-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  // Farm information from service
  farmInfo = this.farmInfoService.getFarmInfo();

  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  messageDisplay = {
    show: false,
    message: 'Thanks for contacting us. We will get back to you as soon as possible.'
  };

  // Scroll to top functionality
  showScrollToTop = false;

  // Active navigation tracking
  activeSection = 'home';

  // Section offsets for active tracking
  private sectionOffsets: { [key: string]: number } = {};

  constructor(
    private farmInfoService: FarmInfoService,
    private viewportScroller: ViewportScroller,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Only set page title and setup scroll listener in browser
    if (isPlatformBrowser(this.platformId)) {
      // Set the page title from service
      document.title = this.farmInfoService.getPageTitle();
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Calculate section offsets after view initialization
      setTimeout(() => {
        this.calculateSectionOffsets();
      }, 100);
    }
  }

  // Listen to scroll events to update active section
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateActiveSection();
      this.updateScrollToTopButton();
    }
  }

  // Listen to window resize to recalculate offsets
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.calculateSectionOffsets();
    }
  }

  // Calculate the offset of each section from the top
  private calculateSectionOffsets() {
    const sections = ['home', 'growth', 'products', 'about', 'contact'];
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        this.sectionOffsets[sectionId] = element.offsetTop;
      }
    });
  }

  // Update which section is currently active based on scroll position
  private updateActiveSection() {
    const scrollPosition = window.pageYOffset + 100; // Add offset for better detection
    
    // Find the current active section
    let currentSection = 'home';
    for (const [sectionId, offset] of Object.entries(this.sectionOffsets)) {
      if (scrollPosition >= offset) {
        currentSection = sectionId;
      }
    }
    
    if (this.activeSection !== currentSection) {
      this.activeSection = currentSection;
    }
  }

  // Update scroll to top button visibility
  private updateScrollToTopButton() {
    this.showScrollToTop = window.pageYOffset > 300;
  }

  // Smooth scroll to section
  scrollToSection(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        // Add offset to account for fixed navbar
        const offset = 80;
        const targetPosition = element.offsetTop - offset;
        this.viewportScroller.scrollToPosition([0, targetPosition]);
        this.activeSection = sectionId;
      }
    }
  }

  // Scroll to top
  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      this.viewportScroller.scrollToPosition([0, 0]);
      this.activeSection = 'home';
    }
  }

  handleSendMessage() {
    // Log the form data to console
    console.log('=== Contact Form Submission ===');
    console.log('Name:', this.contactForm.name);
    console.log('Email:', this.contactForm.email);
    console.log('Message:', this.contactForm.message);
    console.log('==============================');
    this.showMessage();
    // Clear the form
    this.contactForm.name = '';
    this.contactForm.email = '';
    this.contactForm.message = '';
  }

  showMessage() {
    this.messageDisplay.show = true;
    // Hide the message after 3 seconds
    setTimeout(() => {
      this.messageDisplay.show = false;
    }, 3000);
  }

  // Open location in new tab
  openLocation() {
    if (!isPlatformBrowser(this.platformId)) return;
    // You can replace this URL with your actual farm location
    const locationUrl = 'https://maps.app.goo.gl/qAn4EM3tkjaGCND47';
    window.open(locationUrl, '_blank');
  }
}
