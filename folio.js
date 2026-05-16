/* ═══════════════════════════════════════════════════════
   FOLIO · Digitales Portfolio · JavaScript
   ═══════════════════════════════════════════════════════ */

// ═══ STATE ═══
var D={fn:'',ln:'',title:'',tagline:'',bio:'',highlight:'',availability:'',email:'',phone:'',github:'',linkedin:'',website:'',location:'',xing:'',extra:'',interests:'',photo:null,skills:{tech:[],soft:[],lang:[],cert:[]},projects:[],experience:[],education:[],courses:[],awards:[],testimonials:[]};
var pStyle='noir',accent='#16a085',curStep=0,fontChoice='elegant',animChoice='reveal',darkMode=true;
var lang='de',profession='it',prevMode='portfolio';
var variants=[],genCV='',genCL='';
var ic=0;

var PROF={
  it:{tech:['JavaScript','TypeScript','React','Node.js','Python','Docker','Git','Linux','SQL','REST API','AWS'],soft:['Problemlösung','Agile/Scrum','Code-Review','Mentoring','Teamarbeit']},
  design:{tech:['Figma','Adobe XD','Illustrator','Photoshop','CSS','HTML','After Effects','InVision'],soft:['UX-Research','Wireframing','Prototyping','Präsentation','User Testing']},
  marketing:{tech:['Google Analytics','SEO/SEM','HubSpot','Meta Ads','Google Ads','Mailchimp','Canva','Power BI'],soft:['Content Strategy','Kampagnenplanung','Datenanalyse','Storytelling','Projektmanagement']},
  finance:{tech:['Excel','SAP','Bloomberg','Power BI','Python','SQL','Tableau'],soft:['Finanzmodellierung','Risikoanalyse','Reporting','Präsentation','Due Diligence']},
  other:{tech:[],soft:['Kommunikation','Teamarbeit','Problemlösung','Projektmanagement','Präsentation']}
};
var PAL={
  noir:['#16a085','#00E5A0','#60A5FA','#A855F7','#8F9790','#f59e0b'],
  solaire:['#16a085','#0d9488','#6d28d9','#c2410c','#1d4ed8','#15803d'],
  cyber:['#00E5A0','#60A5FA','#16a085','#A855F7','#f59e0b','#ef4444'],
  mono:['#ffffff','#aaaaaa','#888','#cccccc','#dddddd','#555'],
  aurora:['#A855F7','#60A5FA','#16a085','#00E5A0','#8F9790','#f59e0b'],
  slate:['#8F9790','#16a085','#60A5FA','#A855F7','#00E5A0','#f59e0b']
};

// UI TEXT (DE/EN/AR)
var UI={
  de:{
    langBtn:'DE → EN',stepLbls:['Import','Identität','Skills','Projekte','Karriere','Kontakt','Extras','Design','Dokumente'],
    varTitle:'Varianten',varSub:'Mehrere Bewerbungsprofile',varSave:'+ Aktuelle Version speichern',varClose:'Schließen',
    landH1a:'Dein digitales Ich.',landH1b:'Neu gedacht.',landSub:'Portfolio. Lebenslauf. Anschreiben. Alles in einem — mit KI, Dreisprachigkeit DE/EN/AR, PDF-Export und vollständiger Personalisierung.',
    ctaBuild:'Portfolio erstellen →',ctaDemo:'Demo ansehen',
    expH2:'Deine Bewerbungsmappe ist bereit.',expSub:'Portfolio · Lebenslauf · Anschreiben — alle Dokumente auf Knopfdruck.',
    back:'← Zurück',next:'Weiter →',
    toastLang:'Ausgabe: Deutsch'
  },
  en:{
    langBtn:'EN → AR',stepLbls:['Import','Identity','Skills','Projects','Career','Contact','Extras','Design','Documents'],
    varTitle:'Variants',varSub:'Multiple application profiles',varSave:'+ Save current version',varClose:'Close',
    landH1a:'Your digital self.',landH1b:'Reimagined.',landSub:'Portfolio. CV. Cover Letter. All in one — with AI, trilingual output DE/EN/AR, PDF export and full personalization.',
    ctaBuild:'Create portfolio →',ctaDemo:'View demo',
    expH2:'Your application bundle is ready.',expSub:'Portfolio · CV · Cover Letter — all documents at the click of a button.',
    back:'← Back',next:'Next →',
    toastLang:'Output: English'
  },
  ar:{
    langBtn:'AR → DE',stepLbls:['الاستيراد','الهوية','المهارات','المشاريع','المسيرة','التواصل','الإضافات','التصميم','الوثائق'],
    varTitle:'النسخ',varSub:'ملفات تقديم متعددة',varSave:'+ حفظ النسخة الحالية',varClose:'إغلاق',
    landH1a:'هويتك الرقمية.',landH1b:'بشكل جديد.',landSub:'ملف التعريف. السيرة الذاتية. خطاب التقديم. كل شيء في واحد — بالذكاء الاصطناعي وثلاث لغات DE/EN/AR.',
    ctaBuild:'إنشاء الملف ←',ctaDemo:'عرض النموذج',
    expH2:'حزمة طلبك جاهزة.',expSub:'الملف الشخصي · السيرة الذاتية · خطاب التقديم — جميع الوثائق بنقرة واحدة.',
    back:'→ عودة',next:'→ التالي',
    toastLang:'الإخراج: العربية'
  }
};

// TOAST
function toast(m,d){var t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('show');setTimeout(function(){t.classList.remove('show');},d||2200);}

// MODE
function toggleMode(){darkMode=!darkMode;document.documentElement.setAttribute('data-mode',darkMode?'dark':'light');lr();}

// LANGUAGE CYCLE

// ═══ COMPLETE MULTILINGUAL SYSTEM ═══════════════════════════════════
var LANGS={"de":{"langBtn":"DE","title_tag":"FOLIO — Dein digitales Portfolio","logo":"FOLIO","logo_sub":"Portfolio","land_tag":"Portfolio Builder · DE / EN / عربي","land_h1a":"Dein digitales Ich.","land_h1b":"Neu gedacht.","land_sub":"Portfolio. Lebenslauf. Anschreiben. Alles in einem — mit KI-Extraktion, dreisprachiger Ausgabe und vollständiger Personalisierung.","cta_build":"Portfolio erstellen →","cta_demo":"Demo ansehen","feat1_t":"KI-Extraktion","feat1_d":"PDF/HTML hochladen, Daten automatisch auslesen","feat2_t":"Portfolio HTML","feat2_d":"Animiert, offline-fähig, hosting-ready","feat3_t":"3 Sprachen","feat3_d":"DE / EN / AR mit RTL-Unterstützung","feat4_t":"KI-Lebenslauf","feat4_d":"Professionell, ATS-optimiert","feat5_t":"Anschreiben","feat5_d":"Stellenspezifisch auf Knopfdruck","feat6_t":"JSON Export","feat6_d":"Alle Daten portierbar & importierbar","step_labels":["Import","Identität","Skills","Projekte","Karriere","Kontakt","Extras","Design","Dokumente"],"var_title":"Varianten","var_sub":"Mehrere Bewerbungsprofile","var_save":"+ Aktuelle Version speichern","var_close":"Schließen","s0_ttl":"Dokumente & Import","s0_sub":"Lade deinen Lebenslauf hoch — KI extrahiert alle Infos automatisch.","upz_cv":"Lebenslauf hochladen","upz_cl":"Anschreiben (optional)","json_import":"⬆ Import","json_export":"⬇ Export","demo_btn":"Demo laden","s1_ttl":"Deine Identität","s1_sub":"Name, Titel und deine Geschichte — der erste Eindruck zählt.","photo_lbl":"Profilbild","photo_sub":"Optional — Kein Foto? Wähle einen Avatar-Stil.","photo_choose":"📷 Foto wählen","photo_clear":"✕ Entfernen","avatar_btn":"◎ Avatar","photo_mode_foto":"Foto","photo_mode_pixel":"⬛ Pixel","photo_mode_qr":"QR","lbl_fn":"Vorname *","lbl_ln":"Nachname *","lbl_title":"Berufsbezeichnung *","lbl_tag":"Tagline / Motto","lbl_bio":"Über mich","lbl_hl":"Highlight-Zitat","lbl_avail":"Verfügbarkeit / Status","ai_polish":"✨ KI verbessern","translate_all":"🌐 Übersetzen","s2_ttl":"Skills & Werkzeuge","s2_sub":"Enter oder Komma zum Hinzufügen.","lbl_tech":"Tech Stack / Fachkenntnisse","lbl_soft":"Soft Skills & Methoden","lbl_lang":"Sprachen","lbl_cert":"Zertifikate","ai_suggest":"✨ Vorschläge","s3_ttl":"Deine Projekte","s3_sub":"Showcases mit messbaren Ergebnissen beeindrucken Arbeitgeber am meisten.","s3_add":"+ Projekt hinzufügen","s4_ttl":"Karriere & Bildung","s4_sub":"Zeige Wachstum, Verantwortung und messbare Erfolge.","s4_exp":"Berufserfahrung","s4_edu":"Ausbildung & Studium","s4_course":"Weiterbildungen","s4_add_exp":"+ Erfahrung hinzufügen","s4_add_edu":"+ Abschluss hinzufügen","s4_add_course":"+ Kurs hinzufügen","s5_ttl":"Kontakt & Links","s5_sub":"Vollständige Angaben erhöhen die Rücklaufquote erheblich.","s6_ttl":"Extras & Highlights","s6_sub":"Auszeichnungen, Referenzen und Interessen heben dein Profil ab.","s6_award":"Auszeichnungen","s6_interest":"Interessen & Hobbys","s6_test":"Referenzen","s6_add_award":"+ Auszeichnung hinzufügen","s6_add_test":"+ Referenz hinzufügen","s7_ttl":"Stil & Design","s7_sub":"Gestalte einen unvergesslichen Auftritt.","tab_theme":"Thema","tab_color":"Farben","tab_font":"Schrift","tab_anim":"Animation","s8_ttl":"Bewerbungsunterlagen","s8_sub":"KI generiert Lebenslauf & Anschreiben.","lbl_jobdesc":"Stellenanzeige (optional)","tab_cv":"📋 Lebenslauf","tab_cl":"✉️ Anschreiben","cv_card1":"KI-Lebenslauf","cv_card2":"Auf Stelle optimiert","exp_h2":"Deine Bewerbungsmappe ist bereit.","exp_sub":"Portfolio · Lebenslauf · Anschreiben — auf Knopfdruck.","exp_c1":"Portfolio herunterladen","exp_c2":"index.html exportieren","exp_c3":"Lebenslauf speichern","exp_c4":"Anschreiben speichern","exp_c5":"JSON exportieren","exp_c6":"Alles als Bundle","back":"← Zurück","next":"Weiter →","toast_lang":"Sprache: Deutsch","mode_toggle_dark":"🌙","mode_toggle_light":"☀️","prev_lbl":"Live-Vorschau","prev_full":"⊞ Vollbild","ats_title":"ATS Bewerber-Analyse","ats_run":"🔬 Analyse starten","ats_close":"Schließen","trans_title":"🌐 Auto-Übersetzung","trans_btn":"⬆ Übersetzen","trans_status":"Klicke Übersetzen, um alle Texte in DE, EN und AR zu übersetzen.","upload_drag":"Drag & Drop oder klicken","prog_of":"von"},"en":{"langBtn":"EN","title_tag":"FOLIO — Your Digital Portfolio","logo":"FOLIO","logo_sub":"Portfolio","land_tag":"Portfolio Builder · DE / EN / عربي","land_h1a":"Your digital self.","land_h1b":"Reimagined.","land_sub":"Portfolio. CV. Cover Letter. All in one — with AI extraction, trilingual output, and full personalization.","cta_build":"Create portfolio →","cta_demo":"View demo","feat1_t":"AI Extraction","feat1_d":"Upload PDF/HTML, auto-extract all info","feat2_t":"Portfolio HTML","feat2_d":"Animated, offline-capable, hosting-ready","feat3_t":"3 Languages","feat3_d":"DE / EN / AR with RTL support","feat4_t":"AI CV","feat4_d":"Professional, ATS-optimized","feat5_t":"Cover Letter","feat5_d":"Job-specific at the click of a button","feat6_t":"JSON Export","feat6_d":"All data portable & importable","step_labels":["Import","Identity","Skills","Projects","Career","Contact","Extras","Design","Documents"],"var_title":"Variants","var_sub":"Multiple application profiles","var_save":"+ Save current version","var_close":"Close","s0_ttl":"Documents & Import","s0_sub":"Upload your CV — AI extracts all info automatically.","upz_cv":"Upload CV / Resume","upz_cl":"Cover Letter (optional)","json_import":"⬆ Import","json_export":"⬇ Export","demo_btn":"Load demo","s1_ttl":"Your Identity","s1_sub":"Name, title, and your story — the first impression counts.","photo_lbl":"Profile Photo","photo_sub":"Optional — No photo? Choose an avatar style.","photo_choose":"📷 Choose photo","photo_clear":"✕ Remove","avatar_btn":"◎ Avatar","photo_mode_foto":"Photo","photo_mode_pixel":"⬛ Pixel","photo_mode_qr":"QR","lbl_fn":"First name *","lbl_ln":"Last name *","lbl_title":"Job title *","lbl_tag":"Tagline / Motto","lbl_bio":"About me","lbl_hl":"Highlight quote","lbl_avail":"Availability / Status","ai_polish":"✨ AI improve","translate_all":"🌐 Translate","s2_ttl":"Skills & Tools","s2_sub":"Press Enter or comma to add.","lbl_tech":"Tech Stack / Expertise","lbl_soft":"Soft Skills & Methods","lbl_lang":"Languages","lbl_cert":"Certificates","ai_suggest":"✨ Suggestions","s3_ttl":"Your Projects","s3_sub":"Showcases with measurable results impress employers most.","s3_add":"+ Add project","s4_ttl":"Career & Education","s4_sub":"Show growth, responsibility, and measurable success.","s4_exp":"Work experience","s4_edu":"Education & Degrees","s4_course":"Courses & Training","s4_add_exp":"+ Add experience","s4_add_edu":"+ Add degree","s4_add_course":"+ Add course","s5_ttl":"Contact & Links","s5_sub":"Complete details significantly increase response rates.","s6_ttl":"Extras & Highlights","s6_sub":"Awards, references, and interests set your profile apart.","s6_award":"Awards","s6_interest":"Interests & Hobbies","s6_test":"Testimonials","s6_add_award":"+ Add award","s6_add_test":"+ Add testimonial","s7_ttl":"Style & Design","s7_sub":"Create an unforgettable appearance.","tab_theme":"Theme","tab_color":"Colors","tab_font":"Font","tab_anim":"Animation","s8_ttl":"Application Documents","s8_sub":"AI generates CV & cover letter.","lbl_jobdesc":"Job posting (optional)","tab_cv":"📋 CV / Resume","tab_cl":"✉️ Cover Letter","cv_card1":"AI CV / Resume","cv_card2":"Job-optimized","exp_h2":"Your application bundle is ready.","exp_sub":"Portfolio · CV · Cover Letter — all documents at the click of a button.","exp_c1":"Download portfolio","exp_c2":"Export index.html","exp_c3":"Save CV","exp_c4":"Save cover letter","exp_c5":"Export JSON","exp_c6":"Everything as bundle","back":"← Back","next":"Next →","toast_lang":"Language: English","mode_toggle_dark":"🌙","mode_toggle_light":"☀️","prev_lbl":"Live preview","prev_full":"⊞ Full screen","ats_title":"ATS Candidate Analysis","ats_run":"🔬 Start analysis","ats_close":"Close","trans_title":"🌐 Auto-Translation","trans_btn":"⬆ Translate","trans_status":"Click Translate to auto-translate all text to DE, EN and AR.","upload_drag":"Drag & Drop or click","prog_of":"of"},"ar":{"langBtn":"AR","title_tag":"FOLIO — ملفك الرقمي","logo":"FOLIO","logo_sub":"ملف","land_tag":"منشئ الملف الشخصي · DE / EN / عربي","land_h1a":"هويتك الرقمية.","land_h1b":"بشكل جديد.","land_sub":"الملف الشخصي. السيرة الذاتية. خطاب التقديم. كل شيء في واحد — بالذكاء الاصطناعي وثلاث لغات.","cta_build":"إنشاء الملف ←","cta_demo":"عرض النموذج","feat1_t":"استخراج ذكي","feat1_d":"ارفع PDF أو HTML، واستخرج المعلومات تلقائياً","feat2_t":"ملف HTML","feat2_d":"متحرك، يعمل بدون إنترنت","feat3_t":"3 لغات","feat3_d":"DE / EN / AR مع دعم RTL","feat4_t":"سيرة ذاتية ذكية","feat4_d":"احترافية ومحسّنة لأنظمة ATS","feat5_t":"خطاب التقديم","feat5_d":"مخصص لكل وظيفة بنقرة واحدة","feat6_t":"تصدير JSON","feat6_d":"جميع البيانات قابلة للنقل والاستيراد","step_labels":["الاستيراد","الهوية","المهارات","المشاريع","المسيرة","التواصل","الإضافات","التصميم","الوثائق"],"var_title":"النسخ","var_sub":"ملفات تقديم متعددة","var_save":"+ حفظ النسخة الحالية","var_close":"إغلاق","s0_ttl":"المستندات والاستيراد","s0_sub":"ارفع سيرتك الذاتية — الذكاء الاصطناعي يستخرج جميع المعلومات تلقائياً.","upz_cv":"رفع السيرة الذاتية","upz_cl":"خطاب التقديم (اختياري)","json_import":"⬆ استيراد","json_export":"⬇ تصدير","demo_btn":"تحميل النموذج","s1_ttl":"هويتك","s1_sub":"الاسم والمسمى الوظيفي وقصتك — الانطباع الأول مهم.","photo_lbl":"صورة الملف الشخصي","photo_sub":"اختياري — بدون صورة؟ اختر نمط الصورة الرمزية.","photo_choose":"📷 اختيار صورة","photo_clear":"✕ إزالة","avatar_btn":"◎ صورة رمزية","photo_mode_foto":"صورة","photo_mode_pixel":"⬛ بكسل","photo_mode_qr":"QR","lbl_fn":"الاسم الأول *","lbl_ln":"اسم العائلة *","lbl_title":"المسمى الوظيفي *","lbl_tag":"شعارك / موتو","lbl_bio":"نبذة عني","lbl_hl":"اقتباس مميز","lbl_avail":"التوفر / الحالة","ai_polish":"✨ تحسين بالذكاء","translate_all":"🌐 ترجمة","s2_ttl":"المهارات والأدوات","s2_sub":"اضغط Enter أو فاصلة للإضافة.","lbl_tech":"التقنيات / الخبرات","lbl_soft":"المهارات الشخصية","lbl_lang":"اللغات","lbl_cert":"الشهادات","ai_suggest":"✨ اقتراحات","s3_ttl":"مشاريعك","s3_sub":"العروض التوضيحية ذات النتائج القابلة للقياس تُبهر أصحاب العمل.","s3_add":"+ إضافة مشروع","s4_ttl":"المسيرة المهنية والتعليم","s4_sub":"أظهر النمو والمسؤولية والنجاحات.","s4_exp":"الخبرة المهنية","s4_edu":"التعليم والشهادات","s4_course":"الدورات والتدريب","s4_add_exp":"+ إضافة خبرة","s4_add_edu":"+ إضافة شهادة","s4_add_course":"+ إضافة دورة","s5_ttl":"التواصل والروابط","s5_sub":"البيانات الكاملة تزيد معدل الردود بشكل ملحوظ.","s6_ttl":"الإضافات والمميزات","s6_sub":"الجوائز والتوصيات والاهتمامات تميّز ملفك.","s6_award":"الجوائز","s6_interest":"الاهتمامات والهوايات","s6_test":"التوصيات","s6_add_award":"+ إضافة جائزة","s6_add_test":"+ إضافة توصية","s7_ttl":"النمط والتصميم","s7_sub":"أنشئ مظهراً لا يُنسى.","tab_theme":"الثيم","tab_color":"الألوان","tab_font":"الخط","tab_anim":"الحركة","s8_ttl":"وثائق التقديم","s8_sub":"الذكاء الاصطناعي يُنشئ السيرة الذاتية وخطاب التقديم.","lbl_jobdesc":"إعلان الوظيفة (اختياري)","tab_cv":"📋 السيرة الذاتية","tab_cl":"✉️ خطاب التقديم","cv_card1":"سيرة ذاتية ذكية","cv_card2":"محسّنة للوظيفة","exp_h2":"حزمة طلبك جاهزة.","exp_sub":"الملف الشخصي · السيرة الذاتية · خطاب التقديم — جميع الوثائق بنقرة واحدة.","exp_c1":"تنزيل الملف الشخصي","exp_c2":"تصدير index.html","exp_c3":"حفظ السيرة الذاتية","exp_c4":"حفظ خطاب التقديم","exp_c5":"تصدير JSON","exp_c6":"كل شيء كحزمة","back":"→ عودة","next":"→ التالي","toast_lang":"اللغة: العربية","mode_toggle_dark":"🌙","mode_toggle_light":"☀️","prev_lbl":"معاينة مباشرة","prev_full":"⊞ شاشة كاملة","ats_title":"تحليل المرشح ATS","ats_run":"🔬 بدء التحليل","ats_close":"إغلاق","trans_title":"🌐 الترجمة التلقائية","trans_btn":"⬆ ترجمة","trans_status":"انقر ترجمة لترجمة جميع النصوص إلى DE وEN وAR تلقائياً.","upload_drag":"اسحب وأفلت أو انقر","prog_of":"من"}};

function T(key){return (LANGS[lang]||LANGS.de)[key]||'';}
function setText(id,text){var el=document.getElementById(id);if(el&&text!==undefined)el.textContent=text;}
function setHTML(id,html){var el=document.getElementById(id);if(el&&html!==undefined)el.innerHTML=html;}
function setPlaceholder(id,text){var el=document.getElementById(id);if(el&&text)el.placeholder=text;}
function setAttr(id,attr,val){var el=document.getElementById(id);if(el&&val!==undefined)el.setAttribute(attr,val);}

function applyUILang(){
  var L=LANGS[lang]||LANGS.de;
  var isAr=lang==='ar';
  // Document & root
  document.title=L.title_tag||'FOLIO';
  document.documentElement.setAttribute('lang',lang);
  document.documentElement.setAttribute('dir',isAr?'rtl':'ltr');
  // Font family
  var fontFam=isAr?"'Noto Sans Arabic','Outfit',sans-serif":"'Outfit',sans-serif";
  document.body.style.fontFamily=fontFam;
  // Logo
  var logoEl=document.querySelector('.logo');
  if(logoEl)logoEl.innerHTML='F<b>O</b>LIO';
  // Language button
  setText('lang-btn',L.langBtn);
  // Landing page
  setText('l-tag-txt',L.land_tag);
  setText('l-h1a',L.land_h1a);
  setText('l-h1b',L.land_h1b);
  setText('l-sub',L.land_sub);
  setText('l-cta-build',L.cta_build);
  setText('l-cta-demo',L.cta_demo);
  // Feature grid
  var fi=[['feat1','feat1_t','feat1_d'],['feat2','feat2_t','feat2_d'],['feat3','feat3_t','feat3_d'],
         ['feat4','feat4_t','feat4_d'],['feat5','feat5_t','feat5_d'],['feat6','feat6_t','feat6_d']];
  fi.forEach(function(f){setText('lf-'+f[0]+'-t',L[f[1]]);setText('lf-'+f[0]+'-d',L[f[2]]);});
  // Variant panel
  setText('vp-title',L.var_title);setText('vp-sub',L.var_sub);
  setText('vp-save-btn',L.var_save);setText('vp-close-btn',L.var_close);
  // ATS
  setText('ats-scan-title',L.ats_title);setText('ats-run-btn',L.ats_run);
  // Step dots
  var lbs=L.step_labels||[];
  var hs=document.getElementById('hdr-step');
  if(hs&&lbs[curStep])hs.textContent=lbs[curStep]+' '+(curStep+1)+'/9';
  // Step 0
  setText('s0-ttl',L.s0_ttl);setText('s0-sub',L.s0_sub);
  setText('upz-cv-lbl',L.upz_cv);setText('upz-cl-lbl',L.upz_cl);
  setText('json-import-btn',L.json_import);setText('json-export-btn',L.json_export);
  setText('demo-btn',L.demo_btn);setText('s0-next',L.next);
  // Step 1 — Identity
  setText('s1-ttl',L.s1_ttl);setText('s1-sub',L.s1_sub);
  setText('photo-lbl',L.photo_lbl);setText('photo-sub',L.photo_sub);
  setText('photo-choose',L.photo_choose);setText('photoClearBtn',L.photo_clear);
  setText('avatarGenBtn',L.avatar_btn);
  setText('pmode-photo',L.photo_mode_foto);setText('pmode-pixel',L.photo_mode_pixel);setText('pmode-qr',L.photo_mode_qr);
  setText('lbl-fn',L.lbl_fn);setText('lbl-ln',L.lbl_ln);setText('lbl-title',L.lbl_title);
  setText('lbl-tag',L.lbl_tag);setText('lbl-bio',L.lbl_bio);setText('lbl-hl',L.lbl_hl);
  setText('lbl-avail',L.lbl_avail);
  setText('ai-polish-btn',L.ai_polish);setText('translate-all-btn',L.translate_all);
  setText('trans-title-lbl',L.trans_title);setText('trans-status-lbl',L.trans_status);
  // Step 2 — Skills
  setText('s2-ttl',L.s2_ttl);setText('s2-sub',L.s2_sub);
  setText('lbl-tech',L.lbl_tech);setText('lbl-soft',L.lbl_soft);
  setText('lbl-lang',L.lbl_lang);setText('lbl-cert',L.lbl_cert);
  setText('ai-skills-btn',L.ai_suggest);
  // Step 3 — Projects
  setText('s3-ttl',L.s3_ttl);setText('s3-sub',L.s3_sub);setText('s3-add',L.s3_add);
  // Step 4 — Career
  setText('s4-ttl',L.s4_ttl);setText('s4-sub',L.s4_sub);
  setText('s4-exp-lbl',L.s4_exp);setText('s4-edu-lbl',L.s4_edu);setText('s4-course-lbl',L.s4_course);
  setText('s4-add-exp',L.s4_add_exp);setText('s4-add-edu',L.s4_add_edu);setText('s4-add-course',L.s4_add_course);
  // Step 5 — Contact
  setText('s5-ttl',L.s5_ttl);setText('s5-sub',L.s5_sub);
  setText('lbl-email',L.lbl_email||'E-Mail');setText('lbl-phone',L.lbl_phone||L.lbl_avail);
  setText('lbl-web',L.lbl_web||'Website');setText('lbl-loc',L.lbl_loc||'Ort');
  // Step 6 — Extras
  setText('s6-ttl',L.s6_ttl);setText('s6-sub',L.s6_sub);
  setText('s6-award-lbl',L.s6_award);setText('s6-interest-lbl',L.s6_interest);setText('s6-test-lbl',L.s6_test);
  setText('s6-add-award',L.s6_add_award);setText('s6-add-test',L.s6_add_test);
  // Step 7 — Style
  setText('s7-ttl',L.s7_ttl);setText('s7-sub',L.s7_sub);
  setText('tab-btn-theme',L.tab_theme);setText('tab-btn-color',L.tab_color);
  setText('tab-btn-font',L.tab_font);setText('tab-btn-anim',L.tab_anim);
  // Step 8 — Documents
  setText('s8-ttl',L.s8_ttl);setText('s8-sub',L.s8_sub);
  setText('lbl-jobdesc',L.lbl_jobdesc);
  setText('cv-card1-ttl',L.cv_card1);
  // Nav back/next buttons across all steps
  document.querySelectorAll('.stnav-back').forEach(function(b){b.textContent=L.back;});
  document.querySelectorAll('.stnav-next').forEach(function(b){b.textContent=L.next;});
  // Export screen
  setText('exp-h2',L.exp_h2);setText('exp-sub',L.exp_sub);
  setText('exp-c1',L.exp_c1);setText('exp-c2',L.exp_c2);setText('exp-c3',L.exp_c3);
  setText('exp-c4',L.exp_c4);setText('exp-c5',L.exp_c5);setText('exp-c6',L.exp_c6);
  // Preview
  setText('prev-lbl-txt',L.prev_lbl);
  // Header nav
  var hb=document.getElementById('hdr-back');if(hb)hb.textContent=L.back;
  // placeholders
  setPlaceholder('i-fn',isAr?'محمود':'Max');
  setPlaceholder('i-ln',isAr?'المصري':'Mustermann');
  setPlaceholder('i-title',isAr?'مطور برمجيات':'Senior Developer');
  setPlaceholder('i-bio',isAr?'نبذة عني...':'Leidenschaftlicher Entwickler...');
  setPlaceholder('json-area',isAr?'{"fn":"محمود",...}':'{"fn":"Max","ln":"Mustermann",...}');
}

// LANGUAGE CYCLE: DE → EN → AR → DE
function cycleLang(){
  var seq={de:'en',en:'ar',ar:'de'};
  lang=seq[lang]||'de';
  document.documentElement.setAttribute('lang',lang);
  document.documentElement.setAttribute('dir',lang==='ar'?'rtl':'ltr');
  document.documentElement.setAttribute('data-lang',lang);
  try{localStorage.setItem('folio-lang',lang);}catch(e){}
  applyUILang();
  lr();
  toast((LANGS[lang]||LANGS.de).toast_lang||lang.toUpperCase());
}

function setProfession(p,btn){
  profession=p;
  document.querySelectorAll('.pbadge').forEach(function(b){b.classList.remove('on');});
  if(btn)btn.classList.add('on');
  showTagSugs();
}
function showTagSugs(){
  var s=PROF[profession]||PROF.other;
  ['tech','soft'].forEach(function(cat){
    var el=document.getElementById(cat+'-sugs');if(!el)return;
    var ex=D.skills[cat]||[];
    var sugs=(s[cat]||[]).filter(function(sk){return !ex.includes(sk);}).slice(0,8);
    el.innerHTML=sugs.map(function(sk){return '<span class="tag-sug" onclick="addSug(\''+cat+'\',\''+sk+'\')">+'+sk+'</span>';}).join('');
  });
}
function addSug(cat,val){
  if(!D.skills[cat])D.skills[cat]=[];
  if(!D.skills[cat].includes(val)){D.skills[cat].push(val);rTags(cat+'-tags',cat);lr();}
  showTagSugs();
}

// NAVIGATION
function go(n){
  document.querySelectorAll('.scr').forEach(function(s){s.classList.remove('on');});
  var el=document.getElementById('s'+n);if(el)el.classList.add('on');
  var hb=document.getElementById('hdr-back');if(hb)hb.style.display=n>0?'block':'none';
  if(n===2)runExportTerm();
}
function startBuild(){go(1);goStep(0);lr();}
function goExport(){syncD();go(2);}

function goStep(n){
  document.querySelectorAll('.step').forEach(function(s){s.classList.remove('on');});
  var el=document.getElementById('step'+n);if(el)el.classList.add('on');
  curStep=n;
  for(var i=0;i<9;i++){var d=document.getElementById('dot'+i);if(!d)continue;d.classList.remove('done','cur');if(i<n)d.classList.add('done');else if(i===n)d.classList.add('cur');}
  var pb=document.getElementById('pgbar');if(pb)pb.style.width=((n/8)*100).toFixed(0)+'%';
  var hs=document.getElementById('hdr-step');
  var lbs=UI[lang].stepLbls||UI.de.stepLbls;
  if(hs){hs.textContent=(lbs[n]||'')+' '+(n+1)+'/9';hs.style.display='block';}
  if(n===2)showTagSugs();
  lr();
}

// TABS
function switchTab(btn,id){
  btn.closest('.step').querySelectorAll('.tab-btn').forEach(function(b){b.classList.remove('on');});btn.classList.add('on');
  btn.closest('.step').querySelectorAll('.tab-pane').forEach(function(p){p.classList.remove('on');});
  var p=document.getElementById(id);if(p)p.classList.add('on');
}
function switchDocTab(btn,id){
  document.querySelectorAll('.doc-tab').forEach(function(b){b.classList.remove('on');});btn.classList.add('on');
  ['dtab-cv','dtab-cl'].forEach(function(x){var el=document.getElementById(x);if(el)el.style.display='none';});
  var t=document.getElementById(id);if(t)t.style.display='block';
}
function setPrevTab(btn,mode){
  document.querySelectorAll('.ptab').forEach(function(b){b.classList.remove('on');});btn.classList.add('on');
  prevMode=mode;
  if(mode==='cv'&&genCV){var fr=document.getElementById('prev-fr');if(fr)fr.srcdoc=genCV;}
  else lr();
}

// ═══════════════════════════════════════════════════════════════════
// PHOTO SYSTEM — upload · pixel distortion · QR · avatar
// ═══════════════════════════════════════════════════════════════════
var photoMode = 'photo';
var avatarChoice = 'initials';

var AVATAR_STYLES = [
  { id:'initials', label:'AB',
    fn: function(fn,ln,ac){ return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="avG" cx="50%" cy="35%" r="70%"><stop offset="0%" stop-color="'+ac+'" stop-opacity=".22"/><stop offset="100%" stop-color="'+ac+'" stop-opacity=".04"/></radialGradient></defs><rect width="120" height="120" fill="url(#avG)"/><circle cx="60" cy="60" r="59" fill="none" stroke="'+ac+'" stroke-width=".5" opacity=".3"/><text x="60" y="76" text-anchor="middle" font-family="Playfair Display,Georgia,serif" font-size="46" font-weight="900" fill="'+ac+'" letter-spacing="-2">'+((fn[0]||'')+(ln[0]||'')).toUpperCase()+'</text></svg>'; }
  },
  { id:'geo', label:'◆',
    fn: function(fn,ln,ac){ return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" fill="'+ac+'" fill-opacity=".08"/><circle cx="60" cy="60" r="42" fill="none" stroke="'+ac+'" stroke-width="1.5" opacity=".4"/><polygon points="60,22 98,82 22,82" fill="none" stroke="'+ac+'" stroke-width="1.2" opacity=".5"/><circle cx="60" cy="60" r="16" fill="'+ac+'" fill-opacity=".18"/><text x="60" y="66" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="14" fill="'+ac+'" font-weight="700">'+((fn[0]||'')+(ln[0]||'')).toUpperCase()+'</text></svg>'; }
  },
  { id:'code', label:'</>',
    fn: function(fn,ln,ac){ return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" fill="#060a0e"/><rect x="0" y="0" width="120" height="3" fill="'+ac+'" opacity=".7"/><text x="12" y="44" font-family="JetBrains Mono,monospace" font-size="10" fill="'+ac+'" opacity=".35">function()</text><text x="12" y="60" font-family="JetBrains Mono,monospace" font-size="10" fill="'+ac+'" opacity=".25">  return &lt;you&gt;</text><text x="60" y="88" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="28" fill="'+ac+'" font-weight="700">'+((fn[0]||'')+(ln[0]||'')).toUpperCase()+'</text><text x="12" y="108" font-family="JetBrains Mono,monospace" font-size="10" fill="'+ac+'" opacity=".25">// by FOLIO</text></svg>'; }
  },
  { id:'wave', label:'≈',
    fn: function(fn,ln,ac){ return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" fill="'+ac+'" fill-opacity=".06"/><path d="M0,60 Q20,40 40,60 Q60,80 80,60 Q100,40 120,60" stroke="'+ac+'" stroke-width="2" fill="none" opacity=".5"/><path d="M0,72 Q20,52 40,72 Q60,92 80,72 Q100,52 120,72" stroke="'+ac+'" stroke-width="1" fill="none" opacity=".25"/><text x="60" y="44" text-anchor="middle" font-family="Playfair Display,serif" font-size="28" fill="'+ac+'" font-weight="800">'+((fn[0]||'')+(ln[0]||'')).toUpperCase()+'</text></svg>'; }
  }
];

function triggerPhotoClick(){ document.getElementById('photoInp').click(); }

function photoSet(e) {
  var f = e.target.files[0]; if (!f) return;
  var reader = new FileReader();
  reader.onload = function(ev) {
    D.photo = ev.target.result;
    var ring = document.getElementById('photoRing');
    ring.style.border = 'none';
    ring.style.background = 'transparent';
    ring.innerHTML = '<img src="'+D.photo+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;image-rendering:auto;filter:contrast(1.04) saturate(1.08)">';
    document.getElementById('pixelCanvas').style.display = 'none';
    if(document.getElementById('qrPreview')) document.getElementById('qrPreview').style.display = 'none';
    if(document.getElementById('avatarBig')) document.getElementById('avatarBig').style.display = 'none';
    ring.style.display = 'flex';
    document.getElementById('photoClearBtn').style.display = 'inline-flex';
    document.getElementById('photoModeRow').style.display = 'flex';
    document.getElementById('noPhotoOpts').style.display = 'none';
    // Reset to photo mode
    document.querySelectorAll('.pmode-btn').forEach(function(b){b.classList.remove('on');});
    var pb = document.getElementById('pmode-photo'); if(pb) pb.classList.add('on');
    photoMode = 'photo';
    // Pre-build pixel canvas in background
    setTimeout(function(){ buildPixelCanvas(D.photo); }, 100);
    lr();
  };
  reader.readAsDataURL(f);
}

function clearPhoto() {
  D.photo = null; photoMode = 'photo';
  var ring = document.getElementById('photoRing');
  ring.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".5"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>';
  ring.style.border = '2px dashed var(--hr)';
  ring.style.background = 'var(--bg2)';
  ring.style.display = 'flex';
  document.getElementById('pixelCanvas').style.display = 'none';
  document.getElementById('qrPreview').style.display = 'none';
  document.getElementById('avatarBig').style.display = 'none';
  document.getElementById('photoClearBtn').style.display = 'none';
  document.getElementById('photoModeRow').style.display = 'none';
  document.getElementById('noPhotoOpts').style.display = 'none';
  lr();
}

function setPhotoMode(m) {
  photoMode = m;
  document.querySelectorAll('.pmode-btn').forEach(function(b){b.classList.remove('on');});
  var btn = document.getElementById('pmode-'+m); if(btn) btn.classList.add('on');
  var ring = document.getElementById('photoRing');
  var px = document.getElementById('pixelCanvas');
  var qr = document.getElementById('qrPreview');
  var av = document.getElementById('avatarBig');
  var annotOv = document.getElementById('annotOverlay');
  var rim = document.getElementById('photo3dRim');
  var toolbar = document.getElementById('annotToolbar');
  var annotList = document.getElementById('annotList');
  // Hide all first
  ring.style.display = 'none';
  px.style.display = 'none';
  if(qr) qr.style.display = 'none';
  if(av) av.style.display = 'none';
  if(annotOv) annotOv.classList.remove('on');
  if(rim) rim.style.display = 'none';
  if(toolbar) toolbar.classList.remove('on');
  var fp2 = document.getElementById('framePicker'); if(fp2) fp2.style.display='none';
  var bp2 = document.getElementById('bgModePanel'); if(bp2) bp2.classList.remove('on');
  var sp2 = document.getElementById('scorePanelWrap'); if(sp2) sp2.classList.remove('on');
  var sc2 = document.getElementById('scatterCanvas'); if(sc2) sc2.style.display='none';
  if(_scatterRAF){ cancelAnimationFrame(_scatterRAF); _scatterRAF=null; }
  // Remove 3D mouse listener
  var wrap = document.getElementById('photoPreviewWrap');
  if(wrap) { wrap.onmousemove = null; wrap.onmouseleave = null; }
  // Reset ring transform
  ring.style.transform = '';
  ring.style.borderRadius = '50%';
  ring.style.boxShadow = '';
  ring.style.border = '2px dashed var(--hr)';

  if (m === 'photo') {
    ring.style.display = 'flex';
    ring.style.border = D.photo ? 'none' : '2px dashed var(--hr)';
  } else if (m === '3d') {
    // High-quality 3D with mouse parallax
    ring.style.display = 'flex';
    ring.style.border = 'none';
    ring.style.borderRadius = '50%';
    ring.style.overflow = 'hidden';
    if(rim) rim.style.display = 'block';
    if(D.photo) {
      ring.innerHTML = '<div class="photo-3d-wrap" id="photo3dInner"><img src="'+D.photo+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;image-rendering:auto;filter:contrast(1.06) saturate(1.12) brightness(1.02)"><div class="photo-3d-shine"></div></div>';
      var inner = document.getElementById('photo3dInner');
      // Mouse parallax 3D tilt
      wrap.onmousemove = function(e) {
        var r = wrap.getBoundingClientRect();
        var cx = r.left + r.width/2, cy = r.top + r.height/2;
        var dx = (e.clientX - cx) / (r.width/2);
        var dy = (e.clientY - cy) / (r.height/2);
        var tiltX = -dy * 22, tiltY = dx * 22;
        var depth = 1 + Math.abs(dx)*0.08 + Math.abs(dy)*0.08;
        if(inner) inner.style.transform = 'perspective(260px) rotateX('+tiltX+'deg) rotateY('+tiltY+'deg) scale3d('+depth+','+depth+','+depth+')';
        // Dynamic shine
        var shine = inner ? inner.querySelector('.photo-3d-shine') : null;
        if(shine) { shine.style.background = 'radial-gradient(ellipse at '+(50+dx*20)+'% '+(50+dy*20)+'%, rgba(255,255,255,0.28) 0%, transparent 65%)'; }
        if(rim) { rim.style.boxShadow = '0 0 0 1.5px rgba(22,160,133,0.7), '+(dx*12)+'px '+(dy*12)+'px 30px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.15)'; }
      };
      wrap.onmouseleave = function() {
        if(inner) inner.style.transform = 'perspective(260px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        var shine = inner ? inner.querySelector('.photo-3d-shine') : null;
        if(shine) shine.style.background = '';
        if(rim) rim.style.boxShadow = '';
      };
    }
  } else if (m === '2d') {
    // High quality flat 2D — no borders, no pixelation
    ring.style.display = 'flex';
    ring.style.border = 'none';
    ring.style.overflow = 'hidden';
    if(rim) rim.style.display = 'block';
    if(D.photo) {
      ring.innerHTML = '<img src="'+D.photo+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;image-rendering:auto;filter:contrast(1.05) saturate(1.1) brightness(1.01)">';
    }
  } else if (m === 'frame') {
    ring.style.display = 'flex';
    ring.style.border = 'none';
    var fp = document.getElementById('framePicker'); if(fp) fp.style.display='block';
    renderFrameGrid();
    applyFrame();
  } else if (m === 'bg') {
    ring.style.display = 'flex';
    ring.style.border = 'none';
    var bp = document.getElementById('bgModePanel'); if(bp) bp.classList.add('on');
    renderBgPreview();
  } else if (m === 'scatter') {
    var sc = document.getElementById('scatterCanvas');
    ring.style.display = 'none';
    if(sc){ sc.style.display='block'; initScatterCanvas(D.photo); }
  } else if (m === 'score') {
    ring.style.display = 'flex';
    ring.style.border = 'none';
    var sp = document.getElementById('scorePanelWrap'); if(sp) sp.classList.add('on');
    setTimeout(runPhotoScore, 200);
  } else if (m === 'annot') {
    // Annotation mode
    ring.style.display = 'flex';
    ring.style.border = 'none';
    if(annotOv) annotOv.classList.add('on');
    if(toolbar) toolbar.classList.add('on');
    renderAnnotList();
  } else if (m === 'pixel') {
    px.style.display = 'block';
    buildPixelCanvas(D.photo);
  } else if (m === 'qr') {
    if(qr) { qr.style.display = 'flex'; buildQRCode(); }
  }
}

// ═══════════════════════════════════════════════════════════════════
// FRAME SYSTEM
// ═══════════════════════════════════════════════════════════════════
var FRAMES = [
  {id:'circle',  label:'●',  clip:'circle(50%)',       icon:'<circle cx="55" cy="55" r="48" fill="none" stroke="currentColor" stroke-width="3"/>'},
  {id:'rounded', label:'▢',  clip:'inset(0 round 15%)', icon:'<rect x="7" y="7" width="96" height="96" rx="16" fill="none" stroke="currentColor" stroke-width="3"/>'},
  {id:'square',  label:'■',  clip:'inset(0)',            icon:'<rect x="5" y="5" width="100" height="100" fill="none" stroke="currentColor" stroke-width="3"/>'},
  {id:'hex',     label:'⬡',  clip:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)', icon:'<polygon points="55,7 103,31 103,79 55,103 7,79 7,31" fill="none" stroke="currentColor" stroke-width="3"/>'},
  {id:'diamond', label:'◆',  clip:'polygon(50% 0%,100% 50%,50% 100%,0% 50%)',              icon:'<polygon points="55,5 105,55 55,105 5,55" fill="none" stroke="currentColor" stroke-width="3"/>'},
  {id:'shield',  label:'🛡',  clip:'polygon(50% 0%,100% 12%,100% 60%,50% 100%,0% 60%,0% 12%)', icon:'<path d="M55,7 L103,20 L103,65 Q103,103 55,103 Q7,103 7,65 L7,20 Z" fill="none" stroke="currentColor" stroke-width="3"/>'},
  {id:'arch',    label:'⌒',  clip:'polygon(0% 100%,0% 35%,5% 20%,15% 8%,30% 2%,50% 0%,70% 2%,85% 8%,95% 20%,100% 35%,100% 100%)', icon:'<path d="M7,103 L7,40 Q7,7 55,7 Q103,7 103,40 L103,103 Z" fill="none" stroke="currentColor" stroke-width="3"/>'},
  {id:'star',    label:'★',  clip:'polygon(50% 2%,61% 36%,98% 36%,67% 58%,79% 92%,50% 70%,21% 92%,33% 58%,2% 36%,39% 36%)', icon:'<polygon points="55,4 67,38 104,38 74,60 85,95 55,73 25,95 36,60 6,38 43,38" fill="none" stroke="currentColor" stroke-width="2.5"/>'},
  {id:'octagon', label:'⯃',  clip:'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)', icon:'<polygon points="33,7 77,7 103,33 103,77 77,103 33,103 7,77 7,33" fill="none" stroke="currentColor" stroke-width="3"/>'},
  {id:'leaf',    label:'🍃', clip:'ellipse(40% 50% at 50% 50%) rotate(-45)',                icon:'<ellipse cx="55" cy="55" rx="42" ry="50" transform="rotate(45,55,55)" fill="none" stroke="currentColor" stroke-width="3"/>'}
];

var currentFrame = 'circle';
var bgStyle = 'blur';
var frameBorderW = 3;
var frameBorderGlow = 8;
var frameBorderColor = '#16a085';

function renderFrameGrid() {
  var grid = document.getElementById('frameGrid'); if(!grid) return;
  grid.innerHTML = FRAMES.map(function(f) {
    var sel = currentFrame === f.id;
    return '<div class="frame-opt'+(sel?' sel':'')+' frame-opt-btn" data-fid="'+f.id+'" title="'+f.label+'">'+
      '<svg viewBox="0 0 110 110" width="52" height="52" style="color:'+(sel?frameBorderColor:'var(--text2)')+'">'+f.icon+'</svg></div>';
  }).join('');
  // Delegate clicks
  grid.onclick = function(e) {
    var btn = e.target.closest('.frame-opt-btn'); if(!btn) return;
    pickFrame(btn.dataset.fid);
  };
}

function pickFrame(id) {
  currentFrame = id;
  renderFrameGrid();
  applyFrame();
}

function applyFrame() {
  var ring = document.getElementById('photoRing');
  var px = document.getElementById('pixelCanvas');
  var sc = document.getElementById('scatterCanvas');
  var ov = document.getElementById('annotOverlay');
  var f = FRAMES.find(function(x){return x.id===currentFrame;})||FRAMES[0];
  var bw = parseInt(document.getElementById('borderWidth')?document.getElementById('borderWidth').value:3)||3;
  var glow = parseInt(document.getElementById('borderGlow')?document.getElementById('borderGlow').value:8)||8;
  var col = document.getElementById('borderColor')?document.getElementById('borderColor').value:frameBorderColor;
  frameBorderColor = col; frameBorderW = bw; frameBorderGlow = glow;

  // Apply clip-path to ring
  ring.style.clipPath = f.clip;
  ring.style.webkitClipPath = f.clip;
  ring.style.borderRadius = (id==='circle'?'50%':'0');
  // Border via outline won't work with clip-path; use box-shadow with inset trick
  // Use a pseudo via wrapper glow
  ring.style.boxShadow = bw > 0 ? '0 0 '+glow+'px '+glow/2+'px '+col+'55,inset 0 0 0 '+bw+'px '+col : '';
  // Apply same clip to canvases
  [px, sc, ov].forEach(function(el){ if(el){ el.style.clipPath=f.clip; el.style.webkitClipPath=f.clip; } });
  renderFrameGrid();
  lr();
}

// ═══════════════════════════════════════════════════════════════════
// BACKGROUND INTEGRATION
// ═══════════════════════════════════════════════════════════════════
var _bgStyleCurrent = 'blur';

function setBgStyle(s, btn) {
  _bgStyleCurrent = s;
  document.querySelectorAll('.bgsw').forEach(function(b){b.classList.remove('on');});
  if(btn) btn.classList.add('on');
  renderBgPreview();
  lr();
}

function renderBgPreview() {
  if(!D.photo) return;
  var prev = document.getElementById('bgPreview');
  var overlay = document.getElementById('bgOverlay');
  if(!prev) return;
  // Set background image
  prev.style.backgroundImage = 'url('+D.photo+')';
  prev.style.backgroundSize = 'cover';
  prev.style.backgroundPosition = 'center';
  if(!prev.querySelector('img')) {
    // ensure overlay is child
  }
  var overlayCSS = {
    blur:     'rgba(0,0,0,0.38)',
    dark:     'rgba(0,0,0,0.65)',
    gradient: 'linear-gradient(135deg,rgba(22,160,133,.72) 0%,rgba(10,10,25,.8) 100%)',
    duotone:  'linear-gradient(135deg,rgba(22,160,133,.6),rgba(90,10,160,.55))',
    clear:    'rgba(0,0,0,0.08)'
  };
  var filter = {
    blur: 'blur(3px)', dark: 'blur(1px)', gradient: 'none', duotone: 'grayscale(80%)', clear: 'none'
  };
  prev.style.filter = filter[_bgStyleCurrent]||'none';
  if(overlay) overlay.style.background = overlayCSS[_bgStyleCurrent]||'rgba(0,0,0,.4)';
}

// ═══════════════════════════════════════════════════════════════════
// TAILWIND-STYLE SCATTER PIXEL DISTORTION (true per-cell parallax)
// ═══════════════════════════════════════════════════════════════════
var _scatterImg = null;
var _scatterRAF = null;
var _scatterParticles = [];
var _scatterMX = -999, _scatterMY = -999;
var SCATTER_CELL = 6; // px per cell

function initScatterCanvas(src) {
  var cv = document.getElementById('scatterCanvas'); if(!cv||!src) return;
  var ctx = cv.getContext('2d');
  var W = cv.width, H = cv.height;
  var img = new Image();
  img.onload = function() {
    _scatterImg = img;
    // Build particle grid
    _scatterParticles = [];
    var cols = Math.ceil(W/SCATTER_CELL), rows = Math.ceil(H/SCATTER_CELL);
    // Sample colors from image
    var tmp = document.createElement('canvas'); tmp.width=cols; tmp.height=rows;
    var tc = tmp.getContext('2d');
    tc.drawImage(img, 0, 0, cols, rows);
    var data = tc.getImageData(0,0,cols,rows).data;
    for(var r=0; r<rows; r++) {
      for(var col=0; col<cols; col++) {
        var i=(r*cols+col)*4;
        var ox=col*SCATTER_CELL, oy=r*SCATTER_CELL;
        _scatterParticles.push({
          ox:ox, oy:oy, x:ox, y:oy,
          vx:0, vy:0,
          r:data[i], g:data[i+1], b:data[i+2], a:data[i+3]/255
        });
      }
    }
    drawScatterFrame(ctx, W, H);
    // Mouse events
    cv.onmousemove = function(e) {
      var rect = cv.getBoundingClientRect();
      _scatterMX = (e.clientX-rect.left)*(W/rect.width);
      _scatterMY = (e.clientY-rect.top)*(H/rect.height);
      if(!_scatterRAF) _scatterRAF = requestAnimationFrame(scatterLoop);
    };
    cv.onmouseleave = function() {
      _scatterMX = -999; _scatterMY = -999;
      if(!_scatterRAF) _scatterRAF = requestAnimationFrame(scatterLoop);
    };
  };
  img.src = src;
}

function scatterLoop() {
  _scatterRAF = null;
  var cv = document.getElementById('scatterCanvas'); if(!cv) return;
  var ctx = cv.getContext('2d');
  var W = cv.width, H = cv.height;
  var changed = false;
  var RADIUS = 38, STRENGTH = 55, SPRING = 0.14, DAMP = 0.72;
  _scatterParticles.forEach(function(p) {
    var dx = p.x - _scatterMX, dy = p.y - _scatterMY;
    var dist = Math.sqrt(dx*dx+dy*dy);
    if(dist < RADIUS && _scatterMX > -100) {
      var force = (RADIUS-dist)/RADIUS;
      p.vx += (dx/dist)*force*STRENGTH*0.18;
      p.vy += (dy/dist)*force*STRENGTH*0.18;
    }
    // Spring back
    p.vx += (p.ox - p.x)*SPRING;
    p.vy += (p.oy - p.y)*SPRING;
    p.vx *= DAMP; p.vy *= DAMP;
    if(Math.abs(p.vx)>0.05||Math.abs(p.vy)>0.05||Math.abs(p.x-p.ox)>0.1||Math.abs(p.y-p.oy)>0.1){
      changed = true;
    }
    p.x += p.vx; p.y += p.vy;
  });
  drawScatterFrame(ctx, W, H);
  if(changed || _scatterMX > -100) _scatterRAF = requestAnimationFrame(scatterLoop);
}

function drawScatterFrame(ctx, W, H) {
  var cv = document.getElementById('scatterCanvas');
  var f = FRAMES.find(function(x){return x.id===currentFrame;})||FRAMES[0];
  ctx.clearRect(0,0,W,H);
  _scatterParticles.forEach(function(p) {
    ctx.fillStyle='rgba('+p.r+','+p.g+','+p.b+','+p.a+')';
    ctx.fillRect(Math.round(p.x), Math.round(p.y), SCATTER_CELL, SCATTER_CELL);
  });
  // Clip composite
  ctx.globalCompositeOperation='destination-in';
  // Draw clip shape
  ctx.fillStyle='#fff';
  if(f.id==='circle'){ ctx.beginPath(); ctx.arc(W/2,H/2,W/2-1,0,Math.PI*2); ctx.fill(); }
  else if(f.id==='rounded'){ roundedRectClip(ctx,2,2,W-4,H-4,W*0.14); }
  else if(f.id==='square'){ ctx.fillRect(2,2,W-4,H-4); }
  else if(f.id==='hex'){ polygonClip(ctx,[[W*.5,1],[W-1,H*.25],[W-1,H*.75],[W*.5,H-1],[1,H*.75],[1,H*.25]]); }
  else if(f.id==='diamond'){ polygonClip(ctx,[[W/2,2],[W-2,H/2],[W/2,H-2],[2,H/2]]); }
  else if(f.id==='star'){ starClip(ctx,W,H); }
  else if(f.id==='octagon'){ polygonClip(ctx,[[W*.3,2],[W*.7,2],[W-2,H*.3],[W-2,H*.7],[W*.7,H-2],[W*.3,H-2],[2,H*.7],[2,H*.3]]); }
  else { ctx.fillRect(0,0,W,H); }
  ctx.globalCompositeOperation='source-over';
}

function roundedRectClip(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();ctx.fill();}
function polygonClip(ctx,pts){ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);pts.slice(1).forEach(function(p){ctx.lineTo(p[0],p[1]);});ctx.closePath();ctx.fill();}
function starClip(ctx,W,H){var pts=[],cx=W/2,cy=H/2,R=W/2-3,r=R*.44;for(var i=0;i<10;i++){var ang=i*Math.PI/5-Math.PI/2,rad=i%2===0?R:r;pts.push([cx+Math.cos(ang)*rad,cy+Math.sin(ang)*rad]);}polygonClip(ctx,pts);}

// ═══════════════════════════════════════════════════════════════════
// PHOTO SCORE (satirical ATS-style)
// ═══════════════════════════════════════════════════════════════════
var _photoScores = null;

var SCORE_CATS = [
  'Haarvolumen-Index','Krawattensymmetrie','Lächel-Authentizität',
  'Hintergrund-Prof.','Blickkontakt-Stärke','Jawline Konfidenz™',
  'Augenbrauen-Score','Photogenie-Koeff.','Kragen-Rating','KI-Aura™'
];

function runPhotoScore() {
  if(!D.photo){ toast('⚠️ Bitte zuerst ein Foto hochladen'); return; }
  var rows = document.getElementById('scoreRows');
  var total = document.getElementById('scoreTotalVal');
  var grade = document.getElementById('scoreGradeVal');
  if(!rows) return;
  rows.innerHTML = '<div style="font-size:9px;color:var(--teal);font-family:monospace;margin-bottom:8px;animation:blink 1s step-end infinite">⟳ FOLIO·SCAN™ initialisiert…</div>';
  total.textContent = '—'; grade.textContent = 'Wird berechnet…';

  // Generate pseudo-random but deterministic scores from photo data
  var seed = D.photo.slice(-200).split('').reduce(function(a,c){return a+c.charCodeAt(0);},0);
  var rng = function(min,max){ seed=(seed*1664525+1013904223)&0xffffffff; return min+((seed>>>0)%(max-min+1)); };

  var scores = SCORE_CATS.map(function(cat){ return {cat:cat, val:rng(42,97)}; });
  _photoScores = scores;

  var avg = Math.round(scores.reduce(function(s,x){return s+x.val;},0)/scores.length);
  var gradeStr = avg>=90?'S-TIER · Legendary':avg>=80?'A · Excellent':avg>=70?'B · Good':avg>=60?'C · Average':'D · Needs Work';

  var delay = 0;
  rows.innerHTML = '';
  scores.forEach(function(s, i) {
    setTimeout(function(){
      var row = document.createElement('div');
      row.className = 'score-row';
      var hue = s.val >= 80 ? '160' : s.val >= 60 ? '45' : '0';
      row.innerHTML = '<div class="score-lbl">'+s.cat+'</div>'+
        '<div class="score-bar"><div class="score-fill" style="width:0%;background:hsl('+hue+',70%,45%)" id="sf'+i+'"></div></div>'+
        '<div class="score-val">'+s.val+'</div>';
      rows.appendChild(row);
      setTimeout(function(){ var f=document.getElementById('sf'+i); if(f) f.style.width=s.val+'%'; }, 40);
    }, i*110);
  });

  setTimeout(function(){
    total.textContent = avg+'/100';
    grade.textContent = gradeStr;
  }, scores.length*110+200);
}

// ─── ANNOTATIONS ───────────────────────────────────────────────────────────

var annotations = [];
var annotMode = 'add';

function annotClick(e) {
  var ov = document.getElementById('annotOverlay');
  var r = ov.getBoundingClientRect();
  var x = ((e.clientX - r.left) / r.width * 80).toFixed(1);
  var y = ((e.clientY - r.top) / r.height * 80).toFixed(1);
  if(annotMode === 'del') {
    // Find nearest annotation
    var minD = 999, minI = -1;
    annotations.forEach(function(a,i){ var d=Math.hypot(a.x-x,a.y-y); if(d<minD){minD=d;minI=i;} });
    if(minI >= 0 && minD < 12) { annotations.splice(minI,1); renderAnnotSVG(); renderAnnotList(); }
    return;
  }
  var text = prompt('Anmerkung / Annotation:','');
  if(!text) return;
  annotations.push({x:parseFloat(x),y:parseFloat(y),text:text});
  renderAnnotSVG();
  renderAnnotList();
}

function renderAnnotSVG() {
  var svg = document.getElementById('annotSVG'); if(!svg) return;
  var ac = '#16a085';
  svg.innerHTML = annotations.map(function(a,i){
    var ox = a.x > 50 ? -4 : 4;
    var textX = a.x > 50 ? a.x - 5 : a.x + 8;
    var anchor = a.x > 50 ? 'end' : 'start';
    return '<circle cx="'+a.x+'" cy="'+a.y+'" r="2.5" fill="'+ac+'" opacity="0.9"/>'+
      '<line x1="'+a.x+'" y1="'+a.y+'" x2="'+textX+'" y2="'+a.y+'" stroke="'+ac+'" stroke-width="0.7" opacity="0.6"/>'+
      '<text x="'+textX+'" y="'+(parseFloat(a.y)+0.5)+'" font-size="5.5" fill="'+ac+'" text-anchor="'+anchor+'" font-family="JetBrains Mono,monospace" opacity="0.95">'+escSVG(a.text)+'</text>';
  }).join('');
}

function renderAnnotList() {
  var list = document.getElementById('annotList'); if(!list) return;
  if(!annotations.length){ list.innerHTML=''; return; }
  list.innerHTML = annotations.map(function(a,i){
    return '<span style="margin-right:8px;cursor:pointer" onclick="annotations.splice('+i+',1);renderAnnotSVG();renderAnnotList()" title="Löschen">✕</span>'+escSVG(a.text);
  }).join('<br>');
}

function clearAnnotations(){ annotations=[]; renderAnnotSVG(); renderAnnotList(); }

function escSVG(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// ─── URL IMPORT ─────────────────────────────────────────────────────────────
async function loadCVFromUrl() {
  var inp = document.getElementById('cv-url-inp');
  var url = (inp ? inp.value : '').trim();
  if(!url) { toast('⚠️ Bitte URL eingeben'); return; }
  // Normalize URL
  if(!/^https?:\/\//i.test(url)) url = 'https://' + url;
  var st = document.getElementById('url-status');
  if(st){ st.style.display='block'; st.textContent='⟳ Lade URL …'; }
  tlog('tc', 'loadCV --url="'+url+'"');
  try {
    // Use allorigins.win CORS proxy to fetch cross-origin HTML
    var proxy = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);
    var resp = await fetch(proxy);
    if(!resp.ok) throw new Error('HTTP '+resp.status);
    var json = await resp.json();
    var html = json.contents || '';
    if(!html) throw new Error('Leerer Inhalt / Empty content');
    tlog('tok', '✓ URL geladen — '+html.length+' Zeichen');
    // Extract text from HTML
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    // Remove scripts/styles
    tmp.querySelectorAll('script,style,noscript').forEach(function(el){el.remove();});
    var text = tmp.innerText || tmp.textContent || '';
    if(st){ st.textContent='⟳ KI extrahiert …'; }
    await aiExtract(text, 'cv', document.getElementById('cv-status'));
    if(st){ st.style.display='block'; st.textContent='✓ CV von URL erfolgreich extrahiert!'; }
    toast('✓ CV-URL geladen & extrahiert');
  } catch(err) {
    tlog('te', '✗ Fehler: '+err.message);
    if(st){ st.textContent='✗ Fehler: '+err.message+' — Bitte Datei direkt hochladen.'; }
    toast('⚠️ URL-Fehler: '+err.message);
  }
}

function showNoPhotoOpts() {
  var el = document.getElementById('noPhotoOpts');
  var showing = el.style.display !== 'none';
  el.style.display = showing ? 'none' : 'block';
  if (!showing) renderAvatarGrid();
}

function renderAvatarGrid() {
  var grid = document.getElementById('avGrid'); if (!grid) return;
  var fn = (D.fn||'F'), ln = (D.ln||'L');
  var ac = accent;
  grid.innerHTML = AVATAR_STYLES.map(function(av) {
    var svg = av.fn(fn, ln, ac);
    var sel = avatarChoice === av.id;
    return '<div onclick="pickAvatar(\''+av.id+'\')" title="'+av.label+'" style="width:48px;height:48px;border-radius:50%;overflow:hidden;cursor:pointer;border:2px solid '+(sel?ac:'var(--hr)')+';transition:all .2s;flex-shrink:0;display:flex;align-items:center;justify-content:center">'+svg+'</div>';
  }).join('');
}

function pickAvatar(id) {
  avatarChoice = id;
  var av = AVATAR_STYLES.find(function(a){return a.id===id;}); if (!av) return;
  var fn = (D.fn||'F'), ln = (D.ln||'L'), ac = accent;
  var svg = av.fn(fn, ln, ac);
  // Show in main ring
  var ring = document.getElementById('photoRing');
  ring.style.border = 'none';
  ring.style.background = 'transparent';
  ring.innerHTML = '<div style="width:100%;height:100%;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center">'+svg+'</div>';
  ring.style.display = 'flex';
  document.getElementById('pixelCanvas').style.display = 'none';
  document.getElementById('qrPreview').style.display = 'none';
  renderAvatarGrid();
  lr();
}

// PIXEL CANVAS — interactive distortion like Tailwind CSS website
var _pixImg = null;
function buildPixelCanvas(src) {
  var cv = document.getElementById('pixelCanvas'); if (!cv || !src) return;
  var ctx = cv.getContext('2d');
  var W = cv.width, H = cv.height;
  var img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function() {
    _pixImg = img;
    drawPixelFrame(ctx, img, W, H, W/2, H/2, false);
    // mouse interaction
    cv.onmousemove = function(e) {
      var r = cv.getBoundingClientRect();
      var mx = (e.clientX - r.left) * (W / r.width);
      var my = (e.clientY - r.top) * (H / r.height);
      drawPixelFrame(ctx, img, W, H, mx, my, true);
    };
    cv.onmouseleave = function() {
      drawPixelFrame(ctx, img, W, H, W/2, H/2, false);
    };
  };
  img.onerror = function() { cv.style.display='none'; document.getElementById('photoRing').style.display='flex'; };
  img.src = src;
}

function drawPixelFrame(ctx, img, W, H, mx, my, active) {
  var maxDist = Math.sqrt(W*W + H*H) / 2;
  var dist = Math.sqrt(Math.pow(mx-W/2,2)+Math.pow(my-H/2,2));
  var ratio = active ? (dist / maxDist) : 0;
  var blockSize = Math.max(1, Math.round(2 + ratio * 18));
  // Draw pixelated
  ctx.clearRect(0, 0, W, H);
  var offW = Math.ceil(W/blockSize), offH = Math.ceil(H/blockSize);
  var tmp = document.createElement('canvas'); tmp.width=offW; tmp.height=offH;
  var tctx = tmp.getContext('2d');
  tctx.drawImage(img, 0, 0, offW, offH);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(tmp, 0, 0, W, H);
  // Clip to circle
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath(); ctx.arc(W/2, H/2, W/2-1, 0, Math.PI*2); ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  // Subtle scanline if active
  if (active && blockSize > 4) {
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    for (var y=0; y<H; y+=blockSize*2) { ctx.fillRect(0, y, W, blockSize); }
  }
}

// QR CODE — using free QR API
function buildQRCode() {
  var qr = document.getElementById('qrPreview'); if (!qr) return;
  var text = D.email || D.website || D.github || D.phone || ((D.fn||'')+(D.ln?' '+D.ln:'')) || 'FOLIO';
  text = text.trim();
  qr.innerHTML = '<div style="width:60px;height:60px;border-radius:50%;overflow:hidden;background:#fff;display:flex;align-items:center;justify-content:center;padding:4px"><img src="https://api.qrserver.com/v1/create-qr-code/?size=52x52&format=svg&data='+encodeURIComponent(text)+'&bgcolor=ffffff&color=111111&qzone=1" width="52" height="52" style="display:block" onerror="this.parentElement.innerHTML=fallbackQR()"></div>';
}
function fallbackQR() {
  return '<svg viewBox="0 0 52 52" width="52" height="52" xmlns="http://www.w3.org/2000/svg"><rect width="52" height="52" fill="#fff"/><rect x="4" y="4" width="18" height="18" rx="2" fill="#111"/><rect x="7" y="7" width="12" height="12" rx="1" fill="#fff"/><rect x="9" y="9" width="8" height="8" fill="#111"/><rect x="30" y="4" width="18" height="18" rx="2" fill="#111"/><rect x="33" y="7" width="12" height="12" rx="1" fill="#fff"/><rect x="35" y="9" width="8" height="8" fill="#111"/><rect x="4" y="30" width="18" height="18" rx="2" fill="#111"/><rect x="7" y="33" width="12" height="12" rx="1" fill="#fff"/><rect x="9" y="35" width="8" height="8" fill="#111"/><rect x="30" y="30" width="8" height="8" fill="#111"/><rect x="42" y="30" width="4" height="4" fill="#111"/><rect x="38" y="38" width="4" height="4" fill="#111"/><rect x="30" y="42" width="4" height="4" fill="#111"/><rect x="42" y="42" width="4" height="4" fill="#111"/></svg>';
}

// ═══════════════════════════════════════════════════════════════════
// ATS SATIRICAL SCANNER
// ═══════════════════════════════════════════════════════════════════
var ATS_CATEGORIES=[
  {n:'Haarvolumen-Index',en:'Hair Volume Index',ar:'مؤشر حجم الشعر'},
  {n:'Krawattensymmetrie',en:'Tie Symmetry',ar:'تناسق ربطة العنق'},
  {n:'Lächel-Authentizität',en:'Smile Authenticity',ar:'أصالة الابتسامة'},
  {n:'Hintergrund-Professionalität',en:'Background Professionalism',ar:'احترافية الخلفية'},
  {n:'Blickkontakt-Stärke',en:'Eye Contact Intensity',ar:'شدة التواصل البصري'},
  {n:'Kieferlinie-Konfidenz',en:'Jawline Confidence™',ar:'ثقة خط الفك™'},
  {n:'Augenbrauen-ATS-Score',en:'Eyebrow ATS Score',ar:'نقاط الحاجبين'},
  {n:'Kragenstärke-Rating',en:'Collar Strength Rating',ar:'تقييم قوة الياقة'},
  {n:'Photogenie-Koeffizient',en:'Photogenic Coefficient',ar:'معامل التصوير'},
  {n:'KI-Aura-Analyse',en:'AI Aura Analysis™',ar:'تحليل الهالة الذكاء'},
];
var ATS_SCAN_LOGS_DE=[
  '> Initialisiere FOLIO·SCAN™ v4.2.0...',
  '> Lade neuronales Gesichtsanalyse-Modell (GPT-Jaw-3)...',
  '> Berechne Kieferlinie-Konfidenz-Score...',
  '> Analysiere Haarvolumen-Index™...',
  '> Krawattensymmetrie: Prüfung läuft...',
  '> Pixelbasierte Aura-Extraktion...',
  '> Korreliere mit Datenbank von 4,2 Mrd. Bewerberfotografien...',
  '> Wende proprietären ATS-Algorithmus an...',
  '> Finale Gesamtwertung wird berechnet...',
  '> ✓ Analyse abgeschlossen — Ergebnis bereit.'
];

function showATS(){
  var overlay=document.getElementById('ats-overlay');
  overlay.classList.add('on');
  // Show thumb if photo exists
  var thumb=document.getElementById('ats-thumb');
  if(D.photo){
    thumb.innerHTML='<img src="'+D.photo+'" style="width:100%;height:100%;object-fit:cover">';
    document.getElementById('ats-noimg').style.display='none';
    document.getElementById('ats-run-btn').style.display='inline';
  } else {
    thumb.innerHTML='<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><rect width="56" height="56" fill="rgba(22,160,133,.1)"/><circle cx="28" cy="22" r="10" fill="rgba(22,160,133,.3)"/><path d="M10 50c0-9.9 8.1-18 18-18s18 8.1 18 18" fill="rgba(22,160,133,.3)"/></svg>';
    document.getElementById('ats-noimg').style.display='block';
    document.getElementById('ats-run-btn').style.display='none';
  }
  // Reset state
  document.getElementById('ats-prog').style.display='none';
  document.getElementById('ats-log').style.display='none';
  document.getElementById('ats-results').style.display='none';
}
function closeATS(e){
  if(e&&e.target!==document.getElementById('ats-overlay'))return;
  document.getElementById('ats-overlay').classList.remove('on');
}
async function runATSScan(){
  var btn=document.getElementById('ats-run-btn');
  btn.disabled=true;btn.textContent='⟳ Analysiere...';
  var prog=document.getElementById('ats-prog');
  var logEl=document.getElementById('ats-log');
  var results=document.getElementById('ats-results');
  prog.style.display='block';logEl.style.display='block';results.style.display='none';
  logEl.innerHTML='';

  // Animated log + progress
  for(var i=0;i<ATS_SCAN_LOGS_DE.length;i++){
    await new Promise(function(res){setTimeout(res,200+Math.random()*200);});
    var line=document.createElement('div');
    line.style.cssText='color:var(--mint);animation:fu .3s both';
    line.textContent=ATS_SCAN_LOGS_DE[i];
    logEl.appendChild(line);logEl.scrollTop=logEl.scrollHeight;
    document.getElementById('ats-prog-bar').style.width=((i+1)/ATS_SCAN_LOGS_DE.length*100)+'%';
  }

  // Generate satirical results
  var overall=Math.floor(72+Math.random()*25);
  var cats=ATS_CATEGORIES.slice(0,6).map(function(c){
    return {name:c.n,val:Math.floor(55+Math.random()*43),color:['#16a085','#00E5A0','#60A5FA','#A855F7','#f59e0b','#8F9790'][Math.floor(Math.random()*6)]};
  });

  // Show results
  document.getElementById('ats-big-num').textContent=overall;
  var bigLbl=document.getElementById('ats-big-lbl');
  bigLbl.textContent=overall>=90?'HERAUSRAGEND™':overall>=80?'STARK™':overall>=70?'SOLIDE™':'ENTWICKLUNGSPOTENZIAL™';
  document.getElementById('ats-cats').innerHTML=cats.map(function(c){
    return '<div class="ats-cat"><div class="ats-cat-name">'+c.name+'</div><div class="ats-cat-bar"><div class="ats-cat-fill" style="width:'+c.val+'%;background:'+c.color+'"></div></div><div class="ats-cat-val">'+c.val+'/100</div></div>';
  }).join('');
  prog.style.display='none';
  results.style.display='block';
  btn.disabled=false;btn.textContent='🔬 Neu analysieren';
}

// ═══════════════════════════════════════════════════════════════════
// AUTO-TRANSLATE — übersetzt alle Texte in DE/EN/AR via Claude API
// ═══════════════════════════════════════════════════════════════════
var D_translations={de:{},en:{},ar:{}};
async function autoTranslateAll(){
  syncD();
  var bar=document.getElementById('trans-bar');
  var st=document.getElementById('trans-st');
  var row=document.getElementById('trans-lang-row');
  bar.classList.add('on');
  st.textContent='⟳ Übersetze alle Texte in DE, EN und AR...';
  row.innerHTML='<span class="trans-tag pending">DE ⟳</span><span class="trans-tag pending">EN ⟳</span><span class="trans-tag pending">AR ⟳</span>';

  var payload={
    fn:D.fn, ln:D.ln, title:D.title, tagline:D.tagline, bio:D.bio,
    highlight:D.highlight, availability:D.availability,
    projects:D.projects.map(function(p){return {name:p.name,desc:p.desc,impact:p.impact};}),
    experience:D.experience.map(function(e){return {title:e.title,company:e.company,bullets:e.bullets,description:e.description};})
  };

  var prompt='You are a professional translator. Translate all text fields to German (de), English (en), and Arabic (ar).\n\nInput JSON:\n'+JSON.stringify(payload,null,2)+'\n\nReturn ONLY valid JSON with this structure:\n{"de":{...same keys...},"en":{...same keys...},"ar":{...same keys...}}\n\nFor Arabic use RTL-appropriate phrasing. Translate values only, keep JSON structure identical. JSON ONLY, no markdown.';
  try{
    var r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:2500,messages:[{role:'user',content:prompt}]})});
    var data=await r.json();
    if(data.error)throw new Error(data.error.message);
    var raw=data.content.map(function(c){return c.text||'';}).join('').replace(/```json|```/g,'').trim();
    var parsed=JSON.parse(raw);
    D_translations=parsed;
    // Apply current language to UI
    var cur=D_translations[lang]||D_translations.de;
    if(cur){
      var map={fn:'i-fn',ln:'i-ln',title:'i-title',tagline:'i-tag',bio:'i-bio',highlight:'i-hl',availability:'i-avail'};
      for(var k in map){var el=document.getElementById(map[k]);if(el&&cur[k])el.value=cur[k];}
      syncD();
    }
    row.innerHTML='<span class="trans-tag ok">DE ✓</span><span class="trans-tag ok">EN ✓</span><span class="trans-tag ok">AR ✓</span>';
    st.textContent='✓ Alle 3 Sprachen übersetzt — das Portfolio wird in allen Sprachen ausgegeben.';
    lr();toast('✓ Übersetzungen für DE/EN/AR gespeichert');
  }catch(err){
    var isNet=(err.message||'').toLowerCase().includes('fetch')||(err.message||'').toLowerCase().includes('failed');
    row.innerHTML='<span class="trans-tag err">'+(isNet?'Offline':'Fehler')+'</span>';
    st.textContent=isNet
      ?'⚠️ Keine Verbindung zur KI. Diese Funktion benötigt Internetzugang über Claude.ai. / No AI connection — open via Claude.ai.'
      :'⚠️ '+err.message+' — Bitte nochmals versuchen.';
  }
}

// ═══════════════════════════════════════════════════════════════════


function exportJSON(){
  syncD();
  var full=JSON.parse(JSON.stringify(D));
  full._meta={lang:lang,style:pStyle,accent:accent,font:fontChoice,exportDate:new Date().toISOString(),version:'folio'};
  var j=JSON.stringify(full,null,2);
  var a=document.getElementById('json-area');if(a)a.value=j;
  dl(j,'folio-data.json','application/json');
  toast('✓ JSON exportiert');
}
function importJSON(){
  var a=document.getElementById('json-area');if(!a)return;
  try{
    var p=JSON.parse(a.value);
    if(p._meta){if(p._meta.lang)lang=p._meta.lang;if(p._meta.style)pStyle=p._meta.style;if(p._meta.accent)accent=p._meta.accent;if(p._meta.font)fontChoice=p._meta.font;delete p._meta;}
    fillExtracted(p);fillForm();applyUILang();setStyle(pStyle);lr();toast('✓ Importiert');
  }catch(e){alert('⚠️ Ungültiges JSON / Invalid JSON');}
}
function exportIndexHTML(){
  syncD();
  var html=buildPortfolio(true);
  var name=(D.fn+'-'+D.ln).toLowerCase().replace(/\s+/g,'-')||'portfolio';
  dl(html,'index.html','text/html');
  toast('✓ index.html exportiert — hosting-ready');
}
function exportAllBundle(){
  syncD();
  dlPortfolio();
  setTimeout(function(){exportJSON();},300);
  if(genCV)setTimeout(function(){dl(genCV,'lebenslauf.html','text/html');},600);
  toast('✓ Bundle exportiert');
}

// TAGS
function tagKey(e,boxId,inpId){
  if(e.key==='Enter'||e.key===','){e.preventDefault();var inp=document.getElementById(inpId);var val=inp.value.replace(/,$/,'').trim();if(!val)return;var cat=boxId.replace('-tags','');if(!D.skills[cat])D.skills[cat]=[];D.skills[cat].push(val);inp.value='';rTags(boxId,cat);lr();showTagSugs();}
  if(e.key==='Backspace'&&document.getElementById(inpId).value===''){var c=boxId.replace('-tags','');if(D.skills[c]&&D.skills[c].length){D.skills[c].pop();rTags(boxId,c);lr();}}
}
function rTags(boxId,cat){
  var box=document.getElementById(boxId);if(!box)return;
  var inpId=boxId.replace('-tags','-inp');
  box.innerHTML=D.skills[cat].map(function(t,i){return '<span class="chip">'+t+'<button class="chip-x" onclick="rmTag(\''+cat+'\','+i+')">×</button></span>';}).join('')+'<input class="tag-inp" id="'+inpId+'" onkeydown="tagKey(event,\''+boxId+'\',\''+inpId+'\')">';
}
function rmTag(cat,i){D.skills[cat].splice(i,1);rTags(cat+'-tags',cat);lr();}

// CARDS
function addProject(data){
  var id='p'+ic++;if(!data)data={};
  D.projects.push({id:id,name:data.name||'',desc:data.desc||'',tech:data.tech||'',url:data.url||'',role:data.role||'',impact:data.impact||''});
  var list=document.getElementById('proj-list');var div=document.createElement('div');div.className='pc';div.id='pc-'+id;
  div.innerHTML='<button class="card-del" onclick="rmItem(\'projects\',\''+id+'\',this)">✕</button>'+
    '<div class="f2" style="margin-bottom:8px"><div class="fld" style="margin:0"><label>Projektname / Project Name</label><input value="'+esc(data.name||'')+'" oninput="updItem(\'projects\',\''+id+'\',\'name\',this.value)" placeholder="Portfolio Dashboard"></div>'+
    '<div class="fld" style="margin:0"><label>URL</label><input value="'+esc(data.url||'')+'" oninput="updItem(\'projects\',\''+id+'\',\'url\',this.value)" placeholder="github.com/..."></div></div>'+
    '<div class="fld" style="margin-bottom:8px"><label>Beschreibung / Description / الوصف</label><textarea rows="2" oninput="updItem(\'projects\',\''+id+'\',\'desc\',this.value)" placeholder="Was hast du gebaut?">'+esc(data.desc||'')+'</textarea></div>'+
    '<div class="fld" style="margin:0"><label>Tech Stack</label><input value="'+esc(data.tech||'')+'" oninput="updItem(\'projects\',\''+id+'\',\'tech\',this.value)" placeholder="React, TypeScript, AWS"></div>'+
    '<button class="card-xbtn" onclick="toggleX(this)">+ Rolle & Impact</button>'+
    '<div class="card-xtra"><div class="f2"><div class="fld" style="margin:0"><label>Rolle / Role</label><input value="'+esc(data.role||'')+'" oninput="updItem(\'projects\',\''+id+'\',\'role\',this.value)" placeholder="Lead Dev"></div>'+
    '<div class="fld" style="margin:0"><label>Impact</label><input value="'+esc(data.impact||'')+'" oninput="updItem(\'projects\',\''+id+'\',\'impact\',this.value)" placeholder="+40% Perf"></div></div></div>';
  list.appendChild(div);
}
function addExp(data){
  var id='e'+ic++;if(!data)data={};
  D.experience.push({id:id,title:data.title||'',company:data.company||'',period:data.period||'',location:data.location||'',bullets:data.bullets||'',description:data.description||''});
  var list=document.getElementById('exp-list');var div=document.createElement('div');div.className='tlc';
  div.innerHTML='<button class="card-del" onclick="rmItem(\'experience\',\''+id+'\',this)">✕</button>'+
    '<div class="f2" style="margin-bottom:8px"><div class="fld" style="margin:0"><label>Position / المنصب</label><input value="'+esc(data.title||'')+'" oninput="updItem(\'experience\',\''+id+'\',\'title\',this.value)" placeholder="Senior Developer"></div>'+
    '<div class="fld" style="margin:0"><label>Unternehmen / Company / الشركة</label><input value="'+esc(data.company||'')+'" oninput="updItem(\'experience\',\''+id+'\',\'company\',this.value)" placeholder="Musterfirma GmbH"></div></div>'+
    '<div class="f2" style="margin-bottom:8px"><div class="fld" style="margin:0"><label>Zeitraum / Period / الفترة</label><input value="'+esc(data.period||'')+'" oninput="updItem(\'experience\',\''+id+'\',\'period\',this.value)" placeholder="2022 – heute"></div>'+
    '<div class="fld" style="margin:0"><label>Ort / Location</label><input value="'+esc(data.location||'')+'" oninput="updItem(\'experience\',\''+id+'\',\'location\',this.value)" placeholder="Frankfurt / Remote"></div></div>'+
    '<div class="fld" style="margin:0"><label>Highlights (pro Zeile)</label><textarea rows="3" oninput="updItem(\'experience\',\''+id+'\',\'bullets\',this.value)" placeholder="Microservices migriert&#10;CI/CD reduziert">'+esc(data.bullets||'')+'</textarea></div>'+
    '<button class="card-xbtn" onclick="toggleX(this)">+ Beschreibung</button>'+
    '<div class="card-xtra"><div class="fld" style="margin:0"><label>Detailbeschreibung</label><textarea rows="3" oninput="updItem(\'experience\',\''+id+'\',\'description\',this.value)" placeholder="Tätigkeiten, Technologien...">'+esc(data.description||'')+'</textarea></div></div>';
  list.appendChild(div);
}
function addEdu(data){
  var id='ed'+ic++;if(!data)data={};
  D.education.push({id:id,degree:data.degree||'',school:data.school||'',year:data.year||'',grade:data.grade||'',description:data.description||''});
  var list=document.getElementById('edu-list');var div=document.createElement('div');div.className='tlc';
  div.innerHTML='<button class="card-del" onclick="rmItem(\'education\',\''+id+'\',this)">✕</button>'+
    '<div class="f2" style="margin-bottom:8px"><div class="fld" style="margin:0"><label>Abschluss / Degree / الدرجة</label><input value="'+esc(data.degree||'')+'" oninput="updItem(\'education\',\''+id+'\',\'degree\',this.value)" placeholder="B.Sc. Informatik"></div>'+
    '<div class="fld" style="margin:0"><label>Hochschule / University / الجامعة</label><input value="'+esc(data.school||'')+'" oninput="updItem(\'education\',\''+id+'\',\'school\',this.value)" placeholder="Goethe-Universität Frankfurt"></div></div>'+
    '<div class="f2" style="margin-bottom:8px"><div class="fld" style="margin:0"><label>Jahr / Year / السنة</label><input value="'+esc(data.year||'')+'" oninput="updItem(\'education\',\''+id+'\',\'year\',this.value)" placeholder="2018 – 2022"></div>'+
    '<div class="fld" style="margin:0"><label>Note / Grade</label><input value="'+esc(data.grade||'')+'" oninput="updItem(\'education\',\''+id+'\',\'grade\',this.value)" placeholder="1,8 · gut"></div></div>';
  list.appendChild(div);
}
function addCourse(data){
  var id='c'+ic++;if(!data)data={};
  D.courses.push({id:id,name:data.name||'',provider:data.provider||'',year:data.year||''});
  var list=document.getElementById('course-list');var div=document.createElement('div');div.className='tlc';
  div.innerHTML='<button class="card-del" onclick="rmItem(\'courses\',\''+id+'\',this)">✕</button>'+
    '<div class="f3"><div class="fld" style="margin:0"><label>Kurs / Zertifikat</label><input value="'+esc(data.name||'')+'" oninput="updItem(\'courses\',\''+id+'\',\'name\',this.value)" placeholder="AWS Solutions Architect"></div>'+
    '<div class="fld" style="margin:0"><label>Anbieter / Provider</label><input value="'+esc(data.provider||'')+'" oninput="updItem(\'courses\',\''+id+'\',\'provider\',this.value)" placeholder="Amazon / Coursera"></div>'+
    '<div class="fld" style="margin:0"><label>Jahr</label><input value="'+esc(data.year||'')+'" oninput="updItem(\'courses\',\''+id+'\',\'year\',this.value)" placeholder="2024"></div></div>';
  list.appendChild(div);
}
function addAward(data){
  var id='aw'+ic++;if(!data)data={};
  if(!D.awards)D.awards=[];
  D.awards.push({id:id,title:data.title||'',org:data.org||'',year:data.year||''});
  var list=document.getElementById('award-list');var div=document.createElement('div');div.className='award-card';
  div.innerHTML='<button class="card-del" onclick="rmItem(\'awards\',\''+id+'\',this)">✕</button>'+
    '<div class="f3"><div class="fld" style="margin:0"><label>Auszeichnung / Award / الجائزة</label><input value="'+esc(data.title||'')+'" oninput="updItem(\'awards\',\''+id+'\',\'title\',this.value)" placeholder="Best Innovation Award"></div>'+
    '<div class="fld" style="margin:0"><label>Organisation</label><input value="'+esc(data.org||'')+'" oninput="updItem(\'awards\',\''+id+'\',\'org\',this.value)" placeholder="Google / IEEE"></div>'+
    '<div class="fld" style="margin:0"><label>Jahr</label><input value="'+esc(data.year||'')+'" oninput="updItem(\'awards\',\''+id+'\',\'year\',this.value)" placeholder="2024"></div></div>';
  list.appendChild(div);
}
function addTestimonial(data){
  var id='t'+ic++;if(!data)data={};
  if(!D.testimonials)D.testimonials=[];
  D.testimonials.push({id:id,text:data.text||'',author:data.author||'',role:data.role||''});
  var list=document.getElementById('test-list');var div=document.createElement('div');div.className='test-card';
  div.innerHTML='<button class="card-del" onclick="rmItem(\'testimonials\',\''+id+'\',this)">✕</button>'+
    '<div class="fld" style="margin:0"><label>Zitat / Quote / الاقتباس</label><textarea rows="2" oninput="updItem(\'testimonials\',\''+id+'\',\'text\',this.value)" placeholder="\'Max ist einer der besten Entwickler, mit denen ich je zusammengearbeitet habe.\'">'+esc(data.text||'')+'</textarea></div>'+
    '<div class="f2"><div class="fld" style="margin:0;margin-top:6px"><label>Name</label><input value="'+esc(data.author||'')+'" oninput="updItem(\'testimonials\',\''+id+'\',\'author\',this.value)" placeholder="Dr. Maria Müller"></div>'+
    '<div class="fld" style="margin:0;margin-top:6px"><label>Position / Rolle</label><input value="'+esc(data.role||'')+'" oninput="updItem(\'testimonials\',\''+id+'\',\'role\',this.value)" placeholder="CTO, TechCorp"></div></div>';
  list.appendChild(div);
}
function toggleX(btn){var x=btn.nextElementSibling;x.classList.toggle('open');btn.textContent=x.classList.contains('open')?'− Weniger':'+ Mehr Details';}
function rmItem(type,id,btn){D[type]=D[type].filter(function(x){return x.id!==id;});var c=btn.closest('.pc,.tlc,.award-card,.test-card');if(c)c.remove();lr();}
function updItem(type,id,field,val){var item=D[type].find(function(x){return x.id===id;});if(item)item[field]=val;lr();}
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

// FILL
function fillExtracted(p){
  var map={fn:'i-fn',ln:'i-ln',title:'i-title',tagline:'i-tag',bio:'i-bio',highlight:'i-hl',availability:'i-avail',email:'i-email',phone:'i-phone',github:'i-gh',linkedin:'i-li',website:'i-web',location:'i-loc',xing:'i-xing',interests:'i-interests'};
  for(var k in map){if(p[k]){D[k]=p[k];var el=document.getElementById(map[k]);if(el)el.value=p[k];}}
  if(p.skills){['tech','soft','lang','cert'].forEach(function(c){if(p.skills[c]&&p.skills[c].length){D.skills[c]=(D.skills[c]||[]).concat(p.skills[c]);rTags(c+'-tags',c);}});}
  if(p.experience&&p.experience.length)p.experience.forEach(function(e){addExp(e);});
  if(p.education&&p.education.length)p.education.forEach(function(e){addEdu(e);});
  if(p.courses&&p.courses.length)p.courses.forEach(function(c){addCourse(c);});
  if(p.projects&&p.projects.length)p.projects.forEach(function(pr){addProject(pr);});
  if(p.awards&&p.awards.length)p.awards.forEach(function(a){addAward(a);});
  tlog('tok','  ✓ Felder befüllt / Fields filled / تم ملء الحقول');
}
function fillForm(){
  var map={fn:'i-fn',ln:'i-ln',title:'i-title',tagline:'i-tag',bio:'i-bio',highlight:'i-hl',availability:'i-avail',email:'i-email',phone:'i-phone',github:'i-gh',linkedin:'i-li',website:'i-web',location:'i-loc',xing:'i-xing',interests:'i-interests'};
  for(var k in map){var el=document.getElementById(map[k]);if(el)el.value=D[k]||'';}
  ['tech','soft','lang','cert'].forEach(function(c){rTags(c+'-tags',c);});
}
function fileUp(e,type){var f=e.target.files[0];if(f)processFile(f,type);}
function processFile(file,type){
  var st=document.getElementById(type+'-status');st.style.display='block';st.textContent='📂 Lese...';
  tlog('tp','$ folio --extract --type='+type);tlog('tc','  '+file.name+' ('+Math.round(file.size/1024)+'KB)');
  // .pages is a zip — treat as binary, use vision
  if(file.type==='application/pdf'||file.name.match(/\.pdf$/i)){st.textContent='📄 PDF...';processPDF(file,type,st);}
  else if(file.name.match(/\.pages$/i)){st.textContent='📄 Pages → Vision KI...';processPDF(file,type,st);}
  else{var r=new FileReader();r.onload=function(ev){var text=ev.target.result;if(file.name.match(/\.html?$/i)){var tmp=document.createElement('div');tmp.innerHTML=text;text=tmp.innerText||tmp.textContent;}st.textContent='🤖 KI...';aiExtract(text,type,st);};r.readAsText(file,'UTF-8');}
}
async function processPDF(file,type,st){
  if(!window.pdfjsLib){
    await new Promise(function(res,rej){
      var s=document.createElement('script');
      s.src='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      s.onload=function(){
        if(window.pdfjsLib&&!window.pdfjsLib.GlobalWorkerOptions.workerSrc)
          window.pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        res();
      };
      s.onerror=rej;
      document.head.appendChild(s);
    });
  }
  try{
    var buf=await file.arrayBuffer();
    var pdf=await window.pdfjsLib.getDocument({data:buf}).promise;
    var pages=Math.min(pdf.numPages,4);
    tlog('to','  PDF: '+pdf.numPages+' Seite(n)');
    // Try text extraction first (fast, no API needed)
    var allText='';
    st.textContent='📄 Text extrahieren...';
    for(var i=1;i<=pages;i++){
      var pg=await pdf.getPage(i);
      var tc=await pg.getTextContent();
      var pageText=tc.items.map(function(it){return it.str;}).join(' ');
      allText+=pageText+'\n';
      tlog('to','  ✓ Seite '+i+'/'+pages+' ('+pageText.length+' Zeichen)');
    }
    allText=allText.trim();
    if(allText.length > 80){
      // We have readable text — try AI, fall back to regex
      tlog('to','  Text-Extraktion: '+allText.length+' Zeichen — versuche KI...');
      await aiExtract(allText,type,st);
    } else {
      // No readable text (scanned PDF) — render to images for vision
      st.textContent='🖼 Scanned PDF → Vision KI...';
      tlog('to','  Kein Text gefunden → Vision-Modus');
      var imgs=[];
      for(var j=1;j<=pages;j++){
        var pg2=await pdf.getPage(j);
        var vp=pg2.getViewport({scale:1.5});
        var cv2=document.createElement('canvas');cv2.width=vp.width;cv2.height=vp.height;
        await pg2.render({canvasContext:cv2.getContext('2d'),viewport:vp}).promise;
        imgs.push(cv2.toDataURL('image/jpeg',.82).split(',')[1]);
      }
      await aiVision(imgs,type,st);
    }
  }catch(err){
    st.textContent='⚠️ PDF-Fehler: '+err.message;
    tlog('te','  ✗ '+err.message);
  }
}

// SMART REGEX FALLBACK — extracts CV data without any API
function regexExtract(text){
  var p={fn:'',ln:'',title:'',bio:'',email:'',phone:'',location:'',website:'',github:'',linkedin:'',
         availability:'',tagline:'',highlight:'',
         skills:{tech:[],soft:[],lang:[],cert:[]},
         experience:[],education:[],courses:[],projects:[],awards:[]};
  // Name: first 2 capitalized words near top of doc
  var nameM=text.match(/^([A-ZÄÖÜ][a-zäöü]+)\s+([A-ZÄÖÜ][a-zäöü]+(?:\s+[A-ZÄÖÜ][a-zäöü]+)?)/m);
  if(nameM){p.fn=nameM[1];p.ln=nameM[2];}
  // Email
  var emM=text.match(/\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/);
  if(emM)p.email=emM[0];
  // Phone (German format)
  var phM=text.match(/(\+49[\s\-]?|0)[\d][\d\s\-/]{7,15}/);
  if(phM)p.phone=phM[0].trim();
  // Website
  var webM=text.match(/https?:\/\/[^\s"<>]+|www\.[^\s"<>]+/i);
  if(webM)p.website=webM[0];
  // GitHub
  var ghM=text.match(/github\.com\/([^\s/"<>]+)/i);
  if(ghM)p.github='github.com/'+ghM[1];
  // LinkedIn
  var liM=text.match(/linkedin\.com\/in\/([^\s/"<>]+)/i);
  if(liM)p.linkedin='linkedin.com/in/'+liM[1];
  // Location / Address
  var locM=text.match(/(\d{5})\s+([A-ZÄÖÜ][a-zäöü]+(?:\s+[A-ZÄÖÜ][a-zäöü]+)?)/);
  if(locM)p.location=locM[2]+' (PLZ '+locM[1]+')';
  // Title / Berufsbezeichnung (line after name, usually)
  var lines=text.split('\n').map(function(l){return l.trim();}).filter(function(l){return l.length>3;});
  if(lines.length>1)p.title=lines[1].substring(0,80);
  // Bio: paragraph starting with "Ich " or "Technik" or 3+ sentences
  var bioM=text.match(/(Ich\s+[^.]{40,300}\.|Technik[^.]{40,300}\.)/);
  if(bioM)p.bio=bioM[0].trim();
  else{
    // Take first long paragraph
    var paras=text.split(/\n{2,}/);
    for(var i=0;i<paras.length;i++){
      if(paras[i].length>80&&paras[i].length<600&&!paras[i].match(/^[A-ZÄÖÜ\s]{5,}$/)){
        p.bio=paras[i].replace(/\s+/g,' ').trim();break;
      }
    }
  }
  // Skills: look for HTML/CSS, Python, JavaScript, etc.
  var techKw=['HTML','CSS','JavaScript','Python','Java','C\\+\\+','C#','React','Vue','Node','SQL','PHP','TypeScript','Swift','Kotlin','Go','Rust','Docker','Git','Linux','Windows','Excel','Word','PowerPoint','Figma','Photoshop','MATLAB','R\\b','Bash','REST','API','AWS','Azure','GCP'];
  techKw.forEach(function(kw){
    var r=new RegExp('\\b'+kw+'\\b','i');
    if(r.test(text)&&p.skills.tech.indexOf(kw.replace(/\\/g,''))<0)p.skills.tech.push(kw.replace(/\\/g,''));
  });
  // Soft Skills keywords
  var softKw=['Lernbereitschaft','Teamfähigkeit','Kommunikation','Problemlösung','Analytisch','Kreativ','Selbstständig','Zuverlässig','Organisiert','Flexibel','Eigeninitiative','Strukturiert','Entscheidungsfindung'];
  softKw.forEach(function(kw){if(new RegExp(kw,'i').test(text))p.skills.soft.push(kw);});
  // Languages
  var langKw=[['Deutsch','German'],['Englisch','English'],['Arabisch','Arabic'],['Französisch','French'],['Spanisch','Spanish'],['Türkisch','Turkish'],['Russisch','Russian'],['Chinesisch','Chinese']];
  langKw.forEach(function(lp){
    if(new RegExp(lp[0],'i').test(text)||new RegExp(lp[1],'i').test(text)){
      var lvM=text.match(new RegExp(lp[0]+'[^\\n]{0,40}(Mutterspra|C[12]|B[12]|A[12]|Fortgeschr|Basic|Nativ|Fluent|Native|Proficient)','i'));
      var level=lvM?lvM[1].substring(0,12):'';
      p.skills.lang.push(lp[0]+(level?' ('+level+')':''));
    }
  });
  // Experience blocks
  var expSections=text.split(/BERUFSERFAHRUNG|EXPERIENCE|ARBEITSERFAHRUNG/i);
  if(expSections.length>1){
    var expText=expSections[1].split(/AUSBILDUNG|BILDUNG|EDUCATION|STUDIUM|SKILLS|KOMPETEN/i)[0];
    var jobBlocks=expText.split(/\n{2,}/);
    jobBlocks.forEach(function(block){
      var bl=block.trim();
      if(bl.length<15)return;
      var periodM=bl.match(/(Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember|Jan|Feb|Mär|Apr|Jun|Jul|Aug|Sep|Okt|Nov|Dez|[A-Z][a-z]+)\s*\d{4}\s*[–\-]\s*(.*?\d{4}|heute|present)/i);
      var period=periodM?periodM[0]:'';
      var blines=bl.split('\n').filter(function(l){return l.trim().length>3;});
      if(blines[0]&&blines[0].length<80){
        p.experience.push({title:blines[0].trim(),company:blines[1]?blines[1].trim():'',period:period,bullets:blines.slice(2).join(' · ').substring(0,200),description:''});
      }
    });
  }
  // Education blocks
  var eduSections=text.split(/AUSBILDUNG|BILDUNG|EDUCATION|STUDIUM/i);
  if(eduSections.length>1){
    var eduText=eduSections[1].split(/BERUFSERFAHRUNG|SKILLS|KOMPETEN|SPRACHEN|INTERESTS|KONTAKT/i)[0];
    var eduBlocks=eduText.split(/\n{2,}/);
    eduBlocks.forEach(function(block){
      var bl=block.trim();
      if(bl.length<10)return;
      var yearM=bl.match(/\d{4}\s*[–\-]\s*(\d{4}|heute|present)/i);
      var year=yearM?yearM[0]:'';
      var blines=bl.split('\n').filter(function(l){return l.trim().length>3;});
      if(blines[0]&&blines[0].length<120){
        p.education.push({degree:blines[0].trim(),school:blines[1]?blines[1].trim():'',year:year,grade:'',description:''});
      }
    });
  }
  // Führerschein → cert
  if(/Führerschein/i.test(text)){var fsM=text.match(/Führerschein[:\s]+([A-Z,\s]+)/i);p.skills.cert.push('Führerschein'+(fsM?' '+fsM[1].trim().substring(0,10):''));}
  // Interests
  var intM=text.match(/INTERESSEN[^]*?(?=\n[A-ZÄÖÜ]{4,}|$)/i);
  if(intM){
    var intText=intM[0].replace(/INTERESSEN/i,'').trim();
    // Extract individual interests (often as tags)
    var tags=intText.match(/[A-ZÄÖÜ][a-zäöü\s&()]+/g)||[];
    if(tags.length)p.interests=tags.slice(0,8).join(', ');
  }
  // Availability
  if(/sofort verfügbar|available immediately|ab sofort/i.test(text))p.availability='Ab sofort verfügbar';
  return p;
}

async function aiVision(imgs,type,st){
  var isCV=type==='cv';
  var prompt=isCV?'Extract CV/Resume data. Detect language (Arabic, German, English). Return JSON only: {"fn":"","ln":"","title":"","bio":"","tagline":"","availability":"","email":"","phone":"","github":"","linkedin":"","website":"","location":"","skills":{"tech":[],"soft":[],"lang":[],"cert":[]},"experience":[{"title":"","company":"","period":"","location":"","bullets":"","description":""}],"education":[{"degree":"","school":"","year":"","grade":"","description":""}],"courses":[{"name":"","provider":"","year":""}],"projects":[{"name":"","desc":"","tech":"","url":"","impact":""}],"awards":[{"title":"","org":"","year":""}]}. JSON ONLY.':'Extract: tagline, bio_addition, highlight. JSON: {"tagline":"","bio_addition":"","highlight":""}. JSON ONLY.';
  var content=imgs.map(function(b){return {type:'image',source:{type:'base64',media_type:'image/jpeg',data:b}};});
  content.push({type:'text',text:prompt});
  try{
    var res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1800,messages:[{role:'user',content:content}]})});
    var data=await res.json();if(data.error)throw new Error(data.error.message);
    var raw=data.content.map(function(c){return c.text||'';}).join('').replace(/```json|```/g,'').trim();
    var p=JSON.parse(raw);
    if(isCV){fillExtracted(p);st.textContent='✅ KI-Extraktion erfolgreich!';}
    else{if(p.tagline&&!D.tagline){D.tagline=p.tagline;var e=document.getElementById('i-tag');if(e)e.value=p.tagline;}st.textContent='✅ Verarbeitet!';}
    tlog('tok','  ✓ Vision OK');lr();
  }catch(err){
    var isNet=(err.message||'').toLowerCase().match(/fetch|failed|network|cors/);
    tlog('te','  ✗ '+err.message+(isNet?' → Fallback-Extraktion':' → Überprüfe API'));
    if(isNet){
      st.textContent='⚡ KI offline → Auto-Analyse läuft...';
      // We can't do regex on images, show helpful message
      st.textContent='⚠️ KI nicht verfügbar. Für PDF-Vision öffne die Seite über Claude.ai. Text-PDFs werden auch ohne KI erkannt.';
      st.style.color='var(--blue)';
    } else {
      st.textContent='⚠️ '+err.message;
    }
  }
}

async function aiExtract(text,type,st){
  var prompt=type==='cv'
    ?'Extract CV data. Detect language. JSON only: {"fn":"","ln":"","title":"","bio":"","tagline":"","availability":"","email":"","phone":"","github":"","linkedin":"","website":"","location":"","skills":{"tech":[],"soft":[],"lang":[],"cert":[]},"experience":[{"title":"","company":"","period":"","location":"","bullets":"","description":""}],"education":[{"degree":"","school":"","year":"","grade":"","description":""}],"courses":[{"name":"","provider":"","year":""}],"projects":[{"name":"","desc":"","tech":"","url":"","impact":""}],"awards":[{"title":"","org":"","year":""}]}. JSON ONLY.\n\n'+text.substring(0,3500)
    :'Extract tagline, bio_addition, highlight. JSON: {"tagline":"","bio_addition":"","highlight":""}. JSON ONLY.\n\n'+text.substring(0,2000);
  try{
    var res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1500,messages:[{role:'user',content:prompt}]})});
    if(!res.ok)throw new Error('HTTP '+res.status);
    var data=await res.json();
    if(data.error)throw new Error(data.error.message);
    var raw=data.content.map(function(c){return c.text||'';}).join('').replace(/```json|```/g,'').trim();
    var p=JSON.parse(raw);
    if(type==='cv'){fillExtracted(p);st.textContent='✅ KI-Extraktion erfolgreich!';}
    else{if(p.tagline&&!D.tagline){D.tagline=p.tagline;var e=document.getElementById('i-tag');if(e)e.value=p.tagline;}st.textContent='✅ Verarbeitet!';}
    tlog('tok','  ✓ KI fertig');lr();
  }catch(err){
    var isNet=(err.message||'').toLowerCase().match(/fetch|failed|network|http 4|http 0|cors/);
    tlog('tw','  ↻ KI nicht verfügbar ('+err.message+') → Regex-Fallback');
    if(type==='cv'){
      // SMART FALLBACK: regex-based extraction, no API needed
      st.textContent='⚡ Auto-Analyse (ohne KI)...';
      try{
        var p2=regexExtract(text);
        fillExtracted(p2);
        var filled=[p2.fn,p2.email,p2.phone,p2.location].filter(function(v){return v&&v.length>0;}).length;
        st.textContent='✅ Auto-Analyse: '+filled+' Felder erkannt'+(isNet?' · KI via Claude.ai für vollständige Extraktion':'');
        st.style.color='var(--mint)';
        tlog('tok','  ✓ Regex-Fallback: '+filled+' Felder');
        lr();
      }catch(e2){
        st.textContent='⚠️ Bitte Daten manuell eingeben (Schritt 2)';
        tlog('te','  ✗ Fallback: '+e2.message);
      }
    } else {
      st.textContent='⚠️ KI nicht verfügbar — bitte manuell ergänzen';
    }
  }
}
function tlog(cls,msg){var b=document.getElementById('term-body');if(!b)return;var d=document.createElement('div');d.className='tl';d.innerHTML='<span class="'+cls+'">'+msg+'</span>';b.appendChild(d);b.scrollTop=b.scrollHeight;}

// JSON / INDEX EXPORT
function exportJSON(){
  syncD();
  var full=JSON.parse(JSON.stringify(D));
  full._meta={lang:lang,style:pStyle,accent:accent,font:fontChoice,exportDate:new Date().toISOString(),version:'folio-v2'};
  var j=JSON.stringify(full,null,2);
  var a=document.getElementById('json-area');if(a)a.value=j;
  dl(j,'folio-data.json','application/json');
  toast('✓ JSON exportiert');
}
function importJSON(){
  var a=document.getElementById('json-area');if(!a)return;
  try{
    var p=JSON.parse(a.value);
    if(p._meta){if(p._meta.lang)lang=p._meta.lang;if(p._meta.style)pStyle=p._meta.style;if(p._meta.accent)accent=p._meta.accent;if(p._meta.font)fontChoice=p._meta.font;delete p._meta;}
    fillExtracted(p);fillForm();applyUILang();setStyle(pStyle);lr();toast('✓ Importiert');
  }catch(e){alert('⚠️ Ungültiges JSON / Invalid JSON');}
}
function exportIndexHTML(){
  syncD();
  var html=buildPortfolio(true);
  var name=(D.fn+'-'+D.ln).toLowerCase().replace(/\s+/g,'-')||'portfolio';
  dl(html,'index.html','text/html');
  toast('✓ index.html exportiert — hosting-ready');
}
function exportAllBundle(){
  syncD();
  dlPortfolio();
  setTimeout(function(){exportJSON();},300);
  if(genCV)setTimeout(function(){dl(genCV,'lebenslauf.html','text/html');},600);
  toast('✓ Bundle exportiert');
}

// TAGS
function tagKey(e,boxId,inpId){
  if(e.key==='Enter'||e.key===','){e.preventDefault();var inp=document.getElementById(inpId);var val=inp.value.replace(/,$/,'').trim();if(!val)return;var cat=boxId.replace('-tags','');if(!D.skills[cat])D.skills[cat]=[];D.skills[cat].push(val);inp.value='';rTags(boxId,cat);lr();showTagSugs();}
  if(e.key==='Backspace'&&document.getElementById(inpId).value===''){var c=boxId.replace('-tags','');if(D.skills[c]&&D.skills[c].length){D.skills[c].pop();rTags(boxId,c);lr();}}
}
function rTags(boxId,cat){
  var box=document.getElementById(boxId);if(!box)return;
  var inpId=boxId.replace('-tags','-inp');
  box.innerHTML=D.skills[cat].map(function(t,i){return '<span class="chip">'+t+'<button class="chip-x" onclick="rmTag(\''+cat+'\','+i+')">×</button></span>';}).join('')+'<input class="tag-inp" id="'+inpId+'" onkeydown="tagKey(event,\''+boxId+'\',\''+inpId+'\')">';
}
function rmTag(cat,i){D.skills[cat].splice(i,1);rTags(cat+'-tags',cat);lr();}

// CARDS
function addProject(data){
  var id='p'+ic++;if(!data)data={};
  D.projects.push({id:id,name:data.name||'',desc:data.desc||'',tech:data.tech||'',url:data.url||'',role:data.role||'',impact:data.impact||''});
  var list=document.getElementById('proj-list');var div=document.createElement('div');div.className='pc';div.id='pc-'+id;
  div.innerHTML='<button class="card-del" onclick="rmItem(\'projects\',\''+id+'\',this)">✕</button>'+
    '<div class="f2" style="margin-bottom:8px"><div class="fld" style="margin:0"><label>Projektname / Project Name</label><input value="'+esc(data.name||'')+'" oninput="updItem(\'projects\',\''+id+'\',\'name\',this.value)" placeholder="Portfolio Dashboard"></div>'+
    '<div class="fld" style="margin:0"><label>URL</label><input value="'+esc(data.url||'')+'" oninput="updItem(\'projects\',\''+id+'\',\'url\',this.value)" placeholder="github.com/..."></div></div>'+
    '<div class="fld" style="margin-bottom:8px"><label>Beschreibung / Description / الوصف</label><textarea rows="2" oninput="updItem(\'projects\',\''+id+'\',\'desc\',this.value)" placeholder="Was hast du gebaut?">'+esc(data.desc||'')+'</textarea></div>'+
    '<div class="fld" style="margin:0"><label>Tech Stack</label><input value="'+esc(data.tech||'')+'" oninput="updItem(\'projects\',\''+id+'\',\'tech\',this.value)" placeholder="React, TypeScript, AWS"></div>'+
    '<button class="card-xbtn" onclick="toggleX(this)">+ Rolle & Impact</button>'+
    '<div class="card-xtra"><div class="f2"><div class="fld" style="margin:0"><label>Rolle / Role</label><input value="'+esc(data.role||'')+'" oninput="updItem(\'projects\',\''+id+'\',\'role\',this.value)" placeholder="Lead Dev"></div>'+
    '<div class="fld" style="margin:0"><label>Impact</label><input value="'+esc(data.impact||'')+'" oninput="updItem(\'projects\',\''+id+'\',\'impact\',this.value)" placeholder="+40% Perf"></div></div></div>';
  list.appendChild(div);
}
function addExp(data){
  var id='e'+ic++;if(!data)data={};
  D.experience.push({id:id,title:data.title||'',company:data.company||'',period:data.period||'',location:data.location||'',bullets:data.bullets||'',description:data.description||''});
  var list=document.getElementById('exp-list');var div=document.createElement('div');div.className='tlc';
  div.innerHTML='<button class="card-del" onclick="rmItem(\'experience\',\''+id+'\',this)">✕</button>'+
    '<div class="f2" style="margin-bottom:8px"><div class="fld" style="margin:0"><label>Position / المنصب</label><input value="'+esc(data.title||'')+'" oninput="updItem(\'experience\',\''+id+'\',\'title\',this.value)" placeholder="Senior Developer"></div>'+
    '<div class="fld" style="margin:0"><label>Unternehmen / Company / الشركة</label><input value="'+esc(data.company||'')+'" oninput="updItem(\'experience\',\''+id+'\',\'company\',this.value)" placeholder="Musterfirma GmbH"></div></div>'+
    '<div class="f2" style="margin-bottom:8px"><div class="fld" style="margin:0"><label>Zeitraum / Period / الفترة</label><input value="'+esc(data.period||'')+'" oninput="updItem(\'experience\',\''+id+'\',\'period\',this.value)" placeholder="2022 – heute"></div>'+
    '<div class="fld" style="margin:0"><label>Ort / Location</label><input value="'+esc(data.location||'')+'" oninput="updItem(\'experience\',\''+id+'\',\'location\',this.value)" placeholder="Frankfurt / Remote"></div></div>'+
    '<div class="fld" style="margin:0"><label>Highlights (pro Zeile)</label><textarea rows="3" oninput="updItem(\'experience\',\''+id+'\',\'bullets\',this.value)" placeholder="Microservices migriert&#10;CI/CD reduziert">'+esc(data.bullets||'')+'</textarea></div>'+
    '<button class="card-xbtn" onclick="toggleX(this)">+ Beschreibung</button>'+
    '<div class="card-xtra"><div class="fld" style="margin:0"><label>Detailbeschreibung</label><textarea rows="3" oninput="updItem(\'experience\',\''+id+'\',\'description\',this.value)" placeholder="Tätigkeiten, Technologien...">'+esc(data.description||'')+'</textarea></div></div>';
  list.appendChild(div);
}
function addEdu(data){
  var id='ed'+ic++;if(!data)data={};
  D.education.push({id:id,degree:data.degree||'',school:data.school||'',year:data.year||'',grade:data.grade||'',description:data.description||''});
  var list=document.getElementById('edu-list');var div=document.createElement('div');div.className='tlc';
  div.innerHTML='<button class="card-del" onclick="rmItem(\'education\',\''+id+'\',this)">✕</button>'+
    '<div class="f2" style="margin-bottom:8px"><div class="fld" style="margin:0"><label>Abschluss / Degree / الدرجة</label><input value="'+esc(data.degree||'')+'" oninput="updItem(\'education\',\''+id+'\',\'degree\',this.value)" placeholder="B.Sc. Informatik"></div>'+
    '<div class="fld" style="margin:0"><label>Hochschule / University / الجامعة</label><input value="'+esc(data.school||'')+'" oninput="updItem(\'education\',\''+id+'\',\'school\',this.value)" placeholder="Goethe-Universität Frankfurt"></div></div>'+
    '<div class="f2" style="margin-bottom:8px"><div class="fld" style="margin:0"><label>Jahr / Year / السنة</label><input value="'+esc(data.year||'')+'" oninput="updItem(\'education\',\''+id+'\',\'year\',this.value)" placeholder="2018 – 2022"></div>'+
    '<div class="fld" style="margin:0"><label>Note / Grade</label><input value="'+esc(data.grade||'')+'" oninput="updItem(\'education\',\''+id+'\',\'grade\',this.value)" placeholder="1,8 · gut"></div></div>';
  list.appendChild(div);
}
function addCourse(data){
  var id='c'+ic++;if(!data)data={};
  D.courses.push({id:id,name:data.name||'',provider:data.provider||'',year:data.year||''});
  var list=document.getElementById('course-list');var div=document.createElement('div');div.className='tlc';
  div.innerHTML='<button class="card-del" onclick="rmItem(\'courses\',\''+id+'\',this)">✕</button>'+
    '<div class="f3"><div class="fld" style="margin:0"><label>Kurs / Zertifikat</label><input value="'+esc(data.name||'')+'" oninput="updItem(\'courses\',\''+id+'\',\'name\',this.value)" placeholder="AWS Solutions Architect"></div>'+
    '<div class="fld" style="margin:0"><label>Anbieter / Provider</label><input value="'+esc(data.provider||'')+'" oninput="updItem(\'courses\',\''+id+'\',\'provider\',this.value)" placeholder="Amazon / Coursera"></div>'+
    '<div class="fld" style="margin:0"><label>Jahr</label><input value="'+esc(data.year||'')+'" oninput="updItem(\'courses\',\''+id+'\',\'year\',this.value)" placeholder="2024"></div></div>';
  list.appendChild(div);
}
function addAward(data){
  var id='aw'+ic++;if(!data)data={};
  if(!D.awards)D.awards=[];
  D.awards.push({id:id,title:data.title||'',org:data.org||'',year:data.year||''});
  var list=document.getElementById('award-list');var div=document.createElement('div');div.className='award-card';
  div.innerHTML='<button class="card-del" onclick="rmItem(\'awards\',\''+id+'\',this)">✕</button>'+
    '<div class="f3"><div class="fld" style="margin:0"><label>Auszeichnung / Award / الجائزة</label><input value="'+esc(data.title||'')+'" oninput="updItem(\'awards\',\''+id+'\',\'title\',this.value)" placeholder="Best Innovation Award"></div>'+
    '<div class="fld" style="margin:0"><label>Organisation</label><input value="'+esc(data.org||'')+'" oninput="updItem(\'awards\',\''+id+'\',\'org\',this.value)" placeholder="Google / IEEE"></div>'+
    '<div class="fld" style="margin:0"><label>Jahr</label><input value="'+esc(data.year||'')+'" oninput="updItem(\'awards\',\''+id+'\',\'year\',this.value)" placeholder="2024"></div></div>';
  list.appendChild(div);
}
function addTestimonial(data){
  var id='t'+ic++;if(!data)data={};
  if(!D.testimonials)D.testimonials=[];
  D.testimonials.push({id:id,text:data.text||'',author:data.author||'',role:data.role||''});
  var list=document.getElementById('test-list');var div=document.createElement('div');div.className='test-card';
  div.innerHTML='<button class="card-del" onclick="rmItem(\'testimonials\',\''+id+'\',this)">✕</button>'+
    '<div class="fld" style="margin:0"><label>Zitat / Quote / الاقتباس</label><textarea rows="2" oninput="updItem(\'testimonials\',\''+id+'\',\'text\',this.value)" placeholder="\'Max ist einer der besten Entwickler, mit denen ich je zusammengearbeitet habe.\'">'+esc(data.text||'')+'</textarea></div>'+
    '<div class="f2"><div class="fld" style="margin:0;margin-top:6px"><label>Name</label><input value="'+esc(data.author||'')+'" oninput="updItem(\'testimonials\',\''+id+'\',\'author\',this.value)" placeholder="Dr. Maria Müller"></div>'+
    '<div class="fld" style="margin:0;margin-top:6px"><label>Position / Rolle</label><input value="'+esc(data.role||'')+'" oninput="updItem(\'testimonials\',\''+id+'\',\'role\',this.value)" placeholder="CTO, TechCorp"></div></div>';
  list.appendChild(div);
}
function toggleX(btn){var x=btn.nextElementSibling;x.classList.toggle('open');btn.textContent=x.classList.contains('open')?'− Weniger':'+ Mehr Details';}
function rmItem(type,id,btn){D[type]=D[type].filter(function(x){return x.id!==id;});var c=btn.closest('.pc,.tlc,.award-card,.test-card');if(c)c.remove();lr();}
function updItem(type,id,field,val){var item=D[type].find(function(x){return x.id===id;});if(item)item[field]=val;lr();}
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

// FILL
function fillExtracted(p){
  var map={fn:'i-fn',ln:'i-ln',title:'i-title',tagline:'i-tag',bio:'i-bio',highlight:'i-hl',availability:'i-avail',email:'i-email',phone:'i-phone',github:'i-gh',linkedin:'i-li',website:'i-web',location:'i-loc',xing:'i-xing',interests:'i-interests'};
  for(var k in map){if(p[k]){D[k]=p[k];var el=document.getElementById(map[k]);if(el)el.value=p[k];}}
  if(p.skills){['tech','soft','lang','cert'].forEach(function(c){if(p.skills[c]&&p.skills[c].length){D.skills[c]=(D.skills[c]||[]).concat(p.skills[c]);rTags(c+'-tags',c);}});}
  if(p.experience&&p.experience.length)p.experience.forEach(function(e){addExp(e);});
  if(p.education&&p.education.length)p.education.forEach(function(e){addEdu(e);});
  if(p.courses&&p.courses.length)p.courses.forEach(function(c){addCourse(c);});
  if(p.projects&&p.projects.length)p.projects.forEach(function(pr){addProject(pr);});
  if(p.awards&&p.awards.length)p.awards.forEach(function(a){addAward(a);});
  tlog('tok','  ✓ Felder befüllt / Fields filled / تم ملء الحقول');
}
function fillForm(){
  var map={fn:'i-fn',ln:'i-ln',title:'i-title',tagline:'i-tag',bio:'i-bio',highlight:'i-hl',availability:'i-avail',email:'i-email',phone:'i-phone',github:'i-gh',linkedin:'i-li',website:'i-web',location:'i-loc',xing:'i-xing',interests:'i-interests'};
  for(var k in map){var el=document.getElementById(map[k]);if(el)el.value=D[k]||'';}
  ['tech','soft','lang','cert'].forEach(function(c){rTags(c+'-tags',c);});
}
function syncD(){
  var m={fn:'i-fn',ln:'i-ln',title:'i-title',tagline:'i-tag',bio:'i-bio',highlight:'i-hl',availability:'i-avail',email:'i-email',phone:'i-phone',github:'i-gh',linkedin:'i-li',website:'i-web',location:'i-loc',xing:'i-xing',extra:'i-extra',interests:'i-interests'};
  for(var k in m){var el=document.getElementById(m[k]);if(el)D[k]=el.value;}
}

// STYLE
function setStyle(s){
  pStyle=s;['noir','solaire','cyber','mono','aurora','slate'].forEach(function(x){var c=document.getElementById('stc-'+x);if(c)c.classList.toggle('sel',x===s);});
  buildSwatches();lr();
}
function setFont(f){fontChoice=f;document.querySelectorAll('.font-opt').forEach(function(o){o.classList.toggle('sel',o.dataset.font===f);});lr();}
function setAnim(a){animChoice=a;lr();}
function setAccent(c){
  accent=c;
  var cc=document.getElementById('custom-color');if(cc)cc.value=c;
  var ch=document.getElementById('custom-hex');if(ch)ch.value=c;
  document.querySelectorAll('.pal-sw').forEach(function(s){s.classList.toggle('sel',s.dataset.hex===c);});
  buildSwatches();lr();
}
function hexInput(v){if(/^#[0-9a-fA-F]{6}$/.test(v))setAccent(v);}
function buildSwatches(){
  var pal=PAL[pStyle]||PAL.noir;
  var sr=document.getElementById('sw-row');if(sr)sr.innerHTML=pal.map(function(c){return '<div class="sw'+(c===accent?' sel':'')+'" style="background:'+c+'" onclick="setAccent(\''+c+'\')"></div>';}).join('');
  var pr=document.getElementById('pal-row');if(pr)pr.innerHTML=pal.map(function(c){return '<div class="pal-sw'+(c===accent?' sel':'')+'" data-hex="'+c+'" style="background:'+c+'" onclick="setAccent(\''+c+'\')"></div>';}).join('');
}

// AI POLISH
async function aiPolish(){
  syncD();var btn=event.target;btn.textContent='⟳...';btn.disabled=true;
  var langHint=lang==='ar'?'Arabic (العربية)':lang==='en'?'English':'German (Deutsch)';
  try{
    var p='Improve portfolio texts in '+langHint+'. Return ONLY JSON: {"tagline":"","bio":""}.\nName='+D.fn+' '+D.ln+', Title='+D.title+', Skills='+D.skills.tech.join(', ')+'\nTagline: '+D.tagline+'\nBio: '+D.bio;
    var r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:600,messages:[{role:'user',content:p}]})});
    var data=await r.json();var res=JSON.parse(data.content.map(function(c){return c.text||'';}).join('').replace(/```json|```/g,'').trim());
    if(res.tagline){D.tagline=res.tagline;var e=document.getElementById('i-tag');if(e)e.value=res.tagline;}
    if(res.bio){D.bio=res.bio;var e2=document.getElementById('i-bio');if(e2)e2.value=res.bio;}
    lr();toast('✨ KI-Texte angewendet');
  }catch(e){toast('⚠️ Fehler bei KI-Verbesserung');}
  btn.textContent='✨ KI verbessern';btn.disabled=false;
}

// AI SKILLS
async function aiSkills(){
  syncD();var btn=event.target;btn.textContent='⟳...';btn.disabled=true;
  try{
    var p='Suggest 8 relevant skills for: '+D.title+', '+profession+', existing: '+D.skills.tech.join(', ')+'. Return ONLY JSON: {"tech":[],"soft":[]}.';
    var r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:400,messages:[{role:'user',content:p}]})});
    var data=await r.json();var res=JSON.parse(data.content.map(function(c){return c.text||'';}).join('').replace(/```json|```/g,'').trim());
    ['tech','soft'].forEach(function(cat){
      var el=document.getElementById(cat+'-sugs');if(!el)return;
      var ex=D.skills[cat]||[];
      var sugs=(res[cat]||[]).filter(function(s){return !ex.includes(s);});
      el.innerHTML=sugs.map(function(sk){return '<span class="tag-sug" onclick="addSug(\''+cat+'\',\''+sk+'\')">+'+sk+'</span>';}).join('');
    });
    toast('✨ Vorschläge generiert');
  }catch(e){toast('⚠️ Fehler');}
  btn.textContent='✨ Vorschläge';btn.disabled=false;
}

// GENERATE CV — BUG FIXED: proper string construction
async function generateCV(tailored){
  syncD();aiSt('cv-gen-st','loading','⟳ Generiere Lebenslauf / CV / السيرة الذاتية...');
  var jd=tailored&&document.getElementById('job-desc')?document.getElementById('job-desc').value:'';
  if(tailored&&!jd){toast('⚠️ Bitte Stellenanzeige einfügen');aiSt('cv-gen-st','','');return;}
  var langHint=lang==='ar'?'Arabic':lang==='en'?'English':'German';
  var profileData=JSON.stringify({name:D.fn+' '+D.ln,title:D.title,bio:D.bio,skills:D.skills,experience:D.experience,education:D.education,awards:D.awards||[]});
  var jsonSchema='{"summary":"","experience":[{"title":"","company":"","period":"","bullets":[]}],"skills_text":"","highlight":"","matched_keywords":[]}';
  var p='Create professional '+langHint+' CV/resume. Optimize phrasing for ATS. Return ONLY JSON: '+jsonSchema+'\n\nProfile: '+profileData+(jd?'\n\nJob ad:\n'+jd.substring(0,1500):'');
  try{
    var r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1800,messages:[{role:'user',content:p}]})});
    var data=await r.json();if(data.error)throw new Error(data.error.message);
    var enh=JSON.parse(data.content.map(function(c){return c.text||'';}).join('').replace(/```json|```/g,'').trim());
    genCV=buildCVDoc(enh);
    var fr=document.getElementById('cv-prev-fr');if(fr)fr.srcdoc=genCV;
    document.getElementById('cv-prev').style.display='block';
    var kw=enh.matched_keywords||[];
    aiSt('cv-gen-st','ok','✓ '+(lang==='ar'?'السيرة الذاتية جاهزة':lang==='en'?'CV ready':'Lebenslauf fertig')+(kw.length?' · '+kw.slice(0,4).join(', '):''));
    toast('✓ CV generiert');
  }catch(err){aiSt('cv-gen-st','err','✗ '+err.message);}
}
function generateCVTailored(){generateCV(true);}
function aiSt(id,type,msg){var el=document.getElementById(id);if(!el)return;el.style.display=type?'block':'none';if(type){el.className='ai-st '+type;el.textContent=msg;}}

// GENERATE COVER LETTER (DE / EN / AR)
async function generateAnschreiben(l){
  syncD();
  var isAr=l==='ar';
  aiSt('cl-gen-st','loading','⟳ Generiere '+(isAr?'خطاب التقديم...':l==='en'?'Cover Letter...':'Anschreiben...'));
  var co=document.getElementById('cl-co')?document.getElementById('cl-co').value:'';
  var pos=document.getElementById('cl-pos')?document.getElementById('cl-pos').value:'';
  var ct=document.getElementById('cl-contact')?document.getElementById('cl-contact').value:'';
  var jd=document.getElementById('job-desc')?document.getElementById('job-desc').value:'';
  var p;
  if(isAr){
    p='اكتب خطاب تقديم وظيفي احترافياً بالعربية، 3-4 فقرات. أعد JSON فقط: {"text":"الفقرات مفصولة بـ \\n\\n","subject":"تقديم طلب لوظيفة [المنصب]"}\nالمتقدم: '+D.fn+' '+D.ln+', '+D.title+'\nالشركة: '+(co||'[الشركة]')+'\nالمنصب: '+(pos||D.title)+'\nالمهارات: '+D.skills.tech.slice(0,8).join('، ')+'\nالسيرة الذاتية: '+D.bio+(jd?'\nالوظيفة: '+jd.substring(0,800):'');
  } else if(l==='en'){
    p='Write professional English cover letter, 3-4 paragraphs. Return ONLY JSON: {"text":"paragraphs separated by \\n\\n","subject":"Application for [Position]"}\nApplicant: '+D.fn+' '+D.ln+', '+D.title+'\nCompany: '+(co||'[Company]')+'\nPosition: '+(pos||D.title)+'\nSkills: '+D.skills.tech.slice(0,8).join(', ')+'\nBio: '+D.bio+(jd?'\nJob: '+jd.substring(0,800):'');
  } else {
    p='Erstelle professionelles Anschreiben (DIN 5008, 3-4 Absätze). NUR JSON: {"text":"Absätze getrennt durch \\n\\n","subject":"Bewerbung als [Position]"}\nBewerber: '+D.fn+' '+D.ln+', '+D.title+'\nFirma: '+(co||'[Unternehmen]')+'\nPosition: '+(pos||D.title)+'\nAnsprechpartner: '+(ct||'Sehr geehrte Damen und Herren')+'\nSkills: '+D.skills.tech.slice(0,8).join(', ')+'\nBio: '+D.bio+(jd?'\nStelle: '+jd.substring(0,800):'');
  }
  try{
    var r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1200,messages:[{role:'user',content:p}]})});
    var data=await r.json();if(data.error)throw new Error(data.error.message);
    var parsed=JSON.parse(data.content.map(function(c){return c.text||'';}).join('').replace(/```json|```/g,'').trim());
    genCL=buildCLDoc(parsed,co,pos,ct,l);
    var fr=document.getElementById('cl-prev-fr');if(fr)fr.srcdoc=genCL;
    document.getElementById('cl-prev').style.display='block';
    aiSt('cl-gen-st','ok','✓ '+(isAr?'خطاب التقديم جاهز':l==='en'?'Cover Letter ready':'Anschreiben generiert'));
    toast('✓ '+(isAr?'خطاب التقديم':l==='en'?'Cover Letter':'Anschreiben')+' generiert');
  }catch(err){aiSt('cl-gen-st','err','✗ '+err.message);}
}

// BUILD CV DOCUMENT
function buildCVDoc(enh){
  syncD();var ac=accent,name=D.fn+' '+D.ln;
  var isAr=lang==='ar';
  var contacts=[D.email,D.phone,D.location,D.github,D.linkedin,D.website].filter(Boolean);
  var exp=(enh&&enh.experience)||D.experience;
  var summary=(enh&&enh.summary)||D.bio;
  var dir=isAr?'rtl':'ltr';
  var expH=exp.map(function(e){
    var buls=Array.isArray(e.bullets)?e.bullets:(e.bullets||'').split('\n').filter(Boolean);
    return '<div class="e"><div class="eh"><div><div class="et">'+e.title+'</div><div class="ec">'+e.company+(e.location?' · '+e.location:'')+'</div></div><div class="ep">'+e.period+'</div></div>'+(buls.length?'<ul class="el">'+buls.map(function(b){return '<li>'+b+'</li>';}).join('')+'</ul>':'')+(e.description?'<p class="ed">'+e.description+'</p>':'')+'</div>';
  }).join('');
  var eduH=D.education.map(function(e){
    return '<div class="e"><div class="eh"><div><div class="et">'+e.degree+'</div><div class="ec">'+e.school+(e.grade?' · '+e.grade:'')+'</div></div><div class="ep">'+e.year+'</div></div></div>';
  }).join('');
  var courseH=D.courses.map(function(c){return '<div class="co"><span class="con">'+c.name+'</span><span class="cop">'+c.provider+(c.year?' · '+c.year:'')+'</span></div>';}).join('');
  var projH=D.projects.slice(0,3).map(function(p){return '<div class="e"><div class="eh"><div><div class="et">'+p.name+'</div><div class="ec">'+p.tech+'</div></div>'+(p.url?'<span style="font-size:8pt;color:'+ac+'">'+p.url+'</span>':'')+'</div>'+(p.desc?'<p style="font-size:9.5pt;color:#333;margin-top:3px">'+p.desc+'</p>':'')+(p.impact?'<p style="font-size:8.5pt;color:'+ac+';margin-top:2px;font-weight:600">→ '+p.impact+'</p>':'')+'</div>';}).join('');
  var awardsH=(D.awards||[]).map(function(a){return '<div class="co"><span class="con">'+a.title+'</span><span class="cop">'+a.org+(a.year?' · '+a.year:'')+'</span></div>';}).join('');
  var sk=D.skills;
  var secLabels=isAr?{profile:'الملف الشخصي',exp:'الخبرة المهنية',edu:'التعليم',skills:'المهارات',proj:'المشاريع',courses:'الدورات',awards:'الجوائز',date:'تاريخ:'}:{profile:lang==='en'?'Profile':'Profil',exp:lang==='en'?'Experience':'Berufserfahrung',edu:lang==='en'?'Education':'Ausbildung',skills:lang==='en'?'Skills':'Kenntnisse',proj:lang==='en'?'Projects':'Projekte',courses:lang==='en'?'Courses':'Weiterbildungen',awards:lang==='en'?'Awards':'Auszeichnungen',date:lang==='en'?'Date:':'Stand:'};
  var fontFam=isAr?"'Noto Sans Arabic','Outfit',sans-serif":"'Outfit',sans-serif";
  return '<!DOCTYPE html><html lang="'+lang+'" dir="'+dir+'"><head><meta charset="UTF-8"><title>CV – '+name+'</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@700;800&family=JetBrains+Mono:wght@400&family=Noto+Sans+Arabic:wght@300;400;600;700&display=swap" rel="stylesheet">'+
  '<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'+fontFam+';color:#1a1a24;background:#fff;font-size:10.5pt;line-height:1.55;direction:'+dir+'}.page{max-width:794px;margin:0 auto;padding:42px 48px}.hdr{display:grid;grid-template-columns:1fr auto;gap:16px;align-items:start;margin-bottom:26px;padding-bottom:20px;border-bottom:2.5px solid '+ac+'}.nm{font-family:"Playfair Display",'+fontFam+';font-size:28pt;font-weight:800;line-height:1;color:#0d0d12;margin-bottom:5px;letter-spacing:-1px}.ttl{font-size:12pt;color:'+ac+';font-weight:600;margin-bottom:10px}.cts{display:flex;flex-wrap:wrap;gap:4px 16px;font-size:8.5pt;color:#555}.av{display:inline-block;font-size:7.5pt;font-family:"JetBrains Mono",monospace;background:'+ac+'15;color:'+ac+';border:1px solid '+ac+'44;padding:3px 9px;border-radius:20px;margin-top:7px}.qr{width:52px;height:52px;background:#f5f2ec;border:1px solid #e0dbd3;border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:6.5pt;color:#aaa;text-align:center;flex-shrink:0}.sec{margin-bottom:20px}.secttl{font-size:7.5pt;letter-spacing:3px;text-transform:uppercase;color:'+ac+';font-weight:700;margin-bottom:10px;padding-bottom:4px;border-bottom:1px solid '+ac+'28}.sum{font-size:10pt;line-height:1.7;color:#2d2d3c;font-weight:300}.e{margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid #f0ece4}.e:last-child{border-bottom:none}.eh{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px;gap:10px}.et{font-size:11pt;font-weight:700;color:#0d0d12}.ec{font-size:9pt;color:#666;margin-top:1px}.ep{font-size:8pt;color:'+ac+';white-space:nowrap;flex-shrink:0;font-weight:500}.el{padding-'+(isAr?'right':'left')+':15px;margin-top:4px;font-size:9.5pt;color:#333;line-height:1.65}.ed{font-size:9pt;color:#666;margin-top:5px;line-height:1.6;font-style:italic}.sr{margin-bottom:8px}.sl{font-size:8.5pt;font-weight:600;color:#333;margin-bottom:2px}.sv{font-size:9.5pt;color:#444;line-height:1.5}.co{display:flex;justify-content:space-between;font-size:9.5pt;padding:3px 0;border-bottom:1px solid #f5f2ec}.con{font-weight:500}.cop{color:#888;font-size:8.5pt}footer{margin-top:24px;padding-top:10px;border-top:1px solid #e5e0d8;font-size:7pt;color:#bbb;display:flex;justify-content:space-between}@media print{.page{padding:22px 28px;max-width:100%}@page{margin:.8cm 1.2cm;size:A4}}</style></head><body>'+
  '<div class="page">'+
  '<div class="hdr"><div>'+
  '<div class="nm">'+name+'</div>'+
  '<div class="ttl">'+D.title+'</div>'+
  '<div class="cts">'+contacts.map(function(c){return '<span>'+c+'</span>';}).join('')+'</div>'+
  (D.availability?'<div class="av">'+D.availability+'</div>':'')+
  '</div><div class="qr">Portfolio</div></div>'+
  (summary?'<div class="sec"><div class="secttl">'+secLabels.profile+'</div><div class="sum">'+summary+'</div></div>':'')+
  (expH?'<div class="sec"><div class="secttl">'+secLabels.exp+'</div>'+expH+'</div>':'')+
  (eduH?'<div class="sec"><div class="secttl">'+secLabels.edu+'</div>'+eduH+'</div>':'')+
  ((sk.tech&&sk.tech.length)?'<div class="sec"><div class="secttl">'+secLabels.skills+'</div>'+
    (sk.tech.length?'<div class="sr"><div class="sl">'+(isAr?'تقنيات':lang==='en'?'Technologies':'Technologien')+'</div><div class="sv">'+sk.tech.join(' · ')+'</div></div>':'')+
    (sk.soft&&sk.soft.length?'<div class="sr"><div class="sl">'+(isAr?'المهارات الشخصية':lang==='en'?'Soft Skills':'Soft Skills')+'</div><div class="sv">'+sk.soft.join(' · ')+'</div></div>':'')+
    (sk.lang&&sk.lang.length?'<div class="sr"><div class="sl">'+(isAr?'اللغات':lang==='en'?'Languages':'Sprachen')+'</div><div class="sv">'+sk.lang.join(' · ')+'</div></div>':'')+
    (sk.cert&&sk.cert.length?'<div class="sr"><div class="sl">'+(isAr?'الشهادات':lang==='en'?'Certificates':'Zertifikate')+'</div><div class="sv">'+sk.cert.join(' · ')+'</div></div>':'')+
  '</div>':'')+
  (D.projects.length?'<div class="sec"><div class="secttl">'+secLabels.proj+'</div>'+projH+'</div>':'')+
  (D.courses.length?'<div class="sec"><div class="secttl">'+secLabels.courses+'</div>'+courseH+'</div>':'')+
  (awardsH?'<div class="sec"><div class="secttl">'+secLabels.awards+'</div>'+awardsH+'</div>':'')+
  '<footer><span>'+name+' · '+D.title+'</span><span>'+secLabels.date+' '+new Date().toLocaleDateString(isAr?'ar-SA':lang==='en'?'en-GB':'de-DE')+'</span></footer>'+
  '</div></body></html>';
}

// BUILD COVER LETTER DOCUMENT
function buildCLDoc(data,co,pos,ct,l){
  syncD();var ac=accent,name=D.fn+' '+D.ln;
  var isAr=l==='ar';
  var dir=isAr?'rtl':'ltr';
  var today=new Date().toLocaleDateString(isAr?'ar-SA':l==='en'?'en-GB':'de-DE',{year:'numeric',month:'long',day:'numeric'});
  var pars=(data.text||'').split('\n\n').filter(Boolean);
  var subject=data.subject||((isAr?'طلب وظيفة ':l==='en'?'Application for ':'Bewerbung als ')+pos);
  var fontFam=isAr?"'Noto Sans Arabic','Outfit',sans-serif":"'Outfit',sans-serif";
  return '<!DOCTYPE html><html lang="'+l+'" dir="'+dir+'"><head><meta charset="UTF-8"><title>'+subject+'</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@700&family=Noto+Sans+Arabic:wght@300;400;600;700&display=swap" rel="stylesheet">'+
  '<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'+fontFam+';color:#1a1a24;background:#fff;font-size:10.5pt;line-height:1.6;direction:'+dir+'}.page{max-width:794px;margin:0 auto;padding:48px 54px}.sender{border-bottom:1.5px solid '+ac+';padding-bottom:14px;margin-bottom:26px;display:flex;justify-content:space-between;align-items:flex-end}.sn{font-size:17pt;font-weight:700;color:#0d0d12}.si{font-size:8.5pt;color:#666;line-height:1.8;text-align:'+(isAr?'left':'right')+'}.recv{margin-bottom:26px;font-size:10pt;color:#333;line-height:1.7}.recv-co{font-weight:600;font-size:11pt;margin-bottom:3px}.date{text-align:'+(isAr?'left':'right')+';font-size:9pt;color:#888;margin-bottom:20px}.subj{font-size:12pt;font-weight:700;color:#0d0d12;margin-bottom:18px;padding-bottom:10px;border-bottom:1px solid #eee}.body p{font-size:10.5pt;line-height:1.75;color:#2a2a38;margin-bottom:13px}.sig{margin-top:30px}.sc{font-size:10.5pt;margin-bottom:34px;color:#333}.sname{font-size:13pt;font-weight:700;color:#0d0d12}.stitl{font-size:9pt;color:'+ac+';margin-top:3px}footer{margin-top:22px;padding-top:8px;border-top:1px solid #f0ece4;font-size:7pt;color:#bbb;text-align:center}@media print{.page{padding:18px 26px;max-width:100%}@page{margin:1cm 1.5cm;size:A4}}</style></head><body>'+
  '<div class="page">'+
  '<div class="sender"><div><div class="sn">'+name+'</div><div style="font-size:8.5pt;color:'+ac+';font-weight:600;margin-top:1px">'+D.title+'</div></div><div class="si">'+[D.location,D.email,D.phone,D.website].filter(Boolean).join('<br>')+'</div></div>'+
  '<div class="recv"><div class="recv-co">'+(co||(isAr?'الشركة':'Unternehmen'))+'</div><div>'+(isAr?'إلى: ':'z.Hd. ')+(ct||(isAr?'قسم الموارد البشرية':l==='en'?'Hiring Team':'Personalabteilung'))+'</div></div>'+
  '<div class="date">'+D.location+', '+today+'</div>'+
  '<div class="subj">'+subject+'</div>'+
  '<div class="body">'+pars.map(function(p){return '<p>'+p+'</p>';}).join('')+'</div>'+
  '<div class="sig"><div class="sc">'+(isAr?'مع خالص التحيات،':l==='en'?'Sincerely,':'Mit freundlichen Grüßen,')+'</div><div class="sname">'+name+'</div><div class="stitl">'+D.title+'</div></div>'+
  '<footer>'+name+' · '+D.title+' · '+today+'</footer>'+
  '</div></body></html>';
}

// DOWNLOADS
function dl(content,fname,type){var b=new Blob([content],{type:type});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=fname;a.click();URL.revokeObjectURL(a.href);}
function dlPortfolio(){syncD();dl(buildPortfolio(true),'portfolio-'+(D.fn+'-'+D.ln).toLowerCase().replace(/\s+/g,'-')+'.html','text/html');toast('✓ Portfolio heruntergeladen');}
function dlCV(){
  if(!genCV){generateCV(false);setTimeout(function(){if(genCV)dl(genCV,'lebenslauf.html','text/html');},1500);return;}
  dl(genCV,'lebenslauf.html','text/html');toast('✓ Gespeichert — Strg+P für PDF');
}
function dlCL(){if(!genCL){toast('⚠️ Bitte Anschreiben generieren (Schritt 9)');return;}dl(genCL,'anschreiben.html','text/html');toast('✓ Gespeichert — Strg+P für PDF');}
function prevFull(){syncD();var w=window.open('','_blank');if(w){w.document.write(buildPortfolio(true));w.document.close();}}
function prevDocFull(t){var html=t==='cv'?genCV:genCL;if(!html){toast('⚠️ Bitte zuerst generieren');return;}var w=window.open('','_blank');if(w){w.document.write(html);w.document.close();}}
function lr(){syncD();var fr=document.getElementById('prev-fr');if(!fr)return;if(prevMode==='cv'&&genCV)fr.srcdoc=genCV;else fr.srcdoc=buildPortfolio(false);}

// EXPORT TERMINAL
function runExportTerm(){
  var term=document.getElementById('export-term');if(!term)return;term.innerHTML='';
  var ls=[{t:0,cls:'tp',txt:'$ folio --export --bundle --lang='+lang},{t:250,cls:'tc',txt:'  ⟳ Kompiliere Portfolio...'},{t:500,cls:'to',txt:'  [████████░░] Styles...'},{t:750,cls:'to',txt:'  [███████████] Assets...'},{t:1000,cls:'tok',txt:'  ✓ portfolio.html'},{t:1100,cls:'tok',txt:'  ✓ index.html (hosting-ready)'},{t:1300,cls:'tok',txt:'  ✓ Lebenslauf: '+(genCV?'bereit':'→ Schritt 9')},{t:1500,cls:'tok',txt:'  ✓ Anschreiben: '+(genCL?'bereit':'→ Schritt 9')},{t:1700,cls:'tok',txt:'  ✓ JSON exportierbar'}];
  ls.forEach(function(l){setTimeout(function(){var d=document.createElement('div');d.className='tl';d.innerHTML='<span class="'+l.cls+'">'+l.txt+'</span>';term.appendChild(d);term.scrollTop=term.scrollHeight;},l.t);});
}

// DEMO DATA
function loadDemo(){
  var d={fn:'Mahmoud',ln:'Al-Mosa',title:'Full-Stack Developer & DevOps Engineer',tagline:'Code. Deploy. Scale. Repeat.',bio:'Leidenschaftlicher Full-Stack-Entwickler mit Expertise in Cloud-Infrastruktur und modernen Web-Technologien. Ich verwandle komplexe Anforderungen in elegante, skalierbare Lösungen — von der Datenbank bis zum UI.',highlight:'Die beste Architektur ist die, die man nicht sieht.',availability:'Ab sofort verfügbar · Vollzeit · Remote-freundlich',email:'mahmoud@example.dev',phone:'+49 172 123 4567',github:'github.com/mahmoud',linkedin:'linkedin.com/in/mahmoud',website:'mahmoud.dev',location:'Frankfurt am Main',xing:'',extra:'',interests:'Open Source, Klettern, Arabische Literatur, Fotografie',photo:null,
  skills:{tech:['Python','TypeScript','React','Node.js','Docker','Kubernetes','PostgreSQL','AWS','FastAPI','Git','Linux','Redis'],soft:['Systemdesign','Team Leadership','Agile/Scrum','Code-Review','Mentoring'],lang:['Deutsch (C1)','Englisch (C1)','Arabisch (Muttersprache)'],cert:['AWS Solutions Architect','CKA']},
  projects:[{id:'p0',name:'CloudOps Dashboard',desc:'Echtzeit-Kubernetes-Monitoring mit Alerting-Pipeline und Kostenanalyse.',tech:'React, TypeScript, Python, Prometheus',url:'github.com/mahmoud/cloudops',role:'Lead Developer',impact:'+40% Transparenz, 60% schnellere Incidents'},{id:'p1',name:'DevFlow CI/CD',desc:'Vollautomatisierte Pipeline mit Blue-Green-Deployments.',tech:'Docker, Kubernetes, GitHub Actions, Helm',url:'github.com/mahmoud/devflow',role:'Sole Architect',impact:'Deploymentzeit von 45 → 8 Min.'}],
  experience:[{id:'e0',title:'Senior Developer',company:'TechCorp GmbH',period:'2022 – heute',location:'Frankfurt',bullets:'Microservices-Architektur für 500k+ User migriert\nCI/CD auf 8 Minuten reduziert\nKubernetes-Cluster aufgebaut\n5er Entwicklerteam geführt',description:'Verantwortlich für vollständige Backend-Modernisierung.'}],
  education:[{id:'ed0',degree:'B.Sc. Informatik',school:'Goethe-Universität Frankfurt',year:'2018 – 2021',grade:'1,8',description:'Schwerpunkte: Softwareentwicklung, KI, Datenbanken'}],
  courses:[{id:'c0',name:'AWS Solutions Architect',provider:'Amazon Web Services',year:'2023'},{id:'c1',name:'Kubernetes CKA',provider:'CNCF / Linux Foundation',year:'2022'}],
  awards:[{id:'aw0',title:'Best Innovation Award',org:'DACH Tech Summit',year:'2024'}],
  testimonials:[]};
  Object.assign(D,d);fillForm();
  ['proj-list','exp-list','edu-list','course-list','award-list','test-list'].forEach(function(id){var el=document.getElementById(id);if(el)el.innerHTML='';});
  D.projects=[];d.projects.forEach(function(p){addProject(JSON.parse(JSON.stringify(p)));});
  D.experience=[];d.experience.forEach(function(e){addExp(JSON.parse(JSON.stringify(e)));});
  D.education=[];d.education.forEach(function(e){addEdu(JSON.parse(JSON.stringify(e)));});
  D.courses=[];d.courses.forEach(function(c){addCourse(JSON.parse(JSON.stringify(c)));});
  D.awards=[];d.awards.forEach(function(a){addAward(JSON.parse(JSON.stringify(a)));});
  pStyle='cyber';accent='#00E5A0';setStyle('cyber');startBuild();toast('✓ Demo geladen');
}

// BUILD PORTFOLIO (output in selected language: DE / EN / AR)
function buildPortfolio(full){
  syncD();var ac=accent,name=(D.fn+' '+D.ln).trim()||'Portfolio';
  var isAr=lang==='ar';
  var dir=isAr?'rtl':'ltr';
  var allSkills=[].concat(D.skills.tech||[]).concat(D.skills.soft||[]).concat(D.skills.lang||[]);
  var skillDisp=document.getElementById('skill-display')?document.getElementById('skill-display').value:'cloud';
  var bgFx=document.getElementById('bg-effect')?document.getElementById('bg-effect').value:'mesh';
  var curAnim=animChoice;
  var S={
    noir:{bg:'#040406',bg2:'#0c0c10',bg3:'#14141a',text:'#f0ebe2',text2:'#786f62',hr:'rgba(240,235,226,.06)',serif:"'Georgia',serif",sans:"'Outfit',sans-serif",mono:"'JetBrains Mono',monospace"},
    solaire:{bg:'#f7f3ec',bg2:'#efe9e0',bg3:'#e5ddd2',text:'#0e0c0a',text2:'#6b5f50',hr:'rgba(14,12,10,.08)',serif:'Georgia,serif',sans:"'Trebuchet MS',sans-serif",mono:"'Courier New',monospace"},
    cyber:{bg:'#050a08',bg2:'#0a110e',bg3:'#0f1a14',text:'#d4ffe8',text2:'#4a7a5e',hr:'rgba(0,229,160,.07)',serif:"'JetBrains Mono',monospace",sans:"'JetBrains Mono',monospace",mono:"'JetBrains Mono',monospace"},
    mono:{bg:'#080808',bg2:'#111',bg3:'#1a1a1a',text:'#f5f5f5',text2:'#777',hr:'rgba(245,245,245,.08)',serif:"'Courier New',monospace",sans:"'Courier New',monospace",mono:"'Courier New',monospace"},
    aurora:{bg:'#0f0520',bg2:'#160930',bg3:'#1e0d3f',text:'#e8d5ff',text2:'#7a5a9a',hr:'rgba(168,85,247,.07)',serif:"'Georgia',serif",sans:"'Outfit',sans-serif",mono:"'JetBrains Mono',monospace"},
    slate:{bg:'#0f1412',bg2:'#161c1a',bg3:'#1c2421',text:'#c8d4cc',text2:'#5a6e64',hr:'rgba(143,151,144,.08)',serif:"'Georgia',serif",sans:"'Outfit',sans-serif",mono:"'JetBrains Mono',monospace"}
  };
  var c=S[pStyle]||S.noir;
  var fo={elegant:{serif:"'Playfair Display',Georgia,serif",sans:"'Outfit',sans-serif"},mono:{serif:"'JetBrains Mono',monospace",sans:"'JetBrains Mono',monospace"},modern:{serif:"'Outfit',sans-serif",sans:"'Outfit',sans-serif"},serif:{serif:"Georgia,serif",sans:'Georgia,serif'}};
  if(fo[fontChoice]){c.serif=fo[fontChoice].serif;c.sans=fo[fontChoice].sans;}
  var bg=darkMode?c.bg:'#f4f1ec',txt=darkMode?c.text:'#0d0d12',txt2=darkMode?c.text2:'#5a5248',hr=darkMode?c.hr:'rgba(13,13,18,.08)',bg2=darkMode?c.bg2:'#ebe6dd',bg3=darkMode?c.bg3:'#ddd8ce';
  var arFont=isAr?",'Noto Sans Arabic',sans-serif":'';
  // Use chosen avatar style or photo
  var avatar;
  if(D.photo){
    // Build photo HTML — use photoMode for 3D/2D/annotated
var annotSVGhtml='';
if(annotations&&annotations.length){
  var ac2=ac;
  annotSVGhtml='<svg style="position:absolute;inset:0;width:100%;height:100%;border-radius:50%;pointer-events:none" viewBox="0 0 80 80">'+annotations.map(function(a){var textX=a.x>50?a.x-5:a.x+8;var anchor=a.x>50?'end':'start';return '<circle cx="'+a.x+'" cy="'+a.y+'" r="2.5" fill="'+ac2+'" opacity="0.9"/><line x1="'+a.x+'" y1="'+a.y+'" x2="'+textX+'" y2="'+a.y+'" stroke="'+ac2+'" stroke-width="0.7" opacity="0.6"/><text x="'+textX+'" y="'+(parseFloat(a.y)+0.5)+'" font-size="5.5" fill="'+ac2+'" text-anchor="'+anchor+'" font-family="monospace" opacity="0.95">'+a.text+'</text>';}).join('')+'</svg>';
}
if(photoMode==='3d'){
  avatar='<div style="width:100%;height:100%;border-radius:50%;overflow:hidden;position:relative;transform-style:preserve-3d;box-shadow:0 0 0 1.5px '+ac+'55,0 18px 50px rgba(0,0,0,.4)">'+
    '<img src="'+D.photo+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;image-rendering:auto;filter:contrast(1.07) saturate(1.14) brightness(1.02)">'+
    '<div style="position:absolute;inset:0;border-radius:50%;background:radial-gradient(ellipse at 30% 25%,rgba(255,255,255,.22) 0%,transparent 60%);pointer-events:none"></div>'+
    annotSVGhtml+'</div>';
} else {
  avatar='<div style="position:relative;width:100%;height:100%"><img src="'+D.photo+'" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;image-rendering:auto;filter:contrast(1.05) saturate(1.1) brightness(1.01)">'+annotSVGhtml+'</div>';
}
  } else {
    var avStyle=AVATAR_STYLES.find(function(a){return a.id===avatarChoice;})||AVATAR_STYLES[0];
    avatar=avStyle.fn(D.fn||'?',D.ln||'?',ac);
  }

  // Skills
  var skH='';
  if(skillDisp==='bars'){skH='<div style="display:flex;flex-direction:column;gap:9px;max-width:520px">';allSkills.slice(0,14).forEach(function(s,i){var pct=70+((s.length*7+i*11)%30);skH+='<div><div style="display:flex;justify-content:space-between;margin-bottom:2px"><span style="font-size:11px;font-family:'+c.mono+';color:'+txt+'">'+s+'</span><span style="font-size:9px;color:'+ac+'">'+pct+'%</span></div><div style="background:'+bg3+';border-radius:2px;height:3px"><div class="rv" style="height:100%;width:'+pct+'%;background:'+ac+';transition:width 1s '+(.05*i)+'s"></div></div></div>';});skH+='</div>';}
  else if(skillDisp==='matrix'){skH='<div style="font-family:'+c.mono+';columns:2;gap:18px">'+allSkills.map(function(s,i){return '<div class="rv" style="animation-delay:'+(.04*i)+'s;padding:3px 0;font-size:11px;color:'+txt2+'"><span style="color:'+ac+';margin-right:7px">▶</span>'+s+'</div>';}).join('')+'</div>';}
  else if(skillDisp==='grid'){skH='<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:7px">'+allSkills.map(function(s,i){return '<div class="rv sk" style="animation-delay:'+(.04*i)+'s;text-align:center;padding:7px;font-size:10px;background:'+bg3+';border:1px solid '+hr+';border-radius:3px;color:'+txt2+'">'+s+'</div>';}).join('')+'</div>';}
  else{skH=allSkills.map(function(s,i){return '<span class="rv sk" style="animation-delay:'+(.05*i)+'s">'+s+'</span>';}).join('');}

  // Projects
  var prH=D.projects.map(function(p,i){
    var tech=(p.tech||'').split(',').filter(Boolean).map(function(t){return '<span class="ptech">'+t.trim()+'</span>';}).join('');
    return '<div class="proj rv" style="animation-delay:'+(.1*i)+'s"><div class="pn">0'+(i+1)+'</div><div class="pb"><div class="ptl">'+p.name+'</div><div class="pdesc">'+p.desc+'</div>'+(p.role?'<div style="font-size:9px;font-family:'+c.mono+';color:'+ac+';margin-bottom:5px">'+p.role+'</div>':'')+' <div class="ptechs">'+tech+'</div>'+(p.impact?'<div style="font-size:9px;color:'+ac+';margin-top:4px;font-family:'+c.mono+'">→ '+p.impact+'</div>':'')+(p.url?'<a class="plink" href="https://'+p.url.replace(/^https?:\/\//,'')+'" target="_blank">↗ '+p.url+'</a>':'')+'</div></div>';
  }).join('');

  // Timeline
  var expH=D.experience.map(function(e,i){
    var buls=(e.bullets||'').split('\n').filter(Boolean).map(function(b){return '<li>'+b+'</li>';}).join('');
    return '<div class="tlr rv" style="animation-delay:'+(.08*i)+'s"><div class="tld"></div><div class="tlb"><div class="tlp">'+e.period+(e.location?' · '+e.location:'')+'</div><div class="tlttl">'+e.title+'</div><div class="tlco">'+e.company+'</div>'+(buls?'<ul class="tlul">'+buls+'</ul>':'')+(e.description?'<div class="tldesc">'+e.description+'</div>':'')+'</div></div>';
  }).join('');
  var eduH=D.education.map(function(e,i){
    return '<div class="tlr rv" style="animation-delay:'+(.25+.07*i)+'s"><div class="tld" style="background:'+bg3+';border:2px solid '+ac+'55"></div><div class="tlb"><div class="tlp">'+e.year+'</div><div class="tlttl">'+e.degree+'</div><div class="tlco">'+e.school+(e.grade?' · '+e.grade:'')+'</div></div></div>';
  }).join('');
  var courseH=D.courses.length?'<div style="margin-top:22px"><div style="font-size:8px;letter-spacing:3px;text-transform:uppercase;color:'+ac+';margin-bottom:10px;font-family:'+c.mono+'">'+(isAr?'الدورات':lang==='en'?'COURSES':'WEITERBILDUNGEN')+'</div>'+D.courses.map(function(co){return '<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid '+hr+';font-size:11px"><span style="color:'+txt+'">'+co.name+'</span><span style="color:'+txt2+';font-size:9px;font-family:'+c.mono+'">'+co.provider+(co.year?' · '+co.year:'')+'</span></div>';}).join('')+'</div>':'';

  // Awards
  var awardsH=(D.awards&&D.awards.length)?'<div style="margin-top:20px"><div style="font-size:8px;letter-spacing:3px;text-transform:uppercase;color:'+ac+';margin-bottom:10px;font-family:'+c.mono+'">'+(isAr?'الجوائز':lang==='en'?'AWARDS':'AUSZEICHNUNGEN')+'</div>'+D.awards.map(function(a){return '<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid '+hr+'"><div><span style="font-size:12px;font-weight:600;color:'+txt+'">🏆 '+a.title+'</span>'+(a.org?'<span style="font-size:9px;color:'+txt2+';margin-left:8px">'+a.org+'</span>':'')+'</div>'+(a.year?'<span style="font-size:9px;font-family:'+c.mono+';color:'+ac+'">'+a.year+'</span>':'')+'</div>';}).join('')+'</div>':'';

  // Testimonials
  var testH=(D.testimonials&&D.testimonials.length)?'<section id="stst" class="sec"><div class="slbl">'+(isAr?'التوصيات':lang==='en'?'Testimonials':'Referenzen')+'</div><div class="sttl rv">'+(isAr?'ماذا يقولون عني.':lang==='en'?'What they say.':'Was andere sagen.')+'</div><div style="display:grid;gap:12px">'+D.testimonials.map(function(t,i){return '<div class="rv" style="animation-delay:'+(.1*i)+'s;padding:18px 22px;background:'+bg2+';border:1px solid '+hr+';border-'+( isAr?'right':'left')+':3px solid '+ac+';border-radius:3px"><p style="font-size:13px;font-style:italic;color:'+txt+';margin-bottom:11px;line-height:1.7">&ldquo;'+t.text+'&rdquo;</p><div style="font-size:10px;font-weight:600;color:'+ac+'">'+t.author+'</div><div style="font-size:9px;color:'+txt2+'">'+t.role+'</div></div>';}).join('')+'</div></section>':'';

  // Interests
  var interestH=D.interests?'<div style="margin-top:20px;padding:14px 18px;background:'+bg2+';border:1px solid '+hr+';border-radius:3px"><div style="font-size:8px;letter-spacing:3px;text-transform:uppercase;color:'+ac+';margin-bottom:8px;font-family:'+c.mono+'">'+(isAr?'الاهتمامات':lang==='en'?'INTERESTS':'INTERESSEN')+'</div><div style="font-size:12px;color:'+txt2+';line-height:1.8">'+D.interests+'</div></div>':'';

  // Contacts
  var cts=[D.email&&{icon:'✉',l:isAr?'البريد الإلكتروني':lang==='en'?'Email':'E-Mail',v:D.email,h:'mailto:'+D.email},D.github&&{icon:'◈',l:'GitHub',v:D.github,h:'https://'+D.github.replace(/^https?:\/\//,'')},D.linkedin&&{icon:'◉',l:'LinkedIn',v:D.linkedin,h:'https://'+D.linkedin.replace(/^https?:\/\//,'')},D.website&&{icon:'◎',l:isAr?'الموقع':lang==='en'?'Website':'Website',v:D.website,h:'https://'+D.website.replace(/^https?:\/\//,'')},D.phone&&{icon:'◻',l:isAr?'الهاتف':lang==='en'?'Phone':'Telefon',v:D.phone,h:'tel:'+D.phone}].filter(Boolean);
  var ctH=cts.map(function(ct,i){return '<a class="ctitem rv" href="'+ct.h+'" style="animation-delay:'+(.06*i)+'s"><span class="cticon">'+ct.icon+'</span><div><div class="ctlbl">'+ct.l+'</div><div class="ctval">'+ct.v+'</div></div></a>';}).join('');

  var animCSS=curAnim==='fade'?'.rv{opacity:0;transition:opacity 1.2s}.rv.vis{opacity:1;transform:none}':'.rv{opacity:0;transform:translateY(16px);transition:opacity .65s cubic-bezier(.4,0,.2,1),transform .65s cubic-bezier(.4,0,.2,1)}.rv.vis{opacity:1;transform:none}';
  var badge=(pStyle==='cyber'||curAnim==='terminal')?'<div class="badge"><div class="bdot"></div>system.online · portfolio.exe</div>':'<div class="hpre">Portfolio · '+(D.location||'')+'</div>';

  // Language labels for output
  var L=isAr?{about:'من أنا',skills:'مهاراتي',proj:'مشاريعي',career:'مسيرتي',contact:'تواصل',extras:'إضافات',abt:'من أنا.',skl:'ماذا أعرف.',prj:'ما بنيته.',car:'مسيرتي.',cnt:'لنتحدث.',scroll:'تمرير',ctaContact:'تواصل معي',ctaProjects:'عرض المشاريع',footerBy:'FOLIO'}
  :lang==='en'?{about:'About',skills:'Skills',proj:'Projects',career:'Career',contact:'Contact',extras:'Extras',abt:'Who I am.',skl:'What I know.',prj:'What I built.',car:'My path.',cnt:"Let's talk.",scroll:'Scroll',ctaContact:'Get in touch',ctaProjects:'View projects',footerBy:'FOLIO'}
  :{about:'Über mich',skills:'Kompetenzen',proj:'Projekte',career:'Karriere',contact:'Kontakt',extras:'Extras',abt:'Wer ich bin.',skl:'Was ich kann.',prj:'Was ich gebaut habe.',car:'Mein Weg.',cnt:'Lass uns reden.',scroll:'Scroll',ctaContact:'Kontakt aufnehmen',ctaProjects:'Projekte ansehen',footerBy:'FOLIO'};

  return '<!DOCTYPE html><html lang="'+lang+'" dir="'+dir+'"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+name+'</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+Arabic:wght@300;400;600;700&display=swap" rel="stylesheet">'+
  '<style>*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{background:'+bg+';color:'+txt+';font-family:'+c.sans+arFont+';overflow-x:hidden;direction:'+dir+'}::selection{background:'+ac+';color:'+bg+'}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:'+ac+'44;border-radius:2px}'+animCSS+
  'nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:15px 46px;display:flex;align-items:center;justify-content:space-between;background:'+bg+'cc;backdrop-filter:blur(20px);border-bottom:1px solid '+hr+'}'+
  '.nlogo{font-family:'+c.serif+';font-size:16px;font-weight:900;letter-spacing:2px;color:'+txt+'}'+
  '.nlinks{display:flex;gap:22px}.nlinks a{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:'+txt2+';text-decoration:none;transition:color .2s;font-family:'+c.mono+'}.nlinks a:hover{color:'+ac+'}'+
  '.hero{min-height:100vh;display:flex;align-items:center;padding:96px 10vw 76px;position:relative;overflow:hidden}'+
  (photoMode==='bg' && D.photo ?
    '.hero-bg{position:absolute;inset:0;background-image:url('+JSON.stringify(D.photo)+');background-size:cover;background-position:center;'+(_bgStyleCurrent==='blur'?'filter:blur(3px) brightness(.6)':_bgStyleCurrent==='dark'?'filter:brightness(.35)':'filter:none')+'}'
  :
    '.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 55% 75% at '+(isAr?'20%':'80%')+' 50%,'+ac+'09 0,transparent 60%)}'
  )+
  (bgFx==='grid'?'.hero-bg{background-image:linear-gradient('+ac+'07 1px,transparent 1px),linear-gradient(90deg,'+ac+'07 1px,transparent 1px);background-size:40px 40px;}':'')+
  '.hcontent{max-width:660px;position:relative;z-index:1}'+
  '.hpre{font-size:9px;letter-spacing:4px;text-transform:uppercase;color:'+ac+';margin-bottom:22px;opacity:0;animation:fi .8s .2s both;font-family:'+c.mono+'}'+
  '.badge{display:inline-flex;align-items:center;gap:6px;background:'+ac+'08;border:1px solid '+ac+'18;border-radius:3px;padding:4px 11px;font-family:'+c.mono+';font-size:9px;color:'+ac+';margin-bottom:22px;letter-spacing:1px}'+
  '.bdot{width:5px;height:5px;border-radius:50%;background:'+ac+';animation:blink2 1s step-end infinite}@keyframes blink2{0%,100%{opacity:1}50%{opacity:0}}'+
  '.hname{font-family:'+c.serif+';font-size:clamp(40px,6.2vw,86px);font-weight:900;line-height:.95;letter-spacing:-2px;margin-bottom:16px}'+
  '.hname .last{color:'+ac+';display:block}.hname span{display:block;overflow:hidden}.hname span span{display:block;animation:slideUp .7s cubic-bezier(.4,0,.2,1) both}'+
  '.httl{font-size:14px;color:'+txt2+';font-weight:300;margin-bottom:22px;opacity:0;animation:fi .8s .7s both}'+
  (D.tagline?'.htag{font-family:'+c.serif+';font-size:clamp(14px,1.9vw,21px);font-style:italic;color:'+ac+';margin-bottom:28px;opacity:0;animation:fi .8s .9s both}':'')+
  (D.availability?'.havail{display:inline-flex;align-items:center;gap:6px;font-size:9px;font-family:'+c.mono+';color:'+ac+';background:'+ac+'09;border:1px solid '+ac+'22;border-radius:20px;padding:4px 12px;margin-bottom:26px;opacity:0;animation:fi .8s .95s both}.avdot{width:5px;height:5px;border-radius:50%;background:'+ac+';animation:blink2 2s ease-in-out infinite}':'')+
  '.hcta{display:flex;gap:9px;flex-wrap:wrap;opacity:0;animation:fi .8s 1.1s both}'+
  '.btnf{padding:11px 26px;font-family:'+c.sans+';font-size:9px;font-weight:600;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border-radius:2px;transition:all .2s}'+
  '.btnf.fill{background:'+ac+';color:'+bg+';border:none}.btnf.fill:hover{filter:brightness(1.1);transform:translateY(-2px);box-shadow:0 8px 26px '+ac+'40}'+
  '.btnf.line{background:transparent;color:'+txt+';border:1px solid '+hr+'}.btnf.line:hover{border-color:'+ac+'88;color:'+ac+'}'+
  '.hphoto{position:absolute;'+(isAr?'left':'right')+':8vw;bottom:0;width:clamp(130px,17vw,255px);height:clamp(170px,25vw,350px);opacity:0;animation:fi 1s 1.3s both}'+
  (function(){
    var fObj=FRAMES.find(function(x){return x.id===currentFrame;})||FRAMES[0];
    var bshadow=frameBorderW>0?'0 0 '+(frameBorderGlow*2)+'px '+frameBorderGlow+'px '+frameBorderColor+'44,inset 0 0 0 '+frameBorderW+'px '+frameBorderColor:'0 20px 60px rgba(0,0,0,.3)';
    return '.hphoto-ring{width:100%;height:100%;border-radius:'+(currentFrame==='circle'?'50%':'4px')+';overflow:hidden;clip-path:'+fObj.clip+';-webkit-clip-path:'+fObj.clip+';box-shadow:'+bshadow+';contain:layout paint}'+
      '.hphoto-ring img,.hphoto-ring svg{width:100%;height:100%;object-fit:cover}';
  })()+
  '.scroll{position:absolute;bottom:26px;'+(isAr?'right':'left')+':10vw;display:flex;align-items:center;gap:9px;opacity:0;animation:fi 1s 1.7s both;font-size:8px;letter-spacing:3px;text-transform:uppercase;color:'+txt2+';font-family:'+c.mono+'}'+
  '.scroll-ln{width:32px;height:1px;background:'+hr+';position:relative;overflow:hidden}.scroll-ln::after{content:"";position:absolute;left:-100%;top:0;width:100%;height:100%;background:'+ac+';animation:scan 2s ease-in-out infinite}@keyframes scan{0%{left:-100%}100%{left:200%}}'+
  '.sec{padding:80px 10vw;border-top:1px solid '+hr+'}'+
  '.slbl{font-size:8px;letter-spacing:4px;text-transform:uppercase;color:'+ac+';margin-bottom:10px;font-family:'+c.mono+'}'+
  '.sttl{font-family:'+c.serif+';font-size:clamp(22px,3.2vw,46px);font-weight:800;margin-bottom:36px;line-height:1.1;color:'+txt+'}'+
  '.sk-cloud{display:flex;flex-wrap:wrap;gap:8px}.sk{padding:5px 13px;border:1px solid '+hr+';border-radius:20px;font-size:11px;cursor:default;transition:all .2s;color:'+txt2+';font-family:'+c.sans+'}.sk:hover{border-color:'+ac+';color:'+ac+';background:'+ac+'0d;transform:translateY(-2px)}'+
  '.pgrid{display:grid;gap:2px}.proj{display:grid;grid-template-columns:54px 1fr;background:'+bg2+';border:1px solid '+hr+';transition:all .2s;cursor:default}.proj:hover{border-color:'+ac+'44;background:'+bg3+'}'+
  '.pn{font-family:'+c.serif+';font-size:26px;font-weight:900;color:'+txt2+';opacity:.18;display:flex;align-items:center;justify-content:center;padding:20px 0;border-'+(isAr?'left':'right')+':1px solid '+hr+';transition:all .2s}.proj:hover .pn{opacity:.8;color:'+ac+'}'+
  '.pb{padding:18px 22px}.ptl{font-family:'+c.serif+';font-size:16px;font-weight:700;margin-bottom:5px;transition:color .2s}.proj:hover .ptl{color:'+ac+'}.pdesc{font-size:10px;color:'+txt2+';line-height:1.7;margin-bottom:7px}'+
  '.ptechs{display:flex;flex-wrap:wrap;gap:3px;margin-bottom:5px}.ptech{font-size:8px;font-family:'+c.mono+';background:'+ac+'12;color:'+ac+';padding:2px 6px;border-radius:2px}'+
  '.plink{font-size:9px;color:'+txt2+';text-decoration:none;font-family:'+c.mono+';transition:color .2s;display:block;margin-top:3px}.plink:hover{color:'+ac+'}'+
  '.tlwrap{position:relative;padding-'+(isAr?'right':'left')+':24px}.tlwrap::before{content:"";position:absolute;'+(isAr?'right':'left')+':6px;top:6px;bottom:6px;width:1px;background:'+hr+'}'+
  '.tlr{position:relative;margin-bottom:28px;display:flex;gap:14px;align-items:flex-start}'+
  '.tld{width:12px;height:12px;border-radius:50%;background:'+ac+';flex-shrink:0;margin-top:3px;box-shadow:0 0 0 3px '+ac+'1e}'+
  '.tlp{font-size:8px;letter-spacing:2px;text-transform:uppercase;color:'+ac+';margin-bottom:3px;font-family:'+c.mono+'}'+
  '.tlttl{font-size:13px;font-weight:600;margin-bottom:2px;color:'+txt+'}.tlco{font-size:10px;color:'+txt2+';margin-bottom:5px}'+
  '.tlul{padding-'+(isAr?'right':'left')+':12px;font-size:9px;color:'+txt2+';line-height:2;font-family:'+c.mono+'}.tldesc{font-size:9px;color:'+txt2+';margin-top:7px;line-height:1.65;font-style:italic;border-'+(isAr?'right':'left')+':2px solid '+ac+'30;padding-'+(isAr?'right':'left')+':9px}'+
  '.biotext{font-size:15px;font-weight:300;line-height:1.9;color:'+txt+';max-width:630px;margin-bottom:24px}'+
  '.hlblock{border-'+(isAr?'right':'left')+':3px solid '+ac+';padding:11px 18px;background:'+ac+'07;margin-top:16px;font-family:'+c.serif+';font-size:15px;font-style:italic;color:'+txt2+';line-height:1.6}'+
  '.ctgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:10px}'+
  '.ctitem{display:flex;align-items:center;gap:11px;padding:14px 18px;background:'+bg2+';border:1px solid '+hr+';border-radius:3px;text-decoration:none;color:inherit;transition:all .2s}.ctitem:hover{border-color:'+ac+'44;background:'+bg3+';transform:translateY(-2px)}'+
  '.cticon{font-size:16px;color:'+ac+';width:20px;text-align:center}.ctlbl{font-size:7px;letter-spacing:2px;text-transform:uppercase;color:'+txt2+';margin-bottom:1px;font-family:'+c.mono+'}.ctval{font-size:10px;color:'+txt+'}'+
  'footer{padding:32px 10vw;border-top:1px solid '+hr+';display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:9px;color:'+txt2+';font-family:'+c.mono+'}'+
  '@keyframes fi{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{transform:translateY(105%)}to{transform:none}}'+
  '.hphoto-ring img{image-rendering:auto;image-rendering:high-quality;will-change:transform}'+
  /* 3D portfolio photo effect */
  '.h3d-ring{transform-style:preserve-3d;transition:transform .12s ease-out,box-shadow .12s ease-out;cursor:default}'+
  '@media print{nav,.scroll,.hphoto{display:none!important}.sec{break-inside:avoid}.hero{min-height:auto;padding:48px 32px}}'+
  '@media(max-width:768px){.hphoto{display:none}.nlinks{display:none}nav{padding:13px 16px}.sec{padding:56px 6vw}.hero{padding:84px 6vw 52px}}'+
  '.lang-float{position:fixed;bottom:22px;'+(isAr?'left':'right')+':22px;z-index:500;display:flex;gap:3px;background:'+bg2+';border:1px solid '+hr+';border-radius:6px;padding:4px;box-shadow:0 8px 28px rgba(0,0,0,.35);opacity:0;animation:fi .8s 2s both}'+
  '.lf-btn{font-size:9px;font-family:'+c.mono+';padding:5px 10px;border:1px solid transparent;border-radius:4px;background:transparent;color:'+txt2+';cursor:pointer;transition:all .18s;letter-spacing:1px}'+
  '.lf-btn:hover,.lf-btn.on{background:'+ac+';color:'+bg+';border-color:'+ac+'}'+
  '</style></head><body>'+
  // Embed all language translations as JSON data for employer lang switcher
  '<script>var _T={de:'+JSON.stringify(Object.keys(D_translations.de||{}).length?D_translations.de:{fn:D.fn,ln:D.ln,title:D.title,bio:D.bio,tagline:D.tagline,availability:D.availability})+',en:'+JSON.stringify(Object.keys(D_translations.en||{}).length?D_translations.en:{fn:D.fn,ln:D.ln,title:D.title,bio:D.bio,tagline:D.tagline,availability:D.availability})+',ar:'+JSON.stringify(Object.keys(D_translations.ar||{}).length?D_translations.ar:{fn:D.fn,ln:D.ln,title:D.title,bio:D.bio,tagline:D.tagline,availability:D.availability})+'};var _CL="'+lang+'";<\/script>'+
  '<nav><div class="nlogo">'+name+'</div><div class="nlinks">'+
  (D.bio?'<a href="#sa">'+L.about+'</a>':'')+
  (allSkills.length?'<a href="#ssk">'+L.skills+'</a>':'')+
  (D.projects.length?'<a href="#sp">'+L.proj+'</a>':'')+
  ((D.experience.length||D.education.length)?'<a href="#sc">'+L.career+'</a>':'')+
  (cts.length?'<a href="#sct">'+L.contact+'</a>':'')+
  '</div></nav>'+
  '<section id="sh" class="hero"><div class="hero-bg"></div><div class="hcontent">'+
  badge+
  '<h1 class="hname" data-text="'+name+'"><span><span style="animation-delay:.3s">'+D.fn+'</span></span><span><span class="last" style="animation-delay:.45s">'+D.ln+'</span></span></h1>'+
  '<div class="httl" id="_title">'+D.title+'</div>'+
  (D.tagline?'<div class="htag" id="_tag">&ldquo;'+D.tagline+'&rdquo;</div>':'')+
  (D.availability?'<div class="havail"><div class="avdot"></div><span id="_avail">'+D.availability+'</span></div>':'')+
  '<div class="hcta">'+
  (cts[0]?'<a href="'+cts[0].h+'"><button class="btnf fill">'+L.ctaContact+'</button></a>':'')+
  (D.projects.length?'<button class="btnf line" onclick="document.getElementById(\'sp\').scrollIntoView({behavior:\'smooth\'})">'+L.ctaProjects+'</button>':'')+
  '</div></div>'+
  '<div class="hphoto"><div class="hphoto-ring">'+avatar+'</div></div>'+
  '<div class="scroll">'+L.scroll+'<div class="scroll-ln"></div></div>'+
  '</section>'+
  (D.bio?'<section id="sa" class="sec"><div class="slbl">'+L.about+'</div><div class="sttl">'+L.abt+'</div><div class="biotext rv" id="_bio">'+D.bio+'</div>'+(D.highlight?'<div class="hlblock rv">&ldquo;'+D.highlight+'&rdquo;</div>':'')+'</section>':'')+
  (allSkills.length?'<section id="ssk" class="sec"><div class="slbl">'+L.skills+'</div><div class="sttl">'+L.skl+'</div><div class="sk-cloud">'+skH+'</div></section>':'')+
  (D.projects.length?'<section id="sp" class="sec"><div class="slbl">'+L.proj+'</div><div class="sttl">'+L.prj+'</div><div class="pgrid">'+prH+'</div></section>':'')+
  ((D.experience.length||D.education.length)?'<section id="sc" class="sec"><div class="slbl">'+L.career+'</div><div class="sttl">'+L.car+'</div><div class="tlwrap">'+expH+eduH+courseH+awardsH+'</div>'+(interestH||'')+'</section>':'')+
  testH+
  (cts.length?'<section id="sct" class="sec"><div class="slbl">'+L.contact+'</div><div class="sttl">'+L.cnt+'</div><div class="ctgrid">'+ctH+'</div></section>':'')+
  '<footer><span>'+name+'</span><span>'+D.title+(D.location?' · '+D.location:'')+'</span><span>'+L.footerBy+'</span></footer>'+
  // Floating employer language picker
  '<div class="lang-float" id="lfp">'+
    '<button class="lf-btn'+(lang==='de'?' on':'')+'" onclick="switchPLang(\'de\',this)" title="Deutsch">DE</button>'+
    '<button class="lf-btn'+(lang==='en'?' on':'')+'" onclick="switchPLang(\'en\',this)" title="English">EN</button>'+
    '<button class="lf-btn'+(lang==='ar'?' on':'')+'" onclick="switchPLang(\'ar\',this)" title="العربية">AR</button>'+
  '</div>'+
  '<script>(function(){'+
    'var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add("vis")});},{threshold:.08});'+
    'document.querySelectorAll(".rv").forEach(function(el){obs.observe(el)});'+
    /* 3D photo tilt in portfolio output */
    '(function(){var hp=document.querySelector(".hphoto");var ri=hp&&hp.querySelector(".hphoto-ring");if(!ri)return;'+
    'hp.addEventListener("mousemove",function(e){var r=hp.getBoundingClientRect();var dx=(e.clientX-r.left-r.width/2)/(r.width/2);var dy=(e.clientY-r.top-r.height/2)/(r.height/2);ri.style.transform="perspective(320px) rotateX("+(-dy*18)+"deg) rotateY("+(dx*18)+"deg) scale(1.03)";ri.style.boxShadow=""+(dx*14)+"px "+(dy*14)+"px 40px rgba(0,0,0,.35)";});'+
    'hp.addEventListener("mouseleave",function(){ri.style.transform="";ri.style.boxShadow="0 20px 60px rgba(0,0,0,.3)";});'+
    '})();'+
    'window.switchPLang=function(l,btn){'+
      'document.querySelectorAll(".lf-btn").forEach(function(b){b.classList.remove("on")});'+
      'if(btn)btn.classList.add("on");'+
      'document.documentElement.setAttribute("dir",l==="ar"?"rtl":"ltr");'+
      'document.documentElement.setAttribute("lang",l);'+
      'var t=_T[l]||{};'+
      'if(t.bio){var el=document.getElementById("_bio");if(el)el.textContent=t.bio;}'+
      'if(t.title){var el2=document.getElementById("_title");if(el2)el2.textContent=t.title;}'+
      'if(t.tagline){var el3=document.getElementById("_tag");if(el3)el3.textContent="\u201c"+t.tagline+"\u201d";}'+
      'if(t.availability){var el4=document.getElementById("_avail");if(el4)el4.textContent=t.availability;}'+
    '};'+
  '})();<\/script>'+
  '</body></html>';
}



// INIT
buildSwatches();
try{var sv=localStorage.getItem('folio-vars');if(sv)variants=JSON.parse(sv);}catch(e){}
applyUILang();
setTimeout(function(){
  renderAvatarGrid();
  // Restore saved lang
  try{var sl=localStorage.getItem('folio-lang');if(sl&&LANGS[sl]){lang=sl;applyUILang();}}catch(e){}
},80);
