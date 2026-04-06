const sampleEvents = [
    { 
        title: "AI Summit",
        description: "Exploring AI innovations",
        price: 1500,
        image: "https://media.istockphoto.com/id/1404310241/photo/financial-in-metaverse-with-cyber-city-skyline.jpg?s=612x612&w=0&k=20&c=ZcnH6doIZfJt2JiUSSCpOVOLzSoPBFQ1MyldOAiRxMg=",
        location: "Tech Park",
        eventtype: ["tech", "conference"]
    },
    { 
        title: "Startup Bootcamp",
        description: "For aspiring entrepreneurs",
        price: 2000,
        image: "https://media.istockphoto.com/id/1881115336/photo/startup-entrepreneurship-leadership-to-plan-development-business-projects.jpg?s=612x612&w=is&k=20&c=UdJ-LGuj0sF2MOLbY4Z0bT8FqjL-xLXEtbwl6e43J-E=",
        location: "Innovation Hub",
        eventtype: ["business", "education"]
    },
    { 
        title: "Cybersecurity Workshop",
        description: "Learn ethical hacking",
        price: 1800,
        image: "https://media.istockphoto.com/id/2154561908/photo/asian-and-indian-developer-program-coding-sent-to-virtual-reality-headset-to-implement-ai.jpg?s=612x612&w=is&k=20&c=8zaIz3ns88OZUsJv-9qDMTzU_xEz5W9uZJjFQJC4jNo=",
        location: "Cyber Lab",
        eventtype: ["tech", "workshop"]
    },
    { 
        title: "Music Fest",
        description: "A night of live music",
        price: 1000,
        image: "https://media.istockphoto.com/id/1323545391/vector/vector-colorful-emblem-music-fest-creative-set-of-alphabet-letters-and-numbers.jpg?s=612x612&w=is&k=20&c=mMwP8bwuJl4ObrVWhDgBf5vCorqyN9HL8kVF2ijLmpc=",
        location: "Open Arena",
        eventtype: ["entertainment", "festival"]
    },
    { 
        title: "Health & Wellness Expo",
        description: "Workshops on fitness & health",
        price: 900,
        image: "https://media.istockphoto.com/id/1185385746/vector/concept-of-healthy-lifestyle-infographics-icons-for-web-fitness-food-and-metrics-flat-design.jpg?s=612x612&w=is&k=20&c=hCSsZLKGP_I4soWW5p435Ur4KoT3YLgye6-YSJgS-IA=",
        location: "Community Center",
        eventtype: ["health", "education"]
    },
    { 
        title: "Gaming Championship",
        description: "Compete in top eSports games",
        price: 2500,
        image: "https://media.istockphoto.com/id/887246936/vector/vector-minimal-dj-poster-electronic-music-cover-for-music-fest-or-club-party-flyer-vibrant.jpg?s=612x612&w=is&k=20&c=6LhHqqYny6_XRCjzZStRfNgBTToBg2aQARGjqRHYwlM=",
        location: "eSports Arena",
        eventtype: ["gaming", "competition"]
    },
    { 
        title: "Photography Contest",
        description: "Showcase your best shots",
        price: 1200,
        image: "https://media.istockphoto.com/id/1202726037/photo/crazy-stylish-people-listening-music-with-vintage-boombox-stereo-fashion-couple-wearing-t-rex.jpg?s=612x612&w=is&k=20&c=9k7TvaWkkd9yYdfCUCRjGl7Rw2kB3q1p3MRsG9RUGk8=",
        location: "Art Studio",
        eventtype: ["art", "competition"]
    },
    { 
        title: "Literary Fest",
        description: "Celebrating books & poetry",
        price: 700,
        image: "https://media.istockphoto.com/id/1176493328/vector/book-festival-flat-poster-vector-template-writer-fest-library-anniversary-books-fair.jpg?s=612x612&w=is&k=20&c=4YRdycKci1LkCwK4CGiWR2nO54Lxg1i_Km9zNobfGMo=",
        location: "Library Hall",
        eventtype: ["education", "festival"]
    },
    { 
        title: "Tech Expo",
        description: "Showcasing the latest tech",
        price: 2200,
        image: "https://media.istockphoto.com/id/1334591614/photo/man-using-digital-tablet-online-connect-to-internet-banking-currency-exchange-online-shopping.jpg?s=612x612&w=is&k=20&c=L3jyLgr9Hea5sty0QgBBx0nkOGp1NQ6uRitdbM5jimI=",
        location: "Convention Center",
        eventtype: ["tech", "exhibition"]
    },
    { 
        title: "Robotics Workshop",
        description: "Build and program robots",
        price: 3000,
        image: "https://media.istockphoto.com/id/1287582736/photo/robot-humanoid-use-laptop-and-sit-at-table-for-big-data-analytic.jpg?s=612x612&w=is&k=20&c=D_fQl3haKimAt4wrRq27uEceH0ImRgr4oTl77gJzNis=",
        location: "Robotics Lab",
        eventtype: ["tech", "education"]
    }
];

module.exports = {data: sampleEvents};
