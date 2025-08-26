import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FarmInfoService } from '../services/farm-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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

  constructor(
    private farmInfoService: FarmInfoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Only set page title and setup scroll listener in browser
    if (isPlatformBrowser(this.platformId)) {
      // Set the page title from service
      document.title = this.farmInfoService.getPageTitle();
      
      // Add scroll event listener for scroll-to-top button
      this.setupScrollListener();
    }
  }

  private setupScrollListener() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => {
        this.showScrollToTop = window.pageYOffset > 300;
        this.updateActiveSection();
      });
    }
  }

  private updateActiveSection() {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const sections = ['home', 'growth', 'products', 'about', 'contact'];
    const scrollPosition = window.pageYOffset + 100; // Offset for navbar

    for (let i = sections.length - 1; i >= 0; i--) {
      const sectionId = sections[i];
      const element = document.getElementById(sectionId);
      
      if (element && element.offsetTop <= scrollPosition) {
        if (this.activeSection !== sectionId) {
          this.activeSection = sectionId;
        }
        break;
      }
    }
  }

  scrollToSection(sectionId: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      // Get the current scroll position
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      // Get the target element position
      const targetPosition = element.offsetTop - 80; // Offset for navbar height
      
      // Calculate the distance to scroll
      const distance = targetPosition - currentScroll;
      
      // Smooth scroll with easing
      this.smoothScrollTo(targetPosition, 1000); // 1000ms = 1 second
    }
  }

  private smoothScrollTo(targetPosition: number, duration: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const startPosition = window.pageYOffset || document.documentElement.scrollTop;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Enhanced easing function for ultra-smooth animation
      const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
      const easedProgress = easeInOutQuart(progress);
      
      // Use requestAnimationFrame for smooth scrolling
      window.scrollTo({
        top: startPosition + distance * easedProgress,
        behavior: 'auto' // We handle the behavior ourselves for better control
      });
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  // Handle navigation link clicks for smooth scrolling
  onNavLinkClick(event: Event, sectionId: string) {
    event.preventDefault();
    this.scrollToSection(sectionId);
  }

  // Smooth scroll to top
  scrollToTop() {
    this.smoothScrollTo(0, 800); // 800ms to top
  }

  // Enhanced smooth scrolling with different durations
  scrollToSectionWithDuration(sectionId: string, duration: number = 1000) {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      const targetPosition = element.offsetTop - 80;
      this.smoothScrollTo(targetPosition, duration);
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
