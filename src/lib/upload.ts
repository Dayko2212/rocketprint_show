import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

/**
 * Sauvegarde un fichier localement dans le dossier public/uploads.
 * @param file Le fichier à sauvegarder (issu d'un FormData)
 * @param folder Le sous-dossier où l'enregistrer (ex: 'images' ou 'models')
 * @returns Le chemin relatif du fichier (ex: '/uploads/images/123-mon-image.png')
 */
export async function saveFileLocal(file: File, folder: string = ''): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = join(process.cwd(), 'public', 'uploads', folder);
    
    // Créer le dossier s'il n'existe pas
    await mkdir(uploadsDir, { recursive: true });

    // Générer un nom de fichier unique
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_'); // Nettoyer le nom
    const filename = `${uniqueSuffix}-${originalName}`;
    
    const filePath = join(uploadsDir, filename);

    // Écrire le fichier
    await writeFile(filePath, buffer);

    // Retourner le chemin relatif pour l'URL publique
    return `/uploads/${folder ? folder + '/' : ''}${filename}`;
}
