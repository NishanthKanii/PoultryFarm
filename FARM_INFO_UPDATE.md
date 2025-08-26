# Farm Information Update Guide

This guide explains how to update farm information across the entire website using the centralized service system.

## 🎯 What's Centralized

All the following information is now managed from one place and automatically updates across the entire website:

- **Page Title** - Browser tab title
- **Farm Name** - Company name displayed in navigation and footer
- **Phone Number** - Contact phone number
- **Email Address** - Contact email
- **Physical Address** - Farm location address
- **Business Hours** - Operating hours for weekdays and Sunday
- **Description** - Main description text

## 📝 How to Update

### Option 1: Quick Update (Recommended)

1. Open `src/app/services/farm-config.ts`
2. Update the values you want to change
3. Save the file
4. The changes will automatically appear across the website

### Option 2: Using the Service

1. Open `src/app/services/farm-info.service.ts`
2. Modify the `farmInfo` object
3. Save the file

## 🔧 Configuration File Structure

```typescript
export const FARM_CONFIG = {
  // Basic Information
  PAGE_TITLE: 'Premium Poultry Farm',
  FARM_NAME: 'Premium Poultry',
  
  // Contact Information
  PHONE_NUMBER: '(555) 123-FARM',
  EMAIL: 'info@premiumpoultry.com',
  ADDRESS: '123 Farm Road, Rural County, State 12345',
  
  // Business Hours
  BUSINESS_HOURS: {
    WEEKDAYS: 'Mon-Sat: 7AM-6PM',
    SUNDAY: 'Sun: 8AM-4PM'
  },
  
  // Description
  DESCRIPTION: 'From tiny chicks to full-grown chickens...',
};
```

## 📍 Where Information Appears

### Navigation Bar
- Farm name in the logo area

### Hero Section
- Page title as main heading
- Description text below the heading

### Contact Section
- Address with location icon
- Phone number with phone icon
- Email with envelope icon
- Business hours with clock icon

### Footer
- Farm name in the company section
- Description in the company section

## ✅ Benefits

1. **Single Source of Truth** - All farm info in one place
2. **Easy Updates** - Change once, updates everywhere
3. **Consistency** - No risk of different information in different places
4. **Maintainable** - Easy to manage and update
5. **Scalable** - Easy to add new information fields

## 🚀 Adding New Information

To add new farm information:

1. Add the new field to `FARM_CONFIG` in `farm-config.ts`
2. Add the corresponding property to the `FarmInfo` interface in `farm-info.service.ts`
3. Add the property to the `farmInfo` object in the service
4. Add a getter method if needed
5. Use it in your HTML templates with `{{ farmInfo.newProperty }}`

## 🔍 Example Updates

### Change Phone Number
```typescript
// In farm-config.ts
PHONE_NUMBER: '(555) 987-FARM', // Changed from 123-FARM
```

### Change Business Hours
```typescript
// In farm-config.ts
BUSINESS_HOURS: {
  WEEKDAYS: 'Mon-Fri: 8AM-5PM, Sat: 9AM-3PM', // Updated hours
  SUNDAY: 'Sun: Closed' // Changed Sunday hours
}
```

### Change Address
```typescript
// In farm-config.ts
ADDRESS: '456 New Farm Road, City Center, State 54321', // New address
```

## 📱 Responsive Design

All the information automatically adapts to different screen sizes and maintains the same styling and layout across all devices.

## 🆘 Troubleshooting

- **Changes not appearing?** Make sure you saved the file and the development server is running
- **Type errors?** Check that you've updated both the config and interface files
- **Display issues?** Verify the HTML template is using the correct property names

## 💡 Tips

- Keep phone numbers in a consistent format
- Use clear, readable business hours
- Make sure the email address is valid
- Test changes on different screen sizes
- Update information during low-traffic periods
- repo = https://github.com/NishanthKanii/PoultryFarm.git
