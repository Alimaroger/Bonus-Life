# Member Photos Integration Guide

## 📁 Folder Structure Created
```
assets/
└── images/
    └── team/
        ├── group-photo.jpg          (Team group photo)
        ├── alima-roger.jpg          (Scrum Master)
        ├── joy-chebegwen.jpg        (Product Owner)
        ├── marie-michelle.jpg       (Frontend Developer)
        ├── hope-aneng.jpg           (Backend Developer)
        └── emmanuel-aloh.jpg        (QA & Testing Lead)
```

## 🖼️ How to Add Real Member Photos

### Step 1: Add Photos to the Assets Folder
1. Place your team member photos in the `assets/images/team/` folder
2. Use the naming convention shown above
3. Recommended image specifications:
   - **Individual photos**: 400x400px (square format)
   - **Group photo**: 1200x600px (landscape format)
   - **Format**: JPG or PNG
   - **Size**: Under 500KB each for optimal loading

### Step 2: Update the AboutUs Component

Replace the emoji placeholders in `AboutUs.jsx` with actual image imports:

```javascript
// Add these imports at the top of AboutUs.jsx
import groupPhoto from '../assets/images/team/group-photo.jpg';
import alimaPhoto from '../assets/images/team/alima-roger.jpg';
import joyPhoto from '../assets/images/team/joy-chebegwen.jpg';
import mariePhoto from '../assets/images/team/marie-michelle.jpg';
import hopePhoto from '../assets/images/team/hope-aneng.jpg';
import emmanuelPhoto from '../assets/images/team/emmanuel-aloh.jpg';

// Replace the group photo placeholder
<div style={heroImageStyle}>
  <img 
    src={groupPhoto} 
    alt="Bonus Life Team" 
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '1rem'
    }}
  />
</div>

// Replace individual member photo placeholders
<div style={memberPhotoStyle}>
  <img 
    src={alimaPhoto} 
    alt="Alima Nkoudou Roger" 
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%'
    }}
  />
</div>
```

### Step 3: Photo Guidelines for Best Results

#### Individual Member Photos:
- **Professional headshots** preferred
- **Good lighting** and clear background
- **Consistent style** across all photos
- **Smiling, professional expression**
- **Business casual or professional attire**

#### Group Photo:
- **All team members** visible and clearly identifiable
- **Professional setting** (office, university, or neutral background)
- **Good lighting** and high resolution
- **Team arranged in a visually appealing way**

## 🎨 Current Design Features

### ✅ Already Implemented:
- **Professional white background** with red accent colors (#DC2626, #EF4444, #B91C1C)
- **Responsive grid layout** for team members
- **Individual member cards** with roles and descriptions
- **Team group photo section** with placeholder
- **Professional typography** using Inter font family
- **Center-aligned layout** as preferred
- **Interactive hover effects** on cards
- **Contact section** with email integration
- **Mission and process sections** with visual icons

### 🔄 Navigation Integration:
- Added "About" link to the main dashboard navigation
- Route: `/about` accessible from the main app navigation
- Consistent with existing app navigation structure

## 📱 Responsive Design
The AboutUs page is fully responsive and adapts to:
- **Desktop**: Full grid layout with all features
- **Tablet**: Adjusted grid columns and spacing
- **Mobile**: Single column layout with optimized spacing

## 🚀 Next Steps
1. Add your actual team member photos to the `assets/images/team/` folder
2. Update the AboutUs.jsx component with image imports
3. Test the page on different screen sizes
4. Ensure all photos load correctly
5. Consider adding a photo gallery or carousel for additional team photos

## 📧 Contact Integration
The contact section includes:
- Professional email button with hover effects
- Direct mailto link to: `bonuslife.team@ictuniversity.edu`
- Responsive design for all devices
