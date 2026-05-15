import storage from './storage.js';

const quizBank = [
  {
    question: "Which statement best describes packet switching?",
    options: [
      "Bandwidth is reserved for one conversation from start to finish.",
      "Packets share link capacity on demand and may queue during congestion.",
      "Every packet must follow a fixed pre-built path.",
      "Routers ignore Layer 3 addresses."
    ],
    answer: 1,
    explanation: "Packet switching shares resources statistically, which improves utilization but can create queueing delay and packet loss.",
    explanationAr: "تبديل الحزم يشارك الموارد إحصائياً، وهذا يحسن الاستفادة لكنه قد يسبب تأخير الانتظار وفقدان الحزم."
  },
  {
    question: "What is the difference between routing and forwarding?",
    options: [
      "Routing uses MAC addresses, forwarding uses IP addresses.",
      "Routing finds paths across the network, forwarding sends one packet out the correct interface.",
      "They are the same process with different names.",
      "Forwarding happens only on switches."
    ],
    answer: 1,
    explanation: "Routing is the path-calculation process, while forwarding is the per-packet data-plane action inside a router.",
    explanationAr: "التوجيه هو عملية حساب المسار، بينما التمرير هو عملية مستوى البيانات لكل حزمة داخل الموجه."
  },
  {
    question: "Which model requires a setup phase before data transfer?",
    options: ["Datagram", "Virtual circuit", "IP broadcast", "Cut-through"],
    answer: 1,
    explanation: "A virtual-circuit network sets up a logical path first and keeps state for that connection.",
    explanationAr: "شبكة الدائرة الافتراضية تنشئ مساراً منطقياً أولاً وتحتفظ بحالة لذلك الاتصال."
  },
  {
    question: "During normal routed forwarding, which field changes at each hop?",
    options: ["Destination IP only", "Source IP only", "Layer 2 MAC addresses", "TCP port numbers"],
    answer: 2,
    explanation: "Routers rebuild the Layer 2 frame for the next link, so the source and destination MAC addresses change at every hop.",
    explanationAr: "تعيد الموجهات بناء إطار الطبقة الثانية للرابط التالي، لذلك تتغير عناوين MAC المصدر والوجهة عند كل قفزة."
  },
  {
    question: "What is the main benefit of store-and-forward switching?",
    options: [
      "It guarantees the shortest path.",
      "It checks the full frame for errors before forwarding.",
      "It removes the need for MAC addresses.",
      "It makes VLAN tags unnecessary."
    ],
    answer: 1,
    explanation: "Store-and-forward receives the entire frame and can verify CRC before transmission.",
    explanationAr: "خزن وتمرير يستقبل الإطار كاملاً ويمكنه التحقق من CRC قبل الإرسال."
  },
  {
    question: "Which delay is calculated with L / R?",
    options: ["Processing delay", "Queueing delay", "Transmission delay", "Propagation delay"],
    answer: 2,
    explanation: "Transmission delay depends on packet length L and link rate R.",
    explanationAr: "تأخير النقل يعتمد على طول الحزمة L وسرعة الرابط R."
  },
  {
    question: "Which delay depends mainly on distance and signal speed?",
    options: ["Processing delay", "Queueing delay", "Transmission delay", "Propagation delay"],
    answer: 3,
    explanation: "Propagation delay uses d / s, where d is distance and s is propagation speed.",
    explanationAr: "تأخير الانتشار يستخدم d على s حيث d هي المسافة وs هي سرعة الانتشار."
  },
  {
    question: "Which routing approach automatically adapts to link failure?",
    options: ["Static routing", "Dynamic routing", "Manual switching", "Access VLAN"],
    answer: 1,
    explanation: "Dynamic routing protocols exchange information and update routes when topology changes.",
    explanationAr: "بروتوكولات التوجيه الديناميكي تتبادل المعلومات وتحدث المسارات عند تغير الطوبولوجيا."
  },
  {
    question: "Which protocol is distance-vector?",
    options: ["OSPF", "RIP", "TCP", "ARP"],
    answer: 1,
    explanation: "RIP is a classic distance-vector routing protocol.",
    explanationAr: "RIP هو بروتوكول توجيه كلاسيكي من نوع Distance-Vector."
  },
  {
    question: "What metric does RIP use?",
    options: ["Bandwidth cost", "Hop count", "Delay", "Reliability"],
    answer: 1,
    explanation: "RIP selects paths based on hop count only.",
    explanationAr: "يختار RIP المسارات بالاعتماد على عدد القفزات فقط."
  },
  {
    question: "What does a RIP metric of 16 mean?",
    options: ["Best route", "One hop away", "Unreachable", "Default route"],
    answer: 2,
    explanation: "In RIP, 16 is infinity, which means the destination is unreachable.",
    explanationAr: "في RIP تعني القيمة 16 اللانهاية أي أن الوجهة غير قابلة للوصول."
  },
  {
    question: "Which statement about RIPv2 is correct?",
    options: [
      "It is classful and does not send subnet masks.",
      "It is link-state.",
      "It is classless and supports VLSM/CIDR.",
      "It uses cost based on bandwidth."
    ],
    answer: 2,
    explanation: "RIPv2 is classless, so it carries subnet masks and supports VLSM/CIDR.",
    explanationAr: "RIPv2 لا صنفي، لذلك يحمل أقنعة الشبكات ويدعم VLSM وCIDR."
  },
  {
    question: "Which OSPF packet discovers and maintains neighbors?",
    options: ["Hello", "DBD", "LSR", "LSAck"],
    answer: 0,
    explanation: "Hello packets are used to form and maintain OSPF neighbor relationships.",
    explanationAr: "تُستخدم حزم Hello لتكوين علاقات الجوار في OSPF والحفاظ عليها."
  },
  {
    question: "Which OSPF packet carries actual LSAs?",
    options: ["Hello", "DBD", "LSU", "LSAck"],
    answer: 2,
    explanation: "LSU packets carry link-state advertisements to neighbors.",
    explanationAr: "تحمل حزم LSU إعلانات حالة الوصلة إلى الجيران."
  },
  {
    question: "What does the LSDB contain?",
    options: [
      "Only the best paths",
      "The topology advertisements for the area",
      "Only neighbor IP addresses",
      "Only default routes"
    ],
    answer: 1,
    explanation: "The LSDB is the topology database built from LSAs for an OSPF area.",
    explanationAr: "LSDB هي قاعدة بيانات الطوبولوجيا المبنية من LSAs داخل منطقة OSPF."
  },
  {
    question: "Which OSPF area is the backbone?",
    options: ["Area 10", "Area 1", "Area 0", "Any area"],
    answer: 2,
    explanation: "Area 0 is the OSPF backbone and is required in multi-area designs.",
    explanationAr: "المنطقة 0 هي العمود الفقري في OSPF وهي مطلوبة في التصاميم متعددة المناطق."
  },
  {
    question: "What does a passive OSPF interface do?",
    options: [
      "Stops advertising the network",
      "Stops Hello packets on that interface while still advertising the network",
      "Turns OSPF into RIP",
      "Changes the router ID"
    ],
    answer: 1,
    explanation: "A passive interface suppresses neighbor formation on that interface but the connected network can still be advertised.",
    explanationAr: "الواجهة passive تمنع تكوين الجيران على تلك الواجهة لكن يمكن أن تبقى الشبكة المتصلة معلنة."
  },
  {
    question: "What is the role of an access port?",
    options: [
      "Carry multiple VLANs with tags",
      "Connect an end device to one VLAN",
      "Run OSPF area exchange",
      "Provide inter-VLAN routing"
    ],
    answer: 1,
    explanation: "An access port belongs to a single VLAN and typically connects to an end host.",
    explanationAr: "منفذ access ينتمي إلى VLAN واحدة ويرتبط عادة بجهاز طرفي."
  },
  {
    question: "Why is a trunk port needed?",
    options: [
      "To carry multiple VLANs over one link",
      "To replace router IDs",
      "To remove MAC learning",
      "To stop broadcasts completely"
    ],
    answer: 0,
    explanation: "A trunk carries traffic for multiple VLANs, usually by inserting 802.1Q tags.",
    explanationAr: "يحمل trunk حركة عدة VLANs عادةً بإضافة وسوم 802.1Q."
  },
  {
    question: "What does 802.1Q add to a frame?",
    options: ["IP checksum", "TCP port", "VLAN tag", "Route metric"],
    answer: 2,
    explanation: "802.1Q inserts a VLAN tag so devices on a trunk can identify the VLAN.",
    explanationAr: "يضيف 802.1Q وسم VLAN لكي تستطيع الأجهزة على trunk معرفة الـ VLAN."
  },
  {
    question: "What is required for communication between VLAN 10 and VLAN 20?",
    options: [
      "Only a Layer 2 switch",
      "A router or Layer 3 switch",
      "A longer trunk cable",
      "Disabling tags"
    ],
    answer: 1,
    explanation: "Different VLANs are separate Layer 2 domains and need Layer 3 routing to communicate.",
    explanationAr: "تعد VLANs المختلفة نطاقات طبقة ثانية منفصلة وتحتاج إلى توجيه من الطبقة الثالثة للتواصل."
  },
  {
    question: "How does a switch learn MAC addresses?",
    options: [
      "From destination MAC addresses",
      "From source MAC addresses on incoming frames",
      "From OSPF Hellos",
      "From TCP SYN packets only"
    ],
    answer: 1,
    explanation: "Switches populate their MAC table by recording the source MAC address and the ingress port.",
    explanationAr: "تملأ المبدلات جدول MAC بتسجيل عنوان MAC المصدر ومنفذ الدخول."
  },
  {
    question: "When does flooding occur on a switch?",
    options: [
      "When the source MAC is unknown",
      "When the destination MAC is unknown",
      "For every routed packet",
      "Only during TCP setup"
    ],
    answer: 1,
    explanation: "A switch floods an unknown-destination frame out other ports in the same VLAN.",
    explanationAr: "يقوم المبدل بعمل flooding للإطار عندما تكون وجهة MAC غير معروفة على المنافذ الأخرى في نفس الـ VLAN."
  },
  {
    question: "Which sequence starts a TCP session?",
    options: ["ACK, SYN, FIN", "SYN, SYN-ACK, ACK", "RST, SYN, ACK", "PSH, ACK, FIN"],
    answer: 1,
    explanation: "TCP connection establishment uses the three-way handshake: SYN, SYN-ACK, then ACK.",
    explanationAr: "يستخدم إنشاء اتصال TCP المصافحة الثلاثية: SYN ثم SYN-ACK ثم ACK."
  }
];

const quiz = {
  bank: quizBank,
  currentIndex: 0,
  score: 0,
  answered: false,
  init: () => {
    quiz.currentIndex = 0;
    quiz.score = 0;
    quiz.answered = false;
    quiz.bank = [...quizBank].sort(() => Math.random() - 0.5);
  },
  checkAnswer: (choice) => {
    if (quiz.answered) {
      return null;
    }

    quiz.answered = true;
    const isCorrect = choice === quiz.bank[quiz.currentIndex].answer;
    if (isCorrect) {
      quiz.score++;
    }

    return {
      isCorrect,
      correctIndex: quiz.bank[quiz.currentIndex].answer,
      explanation: quiz.bank[quiz.currentIndex].explanation,
      explanationAr: quiz.bank[quiz.currentIndex].explanationAr
    };
  },
  next: () => {
    quiz.currentIndex++;
    quiz.answered = false;
    return quiz.currentIndex < quiz.bank.length;
  },
  finish: () => {
    storage.saveQuizScore(quiz.score);
    return quiz.score;
  }
};

export default quiz;
