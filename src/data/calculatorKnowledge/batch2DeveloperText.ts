import { ToolDef, Language } from '../../types';
import { ToolContentDetails } from './types';

type KnowledgeHandler = (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails;

function createKnowledge(dataByLang: Record<Language, (tool: ToolDef, name: string, relatedTools: ToolDef[]) => ToolContentDetails>): Record<Language, KnowledgeHandler> {
  return dataByLang;
}

// 1. TEXT CASE CONVERTER (case-converter)
export const CASE_CONVERTER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} transforms text strings into various typographic and programming casing conventions including UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.`,
    howToUse: [
      'Type or paste your raw text into the input field.',
      'Select your desired casing format (e.g., camelCase, kebab-case, UPPERCASE, Title Case).',
      'Copy the converted formatted string directly to your clipboard.'
    ],
    formula: 'Iterates through word tokens and applies character transformation rules (e.g., camelCase: words[0].lower + words[1..n].capitalize)',
    formulaVariables: [
      { name: 'Input String', description: 'Original text string.', unit: 'Characters', optional: false }
    ],
    workedExample: {
      scenario: 'Converting "user profile picture url" into camelCase and snake_case.',
      stepByStep: [
        'Tokenize string into words: ["user", "profile", "picture", "url"].',
        'camelCase transformation: "userProfilePictureUrl".',
        'snake_case transformation: "user_profile_picture_url".'
      ],
      result: 'camelCase: userProfilePictureUrl | snake_case: user_profile_picture_url'
    },
    interpretation: 'Saves software developers and copywriters time when reformatting variable names, database keys, and article titles.',
    assumptions: 'Standard Unicode alphanumeric character parsing.',
    limitations: 'Special characters and punctuation symbols are stripped when transforming into coding identifiers.',
    faqs: [
      { question: 'What is the difference between camelCase and PascalCase?', answer: 'camelCase starts with a lowercase letter (myVariable), whereas PascalCase capitalizes the initial letter (MyVariable).' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل النصوص والكلمات إلى مختلف صيغ وحالات الأحرف المستخدمة في الطباعة والبرمجة (مثل الحروف الكبيرة، والصغيرة، و camelCase، و snake_case، و kebab-case).`,
    howToUse: [
      'اكتب النص أو الصقه داخل مربع الإدخال.',
      'اختر نوع التنسيق المطلوب (مثل camelCase للمتغيرات البرمجية، أو أحرف كبيرة للطباعة).',
      'انسخ النص المحول مباشرة إلى الحافظة.'
    ],
    formula: 'تقسيم النص إلى كلمات وتطبيق قواعد التنسيق المختارة على الأحرف الأولى والفواصل',
    formulaVariables: [
      { name: 'النص المدخل', description: 'السلسلة النصية المراد تحويلها.', unit: 'نص', optional: false }
    ],
    workedExample: {
      scenario: 'تحويل النص "user profile picture url" إلى صيغة camelCase و snake_case.',
      stepByStep: [
        'تفكيك الجملة إلى مفردات منفصلة.',
        'التحويل إلى camelCase: "userProfilePictureUrl".',
        'التحويل إلى snake_case: "user_profile_picture_url".'
      ],
      result: 'صيغة camelCase: userProfilePictureUrl | صيغة snake_case: user_profile_picture_url'
    },
    interpretation: 'توفر الوقت للمبرمجين والكتاب في تنسيق أسماء المتغيرات وقواعد البيانات وعناوين المقالات.',
    assumptions: 'معالجة الكلمات وفق معايير الحروف اللاتينية واليونيكود.',
    limitations: 'يتم حذف الرموز الخاصة وعلامات الترقيم عند التحويل للمعرفات البرمجية.',
    faqs: [
      { question: 'ما هو الفرق بين camelCase و PascalCase؟', answer: 'تبدأ صيغة camelCase بحرف صغير (userAccount)، بينما تبدأ PascalCase بحرف كبير (UserAccount).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} transforma cadenas de texto a convenciones tipográficas y de programación como MAYÚSCULAS, minúsculas, Title Case, camelCase, snake_case y kebab-case.`,
    howToUse: [
      'Introduzca o pegue el texto original.',
      'Elija el formato deseado (camelCase, snake_case, MAYÚSCULAS, etc.).',
      'Copie la cadena transformada en su portapapeles.'
    ],
    formula: 'Segmentación de palabras y formateo de mayúsculas y separadores según el estándar seleccionado',
    formulaVariables: [
      { name: 'Texto original', description: 'Cadena de entrada.', unit: 'Caracteres', optional: false }
    ],
    workedExample: {
      scenario: 'Transformar "user profile picture url" a camelCase y snake_case.',
      stepByStep: [
        'Separación de palabras: ["user", "profile", "picture", "url"].',
        'Transformación camelCase: "userProfilePictureUrl".',
        'Transformación snake_case: "user_profile_picture_url".'
      ],
      result: 'camelCase: userProfilePictureUrl | snake_case: user_profile_picture_url'
    },
    interpretation: 'Acelera el flujo de trabajo de desarrolladores y redactores al homogeneizar nombres y títulos.',
    assumptions: 'Tratamiento estándar de cadenas de texto Unicode.',
    limitations: 'Los signos de puntuación se eliminan en nomenclaturas de programación.',
    faqs: [
      { question: '¿Para qué se utiliza kebab-case?', answer: 'Se utiliza habitualmente en URLs amigables de páginas web y en nombres de clases CSS (ej. mi-clase-css).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit vos chaînes de texte selon diverses conventions typographiques et de développement (MAJUSCULES, minuscules, camelCase, snake_case, kebab-case).`,
    howToUse: [
      'Tapez ou collez votre texte.',
      'Sélectionnez la casse souhaitée (camelCase, snake_case, Title Case, etc.).',
      'Copiez le texte formaté dans votre presse-papiers.'
    ],
    formula: 'Découpage en mots-clés et application des règles de casse et de séparateurs',
    formulaVariables: [
      { name: 'Texte source', description: 'Chaîne de caractères à traiter.', unit: 'Texte', optional: false }
    ],
    workedExample: {
      scenario: 'Conversion de "user profile picture url" en camelCase et snake_case.',
      stepByStep: [
        'Décomposition des termes : ["user", "profile", "picture", "url"].',
        'Format camelCase : "userProfilePictureUrl".',
        'Format snake_case : "user_profile_picture_url".'
      ],
      result: 'camelCase : userProfilePictureUrl | snake_case : user_profile_picture_url'
    },
    interpretation: 'Indispensable aux développeurs pour formater variables de code, clés d\'API et bases de données.',
    assumptions: 'Gestion standard des chaînes Unicode.',
    limitations: 'Les caractères spéciaux sont supprimés lors du formatage en identifiants de code.',
    faqs: [
      { question: 'Où utilise-t-on le snake_case ?', answer: 'Il est très utilisé en langage Python, en SQL et pour nommer des colonnes de bases de données (ex. date_creation).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} konvertiert Textzeichenfolgen in verschiedene typografische und Programmier-Schreibweisen wie GROSSBUCHSTABEN, kleinbuchstaben, camelCase, snake_case und kebab-case.`,
    howToUse: [
      'Geben Sie den Text in das Eingabefeld ein oder fügen Sie ihn ein.',
      'Wählen Sie das gewünschte Format (z. B. camelCase, snake_case, GROSSBUCHSTABEN).',
      'Kopieren Sie das umgewandelte Ergebnis in die Zwischenablage.'
    ],
    formula: 'Zerlegung in Wortbestandteile und regelbasierte Umwandlung von Groß-/Kleinschreibung und Trennzeichen',
    formulaVariables: [
      { name: 'Eingabetext', description: 'Ausgangstext.', unit: 'Zeichen', optional: false }
    ],
    workedExample: {
      scenario: 'Konvertierung von "user profile picture url" in camelCase und snake_case.',
      stepByStep: [
        'Worttrennung: ["user", "profile", "picture", "url"].',
        'camelCase-Konvertierung: "userProfilePictureUrl".',
        'snake_case-Konvertierung: "user_profile_picture_url".'
      ],
      result: 'camelCase: userProfilePictureUrl | snake_case: user_profile_picture_url'
    },
    interpretation: 'Erleichtert Softwareentwicklern und Autoren die Formatierung von Variablennamen und Datenbankfeldern.',
    assumptions: 'Verarbeitung nach Unicode-Standard.',
    limitations: 'Sonderzeichen und Interpunktion werden bei Programmierbezeichnern automatisch entfernt.',
    faqs: [
      { question: 'Was ist kebab-case?', answer: 'Eine Schreibweise, bei der Wörter in Kleinbuchstaben durch Bindestriche getrennt werden (z. B. mein-artikel-slug).' }
    ],
    relatedTools
  })
});

// 2. BASE64 STRING ENCODER & DECODER (base64-encode)
export const BASE64_ENCODE_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} encodes arbitrary text or binary data into standard ASCII Base64 strings (RFC 4648) and decodes Base64 data back into original plaintext.`,
    howToUse: [
      'Paste your raw plaintext into the encoder or your Base64 string into the decoder.',
      'Toggle between Encode and Decode modes as needed.',
      'Copy the resulting Base64 output or decoded plaintext.'
    ],
    formula: 'Base64 splits 3 binary bytes (24 bits) into 4 groups of 6 bits, mapping each 6-bit index to the 64-character ASCII alphabet (A-Z, a-z, 0-9, +, /)',
    formulaVariables: [
      { name: 'Data Payload', description: 'Raw plaintext or Base64 encoded payload.', unit: 'String / Bytes', optional: false }
    ],
    workedExample: {
      scenario: 'Encoding the text "Hello" into Base64.',
      stepByStep: [
        'ASCII binary bytes: H (72), e (101), l (108), l (108), o (111).',
        'Binary bitstream: 01001000 01100101 01101100 01101100 01101111.',
        'Group into 6-bit chunks: [010010, 000110, 010101, 101100, 011011, 000110, 111100] with padding \'=\'.',
        'Map to Base64 alphabet: "SGVsbG8=".'
      ],
      result: '"Hello" encoded in Base64 = "SGVsbG8="'
    },
    interpretation: 'Used in email MIME headers, HTTP basic authentication, embedded data URLs, and API payload transfer.',
    assumptions: 'Standard RFC 4648 Base64 alphabet with UTF-8 byte encoding.',
    limitations: 'Base64 increases data size by approximately 33% relative to raw binary bytes.',
    faqs: [
      { question: 'Is Base64 encryption?', answer: 'No, Base64 is an encoding format for data transport, not encryption; anyone can decode it instantly without a key.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتشفير النصوص والبيانات إلى صيغة Base64 النصية القياسية (ASCII) وفك تشفير سلاسل Base64 وإعادتها إلى نصوصها الأصلية.`,
    howToUse: [
      'ألصق النص الأصلي في مربع التشفير أو سلسلة Base64 في مربع فك التشفير.',
      'اختر وضع التشفير (Encode) أو فك التشفير (Decode).',
      'انسخ الناتج النصي أو النص المسترجع مباشرة.'
    ],
    formula: 'تقسيم كل 3 بايت (24 بت) إلى 4 مجموعات من 6 بتات ومطابقتها مع جدول رموز Base64 الـ 64',
    formulaVariables: [
      { name: 'البيانات المدخلة', description: 'نص عادي أو كود Base64.', unit: 'نص', optional: false }
    ],
    workedExample: {
      scenario: 'تشفير الكلمة "Hello" إلى Base64.',
      stepByStep: [
        'تحويل الحروف إلى البايتات الثنائية (ASCII).',
        'تجميع البتات في مجموعات سداسية (6 بت).',
        'مطابقة القيم مع جدول Base64 مع إضافة علامة الإكمال (=).',
        'الناتج النهائي: "SGVsbG8=".'
      ],
      result: 'تشفير "Hello" بصيغة Base64 = "SGVsbG8="'
    },
    interpretation: 'تستخدم في نقل الصور المضمنة في HTML وعناوين البريد الإلكتروني وبيانات واجهات البرمجة (APIs).',
    assumptions: 'ترميز UTF-8 القياسي المتوافق مع RFC 4648.',
    limitations: 'يزيد Base64 حجم البيانات بحوالي 33% مقارنة بالحجم الأصلي.',
    faqs: [
      { question: 'هل يعتبر Base64 نوعاً من التشفير الأمني؟', answer: 'كلا، Base64 هو مجرد صيغة ترميز لنقل البيانات وليس تشفيراً سرياً، ويمكن فكه فوراً بدون كلمة سر.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} codifica texto o datos binarios en cadenas Base64 ASCII estándar (RFC 4648) y descodifica secuencias Base64 a su texto plano original.`,
    howToUse: [
      'Pegue el texto original para codificar o la cadena Base64 para descodificar.',
      'Seleccione el modo (Codificar o Descodificar).',
      'Copie el resultado obtenido en el portapapeles.'
    ],
    formula: 'Divide bloques de 3 bytes (24 bits) en 4 grupos de 6 bits asignados al alfabeto Base64 de 64 caracteres',
    formulaVariables: [
      { name: 'Datos', description: 'Texto sin formato o cadena Base64.', unit: 'Cadena', optional: false }
    ],
    workedExample: {
      scenario: 'Codificar el texto "Hello" en Base64.',
      stepByStep: [
        'Conversión a bytes ASCII de "Hello".',
        'Agrupación en bloques de 6 bits.',
        'Mapeo al abecedario Base64 con relleno \'=\'.',
        'Resultado: "SGVsbG8=".'
      ],
      result: '"Hello" en Base64 = "SGVsbG8="'
    },
    interpretation: 'Fundamental en desarrollo web para incrustar imágenes en línea, cabeceras HTTP y tokens de autenticación.',
    assumptions: 'Codificación UTF-8 conforme al estándar RFC 4648.',
    limitations: 'Base64 incrementa el tamaño de los datos aproximadamente un 33%.',
    faqs: [
      { question: '¿Es Base64 un método de cifrado seguro?', answer: 'No, Base64 es solo una codificación de transporte; cualquier sistema puede decodificarlo sin clave.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} encode tout texte ou donnée binaire au format Base64 standard (RFC 4648) et décode les chaînes Base64 en texte clair d'origine.`,
    howToUse: [
      'Collez votre texte pour l\'encoder ou votre code Base64 pour le décoder.',
      'Basculez entre le mode Encodage et Décodage.',
      'Copiez la chaîne de sortie générée.'
    ],
    formula: 'Conversion de 3 octets (24 bits) en 4 blocs de 6 bits indexés sur l\'alphabet Base64',
    formulaVariables: [
      { name: 'Données', description: 'Texte brut ou chaîne Base64.', unit: 'Chaîne', optional: false }
    ],
    workedExample: {
      scenario: 'Encodage du mot "Hello" en Base64.',
      stepByStep: [
        'Conversion des octets ASCII de "Hello".',
        'Regroupement par blocs de 6 bits.',
        'Indexation dans l\'alphabet Base64 avec caractère de remplissage \'=\'.',
        'Résultat généré : "SGVsbG8=".'
      ],
      result: '"Hello" en Base64 = "SGVsbG8="'
    },
    interpretation: 'Très utilisé pour intégrer des images dans du code CSS/HTML (Data URLs) ou transmettre des jetons d\'API.',
    assumptions: 'Encodage UTF-8 conforme RFC 4648.',
    limitations: 'L\'encodage Base64 augmente le poids des données de 33% environ.',
    faqs: [
      { question: 'Le Base64 protège-t-il les mots de passe ?', answer: 'Non, ce n\'est pas un chiffrement ; c\'est simplement une façon de représenter des octets en caractères imprimables.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} kodiert Texte und Binärdaten in standardkonforme Base64-ASCII-Zeichenketten (RFC 4648) und dekodiert Base64 zurück in lesbaren Klartext.`,
    howToUse: [
      'Fügen Sie den Klartext zum Kodieren oder den Base64-Code zum Dekodieren ein.',
      'Wählen Sie den Modus (Kodieren oder Dekodieren).',
      'Kopieren Sie das umgewandelte Ergebnis in Ihre Zwischenablage.'
    ],
    formula: 'Teilt 3 Byte (24 Bit) in 4 Gruppen zu je 6 Bit auf und bildet diese auf das 64 Zeichen umfassende Base64-Alphabet ab',
    formulaVariables: [
      { name: 'Nutzdaten', description: 'Klartext oder Base64-String.', unit: 'String', optional: false }
    ],
    workedExample: {
      scenario: 'Kodierung des Wortes "Hello" in Base64.',
      stepByStep: [
        'ASCII-Byte-Werte von "Hello" ermitteln.',
        'In 6-Bit-Blöcke aufteilen.',
        'Auf das Base64-Alphabet mit Auffüllzeichen \'=\' abbilden.',
        'Ergebnis: "SGVsbG8=".'
      ],
      result: '"Hello" in Base64 = "SGVsbG8="'
    },
    interpretation: 'Häufig verwendet für Data-URIs in CSS, E-Mail-Anhänge (MIME) und API-Übertragungen.',
    assumptions: 'UTF-8-Zeichenkodierung nach RFC 4648.',
    limitations: 'Base64 vergrößert das Datenvolumen um rund 33%.',
    faqs: [
      { question: 'Ist Base64 eine Verschlüsselung?', answer: 'Nein, es ist lediglich eine Transportkodierung für Binärdaten und bietet keinen kryptografischen Schutz.' }
    ],
    relatedTools
  })
});

// 3. URL ENCODER & DECODER (url-encoder)
export const URL_ENCODER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} percent-encodes URLs and query parameters according to RFC 3986 (converting spaces to %20, symbols to %XX) and decodes percent-encoded URL strings into human-readable text.`,
    howToUse: [
      'Paste your raw URL, query parameter, or percent-encoded link.',
      'Choose Encode URL Component or Decode URL mode.',
      'Copy the properly escaped safe web link.'
    ],
    formula: 'Replaces reserved / non-ASCII characters with % followed by their two-digit hexadecimal UTF-8 byte value (e.g., Space = %20, & = %26)',
    formulaVariables: [
      { name: 'URL String', description: 'Web address or query string.', unit: 'Characters', optional: false }
    ],
    workedExample: {
      scenario: 'Encoding the query string "search=laptop & mouse" for an HTTP GET request.',
      stepByStep: [
        'Identify special characters: space (\' \') and ampersand (\'&\').',
        'Space character maps to %20.',
        'Ampersand character maps to %26.',
        'Resulting encoded string: "search%3Dlaptop%20%26%20mouse".'
      ],
      result: 'Encoded URL Component: "search%3Dlaptop%20%26%20mouse"'
    },
    interpretation: 'Prevents broken links, query parameter corruption, and server parsing errors in web development and REST APIs.',
    assumptions: 'RFC 3986 percent-encoding specification.',
    limitations: 'Full URL encoding (encodeURI) preserves structural URL slashes, whereas component encoding (encodeURIComponent) encodes all delimiters.',
    faqs: [
      { question: 'Why must URLs be percent-encoded?', answer: 'URLs can only be sent over the internet using the ASCII character-set; special and non-ASCII symbols must be escaped with %XX.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بترميز روابط الويب والمعاملات (URL Percent-Encoding) وفقاً لمعيار RFC 3986 (مثل تحويل المسافات إلى %20 والرموز إلى %XX) وفك ترميز الروابط إلى نصوص مقروءة.`,
    howToUse: [
      'ألصق رابط الويب أو النص أو معلمات البحث داخل المربع.',
      'اختر وضع ترميز الرابط (Encode) أو فك الترميز (Decode).',
      'انسخ الرابط المعالج والآمن للاستخدام على الإنترنت.'
    ],
    formula: 'استبدال الرموز غير المسموح بها برمز % متبوعاً بالقيمة السداسية عشرية للبايت (مثل المسافة = %20)',
    formulaVariables: [
      { name: 'رابط الموقع', description: 'عنوان URL أو نص معلمات البحث.', unit: 'نص', optional: false }
    ],
    workedExample: {
      scenario: 'ترميز المعامل النصي "search=laptop & mouse" في رابط ويب.',
      stepByStep: [
        'تحديد الرموز الخاصة: المسافة وعلامة (&).',
        'تحويل المسافة إلى %20.',
        'تحويل علامة & إلى %26.',
        'الناتج المشفر: "search%3Dlaptop%20%26%20mouse".'
      ],
      result: 'الرابط المرمز: "search%3Dlaptop%20%26%20mouse"'
    },
    interpretation: 'تمنع تعطل الروابط وتشوه معلمات البحث والأخطاء البرمجية في المواقع وواجهات الويب.',
    assumptions: 'مطابقة لمعايير RFC 3986 لترميز الروابط العالمية.',
    limitations: 'ترميز المكونات (encodeURIComponent) يشفر كافة الرموز بما فيها علامات السلاش (/).',
    faqs: [
      { question: 'لماذا يجب ترميز الروابط؟', answer: 'لأن بروتوكول HTTP لا يسمح إلا بأحرف ASCII المحددة في عناوين الويب، لذا تُستبدل الرموز الأخرى برموز نسبية %XX.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} codifica URLs y parámetros de consulta según la norma RFC 3986 (sustituyendo espacios por %20 y caracteres reservados por %XX) y descodifica URLs a texto legible.`,
    howToUse: [
      'Pegue la URL o el texto que desea procesar.',
      'Seleccione Codificar o Descodificar según proceda.',
      'Copie la URL resultante lista para utilizar en la web.'
    ],
    formula: 'Sustituye caracteres no ASCII y reservados por % seguido de su código hexadecimal UTF-8',
    formulaVariables: [
      { name: 'Cadena URL', description: 'Dirección web o parámetro.', unit: 'Caracteres', optional: false }
    ],
    workedExample: {
      scenario: 'Codificar el parámetro "search=laptop & mouse".',
      stepByStep: [
        'Detección de espacios y ampersand (&).',
        'Espacio se convierte en %20.',
        'Ampersand (&) se convierte en %26.',
        'Resultado codificado: "search%3Dlaptop%20%26%20mouse".'
      ],
      result: 'URL codificada: "search%3Dlaptop%20%26%20mouse"'
    },
    interpretation: 'Garantiza la correcta transmisión de parámetros en peticiones GET de APIs y formularios web.',
    assumptions: 'Norma estándar RFC 3986.',
    limitations: 'Distingue entre codificar una URL completa o un componente individual.',
    faqs: [
      { question: '¿Qué representa %20 en una URL?', answer: 'Representa el carácter de espacio en blanco en la codificación porcentual de URLs.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} encode les adresses URL et paramètres selon la norme RFC 3986 (remplacement des espaces par %20 et symboles par %XX) et décode les URLs encodées.`,
    howToUse: [
      'Collez votre URL ou chaîne de requête.',
      'Choisissez le mode Encoder ou Décoder.',
      'Copiez l\'URL sécurisée générée.'
    ],
    formula: 'Remplacement des caractères spéciaux par % suivi de leur valeur hexadécimale en UTF-8',
    formulaVariables: [
      { name: 'Chaîne URL', description: 'Adresse web ou requête.', unit: 'Texte', optional: false }
    ],
    workedExample: {
      scenario: 'Encodage du paramètre "search=laptop & mouse".',
      stepByStep: [
        'Identification des espaces et du symbole \'&\'.',
        'L\'espace devient %20.',
        'Le \'&\' devient %26.',
        'Résultat final : "search%3Dlaptop%20%26%20mouse".'
      ],
      result: 'Composant encodé : "search%3Dlaptop%20%26%20mouse"'
    },
    interpretation: 'Empêche les erreurs de requêtes HTTP et assure la compatibilité des liens sur tous les navigateurs.',
    assumptions: 'Standard international RFC 3986.',
    limitations: 'L\'encodage complet d\'URL préserve les barres obliques (/), contrairement à l\'encodage de composant.',
    faqs: [
      { question: 'Pourquoi encoder les paramètres d\'une URL ?', answer: 'Pour éviter que des caractères comme les espaces ou les esperluettes ne cassent la structure de la requête HTTP.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} kodiert URLs und Abfrageparameter nach RFC 3986 (Ersetzung von Leerzeichen durch %20 und Sonderzeichen durch %XX) und dekodiert prozentkodierte Webadressen.`,
    howToUse: [
      'Fügen Sie Ihre Webadresse oder Ihren Text ein.',
      'Wählen Sie URL kodieren oder URL dekodieren.',
      'Kopieren Sie die verarbeitete Webadresse in die Zwischenablage.'
    ],
    formula: 'Ersetzt reservierte und Nicht-ASCII-Zeichen durch % gefolgt vom zweistelligen Hexadezimalwert des UTF-8-Bytes',
    formulaVariables: [
      { name: 'URL-String', description: 'Webadresse oder Parameter.', unit: 'Zeichen', optional: false }
    ],
    workedExample: {
      scenario: 'Kodierung des Abfrageparameters "search=laptop & mouse".',
      stepByStep: [
        'Sonderzeichen erkennen: Leerzeichen und Kaufmännisches Und (&).',
        'Leerzeichen wird zu %20.',
        'Zeichen & wird zu %26.',
        'Ergebnis: "search%3Dlaptop%20%26%20mouse".'
      ],
      result: 'Kodierter Parameter: "search%3Dlaptop%20%26%20mouse"'
    },
    interpretation: 'Verhindert fehlerhafte HTTP-Aufrufe und sorgt für reibungslosen Datenaustausch in REST-Schnittstellen.',
    assumptions: 'RFC 3986 URL-Kodierungsstandard.',
    limitations: 'Bei encodeURIComponent werden auch Schrägstriche (/) kodiert.',
    faqs: [
      { question: 'Was bedeutet %20 in einem Weblink?', answer: 'Es ist die hexadezimale URL-Codierung für ein Leerzeichen.' }
    ],
    relatedTools
  })
});

// 4. CRYPTOGRAPHIC HASH GENERATOR (hash-generator)
export const HASH_GENERATOR_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} computes deterministic, one-way cryptographic checksum hashes (SHA-256, SHA-512, SHA-1, and MD5) for text strings and digital payload verification.`,
    howToUse: [
      'Enter or paste your plaintext message into the input field.',
      'Select your desired hashing algorithm (e.g., SHA-256, MD5, SHA-512).',
      'Copy the resulting fixed-length hexadecimal hash digest.'
    ],
    formula: 'Hash = Algorithm(Message) -> Fixed-length hexadecimal digest (e.g., SHA-256 produces 256 bits / 64 hex characters)',
    formulaVariables: [
      { name: 'Input Data', description: 'Plaintext string or message payload.', unit: 'String', optional: false },
      { name: 'Algorithm', description: 'Cryptographic hash function.', unit: 'Algorithm family', optional: false }
    ],
    workedExample: {
      scenario: 'Generating a SHA-256 hash for the word "hello".',
      stepByStep: [
        'Apply SHA-256 cryptographic compression functions on input bytes.',
        'Output 256-bit binary hash digest.',
        'Format into 64 hexadecimal characters: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824".'
      ],
      result: 'SHA-256("hello") = 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
    },
    interpretation: 'Used for file integrity verification, blockchain proofs, and secure digital signatures.',
    assumptions: 'Standard NIST FIPS 180-4 SHA specifications.',
    limitations: 'Cryptographic hashes are one-way functions and cannot be mathematically inverted or decrypted back to plaintext.',
    faqs: [
      { question: 'Is MD5 secure for passwords?', answer: 'No, MD5 and SHA-1 have known collision vulnerabilities; SHA-256 or bcrypt should always be used for security purposes.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بحساب البصمات التشفيرية الأحادية الاتجاه (Cryptographic Hashes) مثل SHA-256 و SHA-512 و MD5 للتحقق من سلامة البيانات والنصوص.`,
    howToUse: [
      'أدخل النص أو الرسالة في مربع الإدخال.',
      'اختر خوارزمية التشفير المطلوبة (مثل SHA-256 أو MD5).',
      'انسخ البصمة التشفيرية السداسية عشرية الناتجة.'
    ],
    formula: 'البصمة = الخوارزمية(النص) -> سلسلة سداسية عشرية ثابتة الطول (SHA-256 ينتج 64 رمزاً)',
    formulaVariables: [
      { name: 'البيانات المدخلة', description: 'النص أو الرسالة.', unit: 'نص', optional: false },
      { name: 'الخوارزمية', description: 'دالة التجزئة التشفيرية.', unit: 'خوارزمية', optional: false }
    ],
    workedExample: {
      scenario: 'توليد بصمة SHA-256 للكلمة "hello".',
      stepByStep: [
        'تطبيق دوال الضغط والتدوير التشفيرية لمعيار SHA-256.',
        'إنتاج بصمة ثنائية بطول 256 بت.',
        'التمثيل بصيغة سداسية عشرية: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824".'
      ],
      result: 'بصمة SHA-256("hello") = 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
    },
    interpretation: 'تُستخدم للتحقق من سلامة تنزيل الملفات، وتوقيع العقود الرقمية، وفي تكنولوجيا البلوك تشين.',
    assumptions: 'تطبيق معايير NIST FIPS التشفيرية المعتمدة عالمياً.',
    limitations: 'دوال الهاش أحادية الاتجاه بطبيعتها ولا يمكن عكسها رياضياً لاسترجاع النص الأصلي.',
    faqs: [
      { question: 'هل يمكن فك تشفير بصمة الهاش (Hash)؟', answer: 'كلا، دوال الهاش مصممة لتكون أحادية الاتجاه يستحيل عكسها رياضياً، وتعمل فقط عبر مقارنة البصمات المطابقة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} genera huellas criptográficas unidireccionales deterministas (SHA-256, SHA-512, SHA-1 y MD5) para comprobar la integridad de datos y textos.`,
    howToUse: [
      'Escriba o pegue el texto en el campo de entrada.',
      'Seleccione el algoritmo deseado (SHA-256, MD5, SHA-512, etc.).',
      'Copie la huella hexadecimal resultante.'
    ],
    formula: 'Hash = Algoritmo(Mensaje) -> Resumen hexadecimal de longitud fija (SHA-256: 64 caracteres)',
    formulaVariables: [
      { name: 'Texto', description: 'Cadena de entrada.', unit: 'Cadena', optional: false },
      { name: 'Algoritmo', description: 'Función hash criptográfica.', unit: 'Tipo', optional: false }
    ],
    workedExample: {
      scenario: 'Generación del hash SHA-256 de la palabra "hello".',
      stepByStep: [
        'Procesamiento de los bytes mediante funciones de compresión SHA-256.',
        'Generación de resumen de 256 bits.',
        'Formateo en 64 caracteres hexadecimales: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824".'
      ],
      result: 'SHA-256("hello") = 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
    },
    interpretation: 'Esencial para verificar descargas de software, firmas digitales y redes blockchain.',
    assumptions: 'Especificaciones estándar NIST FIPS 180-4.',
    limitations: 'Un hash criptográfico no puede descifrarse para recuperar el texto de origen.',
    faqs: [
      { question: '¿Qué es el efecto avalancha en un hash?', answer: 'Significa que cambiar un solo carácter en el texto original genera un hash completamente diferente e irreconocible.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} calcule des empreintes cryptographiques unidirectionnelles déterministes (SHA-256, SHA-512, SHA-1, MD5) pour valider l'intégrité de vos textes et fichiers.`,
    howToUse: [
      'Saisissez le texte dans le champ prévu.',
      'Sélectionnez l\'algorithme souhaité (ex. SHA-256 ou MD5).',
      'Copiez l\'empreinte hexadécimale générée.'
    ],
    formula: 'Empreinte = Algorithme(Message) -> Condensat hexadécimal à longueur fixe (SHA-256 : 64 caractères hex)',
    formulaVariables: [
      { name: 'Texte d\'entrée', description: 'Message ou chaîne de données.', unit: 'Chaîne', optional: false },
      { name: 'Algorithme', description: 'Fonction de hachage.', unit: 'Norme', optional: false }
    ],
    workedExample: {
      scenario: 'Calcul du hash SHA-256 du mot "hello".',
      stepByStep: [
        'Traitement binaire via les fonctions cryptographiques SHA-256.',
        'Production du condensat de 256 bits.',
        'Représentation hexadécimale : "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824".'
      ],
      result: 'SHA-256("hello") = 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
    },
    interpretation: 'Utilisé pour s\'assurer qu\'un fichier n\'a pas été altéré et pour la sécurité des transactions blockchain.',
    assumptions: 'Normes de cryptographie NIST FIPS 180-4.',
    limitations: 'Une fonction de hachage est irréversible par conception mathématique.',
    faqs: [
      { question: 'Le MD5 est-il encore sûr ?', answer: 'Non, MD5 présente des risques de collisions et ne doit plus être utilisé pour des applications de sécurité critique.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} berechnet deterministische, kryptografische Einweg-Prüfsummen (SHA-256, SHA-512, SHA-1 und MD5) zur Verifizierung von Texten und Datenintegrität.`,
    howToUse: [
      'Geben Sie den Text in das Eingabefeld ein.',
      'Wählen Sie den Hash-Algorithmus (z. B. SHA-256 oder MD5).',
      'Kopieren Sie den erzeugten hexadezimalen Hash-Wert.'
    ],
    formula: 'Hash = Algorithmus(Eingabe) -> Fester hexadezimaler Digest (SHA-256 liefert 64 Hexadezimalzeichen)',
    formulaVariables: [
      { name: 'Eingabedaten', description: 'Text oder Bytefolge.', unit: 'String', optional: false },
      { name: 'Algorithmus', description: 'Kryptografische Hash-Funktion.', unit: 'Typ', optional: false }
    ],
    workedExample: {
      scenario: 'Erzeugung des SHA-256 Hashes für das Wort "hello".',
      stepByStep: [
        'Anwendung der SHA-256 Kompressionsfunktionen.',
        'Generierung des 256-Bit-Prüfwerts.',
        'Hexadezimale Ausgabe: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824".'
      ],
      result: 'SHA-256("hello") = 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
    },
    interpretation: 'Dient der Integritätsprüfung beim Download von Software sowie digitalen Signaturen und Blockchains.',
    assumptions: 'NIST FIPS 180-4 Standardspezifikationen.',
    limitations: 'Kryptografische Hashes sind mathematische Einwegfunktionen und können nicht entschlüsselt werden.',
    faqs: [
      { question: 'Kann ein Hash-Wert zurückgerechnet werden?', answer: 'Nein, kryptografische Hash-Funktionen sind irreversibel und können mathematisch nicht umgekehrt werden.' }
    ],
    relatedTools
  })
});

// 5. UUID / GUID GENERATOR (uuid-generator)
export const UUID_GENERATOR_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} generates RFC 4122 compliant version 4 Universally Unique Identifiers (UUID / GUID) utilizing 122 bits of cryptographic randomness.`,
    howToUse: [
      'Choose the number of UUIDs to generate.',
      'Select formatting options (hyphens vs no hyphens, uppercase vs lowercase).',
      'Click Generate and copy your unique identifiers.'
    ],
    formula: 'UUID v4 Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx (where x is random hex, y is [8, 9, a, or b])',
    formulaVariables: [
      { name: 'Quantity', description: 'Number of UUIDs to produce.', unit: 'Count', optional: false },
      { name: 'Format Options', description: 'Hyphenation and character casing.', unit: 'Formatting', optional: true }
    ],
    workedExample: {
      scenario: 'Generating a single standard RFC 4122 v4 UUID.',
      stepByStep: [
        'Generate 16 cryptographically random bytes (128 bits).',
        'Set 4-bit version field to 0100 (version 4).',
        'Set 2-bit variant field to 10 (RFC 4122 variant).',
        'Format as 32 hex digits separated by hyphens (8-4-4-4-12).'
      ],
      result: 'Generated UUID v4: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"'
    },
    interpretation: 'Provides practically collision-free unique keys for distributed databases, session tokens, and microservices.',
    assumptions: 'Crypto-secure random number generator.',
    limitations: 'The probability of generating a duplicate UUID v4 is negligible (~1 in 5.3 × 10³⁶).',
    faqs: [
      { question: 'What is the difference between a UUID and a GUID?', answer: 'UUID (Universally Unique Identifier) is the open IETF standard, whereas GUID (Globally Unique Identifier) is Microsoft\'s terminology for the same standard.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتوليد معرفات فريدة عالمياً (UUID v4 / GUID) متوافقة مع معيار RFC 4122 باستخدام 122 بت من العشوائية التشفيرية.`,
    howToUse: [
      'حدد عدد المعرفات المطلوب إنشاؤها.',
      'اختر خيارات التنسيق (مع فواصل أو بدون فواصل، أحرف كبيرة أو صغيرة).',
      'اضغط على توليد وانسخ المعرفات الفريدة.'
    ],
    formula: 'صيغة UUID v4: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx (حيث x رمز سداسي عشوائي، و y أحد الرموز 8، 9، a، b)',
    formulaVariables: [
      { name: 'الكمية', description: 'عدد المعرفات المطلوبة.', unit: 'عدد', optional: false }
    ],
    workedExample: {
      scenario: 'توليد معرف UUID v4 قياسي.',
      stepByStep: [
        'توليد 16 بايت عشوائي مشفر (128 بت).',
        'ضبط رقم الإصدار على 4 (Version 4).',
        'ضبط معيار RFC 4122.',
        'التنسيق في 5 مقاطع مفصولة بشرطات: 8-4-4-4-12.'
      ],
      result: 'معرف UUID v4 مولد: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"'
    },
    interpretation: 'توفر مفاتيح أساسية فريدة لقواعد البيانات والأنظمة السحابية الموزعة دون تكرار.',
    assumptions: 'توليد أرقام عشوائية مشفرة في المتصفح.',
    limitations: 'احتمال تكرار معرفين متطابقين ضئيل جداً يقارب الصفر من الناحية العملية.',
    faqs: [
      { question: 'ما هو الفرق بين UUID و GUID؟', answer: 'هما اسمان لنفس المفهوم؛ UUID هو المعيار العالمي المفتوح، و GUID هو الاسم المستخدم في أنظمة مايكروسوفت.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} genera identificadores universales únicos versión 4 (UUID v4 / GUID) compatibles con la norma RFC 4122 mediante 122 bits de aleatoriedad criptográfica.`,
    howToUse: [
      'Elija el número de UUIDs que necesita.',
      'Seleccione las opciones de formato (con/sin guiones, mayúsculas o minúsculas).',
      'Haga clic en Generar y copie los identificadores creados.'
    ],
    formula: 'Formato UUID v4: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx (estructura 8-4-4-4-12)',
    formulaVariables: [
      { name: 'Cantidad', description: 'Número de identificadores.', unit: 'Entero', optional: false }
    ],
    workedExample: {
      scenario: 'Generación de un identificador UUID v4 estándar.',
      stepByStep: [
        'Generación de 128 bits aleatorios.',
        'Ajuste del bit de versión a 4.',
        'Ajuste de variante RFC 4122.',
        'Estructuración en 5 bloques con guiones.'
      ],
      result: 'UUID v4 generado: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"'
    },
    interpretation: 'Ideal como clave primaria en bases de datos distribuidas y microservicios sin necesidad de coordinación central.',
    assumptions: 'Generación pseudoaleatoria criptográficamente segura.',
    limitations: 'La posibilidad teórica de colisión es prácticamente nula.',
    faqs: [
      { question: '¿Cuántos UUIDs v4 existen?', answer: 'Existen 2¹²² combinaciones posibles (aproximadamente 5,3 × 10³⁶ identificadores únicos).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} génère des identifiants uniques universels version 4 (UUID v4 / GUID) conformes à la RFC 4122 grâce à 122 bits d'aléa cryptographique.`,
    howToUse: [
      'Indiquez la quantité d\'UUID à générer.',
      'Personnalisez la casse et la présence des tirets.',
      'Cliquez sur Générer et copiez vos identifiants.'
    ],
    formula: 'Structure UUID v4 : xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx (schéma standard 8-4-4-4-12)',
    formulaVariables: [
      { name: 'Quantité', description: 'Nombre d\'UUID.', unit: 'Nombre', optional: false }
    ],
    workedExample: {
      scenario: 'Génération d\'un UUID v4.',
      stepByStep: [
        'Génération de 128 bits aléatoires sécurisés.',
        'Positionnement de la version 4 et de la variante RFC.',
        'Mise en forme hexadécimale avec tirets.'
      ],
      result: 'UUID v4 créé : "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"'
    },
    interpretation: 'Garantit l\'unicité des clés primaires dans les bases de données distribuées et les architectures cloud.',
    assumptions: 'Générateur de nombres aléatoires cryptographiques.',
    limitations: 'Le risque de collision est mathématiquement négligeable.',
    faqs: [
      { question: 'Pourquoi utiliser des UUID v4 ?', answer: 'Ils permettent de créer des identifiants uniques sans risque de doublon, sans serveur central de coordination.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} generiert RFC 4122-konforme Version-4-UUIDs (Universally Unique Identifier / GUID) auf Basis von 122 Bit kryptografischer Zufallswerte.`,
    howToUse: [
      'Wählen Sie die Anzahl der gewünschten UUIDs.',
      'Legen Sie Formatierungsoptionen fest (mit/ohne Bindestriche, Groß-/Kleinschreibung).',
      'Klicken Sie auf Generieren und kopieren Sie die eindeutigen IDs.'
    ],
    formula: 'UUID v4 Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx (8-4-4-4-12 Hex-Zeichen)',
    formulaVariables: [
      { name: 'Anzahl', description: 'Menge der zu erzeugenden UUIDs.', unit: 'Anzahl', optional: false }
    ],
    workedExample: {
      scenario: 'Erzeugung einer Standard UUID v4.',
      stepByStep: [
        '128 Bit Zufallsdaten generieren.',
        'Versionsbits auf Version 4 setzen.',
        'RFC-Variante konfigurieren.',
        'Mit Bindestrichen formatieren: 8-4-4-4-12.'
      ],
      result: 'Generierte UUID v4: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"'
    },
    interpretation: 'Liefert kollisionsfreie Primärschlüssel für verteilte Datenbanken, REST-APIs und Microservice-Architekturen.',
    assumptions: 'Kryptografisch sichere Zufallserzeugung.',
    limitations: 'Kollisionen sind bei über 5,3 × 10³⁶ Kombinationen praktisch ausgeschlossen.',
    faqs: [
      { question: 'Was ist der Unterschied zwischen UUID und GUID?', answer: 'UUID ist der IETF-Standardname, während GUID die von Microsoft verwendete Bezeichnung für dieselbe Spezifikation ist.' }
    ],
    relatedTools
  })
});

// 6. HTML ENTITY ENCODER & DECODER (html-entity)
export const HTML_ENTITY_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} escapes special HTML characters (&, <, >, ", ') into named and numeric HTML entities (&amp;, &lt;, &gt;, &quot;) and decodes entity strings back to unescaped text.`,
    howToUse: [
      'Paste HTML markup or raw text into the editor.',
      'Select Encode to escape special characters or Decode to restore text.',
      'Copy the resulting safe HTML entity string.'
    ],
    formula: 'Replaces reserve markup characters: & -> &amp;, < -> &lt;, > -> &gt;, " -> &quot;, \' -> &#39;',
    formulaVariables: [
      { name: 'Input Text', description: 'Raw code snippet or encoded entity string.', unit: 'String', optional: false }
    ],
    workedExample: {
      scenario: 'Escaping the code snippet `<div class="box">Fish & Chips</div>`.',
      stepByStep: [
        'Replace `<` with `&lt;`.',
        'Replace `>` with `&gt;`.',
        'Replace `"` with `&quot;`.',
        'Replace `&` with `&amp;`.'
      ],
      result: 'Escaped HTML: "&lt;div class=&quot;box&quot;&gt;Fish &amp; Chips&lt;/div&gt;"'
    },
    interpretation: 'Prevents Cross-Site Scripting (XSS) security vulnerabilities and ensures code samples display accurately on web pages.',
    assumptions: 'W3C HTML5 named entity specifications.',
    limitations: 'Only escapes designated special markup characters.',
    faqs: [
      { question: 'Why must HTML characters be escaped?', answer: 'To prevent web browsers from misinterpreting text content as executable HTML markup or JavaScript.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل الرموز الخاصة في لغة HTML (مثل & و < و > و ") إلى كيانات HTML مشفرة (&amp; و &lt; و &gt;) وفك ترميزها إلى نصوص عادية.`,
    howToUse: [
      'ألصق كود HTML أو النص في مربع التحرير.',
      'اختر تشفير (Encode) لحماية الرموز أو فك التشفير (Decode).',
      'انسخ النص المحول والآمن للاستخدام البرمجي.'
    ],
    formula: 'استبدال الرموز المحجوزة: & تصبح &amp;، و < تصبح &lt;، و > تصبح &gt;، و " تصبح &quot;',
    formulaVariables: [
      { name: 'النص المدخل', description: 'كود HTML أو نص عادي.', unit: 'نص', optional: false }
    ],
    workedExample: {
      scenario: 'تشفير الكود `<div class="box">Fish & Chips</div>`.',
      stepByStep: [
        'تحويل < إلى `&lt;`.',
        'تحويل > إلى `&gt;`.',
        'تحويل " إلى `&quot;`.',
        'تحويل & إلى `&amp;`.'
      ],
      result: 'الناتج المشفر: "&lt;div class=&quot;box&quot;&gt;Fish &amp; Chips&lt;/div&gt;"'
    },
    interpretation: 'تحمي المواقع من ثغرات الحقن (XSS) وتسمح بعرض الأكواد البرمجية داخل صفحات الويب بأمان.',
    assumptions: 'مطابقة لمعايير W3C HTML5.',
    limitations: 'تقتصر المعالجة على الرموز الخاصة المحددة.',
    faqs: [
      { question: 'ما فائدة تشفير كيانات HTML؟', answer: 'تمنع المتصفح من تنفيذ الأكواد كأوامر فعلية وتجعله يعرضها كنصوص مرئية فقط.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte caracteres especiales de HTML (&, <, >, ", ') en entidades HTML nombradas (&amp;, &lt;, &gt;) y descodifica entidades a texto original.`,
    howToUse: [
      'Pegue el fragmento de código HTML o texto.',
      'Elija Codificar para escapar caracteres o Descodificar para restaurarlos.',
      'Copie el resultado seguro en su portapapeles.'
    ],
    formula: 'Sustituye caracteres de marcado: & -> &amp;, < -> &lt;, > -> &gt;, " -> &quot;',
    formulaVariables: [
      { name: 'Texto', description: 'Código o texto plano.', unit: 'Cadena', optional: false }
    ],
    workedExample: {
      scenario: 'Escapar el código `<div class="box">Fish & Chips</div>`.',
      stepByStep: [
        'Sustituir < por &lt;.',
        'Sustituir > por &gt;.',
        'Sustituir " por &quot;.',
        'Sustituir & por &amp;.'
      ],
      result: 'Resultado: "&lt;div class=&quot;box&quot;&gt;Fish &amp; Chips&lt;/div&gt;"'
    },
    interpretation: 'Previene vulnerabilidades de seguridad XSS (Cross-Site Scripting) al mostrar código en la web.',
    assumptions: 'Estándar HTML5 de la W3C.',
    limitations: 'Solo afecta a los caracteres reservados de marcado.',
    faqs: [
      { question: '¿Por qué es importante escapar las comillas?', answer: 'Para evitar que se cierren indebidamente los atributos HTML en etiquetas dinámicas.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} convertit les caractères HTML réservés (&, <, >, ", ') en entités HTML échappées (&amp;, &lt;, &gt;) et décode les entités en texte brut.`,
    howToUse: [
      'Collez votre code HTML ou texte.',
      'Sélectionnez Encoder pour sécuriser ou Décoder pour restaurer.',
      'Copiez la chaîne de caractères résultante.'
    ],
    formula: 'Remplacement des balises : & -> &amp;, < -> &lt;, > -> &gt;, " -> &quot;',
    formulaVariables: [
      { name: 'Texte d\'entrée', description: 'Code ou chaîne de caractères.', unit: 'Texte', optional: false }
    ],
    workedExample: {
      scenario: 'Échappement du code `<div class="box">Fish & Chips</div>`.',
      stepByStep: [
        'Remplacer < par &lt;.',
        'Remplacer > par &gt;.',
        'Remplacer " par &quot;.',
        'Remplacer & par &amp;.'
      ],
      result: 'Code échappé : "&lt;div class=&quot;box&quot;&gt;Fish &amp; Chips&lt;/div&gt;"'
    },
    interpretation: 'Protège contre les failles d\'injection XSS et permet d\'afficher du code sans exécution involontaire.',
    assumptions: 'Spécification HTML5 du W3C.',
    limitations: 'Ne modifie que les caractères réservés de la syntaxe HTML.',
    faqs: [
      { question: 'À quoi sert l\'entité &amp; ?', answer: 'Elle représente le symbole esperluette (&) sans entrer en conflit avec la déclaration d\'entités HTML.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} wandelt HTML-Sonderzeichen (&, <, >, ", ') in benannte HTML-Entities (&amp;, &lt;, &gt;) um und dekodiert Entities zurück in regulären Text.`,
    howToUse: [
      'Fügen Sie Ihren HTML-Code oder Text ein.',
      'Wählen Sie Kodieren zum Maskieren oder Dekodieren zum Wiederherstellen.',
      'Kopieren Sie den maskierten Text.'
    ],
    formula: 'Ersetzt HTML-Steuerzeichen: & -> &amp;, < -> &lt;, > -> &gt;, " -> &quot;, \' -> &#39;',
    formulaVariables: [
      { name: 'Eingabetext', description: 'HTML-Code oder Fließtext.', unit: 'String', optional: false }
    ],
    workedExample: {
      scenario: 'Maskierung des Code-Fragments `<div class="box">Fish & Chips</div>`.',
      stepByStep: [
        '< ersetzen durch &lt;.',
        '> ersetzen durch &gt;.',
        '" ersetzen durch &quot;.',
        '& ersetzen durch &amp;.'
      ],
      result: 'Maskierter Code: "&lt;div class=&quot;box&quot;&gt;Fish &amp; Chips&lt;/div&gt;"'
    },
    interpretation: 'Schützt Webanwendungen vor Cross-Site-Scripting (XSS) und ermöglicht die sichere Anzeige von Quellcode.',
    assumptions: 'W3C HTML5 Entity-Spezifikation.',
    limitations: 'Maskiert ausschließlich reservierte Markup-Steuerzeichen.',
    faqs: [
      { question: 'Warum muss man HTML-Entities verwenden?', answer: 'Damit der Webbrowser Zeichen wie < und > als Text anzeigt und nicht als Beginn eines HTML-Tags interpretiert.' }
    ],
    relatedTools
  })
});

// 7. CRON EXPRESSION PARSER & EXPLAINER (cron-parser)
export const CRON_PARSER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} decodes standard 5-part and 6-part cron expressions into plain English schedules and calculates upcoming scheduled execution timestamps.`,
    howToUse: [
      'Enter your cron schedule expression (e.g., "*/15 * * * *" or "0 9 * * 1-5").',
      'Read the plain English translation of the automated schedule.',
      'Inspect the list of next scheduled execution dates and times.'
    ],
    formula: 'Cron Fields: [Minute] [Hour] [Day of Month] [Month] [Day of Week]',
    formulaVariables: [
      { name: 'Cron String', description: '5 or 6 field scheduling syntax.', unit: 'Cron expression', optional: false }
    ],
    workedExample: {
      scenario: 'Parsing the cron expression "0 8 * * 1-5".',
      stepByStep: [
        'Minute: "0" -> At minute 0 (the start of the hour).',
        'Hour: "8" -> At 08:00 AM.',
        'Day of Month: "*" -> Every day of the month.',
        'Month: "*" -> Every month.',
        'Day of Week: "1-5" -> Monday through Friday.'
      ],
      result: 'Schedule: "At 08:00 AM, Monday through Friday"'
    },
    interpretation: 'Helps DevOps engineers, backend developers, and system administrators configure automated background jobs and timers accurately.',
    assumptions: 'Standard UNIX / POSIX crontab syntax.',
    limitations: 'Sunday can be represented as 0 or 7 depending on system crontab implementation.',
    faqs: [
      { question: 'What does "*/5 * * * *" mean?', answer: 'It triggers the job every 5 minutes continuously.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحليل وفك تعبيرات وجداول مهام كرون (Cron Expressions) وتحويلها إلى شرح زمني واضح ومواعيد تنفيذ مستقبلية مجدولة.`,
    howToUse: [
      'أدخل تعبير كرون المجدول (مثل "0 9 * * 1-5" أو "*/15 * * * *").',
      'اقرأ الشرح اللغوي الواضح لجدول التنفيذ التلقائي.',
      'اطلع على قائمة بمواعيد التنفيذ القادمة بالساعة والتاريخ.'
    ],
    formula: 'خانات تعبير كرون الخمس: [الدقيقة] [الساعة] [اليوم من الشهر] [الشهر] [اليوم من الأسبوع]',
    formulaVariables: [
      { name: 'تعبير كرون', description: 'صيغة الجدولة البرمجية المعتمدة.', unit: 'تعبير مجدول', optional: false }
    ],
    workedExample: {
      scenario: 'تحليل تعبير كرون "0 8 * * 1-5".',
      stepByStep: [
        'الدقيقة: "0" -> عند الدقيقة صفر.',
        'الساعة: "8" -> الساعة الثامنة صباحاً.',
        'أيام الشهر: "*" -> كل يوم في الشهر.',
        'الشهور: "*" -> كل شهر في السنة.',
        'أيام الأسبوع: "1-5" -> من الاثنين إلى الجمعة.'
      ],
      result: 'الجدول: "عند الساعة 08:00 صباحاً، من الإثنين إلى الجمعة"'
    },
    interpretation: 'أداة مساعدة لمهندسي البرمجيات ومديري الخوادم لجدولة المهام الدورية والنسخ الاحتياطي بدقة.',
    assumptions: 'صيغة كرون القياسية في أنظمة يونكس ولينكس.',
    limitations: 'يوم الأحد يُمثل بالرقم 0 أو 7 حسب إعدادات الخادم.',
    faqs: [
      { question: 'ماذا يعني الرمز "*/10 * * * *"؟', answer: 'يعني تنفيذ المهمة المجدولة تلقائياً كل 10 دقائق على مدار الساعة.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} descifra expresiones cron estándar de 5 y 6 campos a lenguaje natural y calcula las próximas fechas y horas de ejecución programadas.`,
    howToUse: [
      'Introduzca la expresión cron (ej. "0 9 * * 1-5" o "*/15 * * * *").',
      'Lea la descripción clara de la frecuencia de ejecución.',
      'Revise las próximas ejecuciones previstas en el calendario.'
    ],
    formula: 'Campos cron: [Minuto] [Hora] [Día del mes] [Mes] [Día de la semana]',
    formulaVariables: [
      { name: 'Expresión cron', description: 'Sintaxis de programación.', unit: 'Cadena', optional: false }
    ],
    workedExample: {
      scenario: 'Interpretar la expresión cron "0 8 * * 1-5".',
      stepByStep: [
        'Minuto: "0" -> En el minuto 0.',
        'Hora: "8" -> A las 08:00 horas.',
        'Día del mes: "*" -> Todos los días.',
        'Mes: "*" -> Todos los meses.',
        'Día de la semana: "1-5" -> De lunes a viernes.'
      ],
      result: 'Programación: "A las 08:00, de lunes a viernes"'
    },
    interpretation: 'Facilita la gestión de tareas programadas (cron jobs) en servidores y pipelines de integración continua.',
    assumptions: 'Sintaxis estándar de crontab UNIX/Linux.',
    limitations: 'El domingo puede representarse con 0 o 7 según el motor del sistema.',
    faqs: [
      { question: '¿Qué significa el asterisco (*) en cron?', answer: 'Representa un comodín que equivale a "todos los valores posibles" para ese campo específico.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} traduit les expressions cron standards (5 ou 6 champs) en explications claires et calcule les prochaines dates et heures d'exécution programmées.`,
    howToUse: [
      'Saisissez l\'expression cron (ex. "0 8 * * 1-5" ou "*/30 * * * *").',
      'Consultez la description en langage courant.',
      'Vérifiez la liste des prochaines exécutions planifiées.'
    ],
    formula: 'Champs cron : [Minute] [Heure] [Jour du mois] [Mois] [Jour de la semaine]',
    formulaVariables: [
      { name: 'Expression cron', description: 'Syntaxe de planification.', unit: 'Chaîne cron', optional: false }
    ],
    workedExample: {
      scenario: 'Analyse de l\'expression "0 8 * * 1-5".',
      stepByStep: [
        'Minute : "0" -> À la minute 0.',
        'Heure : "8" -> À 08h00.',
        'Jour du mois : "*" -> Tous les jours.',
        'Mois : "*" -> Tous les mois.',
        'Jour de la semaine : "1-5" -> Du lundi au vendredi.'
      ],
      result: 'Planification : "À 08h00, du lundi au vendredi"'
    },
    interpretation: 'Aide les administrateurs système et développeurs à planifier les tâches de fond et sauvegardes automatisées.',
    assumptions: 'Syntaxe crontab UNIX standard.',
    limitations: 'Le dimanche peut être codé 0 ou 7 selon les systèmes d\'exploitation.',
    faqs: [
      { question: 'Que signifie "*/15 * * * *" ?', answer: 'Cette expression déclenche la tâche toutes les 15 minutes en continu.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} übersetzt Cron-Ausdrücke (5- und 6-teilig) in verständlichen Klartext und berechnet die nächsten geplanten Ausführungszeitpunkte.`,
    howToUse: [
      'Geben Sie den Cron-Ausdruck ein (z. B. "0 8 * * 1-5" oder "*/15 * * * *").',
      'Lesen Sie die verständliche Erklärung des Zeitplans ab.',
      'Prüfen Sie die Liste der nächsten anstehenden Ausführungen.'
    ],
    formula: 'Cron-Felder: [Minute] [Stunde] [Tag des Monats] [Monat] [Wochentag]',
    formulaVariables: [
      { name: 'Cron-Ausdruck', description: 'Planungssyntax.', unit: 'Cron-String', optional: false }
    ],
    workedExample: {
      scenario: 'Auswertung des Cron-Ausdrucks "0 8 * * 1-5".',
      stepByStep: [
        'Minute: "0" -> Zur Minute 0.',
        'Stunde: "8" -> Um 08:00 Uhr morgens.',
        'Tag des Monats: "*" -> Jeden Tag.',
        'Monat: "*" -> Jeden Monat.',
        'Wochentag: "1-5" -> Montag bis Freitag.'
      ],
      result: 'Zeitplan: "Um 08:00 Uhr, Montag bis Freitag"'
    },
    interpretation: 'Unverzichtbar für Systemadministratoren und Entwickler zur präzisen Planung automatisierter Server-Jobs.',
    assumptions: 'Standard UNIX / Linux crontab Syntax.',
    limitations: 'Sonntag kann je nach Betriebssystem als 0 oder 7 definiert sein.',
    faqs: [
      { question: 'Wofür steht das Zeichen "/" in einem Cron-Feld?', answer: 'Es definiert ein Intervall bzw. Schrittweiten (z. B. */15 = alle 15 Einheiten).' }
    ],
    relatedTools
  })
});

// 8. LIVE MARKDOWN EDITOR & PREVIEW (markdown-preview)
export const MARKDOWN_PREVIEW_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} parses CommonMark and GitHub Flavored Markdown (GFM) into formatted HTML in real time with side-by-side editing and previewing.`,
    howToUse: [
      'Write or paste your Markdown text in the editor panel.',
      'Use standard syntax: # for headers, **bold**, *italics*, `code`, and [links](url).',
      'View the real-time rendered preview and copy clean HTML markup.'
    ],
    formula: 'Converts Markdown syntax trees (AST) into semantic HTML elements (e.g., # Header -> <h1>Header</h1>)',
    formulaVariables: [
      { name: 'Markdown Content', description: 'Raw markdown document.', unit: 'Text', optional: false }
    ],
    workedExample: {
      scenario: 'Formatting a title and checklist in Markdown.',
      stepByStep: [
        'Input: "# My Project\\n- [x] Task completed\\n- [ ] Pending task".',
        'Parses `# My Project` into `<h1>My Project</h1>`.',
        'Parses list items into an unordered list `<ul>` with interactive checkboxes.'
      ],
      result: 'Rendered H1 Heading with styled interactive task list'
    },
    interpretation: 'Enables swift drafting of README files, documentation articles, and blog posts.',
    assumptions: 'CommonMark and GitHub Flavored Markdown (GFM) compliance.',
    limitations: 'Raw HTML tags inside markdown may be sanitized for security.',
    faqs: [
      { question: 'How do I create a table in Markdown?', answer: 'Use pipes (|) to separate columns and hyphens (---) to define header rows.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحرير ومعاينة نصوص لغة ماركداون (Markdown / GFM) لحظياً وتحويلها إلى كود HTML منسق بدقة مع شاشة معاينة تفاعلية.`,
    howToUse: [
      'اكتب أو الصق نص الماركداون في لوحة التحرير.',
      'استخدم وسوم الماركداون: # للعناوين، و **نص عريض**، و *نص مائل*، و [روابط](url).',
      'شاهد المعاينة المباشرة المنسقة وانسخ كود HTML الجاهز.'
    ],
    formula: 'تحويل بنية شجرة الماركداون إلى عناصر HTML قياسية متوافقة مع الويب',
    formulaVariables: [
      { name: 'نص ماركداون', description: 'المحتوى المكتوب بصيغة ماركداون.', unit: 'نص', optional: false }
    ],
    workedExample: {
      scenario: 'تنسيق عنوان وقائمة مهام بصيغة ماركداون.',
      stepByStep: [
        'كتابة النص: `# مشروعي\\n- [x] مهمة منجزة`.',
        'تحويل `# مشروعي` إلى وسم عنوان رئيسي `<h1>`.',
        'تحويل عناصر القائمة إلى قائمة غير مرتبة `<ul>` تفاعلية.'
      ],
      result: 'معاينة منسقة لعنوان رئيسي وقائمة مهام'
    },
    interpretation: 'أداة مثالية لكتابة ملفات README والتوثيق البرمجي والمقالات التقنية.',
    assumptions: 'مطابقة لمعايير CommonMark و GitHub Flavored Markdown.',
    limitations: 'قد تخضع وسوم HTML المضمنة لتنقية أمنية لمنع الثغرات.',
    faqs: [
      { question: 'كيف أنشئ رابطاً في ماركداون؟', answer: 'اكتب نص الرابط داخل أقواس مربعة متبوعاً بعنوان الرابط داخل أقواس دائرية: [النص](الرابط).' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} procesa Markdown estándar (CommonMark y GFM) a código HTML formateado en tiempo real con previsualización simultánea.`,
    howToUse: [
      'Escriba o pegue texto Markdown en el panel de edición.',
      'Utilice encabezados (#), negritas (**texto**), listas y tablas.',
      'Consulte la previsualización en vivo y copie el HTML generado.'
    ],
    formula: 'Transformación del árbol de sintaxis de Markdown en elementos semánticos HTML',
    formulaVariables: [
      { name: 'Documento Markdown', description: 'Texto con sintaxis Markdown.', unit: 'Texto', optional: false }
    ],
    workedExample: {
      scenario: 'Formatear un título y lista de tareas.',
      stepByStep: [
        'Entrada: "# Proyecto\\n- [x] Tarea lista".',
        'Conversión de `# Proyecto` a `<h1>Proyecto</h1>`.',
        'Conversión de elementos de lista a etiquetas HTML `<ul>` y `<li>`.'
      ],
      result: 'Encabezado H1 y lista de tareas maquetados correctamente'
    },
    interpretation: 'Acelera la redacción de archivos README en GitHub, guías técnicas y artículos de blog.',
    assumptions: 'Compatibilidad con CommonMark y GitHub Flavored Markdown.',
    limitations: 'Etiquetas HTML complejas pueden ser filtradas por seguridad.',
    faqs: [
      { question: '¿Cómo se añade código en bloque en Markdown?', answer: 'Envolviendo el bloque con tres comillas invertidas (```).' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} édite et prévisualise en temps réel vos documents Markdown (CommonMark et GFM) et les convertit en code HTML prêt à l'emploi.`,
    howToUse: [
      'Rédigez ou collez votre texte Markdown dans l\'éditeur.',
      'Utilisez la syntaxe usuelle : # titres, **gras**, *italique*, listes.',
      'Visualisez le rendu instantané et copiez le code HTML.'
    ],
    formula: 'Conversion de la syntaxe Markdown en balises HTML sémantiques',
    formulaVariables: [
      { name: 'Texte Markdown', description: 'Document Markdown source.', unit: 'Texte', optional: false }
    ],
    workedExample: {
      scenario: 'Mise en forme d\'un titre et d\'une liste de tâches.',
      stepByStep: [
        'Saisie : "# Projet\\n- [x] Tâche terminée".',
        'Transformation de `# Projet` en `<h1>Projet</h1>`.',
        'Génération de la liste de tâches à cocher.'
      ],
      result: 'Titre H1 et liste de contrôle parfaitement mis en page'
    },
    interpretation: 'Idéal pour concevoir des fichiers README.md, de la documentation technique et des articles de blog.',
    assumptions: 'Standard CommonMark et GFM.',
    limitations: 'Les balises HTML brutes peuvent être assainies par sécurité.',
    faqs: [
      { question: 'Comment insérer une image en Markdown ?', answer: 'En utilisant la syntaxe : ![Texte alternatif](url_de_l_image).' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} wandelt Markdown (CommonMark und GitHub Flavored Markdown) in Echtzeit in formatiertes HTML mit synchroner Live-Vorschau um.`,
    howToUse: [
      'Tippen oder fügen Sie Markdown-Text in den Editor ein.',
      'Nutzen Sie Formatierungen wie Überschriften (#), **fett**, *kursiv* und Tabellen.',
      'Sehen Sie die gerenderte Vorschau und kopieren Sie das fertige HTML.'
    ],
    formula: 'Parsing des Markdown-Syntaxbaums in semantische HTML-Elemente',
    formulaVariables: [
      { name: 'Markdown-Text', description: 'Quelldokument in Markdown.', unit: 'Text', optional: false }
    ],
    workedExample: {
      scenario: 'Formatierung einer Überschrift und Aufgabenliste.',
      stepByStep: [
        'Eingabe: "# Mein Projekt\\n- [x] Erledigt".',
        'Wandelt `# Mein Projekt` in `<h1>Mein Projekt</h1>` um.',
        'Rendert Checkbox-Elemente als HTML-Liste.'
      ],
      result: 'H1-Überschrift und interaktive Aufgabenliste formatiert'
    },
    interpretation: 'Perfekt für Entwickler zur Erstellung von README-Dateien, Wikis und Dokumentationen.',
    assumptions: 'Unterstützung von CommonMark und GFM.',
    limitations: 'HTML-Tags können aus Sicherheitsgründen bereinigt werden.',
    faqs: [
      { question: 'Wie erstellt man eine Tabelle in Markdown?', answer: 'Spalten werden mit senkrechten Strichen (|) getrennt und die Kopfzeile durch Bindestriche (---) markiert.' }
    ],
    relatedTools
  })
});

// 9. TEXT DIFF & COMPARISON UTILITY (diff-checker)
export const DIFF_CHECKER_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} compares two text passages or source code snippets side-by-side to highlight line-by-line and character-level additions, deletions, and modifications.`,
    howToUse: [
      'Paste original text into the Left (Original) pane.',
      'Paste updated text into the Right (Modified) pane.',
      'Review color-coded additions (green), deletions (red), and line edits.'
    ],
    formula: 'Computes Longest Common Subsequence (LCS) algorithm to generate minimal edit distance deltas',
    formulaVariables: [
      { name: 'Original Text', description: 'Base version of document.', unit: 'Text', optional: false },
      { name: 'Modified Text', description: 'Updated version of document.', unit: 'Text', optional: false }
    ],
    workedExample: {
      scenario: 'Comparing "The quick brown fox" with "The fast brown fox jumps".',
      stepByStep: [
        'Find unchanged words: "The", "brown", "fox".',
        'Identify deletion: "quick" (removed).',
        'Identify additions: "fast" (inserted), "jumps" (appended).'
      ],
      result: 'Diff: Deleted [-quick-], Added {+fast+}, Added {+jumps+}'
    },
    interpretation: 'Essential for code reviews, contract version comparison, and auditing editorial revisions.',
    assumptions: 'Myers / LCS difference algorithm.',
    limitations: 'Very large multi-megabyte text files may require line-level diffing mode.',
    faqs: [
      { question: 'What does green vs red highlight mean in a diff?', answer: 'Green indicates newly added content, while red indicates removed or deleted text from the original version.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بمقارنة نصين أو نسختين من الأكواد البرمجية جنباً إلى جنب لتوضيح الفروقات والإضافات والمحذوفات بدقة على مستوى السطور والكلمات.`,
    howToUse: [
      'ألصق النص الأصلي في اللوحة الأولى (الأصل).',
      'ألصق النص المعدل في اللوحة الثانية (التعديل).',
      'راجع الفروقات الملونة: الإضافات (باللون الأخضر) والمحذوفات (باللون الأحمر).'
    ],
    formula: 'خوارزمية أطول تسلسل مشترك (LCS) لحساب أدنى مسافة تعديل بين النصوص',
    formulaVariables: [
      { name: 'النص الأصلي', description: 'النسخة الأولى من المستند.', unit: 'نص', optional: false },
      { name: 'النص المعدل', description: 'النسخة المحدثة من المستند.', unit: 'نص', optional: false }
    ],
    workedExample: {
      scenario: 'مقارنة الجملة "The quick brown fox" مع "The fast brown fox jumps".',
      stepByStep: [
        'تحديد الكلمات غير المتغيرة: "The", "brown", "fox".',
        'تحديد الكلمة المحذوفة: "quick".',
        'تحديد الكلمات المضافة: "fast" و "jumps".'
      ],
      result: 'الفروقات: حذف [-quick-]، وإضافة {+fast+} و {+jumps+}'
    },
    interpretation: 'أداة ضرورية لمراجعة العقود القانونية، وتدقيق التعديلات التحريرية، وفحص الأكواد البرمجية.',
    assumptions: 'تطبيق خوارزميات مقارنة النصوص الدقيقة.',
    limitations: 'الملفات النصية الضخمة جداً قد تتطلب المقارنة على مستوى السطور فقط.',
    faqs: [
      { question: 'ماذا تعني الألوان في فاحص الفروقات؟', answer: 'اللون الأخضر يشير إلى النصوص أو السطور المضافة حديثاً، واللون الأحمر يشير إلى ما تم حذفه من النسخة الأصلية.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} compara dos textos o fragmentos de código en paralelo para resaltar adiciones, eliminaciones y cambios línea a línea y carácter a carácter.`,
    howToUse: [
      'Pegue el texto original en el panel izquierdo.',
      'Pegue el texto modificado en el panel derecho.',
      'Revise las diferencias coloreadas en verde (añadido) y rojo (eliminado).'
    ],
    formula: 'Algoritmo de subsecuencia común más larga (LCS) para calcular diferencias mínimas',
    formulaVariables: [
      { name: 'Texto original', description: 'Versión base.', unit: 'Texto', optional: false },
      { name: 'Texto modificado', description: 'Versión revisada.', unit: 'Texto', optional: false }
    ],
    workedExample: {
      scenario: 'Comparación de "The quick brown fox" y "The fast brown fox jumps".',
      stepByStep: [
        'Términos comunes: "The", "brown", "fox".',
        'Eliminación detectada: "quick".',
        'Adiciones detectadas: "fast", "jumps".'
      ],
      result: 'Diferencias: Eliminado [-quick-], Añadido {+fast+}, Añadido {+jumps+}'
    },
    interpretation: 'Imprescindible para comparar versiones de contratos legales, artículos y revisiones de código.',
    assumptions: 'Algoritmo estándar de comparación de diferencias.',
    limitations: 'Archivos muy voluminosos se procesan mejor en modo línea a línea.',
    faqs: [
      { question: '¿Qué significan los colores verde y rojo?', answer: 'El verde resalta el contenido nuevo añadido y el rojo el contenido eliminado de la versión original.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} compare deux textes ou codes sources côte à côte pour surligner les ajouts, suppressions et modifications mot à mot et ligne par ligne.`,
    howToUse: [
      'Collez le texte original dans le panneau de gauche.',
      'Collez le texte modifié dans le panneau de droite.',
      'Examinez les ajouts (en vert) et les suppressions (en rouge).'
    ],
    formula: 'Algorithme LCS (Plus longue sous-séquence commune) pour le calcul des deltas d\'édition',
    formulaVariables: [
      { name: 'Texte d\'origine', description: 'Version initiale.', unit: 'Texte', optional: false },
      { name: 'Texte modifié', description: 'Version révisée.', unit: 'Texte', optional: false }
    ],
    workedExample: {
      scenario: 'Comparaison entre "The quick brown fox" et "The fast brown fox jumps".',
      stepByStep: [
        'Mots identiques : "The", "brown", "fox".',
        'Suppression identifiée : "quick".',
        'Ajouts identifiés : "fast" et "jumps".'
      ],
      result: 'Diff : Supprimé [-quick-], Ajouté {+fast+}, Ajouté {+jumps+}'
    },
    interpretation: 'Pratique pour la relecture de contrats, la révision d\'articles et l\'analyse de modifications logicielles.',
    assumptions: 'Algorithme d\'alignement différentiel standard.',
    limitations: 'Pour des textes très longs, le mode ligne par ligne est recommandé.',
    faqs: [
      { question: 'Comment interpréter les surlignages colorés ?', answer: 'Le vert indique les passages ajoutés et le rouge les passages retirés de la version d\'origine.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} vergleicht zwei Textversionen oder Quellcodes nebeneinander und hebt Hinzufügungen, Löschungen und Änderungen farblich hervor.`,
    howToUse: [
      'Fügen Sie den Originaltext in das linke Feld ein.',
      'Fügen Sie den geänderten Text in das rechte Feld ein.',
      'Prüfen Sie die farblichen Differenzen: Grün (Hinzugefügt) und Rot (Entfernt).'
    ],
    formula: 'LCS-Algorithmus (Longest Common Subsequence) zur Berechnung der minimalen Änderungsdistanz',
    formulaVariables: [
      { name: 'Originaltext', description: 'Ausgangsfassung.', unit: 'Text', optional: false },
      { name: 'Geänderter Text', description: 'Überarbeitete Fassung.', unit: 'Text', optional: false }
    ],
    workedExample: {
      scenario: 'Vergleich von "The quick brown fox" mit "The fast brown fox jumps".',
      stepByStep: [
        'Unveränderte Wörter: "The", "brown", "fox".',
        'Gelöschtes Wort: "quick".',
        'Hinzugefügte Wörter: "fast", "jumps".'
      ],
      result: 'Diff: Entfernt [-quick-], Hinzugefügt {+fast+}, Hinzugefügt {+jumps+}'
    },
    interpretation: 'Ideal für Code-Reviews, Vertragsabgleiche und redaktionelle Versionskontrollen.',
    assumptions: 'Standard LCS-Vergleichsalgorithmus.',
    limitations: 'Bei sehr umfangreichen Dokumenten empfiehlt sich der zeilenweise Vergleichsmodus.',
    faqs: [
      { question: 'Was bedeuten die Farben grün und rot?', answer: 'Grün markiert neu hinzugefügte Textpassagen, Rot steht für gelöschten Originaltext.' }
    ],
    relatedTools
  })
});

// 10. SEO URL SLUG GENERATOR (slug-generator)
export const SLUG_GENERATOR_KNOWLEDGE = createKnowledge({
  en: (tool, name, relatedTools) => ({
    overview: `${name} converts article titles and product names into clean, URL-friendly, lowercased slugs formatted with hyphen delimiters and stripped diacritics.`,
    howToUse: [
      'Enter your title, headline, or headline phrase.',
      'Configure options (remove stop words, custom delimiter).',
      'Copy the optimized SEO slug for your web page URL.'
    ],
    formula: 'Slug = Text.normalize("NFD").replace(/[^a-zA-Z0-9 ]/g, "").trim().toLowerCase().replace(/\\s+/g, "-")',
    formulaVariables: [
      { name: 'Headline / Title', description: 'Raw natural language title string.', unit: 'Text', optional: false }
    ],
    workedExample: {
      scenario: 'Generating an SEO slug for "10 Best Tips for Web Designers in 2026!".',
      stepByStep: [
        'Strip special punctuation (!): "10 Best Tips for Web Designers in 2026".',
        'Convert to lowercase: "10 best tips for web designers in 2026".',
        'Replace spaces with hyphens: "10-best-tips-for-web-designers-in-2026".'
      ],
      result: 'Generated Slug: "10-best-tips-for-web-designers-in-2026"'
    },
    interpretation: 'Ensures web URLs are human-readable, crawler-friendly, and optimized for search engine ranking.',
    assumptions: 'ASCII alphanumeric transformation with Unicode transliteration.',
    limitations: 'Non-Latin scripts may require phonetic romanization/transliteration.',
    faqs: [
      { question: 'What makes a URL slug SEO friendly?', answer: 'A short, lowercased, hyphen-separated slug that contains target keywords and eliminates punctuation symbols.' }
    ],
    relatedTools
  }),
  ar: (tool, name, relatedTools) => ({
    overview: `تقوم ${name} بتحويل عناوين المقالات والمنتجات إلى روابط ويب نظيفة ومحسنة لمحركات البحث (SEO Slugs) مفصولة بشرطات وخالية من الرموز الخاصة.`,
    howToUse: [
      'أدخل عنوان المقال أو اسم المنتج في المربع.',
      'اختر نوع الفاصل (شرطة - أو شرطة سفلية _).',
      'انسخ الرابط اللطيف الجاهز لإضافته في موقعك أو مدونتك.'
    ],
    formula: 'إزالة الرموز وعلامات الترقيم وتحويل المسافات إلى شرطات (-) وتوحيد الأحرف',
    formulaVariables: [
      { name: 'العنوان المدخل', description: 'عنوان المقال أو الصفحة.', unit: 'نص', optional: false }
    ],
    workedExample: {
      scenario: 'إنشاء slug لعنوان "10 Best Tips for Web Designers in 2026!".',
      stepByStep: [
        'حذف علامات الترقيم الخاصة (!).',
        'تحويل الأحرف إلى صغيرة (lowercase).',
        'استبدال المسافات بشرطات (-): "10-best-tips-for-web-designers-in-2026".'
      ],
      result: 'الرابط الناتج: "10-best-tips-for-web-designers-in-2026"'
    },
    interpretation: 'تحسن ظهور الروابط في نتائج محركات البحث وتجعلها واضحة وسهلة المشاركة للمستخدمين.',
    assumptions: 'معالجة النصوص وتطهير الرموز غير الصالحة في الروابط.',
    limitations: 'قد تتطلب بعض العناوين غير اللاتينية تعريباً صوتياً للروابط الإنجليزية.',
    faqs: [
      { question: 'لماذا يفضل استخدام الشرطة (-) بدلاً من المسافة في الروابط؟', answer: 'تعتبر محركات البحث مثل Google الشرطة فاصلاً قياسياً بين الكلمات في روابط الويب.' }
    ],
    relatedTools
  }),
  es: (tool, name, relatedTools) => ({
    overview: `${name} convierte títulos de artículos y nombres de productos en slugs de URL limpios, en minúsculas, sin acentos y separados por guiones para mejorar el SEO.`,
    howToUse: [
      'Introduzca el título o frase que desea convertir.',
      'Configure las opciones de separador o eliminación de tildes.',
      'Copie el slug optimizado para su página web.'
    ],
    formula: 'Normalización de caracteres diacríticos, eliminación de signos especiales y unión mediante guiones',
    formulaVariables: [
      { name: 'Título', description: 'Frase o encabezado.', unit: 'Texto', optional: false }
    ],
    workedExample: {
      scenario: 'Generar el slug de "10 Mejores Consejos para Diseñadores Web en 2026!".',
      stepByStep: [
        'Eliminación de tildes y signos de exclamación.',
        'Conversión a minúsculas.',
        'Sustitución de espacios por guiones.'
      ],
      result: 'Slug generado: "10-mejores-consejos-para-disenadores-web-en-2026"'
    },
    interpretation: 'Mejora el posicionamiento orgánico en buscadores y la legibilidad de los enlaces.',
    assumptions: 'Normalización Unicode y caracteres ASCII.',
    limitations: 'Caracteres en alfabetos no latinos se transliteran o eliminan según configuración.',
    faqs: [
      { question: '¿Por qué evitar mayúsculas en las URLs?', answer: 'Para evitar duplicidad de contenido y problemas de sensibilidad a mayúsculas en servidores Linux.' }
    ],
    relatedTools
  }),
  fr: (tool, name, relatedTools) => ({
    overview: `${name} transforme les titres d'articles en slugs d'URL optimisés pour le référencement (SEO), en minuscules, sans accents et séparés par des tirets.`,
    howToUse: [
      'Saisissez le titre de l\'article ou de la page.',
      'Activez la suppression des accents et des mots vides si besoin.',
      'Copiez le slug propre pour votre CMS ou site web.'
    ],
    formula: 'Suppression des diacritiques, élimination de la ponctuation et remplacement des espaces par des tirets',
    formulaVariables: [
      { name: 'Titre initial', description: 'Intitulé ou titre de page.', unit: 'Texte', optional: false }
    ],
    workedExample: {
      scenario: 'Génération du slug de "10 Meilleurs Conseils pour Développeurs Web en 2026 !".',
      stepByStep: [
        'Suppression de la ponctuation et des accents (é -> e).',
        'Passage en minuscules.',
        'Remplacement des espaces par des tirets.'
      ],
      result: 'Slug SEO : "10-meilleurs-conseils-pour-developpeurs-web-en-2026"'
    },
    interpretation: 'Améliore la lisibilité des liens et l\'indexation par les moteurs de recherche.',
    assumptions: 'Translittération standard des caractères accentués.',
    limitations: 'Les symboles monétaires et spéciaux sont retirés automatiquement.',
    faqs: [
      { question: 'Quel est l\'impact d\'un bon slug sur le SEO ?', answer: 'Un slug concis et contenant les mots-clés cibles améliore le taux de clic et la compréhension de la page par les robots d\'indexation.' }
    ],
    relatedTools
  }),
  de: (tool, name, relatedTools) => ({
    overview: `${name} wandelt Beitragstitel und Produktnamen in suchmaschinenfreundliche (SEO) URL-Slugs in Kleinbuchstaben ohne Umlaute und Sonderzeichen um.`,
    howToUse: [
      'Geben Sie den Titel oder die Überschrift ein.',
      'Wählen Sie Optionen wie Umlautumwandlung (ä -> ae) und Trennzeichen.',
      'Kopieren Sie den bereinigten URL-Slug für Ihre Website.'
    ],
    formula: 'Umlaut-Ersetzung, Entfernung von Satzzeichen und Ersetzung von Leerzeichen durch Bindestriche',
    formulaVariables: [
      { name: 'Titel', description: 'Ausgangsüberschrift.', unit: 'Text', optional: false }
    ],
    workedExample: {
      scenario: 'Erzeugung eines Slugs für "10 beste Tipps für Webdesigner im Jahr 2026!".',
      stepByStep: [
        'Umlaut- und Sonderzeichenbereinigung (ü -> ue, ! entfernen).',
        'In Kleinbuchstaben umwandeln.',
        'Leerzeichen durch Bindestriche ersetzen.'
      ],
      result: 'Generierter Slug: "10-beste-tipps-fuer-webdesigner-im-jahr-2026"'
    },
    interpretation: 'Optimiert die Klickrate in Suchergebnissen und vermeidet Zeichenkodierungsprobleme in Browser-Adresszeilen.',
    assumptions: 'Deutsche Umlaut-Konvertierung (ä->ae, ö->oe, ü->ue, ß->ss).',
    limitations: 'Sonderzeichen und Emojis werden automatisch herausgefiltert.',
    faqs: [
      { question: 'Warum sind Bindestriche in URLs besser als Unterstriche?', answer: 'Suchmaschinen wie Google werten Bindestriche als Worttrennzeichen, während Unterstriche Wörter verbinden können.' }
    ],
    relatedTools
  })
});

// Map of Batch 2 Developer and Text tools
export const BATCH2_DEVTEXT_HANDLERS: Record<string, Record<Language, KnowledgeHandler>> = {
  'case-converter': CASE_CONVERTER_KNOWLEDGE,
  'base64-encode': BASE64_ENCODE_KNOWLEDGE,
  'url-encoder': URL_ENCODER_KNOWLEDGE,
  'hash-generator': HASH_GENERATOR_KNOWLEDGE,
  'uuid-generator': UUID_GENERATOR_KNOWLEDGE,
  'html-entity': HTML_ENTITY_KNOWLEDGE,
  'cron-parser': CRON_PARSER_KNOWLEDGE,
  'markdown-preview': MARKDOWN_PREVIEW_KNOWLEDGE,
  'diff-checker': DIFF_CHECKER_KNOWLEDGE,
  'slug-generator': SLUG_GENERATOR_KNOWLEDGE,
};
