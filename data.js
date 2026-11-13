// Brand content and shared configuration.
const cards = [

    { 
        id: "1", 
        name: "soda", 
        image: "./images/rsz_1cocacola.jpg", 
        category: "Drink", 
        title: "Coca Cola", 
        description: "The Coca-Cola logo works well because its flowing script feels friendly, energetic, and timeless. Its distinctive red-and-white color combination is eye-catching, easy to recognize, and strongly associated with the brand.", 
        readMore: "The Coca-Cola logo was first introduced in 1886 by Frank Mason Robinson. Robinson created the Spencerian script, a flowing handwriting style popular in the 19th century, giving the logo its distinctive appearance.", 
        keyDesigns: "Typography: flowing Spencerian script. Color: red and white create strong recognition. Ribbon: conveys motion, fluidity, and refreshment." 
    },

    { 
        id: "2", 
        name: "chips", 
        image: "./images/chips.jpg", 
        category: "Snack", 
        title: "Doritos", 
        description: "The Doritos logo works well because its bold, vibrant design stands out on shelves and appeals to a wide audience. The distinctive orange color and playful font create a sense of fun and excitement.", 
        readMore: "Since Doritos launched in 1966, its logo has gone through several redesigns, changing from a simple colorful design into the sharp, modern logo recognized today.", 
        keyDesigns: "Typography: bold, angular lettering. Triangle: reflects the shape of a tortilla chip. Colors: red, orange, yellow, and black suggest bold flavor and energy." 
    },
    { 
        id: "3", 
        name: "skincare", 
        image: "./images/makeup.jpg", 
        category: "beauty", 
        title: "NARS beauty", 
        description: "The NARS beauty logo works well because its sleek, modern design conveys sophistication and high-quality. The bold typography and distinctive color scheme make it stand out in a crowded market.", 
        readMore: "NARS uses a restrained identity to make its beauty products feel modern, premium, and recognizable.", 
        keyDesigns: "Typography: clean and bold. Style: minimal and sophisticated. Contrast: makes the wordmark stand out." 
    },
    { 
        id: "4", 
        name: "clothing brand", 
        image: "./images/vans.jpg", 
        category: "clothing brand", 
        title: "Vans", 
        description: "The Vans logo works well because its simple, bold design is instantly recognizable. The distinctive checkerboard pattern and straightforward typography create a strong visual identity that resonates with the brand's culture of being 'off the wall'.", 
        readMore: "Vans connects its logo and visual style to skate culture, movement, and individuality.", 
        keyDesigns: "Typography: bold and direct. Pattern: checkerboard adds energy. Personality: casual, youthful, and rebellious." 
    },
    { 
        id: "5", 
        name: "company", 
        image: "./images/fedex.jpg", 
        category: "company", 
        title: "Fed Ex", 
        description: "The FedEx logo works well because its clean, bold lettering looks professional and trustworthy. The hidden arrow between the E and x cleverly represents speed, movement, and delivery.", 
        readMore: "The FedEx wordmark uses a hidden arrow to communicate forward motion and efficient delivery.", 
        keyDesigns: "Typography: clean sans serif. Negative space: creates the hidden arrow. Color: helps separate the two parts of the name." 
    }
];

const STORAGE_KEY = "packageDesignArchiveState";
const STATE_VERSION = 1;
const validCategories = ["all", "clothing", "beauty", "snacks", "company", "cars", "other", "technology", "music", "drinks", "drink", "snack", "clothing brand", "waterbottle", "car", "brandfetch"];
const categoryAliases = { clothing: "clothing brand", beauty: "beauty", snacks: "snack", company: "company", cars: "car", drinks: "drink" };
const BRANDFETCH_CLIENT_ID = "1idyNdK_8wUFAABJvPp";
