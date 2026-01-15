// Feature Interface
interface Feature {
    name: string;
    image: string;
}

// Ring Category Interface
interface RingCategory {
    name: string;
}

export const features: Feature[] = [
    {
        name: "Free Resizing",
        image: "resize.svg"
    },
    {
        name: "Free Delivery",
        image: "free_delivery.svg"
    },
    {
        name: "60 Days Returns",
        image: "return.svg"
    },
    {
        name: "Authenticity Certificates",
        image: "certificate.svg"
    },
    {
        name: "Beautiful Packaging",
        image: "gifts.svg"
    },
    {
        name: "Lifetime Warranty",
        image: "warranty.svg"
    },
]

export const ringCategories: RingCategory[] = new Array(21).fill({name: "Classic Solitaire"});

export const sampleRings = [
    {
      id: 1,
      title: "Low Set Round Platinum Lab Grown Diamond Classic Solitaire Engagement Rings",
      price: 600,
      image: "/assets/images/ring.webp",
      thumbnails: [
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
      ],
      metals: [
        { name: "Metal White Gold", color: "radial-gradient(50% 50% at 0 0, #f5f5f5 0%, #e1e1e1 100%)" },
        { name: "Metal Yellow Gold", color: "radial-gradient(50% 50% at 0 0, #f1ceac 0%, #bf8f5f 100%)" },
        { name: "Metal Rose Gold", color: "radial-gradient(50% 50% at 0 0, #f9e0dc 0%, #bb8072 100%)" },
        { name: "Metal Platinum Gold", color: "radial-gradient(50% 50% at 0 0, #e5e4e2 0%, #b0b0b0 100%)" },
      ],
    },
    {
      id: 2,
      title: "Halo Round Yellow Gold Natural Diamond Engagement Rings",
      price: 850,
      image: "/assets/images/ring.webp",
      thumbnails: [
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
      ],
      metals: [
        { name: "Metal White Gold", color: "radial-gradient(50% 50% at 0 0, #f5f5f5 0%, #e1e1e1 100%)" },
        { name: "Metal Yellow Gold", color: "radial-gradient(50% 50% at 0 0, #f1ceac 0%, #bf8f5f 100%)" },
        { name: "Metal Rose Gold", color: "radial-gradient(50% 50% at 0 0, #f9e0dc 0%, #bb8072 100%)" },
        { name: "Metal Platinum Gold", color: "radial-gradient(50% 50% at 0 0, #e5e4e2 0%, #b0b0b0 100%)" },
      ],
    },
    {
      id: 3,
      title: "Three Stone Princess Cut Rose Gold Diamond Ring",
      price: 1200,
      image: "/assets/images/ring.webp",
      thumbnails: [
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
      ],
      metals: [
        { name: "Metal White Gold", color: "radial-gradient(50% 50% at 0 0, #f5f5f5 0%, #e1e1e1 100%)" },
        { name: "Metal Yellow Gold", color: "radial-gradient(50% 50% at 0 0, #f1ceac 0%, #bf8f5f 100%)" },
        { name: "Metal Rose Gold", color: "radial-gradient(50% 50% at 0 0, #f9e0dc 0%, #bb8072 100%)" },
        { name: "Metal Platinum Gold", color: "radial-gradient(50% 50% at 0 0, #e5e4e2 0%, #b0b0b0 100%)" },
      ],
    },
    {
      id: 4,
      title: "Oval Cut Platinum Moissanite Vintage Style Ring",
      price: 720,
      image: "/assets/images/ring.webp",
      thumbnails: [
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
        "/assets/images/ring.webp",
      ],
      metals: [
        { name: "Metal White Gold", color: "radial-gradient(50% 50% at 0 0, #f5f5f5 0%, #e1e1e1 100%)" },
        { name: "Metal Yellow Gold", color: "radial-gradient(50% 50% at 0 0, #f1ceac 0%, #bf8f5f 100%)" },
        { name: "Metal Rose Gold", color: "radial-gradient(50% 50% at 0 0, #f9e0dc 0%, #bb8072 100%)" },
        { name: "Metal Platinum Gold", color: "radial-gradient(50% 50% at 0 0, #e5e4e2 0%, #b0b0b0 100%)" },
      ],
    },
];

export const breadcrumbs = [
    {label: 'Home', href: '/'},
    {label: 'Engagement Rings', href: '/engagement-rings'},
    {
      label:
        'Low Set Round 9k White Gold Lab Grown Diamond Classic Solitaire Engagement Rings',
    },
  ];
