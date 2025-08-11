import chardet


# Fonction pour détecter l'encodage d'un fichier
def detect_encoding(file_path):
    with open(file_path, 'rb') as f:
        raw = f.read()  # Lire le fichier en binaire
        result = chardet.detect(raw)  # Détecter l'encodage
        return result['encoding']


# Fonction pour convertir le fichier en UTF-8
def convert_to_utf8(file_path):
    # Détecter l'encodage du fichier
    encoding = detect_encoding(file_path)
    print(f"Encodage détecté pour {file_path}: {encoding}")

    # Si l'encodage n'est pas UTF-8, on le convertit
    if encoding != 'utf-8':
        with open(file_path, 'r', encoding=encoding) as f:
            content = f.read()

        # Réécrire le fichier en UTF-8
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Le fichier {file_path} a été converti en UTF-8.")
    else:
        print(f"Le fichier {file_path} est déjà en UTF-8.")


# Convertir les fichiers
convert_to_utf8('data/text1.txt')
convert_to_utf8('data/text1_tradus.txt')
convert_to_utf8('data/text2.txt')
convert_to_utf8('data/commentaire.txt')
