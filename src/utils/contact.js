// Anti-spam : l'adresse e-mail et les numéros ne figurent jamais en clair,
// ni dans le HTML pré-rendu ni dans le bundle JS. Ils sont stockés encodés
// en base64 et ne sont décodés qu'au clic, juste avant d'ouvrir le mail ou
// de télécharger la vCard.
const EMAIL_B64 = 'cGx1Z0BzdGVyZW9saWJyZS5iZQ==';

const decode = (b64) => decodeURIComponent(escape(window.atob(b64)));

export function openMail(subject) {
    window.location.href = `mailto:${decode(EMAIL_B64)}?subject=${encodeURIComponent(subject)}`;
}

export function downloadVcard(host) {
    const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:;${host.name};;;`,
        `FN:${host.name} — Stéréo Libre`,
        'ORG:Stéréo Libre',
        `TEL;TYPE=CELL:${decode(host.phoneB64)}`,
        `EMAIL;TYPE=INTERNET:${decode(EMAIL_B64)}`,
        `URL:https://www.stereolibre.be/${host.slug}`,
        'END:VCARD',
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([vcard], {type: 'text/vcard;charset=utf-8'}));
    const a = document.createElement('a');
    a.href = url;
    a.download = `stereo-libre-${host.slug}.vcf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
