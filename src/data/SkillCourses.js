export const skillCourses = [
  {
    id: "digital-literacy",
    title: "Digital Literacy & Smartphone Banking",
    category: "Digital Skills",
    instructor: "EmpowerHer Volunteers",
    duration: "2 Hours",
    difficulty: "Beginner",
    progress: 65,
    lessonsCompleted: 2,
    totalLessons: 4,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop",
    lessons: [
      { id: 1, title: "1. Smartphone Basics & Online Safety", completed: true },
      { id: 2, title: "2. Safe UPI Payments (Google Pay/PhonePe)", completed: true },
      { id: 3, title: "3. Applying for Govt Schemes Online", completed: false, active: true },
      { id: 4, title: "4. WhatsApp Business Setup & Fraud Protection", completed: false, locked: true }
    ],
    certificateName: "Digital Literacy Pioneer Certificate"
  },
  {
    id: "tailoring-apparel",
    title: "Master Tailoring & Apparel Design",
    category: "Tailoring",
    instructor: "Lakshmi Devi (Master Artisan)",
    duration: "4 Weeks",
    difficulty: "Beginner to Advanced",
    progress: 40,
    lessonsCompleted: 1,
    totalLessons: 4,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&auto=format&fit=crop",
    lessons: [
      { id: 1, title: "1. Machine Setup & Basic Stitching", completed: true },
      { id: 2, title: "2. Blouse & Churidhar Cutting", completed: false, active: true },
      { id: 3, title: "3. Embroidery & Pattern Design", completed: false, locked: true },
      { id: 4, title: "4. Pricing & Fabric Sourcing", completed: false, locked: true }
    ],
    certificateName: "Certified Apparel Specialist Badge"
  },
  {
    id: "food-processing",
    title: "Food Processing & Home Catering",
    category: "Food Processing",
    instructor: "Chef Meenakshi S.",
    duration: "3 Weeks",
    difficulty: "Intermediate",
    progress: 100,
    lessonsCompleted: 4,
    totalLessons: 4,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&auto=format&fit=crop",
    lessons: [
      { id: 1, title: "1. Hygiene & FSSAI Standards", completed: true },
      { id: 2, title: "2. Pickle & Spice Processing", completed: true },
      { id: 3, title: "3. Vacuum Sealing & Packaging", completed: true },
      { id: 4, title: "4. Supply to Retail Stores", completed: true }
    ],
    certificateName: "Certified Food Enterprise Badge"
  },
  {
    id: "organic-soap",
    title: "Organic Soap & Herbal Cosmetics",
    category: "Entrepreneurship",
    instructor: "Dr. Anitha Raj",
    duration: "2 Weeks",
    difficulty: "Beginner",
    progress: 0,
    lessonsCompleted: 0,
    totalLessons: 4,
    image: "https://images.unsplash.com/photo-1607006482602-76ca0fd2f47d?w=500&auto=format&fit=crop",
    lessons: [
      { id: 1, title: "1. Natural Oils & Herbs Sourcing", completed: false, active: true },
      { id: 2, title: "2. Cold Process Soap Formulation", completed: false, locked: true },
      { id: 3, title: "3. Packaging & Labeling Rules", completed: false, locked: true },
      { id: 4, title: "4. Selling on Instagram & WhatsApp", completed: false, locked: true }
    ],
    certificateName: "Herbal Cosmetics Enterprise Badge"
  }
];
