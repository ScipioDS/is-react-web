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
    {
        question: 'Një i huaj të dërgon kërkesë për miqësi në Instagram dhe të pyet se në cilën shkollë shkon. Çfarë duhet të bësh?',
        answers: [
            { answer: 'U thuaj emrin e shkollës sepse duken të mirë', isTrue: false },
            { answer: 'Injoro kërkesën dhe trego një të rritur të besuar', isTrue: true },
            { answer: 'Prano kërkesën, por mos iu përgjigj pyetjes së tyre', isTrue: false },
            { answer: 'Jepi një emër të rremë të shkollës', isTrue: false },
        ],
    },
    {
        question: 'Cila nga këto është e sigurt për t\'u ndarë në profilin tënd në TikTok?',
        answers: [
            { answer: 'Adresa juaj e shtëpisë', isTrue: false },
            { answer: 'Numri yt i telefonit', isTrue: false },
            { answer: 'Ngjyra jote e preferuar', isTrue: true },
            { answer: 'Orari juaj ditor', isTrue: false },
        ],
    },
    {
        question: 'Miku yt dëshiron të postojë një foto tënde në Instagram, por ty nuk të pëlqen si dukesh. Çfarë duhet të bësh?',
        answers: [
            { answer: 'Lejoje që ta postojnë gjithsesi për të mos i lënduar ndjenjat e tyre', isTrue: false },
            { answer: 'Kërkoji që të mos e postojë', isTrue: true },
            { answer: 'Hiq mikun menjëherë', isTrue: false },
            { answer: 'Postoni një foto të turpshme të tyre për t\'u hakmarrë', isTrue: false },
        ],
    },
    {
        question: 'Cili është vendimi më i sigurt i privatësisë për llogarinë tuaj në Instagram?',
        answers: [
            { answer: 'Publike - që të gjithë të mund të shohin postimet tuaja', isTrue: false },
            { answer: 'Private - vetëm ndjekësit e miratuar shohin postimet tuaja', isTrue: true },
            { answer: 'Publike por me vendndodhjen të fikur', isTrue: false },
            { answer: 'Nuk ka rëndësi', isTrue: false },
        ],
    },
    {
        question: 'Dikush që nuk e njeh komenton në videon tënde duke kërkuar emrin tënd të përdoruesit në Snapchat. Cili është përgjigjja më e mirë?',
        answers: [
            { answer: 'Jepjani sepse ndoshta thjesht duan të jenë miq', isTrue: false },
            { answer: 'Fshij komentin dhe blloko përdoruesin', isTrue: true },
            { answer: 'Së pari pyetini pse e duan', isTrue: false },
            { answer: 'Krijo një llogari të rreme Snapchat për t\'ua dhënë', isTrue: false },
        ],
    },
    {
        question: 'Dikush të dërgon një mesazh të keq online duke të ofenduar. Çfarë është gjëja më e mirë për të bërë?',
        answers: [
            { answer: 'Dërgo një mesazh të keq në kthim', isTrue: false },
            { answer: 'Ruaj mesazhin, bllokoje dhe trego një të rritur', isTrue: true },
            { answer: 'Fshije dhe bëj sikur nuk ka ndodhur kurrë', isTrue: false },
            { answer: 'Bëj postim publik për ta turpëruar', isTrue: false },
        ],
    },
    {
        question: 'Sheh dikë që poston komente lënduese për shokun/shokën tënd të klasës online. Çfarë duhet të bësh?',
        answers: [
            { answer: 'Bashkohu që të mos bëhesh objektivi i radhës', isTrue: false },
            { answer: 'Injoroje - nuk është problemi yt', isTrue: false },
            { answer: 'Mbështet shokun tënd të klasës dhe raportoj bullizmin', isTrue: true },
            { answer: 'Pëlqe komentet, por mos shto të tuat', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është ngacmimi kibernetik?',
        answers: [
            { answer: 'Çdo mosmarrëveshje në internet', isTrue: false },
            { answer: 'Përdorimi i teknologjisë për të dëmtuar, turpëruar ose kërcënuar dikë vazhdimisht', isTrue: true },
            { answer: 'Heqja e dikujt nga lista e miqve në rrjetet sociale', isTrue: false },
            { answer: 'Të mos pëlqesh postimet e dikujt', isTrue: false },
        ],
    },
    {
        question: 'Pse është e rëndësishme të ruash prova të ngacmimit kibernetik para se të bllokosh dikë?',
        answers: [
            { answer: 'Nuk është e rëndësishme - thjesht bllokoji menjëherë', isTrue: false },
            { answer: 'Që të hakmerresh më vonë', isTrue: false },
            { answer: 'Për t\'i treguar të rriturve dhe për ta raportuar në platformë', isTrue: true },
            { answer: 'Për ta postuar dhe turpëruar ngacmuesin', isTrue: false },
        ],
    },
    {
        question: 'Një bisedë grupore në të cilën je pjesë fillon të tallë një nxënës tjetër. Cili është zgjedhja e duhur?',
        answers: [
            { answer: 'Qëndro i heshtur dhe mos merr pjesë', isTrue: false },
            { answer: 'Lër bisedën dhe trego një të rritur të besuar', isTrue: true },
            { answer: 'Merr pjesë pak që të mos të synojnë ty', isTrue: false },
            { answer: 'Bëj screenshot-e për t\'i ndarë me miq të tjerë', isTrue: false },
        ],
    },
    {
        question: 'Cila është fjalëkalimi më i fortë?',
        answers: [
            { answer: 'password123', isTrue: false },
            { answer: 'emri yt dhe dita e lindjes', isTrue: false },
            { answer: 'Tr0pic@lDr@gon!87', isTrue: true },
            { answer: '123456', isTrue: false },
        ],
    },
    {
        question: 'Miku yt më i mirë të kërkon fjalëkalimin tënd që të të ndihmojë të ngrihesh në nivel në një lojë. Çfarë duhet të bësh?',
        answers: [
            { answer: 'Mos e ndani kurrë fjalëkalimin tuaj me askënd, përfshirë miqtë', isTrue: true },
            { answer: 'Jepjani atyre sepse janë shoku yt më i mirë', isTrue: false },
            { answer: 'Ta ndash, por t\'u kërkosh të premtojnë që të mos e tregojnë', isTrue: false },
            { answer: 'Jepi një fjalëkalim të rremë', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është autentifikimi me dy faktorë?',
        answers: [
            { answer: 'Të kesh dy fjalëkalime të ndryshme', isTrue: false },
            { answer: 'Një hap shtesë sigurie si një kod i dërguar në telefonin tuaj', isTrue: true },
            { answer: 'Hyrja nga dy pajisje', isTrue: false },
            { answer: 'Të kesh dy adresa emaili', isTrue: false },
        ],
    },
    {
        question: 'Merrni një email që thotë se llogaria juaj do të fshihet nëse nuk klikoni një lidhje dhe nuk shkruani fjalëkalimin tuaj. Çfarë duhet të bëni?',
        answers: [
            { answer: 'Kliko menjëherë lidhjen për të ruajtur llogarinë tënde', isTrue: false },
            { answer: 'Ka të ngjarë të jetë një mashtrim phishing - mos kliko mbi të dhe trego një të rritur', isTrue: true },
            { answer: 'Përgjigju email-it duke pyetur nëse është i vërtetë', isTrue: false },
            { answer: 'Dërgoje te të gjithë miqtë e tu për t\'i paralajmëruar', isTrue: false },
        ],
    },
    {
        question: 'Sa shpesh duhet të ndryshoni fjalëkalimet tuaja?',
        answers: [
            { answer: 'Kurrë - është shumë e vështirë të mbash mend fjalëkalime të reja', isTrue: false },
            { answer: 'Çdo ditë', isTrue: false },
            { answer: 'Çdo disa muaj, ose menjëherë nëse mendoni se është komprometuar', isTrue: true },
            { answer: 'Vetëm kur i harroni', isTrue: false },
        ],
    },
    {
        question: 'Dikush që sapo e ke takuar në Roblox të ofron Robux falas nëse i jep fjalëkalimin tënd. Çfarë duhet të bësh?',
        answers: [
            { answer: 'Jepi fjalëkalimin tënd - Robux falas tingëllon shkëlqyeshëm!', isTrue: false },
            { answer: 'Mos i jepni fjalëkalimin tuaj askujt - është një mashtrim', isTrue: true },
            { answer: 'Jepi atyre vetëm emrin tënd të përdoruesit', isTrue: false },
            { answer: 'Pyet miqtë e tu nëse mendojnë se duhet ta bësh', isTrue: false },
        ],
    },
    {
        question: 'Një lojtar në lojën tuaj ju kërkon të kaloni në një aplikacion tjetër bisedash për të biseduar privatisht. Çfarë duhet të bëni?',
        answers: [
            { answer: 'Shko në aplikacionin tjetër - ata ndoshta thjesht duan të jenë miq', isTrue: false },
            { answer: 'Shko vetëm nëse duken të mirë', isTrue: false },
            { answer: 'Refuzo dhe trego një të rritur të besuar', isTrue: true },
            { answer: 'Shkarko aplikacionin, por mos jep të dhëna personale', isTrue: false },
        ],
    },
    {
        question: 'Cilat informacione janë të sigurta për t\'u ndarë me lojtarë të tjerë në lojërat online?',
        answers: [
            { answer: 'Emri yt i parë dhe i fundit', isTrue: false },
            { answer: 'Emri i shkollës suaj', isTrue: false },
            { answer: 'Vetëm emri yt i përdoruesit në lojë - pa asnjë informacion personal të vërtetë', isTrue: true },
            { answer: 'Adresën tënde të shtëpisë', isTrue: false },
        ],
    },
    {
        question: 'Dëshiron të blesh sende brenda lojës, por nuk ke leje. Çfarë duhet të bësh?',
        answers: [
            { answer: 'Përdor kartën e kreditit të prindit pa pyetur', isTrue: false },
            { answer: 'Jepi dikujt emrin tënd të përdoruesit në lojë që ofron ta blejë për ty', isTrue: false },
            { answer: 'Thjesht fitoni artikuj falas në vend', isTrue: false },
            { answer: 'Pyet më parë prindërit për leje', isTrue: true },
        ],
    },
    {
        question: 'Një lojtar tjetër po përdor fjalë të ashpra dhe po të bën të ndihesh i pakëndshëm në bisedën e lojës. Cila është veprimi më i mirë?',
        answers: [
            { answer: 'Mbyllni mikrofonin, raportoni dhe bllokoni ata, pastaj tregoni një të rritur', isTrue: true },
            { answer: 'Kundërpërgjigju me fjalë të ashpra', isTrue: false },
            { answer: 'Lër lojën përgjithmonë', isTrue: false },
            { answer: 'Trego të gjithë miqtë e tu që t\'i sulmojnë në grup', isTrue: false },
        ],
    },
    {
        question: 'Çfarë është një gjurmë digjitale?',
        answers: [
            { answer: 'Gjurma e informacionit që lini pas kur përdorni internetin', isTrue: true },
            { answer: 'Një lloj virusi kompjuterik', isTrue: false },
            { answer: 'Një tastierë e veçantë për shkruarje', isTrue: false },
            { answer: 'Një emoji me formë gjurmë këmbë', isTrue: false },
        ],
    },
    {
        question: 'Ti poston një video qesharake, por turpëruese të vetes. Çfarë mund të ndodhë në të ardhmen?',
        answers: [
            { answer: 'Asgjë - do të zhduket pas një jave', isTrue: false },
            { answer: 'Shkollat ose punëdhënësit e ardhshëm mund ta shohin dhe të të gjykojnë', isTrue: true },
            { answer: 'Vetëm miqtë tuaj aktualë do ta shohin ndonjëherë', isTrue: false },
            { answer: 'Policia e internetit do ta fshijë automatikisht', isTrue: false },
        ],
    },
    {
        question: 'A mund të fshish plotësisht diçka sapo të publikohet në internet?',
        answers: [
            { answer: 'Po, thjesht shtypni butonin e fshirjes', isTrue: false },
            { answer: 'Po, nëse e bën brenda 24 orëve', isTrue: false },
            { answer: 'Vetëm nëse e kërkon bukur', isTrue: false },
            { answer: 'Jo gjithmonë - të tjerët mund ta kenë ruajtur, ndarë ose bërë screenshot', isTrue: true },
        ],
    },
    {
        question: 'Para se të postoni diçka në internet, çfarë duhet të pyesni veten?',
        answers: [
            { answer: 'A do të marrë shumë pëlqime?', isTrue: false },
            { answer: 'A do të isha në rregull që prindërit, mësuesit ose shefi im i ardhshëm ta shihnin këtë?', isTrue: true },
            { answer: 'A është qesharake?', isTrue: false },
            { answer: 'A do të mendojnë miqtë e mi se jam cool?', isTrue: false },
        ],
    },
    {
        question: 'Cila nga këto krijon një gjurmë digjitale POZITIVE?',
        answers: [
            { answer: 'Postimi i komenteve të liga për të tjerët', isTrue: false },
            { answer: 'Gënjeshtrat për arritjet tuaja', isTrue: false },
            { answer: 'Ndajmë arritjet tuaja dhe ndihmoni të tjerët online', isTrue: true },
            { answer: 'Postimi i çdo gjëje që bën gjatë gjithë ditës', isTrue: false },
        ],
    },
    {
        question: 'Shihni një titull tronditës në rrjetet sociale. Çfarë duhet të bëni para se ta ndani?',
        answers: [
            { answer: 'Kontrollo nëse vjen nga një burim i besueshëm dhe kërko burime të tjera që raportojnë të njëjtën gjë', isTrue: true },
            { answer: 'Ndaje menjëherë që miqtë e tu ta dinë', isTrue: false },
            { answer: 'Ndaje vetëm nëse ka shumë pëlqime', isTrue: false },
            { answer: 'Pyet miqtë tuaj nëse mendojnë se është e vërtetë', isTrue: false },
        ],
    },
    {
        question: 'Cili nga këta është një shenjë që një faqe interneti mund të mos jetë e besueshme?',
        answers: [
            { answer: 'Ka një dizajn profesional', isTrue: false },
            { answer: 'Është plot me reklama, ka gabime drejtshkrimore dhe të bën të ndihesh i frikësuar ose i zemëruar', isTrue: true },
            { answer: 'Ka një adresë .com', isTrue: false },
            { answer: 'Përfshin emrin e autorit', isTrue: false },
        ],
    },
    {
        question: 'Një video pretendon se një personazh i famshëm ka vdekur, por ti nuk e ke dëgjuar askund tjetër. Çfarë duhet të mendosh?',
        answers: [
            { answer: 'Duhet të jetë e vërtetë - është në një video', isTrue: false },
            { answer: 'Është patjetër e rreme', isTrue: false },
            { answer: 'Ndaje menjëherë', isTrue: false },
            { answer: 'Ji skeptik dhe kontrollo burime të besueshme lajmesh', isTrue: true },
        ],
    },
    {
        question: 'Çfarë do të thotë kur diçka duket \'tepër e mirë për t\'u besuar\' në internet?',
        answers: [
            { answer: 'Thjesht je me fat', isTrue: false },
            { answer: 'Gjëra të mira ndodhin online gjithë kohës', isTrue: false },
            { answer: 'Dikush po sillet mirë', isTrue: false },
            { answer: 'Ka të ngjarë të jetë një mashtrim ose lajm i rremë', isTrue: true },
        ],
    },
    {
        question: 'Si mund ta dalloni nëse një foto është redaktuar ose e falsifikuar?',
        answers: [
            { answer: 'Nuk mund ta dish - të gjitha fotot janë të vërteta', isTrue: false },
            { answer: 'Shiko për ndriçim të çuditshëm, pjesë të paqarta, ose bëj një kërkim të kundërt të imazhit', isTrue: true },
            { answer: 'Të gjitha fotot online janë të rreme', isTrue: false },
            { answer: 'Merruni me shqetësim vetëm nëse dikush ju thotë se është i rremë', isTrue: false },
        ],
    },
];