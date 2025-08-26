import { Injectable } from '@angular/core';
import { FARM_CONFIG } from './farm-config';

export interface FarmInfo {
  pageTitle: string;
  farmName: string;
  phoneNumber: string;
  email: string;
  address: string;
  businessHours: {
    weekdays: string;
    sunday: string;
  };
  description: string;
  year: string;
}

@Injectable({
  providedIn: 'root'
})
export class FarmInfoService {
  
  private farmInfo: FarmInfo = {
    pageTitle: FARM_CONFIG.PAGE_TITLE,
    farmName: FARM_CONFIG.FARM_NAME,
    phoneNumber: FARM_CONFIG.PHONE_NUMBER,
    email: FARM_CONFIG.EMAIL,
    address: FARM_CONFIG.ADDRESS,
    businessHours: {
      weekdays: FARM_CONFIG.BUSINESS_HOURS.WEEKDAYS,
      sunday: FARM_CONFIG.BUSINESS_HOURS.SUNDAY
    },
    description: FARM_CONFIG.DESCRIPTION,
    year: FARM_CONFIG.YEAR
  };

  constructor() { }

  // Get all farm information
  getFarmInfo(): FarmInfo {
    return this.farmInfo;
  }

  // Get specific properties
  getPageTitle(): string {
    return this.farmInfo.pageTitle;
  }

  getFarmName(): string {
    return this.farmInfo.farmName;
  }

  getPhoneNumber(): string {
    return this.farmInfo.phoneNumber;
  }

  getEmail(): string {
    return this.farmInfo.email;
  }

  getAddress(): string {
    return this.farmInfo.address;
  }

  getBusinessHours(): { weekdays: string; sunday: string } {
    return this.farmInfo.businessHours;
  }

  getDescription(): string {
    return this.farmInfo.description;
  }

  getYear(): string {
    return this.farmInfo.year;
  }

  // Get formatted business hours for display
  getFormattedBusinessHours(): string {
    return `${this.farmInfo.businessHours.weekdays}, ${this.farmInfo.businessHours.sunday}`;
  }

  // Update farm information (useful for admin panel or configuration)
  updateFarmInfo(newInfo: Partial<FarmInfo>): void {
    this.farmInfo = { ...this.farmInfo, ...newInfo };
  }
}
