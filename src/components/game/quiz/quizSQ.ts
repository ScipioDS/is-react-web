import {QuizQuestion} from "@/components/game/QuizModels.ts";

export const quizzesAL: QuizQuestion[] = [
    {
        question: 'Çfarë është fjalëkalimi?',
        answers: [
            { answer: 'Kod sekret për të hyrë në llogarinë tënde', isTrue: true },
            { answer: 'Numër publik për identifikim', isTrue: false },
            { answer: 'Emri i kompjuterit tënd', isTrue: false },
        ],
    },
    {
        question: 'Cili është fjalëkalimi më i sigurt?',
        answers: [
            { answer: 'Kombinim i shkronjave, numrave dhe simboleve', isTrue: true },
            { answer: 'Emri juaj dhe viti i lindjes', isTrue: false },
            { answer: '123456', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është phishing?',
        answers: [
            { answer: 'Përpjekje për të vjedhur informacionin tuaj përmes email-it të rremë', isTrue: true },
            { answer: 'Lidhje interneti', isTrue: false },
            { answer: 'Program për mbrojtje ndaj viruseve', isTrue: false },
        ],
    },
    {
        question: 'A duhet të ndash fjalëkalimin tënd me miqtë?',
        answers: [
            { answer: 'Jo, kurrë', isTrue: true },
            { answer: 'Vetëm me miqtë e ngushtë', isTrue: false },
            { answer: 'Vetëm nëse u beson', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është malware?',
        answers: [
            { answer: 'Software i dëmshëm që mund ta dëmtojë kompjuterin tënd', isTrue: true },
            { answer: 'Lloj hardueri', isTrue: false },
            { answer: 'Formë skedare', isTrue: false },
        ],
    },
    {
        question: 'A duhet të përdorësh WiFi publik pa fjalëkalim?',
        answers: [
            { answer: 'Jo, sepse nuk është i sigurt', isTrue: true },
            { answer: 'Po, pothuajse gjithmonë është i sigurt', isTrue: false },
            { answer: 'Vetëm për shikimin e videove', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është autentifikimi me dy faktor?',
        answers: [
            { answer: 'Dy mënyra për të verifikuar identitetin tënd', isTrue: true },
            { answer: 'Derë me dy brava', isTrue: false },
            { answer: 'Hyrje për dy përdorues', isTrue: false },
        ],
    },
    {
        question: 'A duhet të klikosh në lidhje nga persona të panjohur?',
        answers: [
            { answer: 'Jo, sepse mund të jetë e dëmshme', isTrue: true },
            { answer: 'Po, nëse duket interesante', isTrue: false },
            { answer: 'Vetëm nëse është nga rrjeti social', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është spyware?',
        answers: [
            { answer: 'Program që mblidh informacionin tënd personal', isTrue: true },
            { answer: 'Lloj shfletuesi', isTrue: false },
            { answer: 'Shtazë interneti', isTrue: false },
        ],
    },
    {
        question: 'A duhet të ndash llogaritë e mediave shoqërore tënde?',
        answers: [
            { answer: 'Jo, sepse mund të jenë të rrezikuara', isTrue: true },
            { answer: 'Po, nëse është e qartë', isTrue: false },
            { answer: 'Vetëm me miqtë e shkolës', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është firewall?',
        answers: [
            { answer: 'Sistem që mbron kompjuterin tënd nga hyrjet e paautorizuara', isTrue: true },
            { answer: 'Lloj rafte', isTrue: false },
            { answer: 'Software për redaktimin e videos', isTrue: false },
        ],
    },
    {
        question: 'Kur duhet të përditësosh software-in tënd?',
        answers: [
            { answer: 'Menjëherë kur sheh mesazhin e përditësimit', isTrue: true },
            { answer: 'Kurrë', isTrue: false },
            { answer: 'Vetëm kur je në dëmën', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është cyberbullying?',
        answers: [
            { answer: 'Dhunë dhe kërcënime përmes internetit', isTrue: true },
            { answer: 'Lojë interneti', isTrue: false },
            { answer: 'Dera e faqes', isTrue: false },
        ],
    },
    {
        question: 'A mund të ndash informacionin tënd personal (foto, adresë)?',
        answers: [
            { answer: 'Jo, sepse mund të përdoret për krime', isTrue: true },
            { answer: 'Po, nëse është në rrjetin social', isTrue: false },
            { answer: 'Vetëm nëse pranohet', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është fjalëkalim i fortë?',
        answers: [
            { answer: 'Fjalëkalim me të paktën 8 karaktere, shkronja, numra dhe simbole', isTrue: true },
            { answer: 'Fjalëkalim i lehtë për të kujtuar', isTrue: false },
            { answer: 'Fjalëkalim më shumë se 100 karaktere', isTrue: false },
        ],
    },
    {
        question: 'A duhet të përgjigjesh email-it nga adresa të panjohura?',
        answers: [
            { answer: 'Jo, sepse mund të jetë përpjekje phishing', isTrue: true },
            { answer: 'Po, për të qenë miqësor', isTrue: false },
            { answer: 'Vetëm nëse kërkon ndihmë', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është shtypja digjitale?',
        answers: [
            { answer: 'Shtypja që lë në internet', isTrue: true },
            { answer: 'Daktiloskopia e kompjuterit', isTrue: false },
            { answer: 'Shenjë për derë të fshehtë', isTrue: false },
        ],
    },
    {
        question: 'A është mirë të ndash të dhënat e bankingut tënd?',
        answers: [
            { answer: 'Kurrë, vetëm me institucione të besuara', isTrue: true },
            { answer: 'Po, nëse është për qëllim të mirë', isTrue: false },
            { answer: 'Vetëm me miqtë', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është VPN?',
        answers: [
            { answer: 'Rrjet që enkriptohet lidhja juaj internetore', isTrue: true },
            { answer: 'Lloj shfletimi', isTrue: false },
            { answer: 'Software për lojëra', isTrue: false },
        ],
    },
    {
        question: 'A mund t\'i besosh të gjitha reklamave në internet?',
        answers: [
            { answer: 'Jo, disa janë të rremë ose mashtrime', isTrue: true },
            { answer: 'Po, të gjitha reklamat janë të vërteta', isTrue: false },
            { answer: 'Vetëm ato me ngjyrë të ndritshme', isTrue: false },
        ],
    },
    {
        question: 'Çfarë janë robotët e kërkimit?',
        answers: [
            { answer: 'Programe që mblidhin informacione nga faqet e internetit', isTrue: true },
            { answer: 'Robot fizik', isTrue: false },
            { answer: 'Emër tjetër për hacker', isTrue: false },
        ],
    },
    {
        question: 'A duhet t\'i rua informacionet tuaja personale në internet?',
        answers: [
            { answer: 'Po, duhet të jesh i kujdesshëm me to', isTrue: true },
            { answer: 'Jo, mund të jenë gjithmonë publike', isTrue: false },
            { answer: 'Vetëm në disa faqe interneti', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është cookie?',
        answers: [
            { answer: 'Skedar i vogël që ruan informacionin tënd për faqen', isTrue: true },
            { answer: 'Ëmbëlsirë e ëmbël', isTrue: false },
            { answer: 'Lloj virusu', isTrue: false },
        ],
    },
    {
        question: 'A është i sigurt të ndash fotografitë e tua personale?',
        answers: [
            { answer: 'Jo, sepse mund të përdoren në mënyrë të parregullt', isTrue: true },
            { answer: 'Po, nëse janë në profilin tënd', isTrue: false },
            { answer: 'Vetëm nëse nuk ka fytyrë në to', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është sigurimi i dëmeve?',
        answers: [
            { answer: 'Kopje e të dhënave tuaja në rast humbje', isTrue: true },
            { answer: 'Faqja e pasme e kompjuterit', isTrue: false },
            { answer: 'Program për dëgjim muzike', isTrue: false },
        ],
    },
    {
        question: 'A duhet të përdorësh të njëjtin fjalëkalim për shumë llogari?',
        answers: [
            { answer: 'Jo, duhet të përdorësh fjalëkalime të ndryshme', isTrue: true },
            { answer: 'Po, për ta kujtuar lehtësisht', isTrue: false },
            { answer: 'Vetëm për llogaritë e rëndësishme', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është hacker?',
        answers: [
            { answer: 'Person që hyn në mënyrë të paligjshme në sistemet e kompjuterit', isTrue: true },
            { answer: 'Person që riparon kompjuterë', isTrue: false },
            { answer: 'Person që programon', isTrue: false },
        ],
    },
    {
        question: 'A duhet të klikosh "Aktivizo" kur faqja kërkon leje?',
        answers: [
            { answer: 'Vetëm nëse beson në faqen', isTrue: true },
            { answer: 'Gjithmonë', isTrue: false },
            { answer: 'Kurrë', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është enkriptimi?',
        answers: [
            { answer: 'Procesi i enkriptimit të informacionit', isTrue: true },
            { answer: 'Derë në bazën e të dhënave', isTrue: false },
            { answer: 'Software për këndimin', isTrue: false },
        ],
    },
    {
        question: 'A është mirë të ndash numrin tënd lokal të telefonit?',
        answers: [
            { answer: 'Jo, sepse mund të përdoret për shqetësim', isTrue: true },
            { answer: 'Po, nëse pyet', isTrue: false },
            { answer: 'Vetëm me miqtë', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është llogaridhënia?',
        answers: [
            { answer: 'Aftësia për të raportuar sjellje të papërshtatshme', isTrue: true },
            { answer: 'Software për lojëra', isTrue: false },
            { answer: 'Lloj shfletuesi', isTrue: false },
        ],
    },
    {
        question: 'A duhet t\'i kujdesesh sa i gjatë është fjalëkalimi i tënd?',
        answers: [
            { answer: 'Po, fjalëkalimi më i gjatë është më i sigurt', isTrue: true },
            { answer: 'Jo, vetëm disa shkronja mjaftojnë', isTrue: false },
            { answer: 'Varet nga dita', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është inxhinieria shoqërore?',
        answers: [
            { answer: 'Përpjekje për të manipuluar personin për të zbuluar informacionin', isTrue: true },
            { answer: 'Klasa në shkollë', isTrue: false },
            { answer: 'Software për rrjetet shoqërore', isTrue: false },
        ],
    },
    {
        question: 'A duhet të përditësosh shfletuesin rregullisht?',
        answers: [
            { answer: 'Po, për të shmangur vrimëzat e sigurisë', isTrue: true },
            { answer: 'Jo, nuk është e nevojshme', isTrue: false },
            { answer: 'Vetëm një herë në vit', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është adresa IP?',
        answers: [
            { answer: 'Numër që identifikon kompjuterin tënd në internet', isTrue: true },
            { answer: 'Kod sekret', isTrue: false },
            { answer: 'Dera e faqes', isTrue: false },
        ],
    },
    {
        question: 'A mund t\'i besosh të gjithë shkarkimeve?',
        answers: [
            { answer: 'Jo, disa mund të përmbajnë malware', isTrue: true },
            { answer: 'Po, nëse janë nga rrjet i njohur', isTrue: false },
            { answer: 'Vetëm nga sitet falas', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është siguria e fjalëkalimit?',
        answers: [
            { answer: 'Praktike për të mbrojtur fjalëkalimet tuaja', isTrue: true },
            { answer: 'Koleksion i fjalëkalimeve', isTrue: false },
            { answer: 'Software për futjen e fjalëkalimeve', isTrue: false },
        ],
    },
    {
        question: 'A duhet të klikosh në reklamë me një yll të famshëm?',
        answers: [
            { answer: 'Jo, nëse nuk është nga një fushatë e besueshme', isTrue: true },
            { answer: 'Po, sepse është popullor', isTrue: false },
            { answer: 'Vetëm të martën', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është siguria e qelizave?',
        answers: [
            { answer: 'Mbrojtje e telefonit tuaj të zgjuar', isTrue: true },
            { answer: 'Software për telefonat celularë', isTrue: false },
            { answer: 'Mënyrë të ecjeje', isTrue: false },
        ],
    },
    {
        question: 'A është mirë të përdorësh fuqinë e sinjalit Wi-Fi?',
        answers: [
            { answer: 'Po, sa më i fortë është më i rrezikshëm', isTrue: true },
            { answer: 'Jo, sinjali nuk ka rëndësi', isTrue: false },
            { answer: 'Vetëm gjatë natës', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është trojani?',
        answers: [
            { answer: 'Programe e dëmshme e fshehur në një skedar pozitiv', isTrue: true },
            { answer: 'Qyteti i lashtë', isTrue: false },
            { answer: 'Lloj llogarie', isTrue: false },
        ],
    },
    {
        question: 'A mund të jesh në rrezik nga një kontakt misteroz?',
        answers: [
            { answer: 'Po, duhet të jesh i kujdesshëm', isTrue: true },
            { answer: 'Jo, të gjithë janë të sigurt', isTrue: false },
            { answer: 'Vetëm nëse është emër i njohur', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është rreziku i bazës?',
        answers: [
            { answer: 'Rrezik nga përpjekje për hyrje të paligjshme', isTrue: true },
            { answer: 'Rrezik fizik', isTrue: false },
            { answer: 'Sëmundje nga kompjuteri', isTrue: false },
        ],
    },
    {
        question: 'A mund të ndash datën e lindjes sënde?',
        answers: [
            { answer: 'Jo, sepse mund të përdoret për identifikim', isTrue: true },
            { answer: 'Po, nëse dihet', isTrue: false },
            { answer: 'Vetëm në rrjetin social', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është autentifikimi i fytyrës?',
        answers: [
            { answer: 'Përdorimi i fytyrës ose gishtit tënd për hyrje', isTrue: true },
            { answer: 'Derë me maskë', isTrue: false },
            { answer: 'Software për sipërfaqe', isTrue: false },
        ],
    },
    {
        question: 'A duhet të ndash detaje të dnevnikut tënd?',
        answers: [
            { answer: 'Jo, sepse mund të jenë private', isTrue: true },
            { answer: 'Po, nëse janë interesante', isTrue: false },
            { answer: 'Vetëm me prindërit', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është sulm brutal?',
        answers: [
            { answer: 'Përpjekje për të provuar shumë fjalëkalime për hyrje', isTrue: true },
            { answer: 'Sulm fizik', isTrue: false },
            { answer: 'Lloj loje', isTrue: false },
        ],
    },
    {
        question: 'A është e rëndësishme të marresh software të licensuar?',
        answers: [
            { answer: 'Po, software-i i licensuar është i sigurt', isTrue: true },
            { answer: 'Jo, software-i pa licencë është më i sigurt', isTrue: false },
            { answer: 'Ka ndryshim minimal', isTrue: false },
        ],
    },
];