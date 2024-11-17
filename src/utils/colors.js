const colors = [
    {id: 6, color: '#899499'}, // episodes
    {id: 12, color: '#008BE2'}, // artistes
    {id: 7, color: '#2ca88b'}, // cinéma
    {id: 14, color: '#846700'}, // courant musical
    {id: 10, color: '#E09900'}, // Découvertes
    {id: 15, color: '#0C71C3'}, // Instruments
    {id: 16, color: '#8300E9'}, // Labels
    {id: 11, color: '#FFE121'}, // Live
    {id: 13, color: '#1d8920'}, // Thème
    {id: 8, color: '#af3832'}, // Vintage
    {id: 9, color: '#d650d0'} // Voyages
];

export function getColorById(id) {
    const item = colors.find(c => c.id === id);
    return item.color || "#899499"
}