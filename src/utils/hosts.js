// Pages "carte de visite" : une par animateur, ciblées par les QR codes
// imprimés au verso des cartes (ex. https://www.stereolibre.be/raph?src=carte).
// Numéros encodés en base64 (anti-spam), décodés au clic dans utils/contact.js.
export const hosts = {
    raph: {
        slug: 'raph',
        phoneB64: 'KzMyIDQ3NiA0OCAzNyAxMA==',
        name: 'Raph',
        nickname: "l'éclectique",
        photo: 'Raph.jpg',
    },
    jerome: {
        slug: 'jerome',
        phoneB64: 'KzMyIDQ5NiA5NCAwMCA2Nw==',
        name: 'Jérôme',
        nickname: 'le pilier',
        photo: 'Dje.jpg',
    },
    adri: {
        slug: 'adri',
        phoneB64: 'KzMyIDQ5NyA1MCAxOSAwMg==',
        name: 'Adri',
        nickname: "l'énergie live",
        photo: 'Adri.jpg',
    },
};
