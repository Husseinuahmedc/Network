import storage from './storage.js';

const quizBank = [
  {
    question: "Why is OSPF faster than RIP?",
    options: [
      "It uses hop count which is easier to calculate.",
      "It uses Link-State updates and Dijkstra algorithm for faster convergence.",
      "It doesn't use areas.",
      "It is a distance-vector protocol."
    ],
    answer: 1,
    explanation: "OSPF is a link-state protocol that builds a complete topology map and only sends triggered updates, leading to much faster convergence than RIP's periodic full-table updates.",
    explanationAr: "OSPF هو بروتوكول حالة الوصلة الذي يبني خريطة طوبولوجيا كاملة ويرسل تحديثات فورية فقط، مما يؤدي إلى تقارب أسرع بكثير من تحديثات RIP الدورية للجدول بالكامل."
  },
  {
    question: "What is the purpose of the 802.1Q tag?",
    options: [
      "To encrypt the data link layer.",
      "To identify the VLAN ID on a trunk link.",
      "To increase the speed of the switch.",
      "To define the MAC address of the gateway."
    ],
    answer: 1,
    explanation: "802.1Q is the industry-standard tagging method used on trunk links to distinguish traffic from different VLANs.",
    explanationAr: "802.1Q هو معيار الصناعة للوسم المستخدم في وصلات الجذع (Trunk) لتمييز حركة المرور من شبكات VLAN المختلفة."
  },
  {
    question: "Which delay depends on the congestion level of the router?",
    options: [
      "Transmission delay",
      "Propagation delay",
      "Queuing delay",
      "Processing delay"
    ],
    answer: 2,
    explanation: "Queuing delay is the time a packet spends waiting in a buffer, which increases as the router becomes more congested.",
    explanationAr: "تأخير الانتظار هو الوقت الذي تقضيه الحزمة في الانتظار في الذاكرة المؤقتة، ويزداد مع زيادة ازدحام الموجه."
  },
  {
    question: "What happens if a router has no matching route entry and no default route?",
    options: [
      "It broadcasts the packet to all neighbors.",
      "It stores the packet forever.",
      "The packet is dropped.",
      "It returns the packet to the sender."
    ],
    answer: 2,
    explanation: "If no specific route or default route exists in the routing table, the router must drop the packet.",
    explanationAr: "إذا لم يوجد مسار محدد أو مسار افتراضي في جدول التوجيه، يجب على الموجه إسقاط الحزمة."
  },
  {
    question: "What is 'Longest Prefix Match'?",
    options: [
      "The longest IP address in the network.",
      "The process of finding the most specific route entry for a destination IP.",
      "The time it takes to match a MAC address.",
      "A way to calculate transmission delay."
    ],
    answer: 1,
    explanation: "Longest Prefix Match is the algorithm routers use to select the most specific (longest mask) entry in the routing table for a given destination IP.",
    explanationAr: "أطول مطابقة للبادئة هي الخوارزمية التي تستخدمها الموجهات لاختيار المدخل الأكثر تحديداً (أطول قناع) في جدول التوجيه لعنوان IP معين."
  },
  {
    question: "In RIP, what is the metric used to determine the best path?",
    options: ["Bandwidth", "Delay", "Hop Count", "Cost"],
    answer: 2,
    explanation: "RIP uses hop count as its metric, with a maximum of 15 hops.",
    explanationAr: "يستخدم RIP عدد القفزات كمقياس له، بحد أقصى 15 قفزة."
  },
  {
    question: "What is the maximum hop count allowed in RIP before a destination is considered unreachable?",
    options: ["10", "15", "16", "255"],
    answer: 2,
    explanation: "In RIP, 16 hops is considered infinity (unreachable).",
    explanationAr: "في RIP، تعتبر 16 قفزة هي اللانهاية (غير قابلة للوصول)."
  },
  {
    question: "Which OSPF area is mandatory and acts as the backbone?",
    options: ["Area 1", "Area 10", "Area 0", "Any area"],
    answer: 2,
    explanation: "Area 0 is the backbone area that all other areas must connect to.",
    explanationAr: "المنطقة 0 هي منطقة العمود الفقري التي يجب أن تتصل بها جميع المناطق الأخرى."
  },
  {
    question: "What algorithm does OSPF use to calculate the shortest path?",
    options: ["Bellman-Ford", "Dijkstra", "Spanning Tree", "Diffusing Update"],
    answer: 1,
    explanation: "OSPF uses the Dijkstra SPF (Shortest Path First) algorithm.",
    explanationAr: "يستخدم OSPF خوارزمية ديجكسترا (SPF) لحساب أقصر مسار."
  },
  {
    question: "What is the administrative distance of OSPF?",
    options: ["90", "100", "110", "120"],
    answer: 2,
    explanation: "The default Administrative Distance for OSPF is 110.",
    explanationAr: "المسافة الإدارية الافتراضية لبروتوكول OSPF هي 110."
  },
  {
    question: "Which protocol is a Distance-Vector protocol?",
    options: ["OSPF", "RIP", "BGP", "IS-IS"],
    answer: 1,
    explanation: "RIP is a classic Distance-Vector protocol.",
    explanationAr: "RIP هو بروتوكول ناقل مسافة كلاسيكي."
  },
  {
    question: "What is the main difference between RIPv1 and RIPv2?",
    options: [
      "RIPv1 is faster.",
      "RIPv2 supports VLSM (classless routing).",
      "RIPv1 uses multicast.",
      "RIPv2 is link-state."
    ],
    answer: 1,
    explanation: "RIPv2 is classless and supports VLSM, while RIPv1 is classful.",
    explanationAr: "RIPv2 لا صنفي ويدعم VLSM، بينما RIPv1 صنفي."
  },
  {
    question: "In OSPF, what is the 'Hello' packet used for?",
    options: [
      "To send routing updates.",
      "To discover and maintain neighbor relationships.",
      "To calculate the SPF tree.",
      "To request specific LSAs."
    ],
    answer: 1,
    explanation: "Hello packets are used to discover neighbors and ensure they are still reachable.",
    explanationAr: "تُستخدم حزم Hello لاكتشاف الجيران والتأكد من أنهم لا يزالون متاحين."
  },
  {
    question: "What is an ABR in OSPF?",
    options: [
      "A router that only exists in Area 0.",
      "Area Border Router: connects Area 0 to other areas.",
      "A router that connects OSPF to the Internet.",
      "The router with the highest Router ID."
    ],
    answer: 1,
    explanation: "An ABR connects two or more OSPF areas, one of which must be Area 0.",
    explanationAr: "موجه حدود المنطقة (ABR) يربط منطقتين أو أكثر من مناطق OSPF، ويجب أن تكون إحداها المنطقة 0."
  },
  {
    question: "What does 'Store-and-Forward' switching mean?",
    options: [
      "The switch forwards the frame as soon as the MAC is read.",
      "The switch receives the entire frame and checks for errors before forwarding.",
      "The switch stores the frame for 1 second.",
      "The switch only stores the destination MAC."
    ],
    answer: 1,
    explanation: "Store-and-Forward requires the full frame to be received and verified (CRC check) before forwarding.",
    explanationAr: "خزن وتمرير يتطلب استلام الإطار بالكامل والتحقق منه (فحص CRC) قبل التمرير."
  },
  {
    question: "What is the formula for Transmission Delay?",
    options: ["d / s", "L / R", "R / L", "a * L / R"],
    answer: 1,
    explanation: "Transmission Delay = Packet Length (L) / Link Rate (R).",
    explanationAr: "تأخير النقل = طول الحزمة (L) / سرعة الرابط (R)."
  },
  {
    question: "What is the formula for Propagation Delay?",
    options: ["L / R", "d / s", "s / d", "proc + queue"],
    answer: 1,
    explanation: "Propagation Delay = Distance (d) / Propagation Speed (s).",
    explanationAr: "تأخير الانتشار = المسافة (d) / سرعة الانتشار (s)."
  },
  {
    question: "Which VLAN port type is used to connect a switch to an end-host (like a PC)?",
    options: ["Trunk Port", "Access Port", "Console Port", "Virtual Port"],
    answer: 1,
    explanation: "Access ports are used for end devices and belong to a single VLAN.",
    explanationAr: "تُستخدم منافذ الوصول (Access) للأجهزة النهائية وتنتمي لشبكة VLAN واحدة."
  },
  {
    question: "What is the benefit of using VLANs?",
    options: [
      "Reduced cost of cabling.",
      "Increased broadcast domain size.",
      "Logical segmentation and reduced broadcast traffic.",
      "Making the switch work like a router."
    ],
    answer: 2,
    explanation: "VLANs provide logical segmentation, improving security and reducing broadcast traffic by creating smaller broadcast domains.",
    explanationAr: "توفر شبكات VLAN تقسيماً منطقياً، مما يحسن الأمان ويقلل من حركة مرور البث من خلال إنشاء نطاقات بث أصغر."
  },
  {
    question: "What field is added to an Ethernet frame by 802.1Q?",
    options: ["IP Header", "VLAN Tag", "TCP Segment", "MAC Address"],
    answer: 1,
    explanation: "802.1Q adds a 4-byte VLAN tag to the Ethernet frame.",
    explanationAr: "يضيف 802.1Q وسماً لشبكة VLAN بحجم 4 بايت إلى إطار الإيثرنت."
  },
  {
    question: "What is the OSPF 'Router ID'?",
    options: [
      "The serial number of the router.",
      "A unique 32-bit value identifying the router in the OSPF domain.",
      "The IP address of Area 0.",
      "The number of areas the router is connected to."
    ],
    answer: 1,
    explanation: "The Router ID is a unique identifier used by OSPF to identify each router.",
    explanationAr: "معرف الموجه هو معرف فريد يستخدمه OSPF لتحديد كل موجه."
  },
  {
    question: "Which protocol uses Multicast address 224.0.0.5?",
    options: ["RIPv2", "BGP", "OSPF (All Routers)", "OSPF (DR/BDR)"],
    answer: 2,
    explanation: "OSPF uses 224.0.0.5 to communicate with all SPF routers.",
    explanationAr: "يستخدم OSPF العنوان 224.0.0.5 للتواصل مع جميع موجهات SPF."
  },
  {
    question: "In packet switching, what is 'Store-and-Forward' primarily used for?",
    options: ["Reducing delay", "Error checking", "Increasing bandwidth", "MAC learning"],
    answer: 1,
    explanation: "It allows the switch/router to perform a CRC check to ensure the packet isn't corrupted.",
    explanationAr: "يسمح للمبدل/الموجه بإجراء فحص CRC للتأكد من عدم تلف الحزمة."
  },
  {
    question: "Which layer of the OSI model does a router operate at?",
    options: ["Layer 1 (Physical)", "Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)"],
    answer: 2,
    explanation: "Routers operate at Layer 3 (Network Layer) because they use IP addresses for forwarding.",
    explanationAr: "تعمل الموجهات في الطبقة 3 (طبقة الشبكة) لأنها تستخدم عناوين IP للتمرير."
  },
  {
    question: "Which layer of the OSI model does a standard Switch operate at?",
    options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"],
    answer: 1,
    explanation: "Standard switches operate at Layer 2 (Data Link Layer) using MAC addresses.",
    explanationAr: "تعمل المبدلات القياسية في الطبقة 2 (طبقة وصلة البيانات) باستخدام عناوين MAC."
  },
  {
    question: "What is 'Flooding' in a switch?",
    options: [
      "When the switch crashes from too much traffic.",
      "Sending a frame out all ports except the source port when the destination MAC is unknown.",
      "Sending a frame to the gateway only.",
      "Sending an IP broadcast."
    ],
    answer: 1,
    explanation: "Flooding occurs when the switch doesn't have the destination MAC in its MAC table.",
    explanationAr: "يحدث التدفق عندما لا يمتلك المبدل عنوان MAC الوجهة في جدول MAC الخاص به."
  },
  {
    question: "What is the 'Split Horizon' rule in RIP?",
    options: [
      "Dividing the network into two areas.",
      "Not advertising a route back out the same interface it was learned from.",
      "Sharing only half of the routing table.",
      "Using two different protocols."
    ],
    answer: 1,
    explanation: "Split Horizon is a loop prevention mechanism in Distance-Vector protocols.",
    explanationAr: "الأفق المنقسم هو آلية لمنع الحلقات في بروتوكولات ناقل المسافة."
  },
  {
    question: "What does the 'LSDB' in OSPF contain?",
    options: [
      "Only the best paths.",
      "A list of neighbors only.",
      "All Link-State Advertisements (LSAs) for the area.",
      "The MAC addresses of all routers."
    ],
    answer: 2,
    explanation: "The Link-State Database contains all the LSAs that describe the network topology.",
    explanationAr: "تحتوي قاعدة بيانات حالة الوصلة على جميع إعلانات حالة الوصلة (LSAs) التي تصف طوبولوجيا الشبكة."
  },
  {
    question: "Which is a 'Connectionless' protocol at the network layer?",
    options: ["TCP", "IP", "HTTP", "FTP"],
    answer: 1,
    explanation: "IP is connectionless; it does not establish a session before sending packets.",
    explanationAr: "IP هو بروتوكول عديم الاتصال؛ لا يقوم بإنشاء جلسة قبل إرسال الحزم."
  },
  {
    question: "What is the purpose of 'MAC Learning'?",
    options: [
      "To find the best path to the Internet.",
      "To build a table mapping MAC addresses to switch ports.",
      "To assign IP addresses to hosts.",
      "To encrypt Ethernet frames."
    ],
    answer: 1,
    explanation: "Switches learn source MAC addresses from incoming frames to populate their MAC table.",
    explanationAr: "تتعلم المبدلات عناوين MAC المصدر من الإطارات القادمة لملء جدول MAC الخاص بها."
  },
  {
    question: "In OSPF, what triggers an update?",
    options: [
      "A timer expiring every 30 seconds.",
      "A change in the link status (up/down).",
      "A manual refresh by the admin only.",
      "The arrival of any packet."
    ],
    answer: 1,
    explanation: "OSPF sends triggered updates immediately when a topology change is detected.",
    explanationAr: "يرسل OSPF تحديثات فورية عند اكتشاف تغيير في طوبولوجيا الشبكة."
  },
  {
    question: "What is the metric used by OSPF?",
    options: ["Hop Count", "Cost (based on Bandwidth)", "Delay", "Reliability"],
    answer: 1,
    explanation: "OSPF uses 'Cost', which is inversely proportional to the bandwidth of the link.",
    explanationAr: "يستخدم OSPF 'التكلفة'، والتي تتناسب عكسياً مع عرض النطاق الترددي للرابط."
  },
  {
    question: "Which protocol is used for IPv6 routing as an equivalent to RIPv2?",
    options: ["RIPv3", "RIPng", "RIPv6", "OSPFv3"],
    answer: 1,
    explanation: "RIPng (Next Generation) is the version of RIP for IPv6 networks.",
    explanationAr: "RIPng (الجيل التالي) هو إصدار RIP لشبكات IPv6."
  },
  {
    question: "Which OSPF LSA type is used for intra-area routes?",
    options: ["Type 1", "Type 3", "Type 5", "Type 7"],
    answer: 0,
    explanation: "Type 1 (Router LSA) is generated by every router for its own area.",
    explanationAr: "النوع 1 (Router LSA) يتم إنتاجه بواسطة كل موجه لمنطقته الخاصة."
  },
  {
    question: "What is the function of the SPF algorithm?",
    options: [
      "To flood packets to all ports.",
      "To calculate the shortest path tree from the LSDB.",
      "To assign VLAN tags.",
      "To prevent MAC spoofing."
    ],
    answer: 1,
    explanation: "The SPF (Shortest Path First) algorithm processes the LSDB to find the best routes.",
    explanationAr: "تقوم خوارزمية SPF (أقصر مسار أولاً) بمعالجة LSDB للعثور على أفضل المسارات."
  },
  // NEW QUESTIONS (Expanding to 50+)
  {
    question: "SCENARIO: A packet arrives at a router with destination 192.168.1.50. The table has 192.168.1.0/24 and 192.168.1.0/25. Which one is chosen?",
    options: ["192.168.1.0/24", "192.168.1.0/25", "Both", "None"],
    answer: 1,
    explanation: "Longest Prefix Match: /25 is more specific than /24.",
    explanationAr: "أطول مطابقة للبادئة: /25 أكثر تحديداً من /24."
  },
  {
    question: "CALCULATION: In RIP, a packet from R1 must pass through R2 and R3 to reach Destination D. What is the hop count at R1 for D?",
    options: ["0", "1", "2", "3"],
    answer: 2,
    explanation: "Hops to D: R1 -> R2 (1) -> R3 (2) -> D.",
    explanationAr: "القفزات إلى D: R1 -> R2 (1) -> R3 (2) -> D."
  },
  {
    question: "Which OSPF packet type contains the actual Link-State Advertisements (LSAs)?",
    options: ["Hello", "Database Description (DBD)", "Link-State Request (LSR)", "Link-State Update (LSU)"],
    answer: 3,
    explanation: "LSUs carry the actual records (LSAs) to the neighbors.",
    explanationAr: "تحمل حزم LSU السجلات الفعلية (LSAs) إلى الجيران."
  },
  {
    question: "What is the purpose of the 'Designated Router' (DR) in OSPF?",
    options: ["To encrypt traffic.", "To reduce the number of adjacencies on a multi-access network.", "To act as the only gateway.", "To disable SPF."],
    answer: 1,
    explanation: "In networks like Ethernet, the DR reduces OSPF traffic by acting as a central point for updates.",
    explanationAr: "في شبكات مثل الإيثرنت، يقلل الـ DR من حركة OSPF من خلال العمل كنقطة مركزية للتحديثات."
  },
  {
    question: "SCENARIO: A frame enters a switch on Port 1 from MAC A. The switch table is empty. What does the switch do?",
    options: ["Drops the frame.", "Learns MAC A on Port 1 and floods the frame.", "Floods the frame and then deletes the table.", "Sends it to the gateway."],
    answer: 1,
    explanation: "The switch learns the source MAC and floods because it doesn't know the destination.",
    explanationAr: "يتعلم المبدل عنوان MAC المصدر ويقوم بالتدفق لأنه لا يعرف الوجهة."
  },
  {
    question: "What is the 'Native VLAN' on a Cisco trunk?",
    options: ["VLAN 999", "The VLAN that carries untagged traffic.", "The VLAN for management only.", "A VLAN that cannot be deleted."],
    answer: 1,
    explanation: "The Native VLAN handles traffic that arrives on a trunk without an 802.1Q tag.",
    explanationAr: "شبكة VLAN الأصلية تتعامل مع حركة المرور التي تصل إلى الجذع بدون وسم 802.1Q."
  },
  {
    question: "CALCULATION: Packet Size L=1000 bits, Rate R=1 Mbps. What is the Transmission Delay?",
    options: ["1 ms", "10 ms", "0.1 ms", "100 ms"],
    answer: 0,
    explanation: "L/R = 1000 / 1,000,000 = 0.001 seconds = 1 ms.",
    explanationAr: "L/R = 1000 / 1,000,000 = 0.001 ثانية = 1 ملي ثانية."
  },
  {
    question: "In OSPF, which state means the routers have identical LSDBs and are fully adjacent?",
    options: ["Init", "2-Way", "ExStart", "Full"],
    answer: 3,
    explanation: "The 'Full' state indicates that the database synchronization is complete.",
    explanationAr: "تشير حالة 'Full' إلى أن مزامنة قاعدة البيانات قد اكتملت."
  },
  {
    question: "What is 'Route Poisoning' in RIP?",
    options: ["Deleting a route immediately.", "Setting the hop count of a failed route to 16.", "Changing the IP of the route.", "Sending false updates to neighbors."],
    answer: 1,
    explanation: "Route Poisoning tells neighbors a route is unreachable by setting its metric to infinity (16).",
    explanationAr: "تسميم المسار يخبر الجيران أن المسار غير قابل للوصول من خلال تحديد مقياسه على أنه لانهاية (16)."
  },
  {
    question: "SCENARIO: PC1 (VLAN 10) wants to talk to PC2 (VLAN 20). Can they communicate using only a Layer 2 Switch?",
    options: ["Yes, if they are on the same port.", "No, they need a Layer 3 device (Router/L3 Switch).", "Yes, if the switch is in Trunk mode.", "Yes, always."],
    answer: 1,
    explanation: "Inter-VLAN routing requires a Layer 3 device to move packets between different subnets/VLANs.",
    explanationAr: "يتطلب التوجيه بين شبكات VLAN جهازاً من الطبقة 3 لنقل الحزم بين الشبكات الفرعية المختلفة."
  },
  {
    question: "Which field in the IP header is used to prevent packets from looping forever?",
    options: ["Checksum", "TTL (Time to Live)", "Fragment Offset", "Source IP"],
    answer: 1,
    explanation: "TTL is decremented by each router; if it reaches 0, the packet is dropped.",
    explanationAr: "يتم تقليل TTL بواسطة كل موجه؛ إذا وصل إلى 0، يتم إسقاط الحزمة."
  },
  {
    question: "What is 'Distance Vector' logic often compared to?",
    options: ["A roadmap.", "Signs at a crossroads (direction and distance).", "A GPS with a full map.", "A telephone directory."],
    answer: 1,
    explanation: "DV protocols only know the direction and distance, like road signs, while Link-State is like a full map.",
    explanationAr: "بروتوكولات DV تعرف فقط الاتجاه والمسافة، مثل لافتات الطريق، بينما Link-State تشبه الخريطة الكاملة."
  },
  {
    question: "Which OSPF packet is sent to acknowledge the receipt of an LSU?",
    options: ["Hello", "DBD", "LSR", "LSAck"],
    answer: 3,
    explanation: "LSAck (Link-State Acknowledgment) ensures reliable delivery of LSAs.",
    explanationAr: "يضمن LSAck (تأكيد حالة الوصلة) التسليم الموثوق لـ LSAs."
  },
  {
    question: "What is 'Statistical Multiplexing'?",
    options: ["Reserving a fixed slot for each user.", "On-demand resource sharing in packet switching.", "A way to encrypt data.", "A routing algorithm."],
    answer: 1,
    explanation: "Resources are allocated only when needed, allowing more efficient use of the link.",
    explanationAr: "يتم تخصيص الموارد فقط عند الحاجة، مما يسمح باستخدام أكثر كفاءة للرابط."
  },
  {
    question: "In a Cisco OSPF config, what does the 'wildcard mask' 0.0.0.255 mean?",
    options: ["Match the first 24 bits.", "Match the last 8 bits.", "Match the first 8 bits.", "Ignore the first 24 bits."],
    answer: 0,
    explanation: "Wildcard masks are inverse; 0 means 'must match', 255 means 'don't care'.",
    explanationAr: "أقنعة البدل هي عكسية؛ 0 يعني 'يجب أن يتطابق'، 255 يعني 'لا يهم'."
  }
];

const quiz = {
  bank: quizBank,
  currentIndex: 0,
  score: 0,
  init: () => {
    quiz.currentIndex = 0;
    quiz.score = 0;
    // Shuffle the bank for better variety
    quiz.bank = [...quizBank].sort(() => Math.random() - 0.5);
  },
  checkAnswer: (choice) => {
    const isCorrect = choice === quiz.bank[quiz.currentIndex].answer;
    if (isCorrect) quiz.score++;
    return {
      isCorrect,
      explanation: quiz.bank[quiz.currentIndex].explanation,
      explanationAr: quiz.bank[quiz.currentIndex].explanationAr
    };
  },
  next: () => {
    quiz.currentIndex++;
    return quiz.currentIndex < quiz.bank.length;
  },
  finish: () => {
    storage.saveQuizScore(quiz.score);
    return quiz.score;
  }
};

export default quiz;
