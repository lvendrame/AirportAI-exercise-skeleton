const Product = require('../server/models/product');
const Agent = require('../server/models/agent');

const products = [
    {
        type: "phone",
        brand: "Samsung",
        color: "Black",
        description: "Samsung Galaxy S21, black color, with a red case",
        lostTime: new Date("2023-01-02T12:30:00Z")
    },
    {
        type: "tablet",
        brand: "Apple",
        color: "Silver",
        description: "iPad Pro, silver back, 11 inch",
        lostTime: new Date("2023-01-03T15:45:00Z")
    },
    {
        type: "laptop",
        brand: "Dell",
        color: "Black",
        description: "Dell Inspiron 15, with a 'Go Green' sticker on the lid",
        lostTime: new Date("2023-01-04T09:20:00Z")
    },
    {
        type: "backpack",
        brand: "The North Face",
        color: "Blue",
        description: "Blue North Face backpack with a keychain of a small teddy bear",
        lostTime: new Date("2023-01-05T16:00:00Z")
    },
    {
        type: "headphones",
        brand: "Bose",
        color: "White",
        description: "White Bose QuietComfort 35, left on seat 24A",
        lostTime: new Date("2023-01-06T19:30:00Z")
    },
    {
        type: "passport",
        brand: "USA",
        color: "Navy",
        description: "American passport with the name Johnathan Doe, issued in Texas",
        lostTime: new Date("2023-01-07T14:50:00Z")
    },
    {
        type: "watch",
        brand: "Omega",
        color: "Silver",
        description: "Omega Seamaster watch, with a slight scratch on the face",
        lostTime: new Date("2023-01-08T13:20:00Z")
    },
    {
        type: "sunglasses",
        brand: "Ray-Ban",
        color: "Black",
        description: "Ray-Ban Aviator sunglasses, black frame, left in the VIP lounge",
        lostTime: new Date("2023-01-09T17:15:00Z")
    },
    {
        type: "book",
        brand: "Penguin Classics",
        color: "Orange",
        description: "Penguin Classics, 1984 by George Orwell, with coffee stains",
        lostTime: new Date("2023-01-10T10:05:00Z")
    },
    {
        type: "camera",
        brand: "Canon",
        color: "Black",
        description: "Canon EOS 5D Mark IV, with a 50mm lens attached",
        lostTime: new Date("2023-01-11T12:10:00Z")
    },
    {
        type: "scarf",
        brand: "Burberry",
        color: "Beige",
        description: "Burberry cashmere scarf, classic check pattern",
        lostTime: new Date("2023-01-12T18:30:00Z")
    },
    {
        type: "wallet",
        brand: "Louis Vuitton",
        color: "Brown",
        description: "Louis Vuitton men's wallet, brown with monogram print",
        lostTime: new Date("2023-01-13T15:45:00Z")
    },
    {
        type: "toy",
        brand: "Lego",
        color: "Multicolor",
        description: "Lego Star Wars Millennium Falcon set, partially assembled",
        lostTime: new Date("2023-01-14T11:00:00Z")
    },
    {
        type: "travel pillow",
        brand: "Cabeau",
        color: "Grey",
        description: "Cabeau Evolution S3 travel pillow, with a memory foam core",
        lostTime: new Date("2023-01-15T20:20:00Z")
    },
    {
        type: "jacket",
        brand: "Patagonia",
        color: "Red",
        description: "Red Patagonia Nano Puff Jacket, size medium, with a ski pass in the pocket",
        lostTime: new Date("2023-01-16T08:45:00Z")
    },
    {
        type: "shoes",
        brand: "Adidas",
        color: "White",
        description: "Adidas UltraBoost running shoes, white, size 10, left in the gym",
        lostTime: new Date("2023-01-17T21:30:00Z")
    },
    {
        type: "smartphone",
        brand: "Apple",
        color: "Gold",
        description: "iPhone 12 Pro Max, gold, with a cracked screen protector",
        lostTime: new Date("2023-01-18T13:15:00Z")
    },
    {
        type: "tablet",
        brand: "Samsung",
        color: "Black",
        description: "Samsung Galaxy Tab S7, black, with a blue protective case",
        lostTime: new Date("2023-01-19T14:50:00Z")
    },
    {
        type: "keychain",
        brand: "Generic",
        color: "Silver",
        description: "Silver keychain with a bottle opener and a car key for a Honda",
        lostTime: new Date("2023-01-20T17:05:00Z")
    },
    {
        type: "e-reader",
        brand: "Amazon",
        color: "Black",
        description: "Amazon Kindle Paperwhite, black, with a leather cover",
        lostTime: new Date("2023-01-21T09:30:00Z")
    },
    {
        type: "handbag",
        brand: "Gucci",
        color: "Black",
        description: "Gucci Marmont small matelassé shoulder bag",
        lostTime: new Date("2023-01-22T16:40:00Z")
    },
    {
        type: "earbuds",
        brand: "Jabra",
        color: "Blue",
        description: "Jabra Elite Active 75t earbuds, navy blue, in a charging case",
        lostTime: new Date("2023-01-23T10:10:00Z")
    },
];

module.exports = async function productsSeed() {
    console.log("Deleting all products...");
    try {
        await Product.deleteMany({});
        console.info("The products were deleted successfully!");
    } catch (error) {
        console.error('There was an error when trying to delete the products. Error: ' + error);
    }

    const agents = await Agent.find({});

    console.log("Inserting products...");
    try {
        await Product.insertMany(products.map((product) => {
            product.registeredBy = agents[Math.floor(Math.random() * agents.length)].id;
            return product;
        }));
        console.info("The products were inserted successfully!");
    } catch (error) {
        console.error('There was an error when trying to insert the products. Error: ' + error);
    }
}