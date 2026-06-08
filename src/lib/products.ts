export interface ProductComponent {
    id: string;
    name: string;
    quantity: number;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
    modelUrl: string;
    components: ProductComponent[];
}

export const ROBOTIC_ARM_PRODUCT: Product = {
    id: "bras-robotique-id",
    name: "Bras Robotique de Précision",
    slug: "bras-robotique",
    description: "Conçu pour l'apprentissage de l'ingénierie et la manipulation robotique, ce bras articulé de haute précision reproduit fidèlement la cinématique d'un modèle industriel à échelle réduite. Doté de servomoteurs réactifs, d'une structure en polymère robuste et d'une pince fonctionnelle, il est l'outil d'exploration idéal pour concevoir, programmer et interagir avec votre environnement en 3D.",
    price: 59.99,
    stock: 1, // Showcase indicator
    imageUrl: "/images/bras-robotique.png",
    modelUrl: "/LP.glb",
    components: [
        { id: "comp-1", name: "Servomoteurs de positionnement", quantity: 4 },
        { id: "comp-2", name: "Structure articulée haute résistance", quantity: 12 },
        { id: "comp-3", name: "Pince de manipulation interchangeable", quantity: 1 },
        { id: "comp-4", name: "Câblage haute densité & Visserie", quantity: 1 },
        { id: "comp-5", name: "Guide d'assemblage et de démarrage rapide", quantity: 1 }
    ]
};
