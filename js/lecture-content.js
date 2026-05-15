const lectureContent = [
  {
    id: 2,
    title: "Routing and Forwarding, Switching, and Performance",
    priority: "High",
    englishExplanation: "This lecture covers the fundamental duties of the network layer: Routing (finding the best path) and Forwarding (moving packets from input to output interface). It also discusses switching techniques like Store-and-Forward vs Cut-Through, and performance metrics including different types of delays (Transmission, Propagation, Processing, Queuing) and throughput.",
    arabicExplanation: "تغطي هذه المحاضرة المهام الأساسية لطبقة الشبكة: التوجيه (إيجاد أفضل مسار) والتحويل (نقل الحزم من واجهة الإدخال إلى واجهة الإخراج). كما تناقش تقنيات التبديل مثل 'خزن وتمرير' مقابل 'القطع المباشر'، ومقاييس الأداء بما في ذلك أنواع التأخير المختلفة (النقل، الانتشار، المعالجة، والانتظار) والإنتاجية.",
    examTrap: "Confusion between Transmission and Propagation delay. Remember: Transmission is about pushing bits (L/R), Propagation is about the medium speed (d/s).",
    howToAnswer: "If asked to compare Routing vs Forwarding, use a 'Map vs Local' analogy. Routing is global, Forwarding is local to the router.",
    terms: [
      { en: "Routing", ar: "التوجيه", desc: "Finding the best path across the network." },
      { en: "Forwarding", ar: "التحويل", desc: "Moving a packet from a router's input to the appropriate output interface." },
      { en: "Store-and-Forward", ar: "خزن وتمرير", desc: "Switch must receive the entire packet before forwarding it." },
      { en: "Cut-Through", ar: "القطع المباشر", desc: "Switch starts forwarding as soon as the destination address is identified." },
      { en: "Transmission Delay", ar: "تأخير النقل", desc: "Time to push all packet bits into the link (L/R)." },
      { en: "Propagation Delay", ar: "تأخير الانتشار", desc: "Time for a bit to travel from one end of the link to the other (d/s)." }
    ],
    formulas: "Trans = L/R, Prop = d/s, Total = proc + queue + trans + prop",
    examQuestions: [
      {
        question: "What is the difference between Routing and Forwarding?",
        answer: "Routing is the process of determining the end-to-end path packets take from source to destination (the global 'map' calculation). Forwarding is the router-local action of transferring a packet from an input interface to the correct output interface based on the routing table."
      },
      {
        question: "Calculate transmission delay for a 10Kbits packet over a 100Mbps link.",
        answer: "Transmission Delay = L / R = 10,000 / 100,000,000 = 0.0001 seconds = 0.1 msec."
      },
      {
        question: "Which delay depends on the speed of light in the medium?",
        answer: "Propagation Delay (d/s)."
      }
    ]
  },
  {
    id: 3,
    title: "Introduction to Routing Algorithms",
    priority: "Medium",
    formulas: "AD: Static=1, OSPF=110, RIP=120, External EIGRP=170",
    englishExplanation: "Focuses on how routers build their routing tables. It compares Static Routing (manually configured) and Dynamic Routing (automatically updated via protocols). It introduces key goals like optimality, scalability, and robustness, and explains Administrative Distance (AD) as a measure of protocol trustworthiness.",
    arabicExplanation: "تركز هذه المحاضرة على كيفية بناء الموجهات لجداول التوجيه الخاصة بها. تقارن بين التوجيه الثابت (المهيأ يدوياً) والتوجيه الديناميكي (المحدث تلقائياً عبر البروتوكولات). تقدم أهدافاً رئيسية مثل الأمثلية، القابلية للتوسع، والمتانة، وتشرح المسافة الإدارية (AD) كمقياس لمدى موثوقية البروتوكول.",
    examTrap: "Assuming a lower Metric means a better protocol. No! Administrative Distance (AD) is checked FIRST to choose the protocol, then Metric is used to choose the path WITHIN that protocol.",
    howToAnswer: "Always mention that Static routes have an AD of 1, making them more 'trusted' than OSPF (AD 110) or RIP (AD 120).",
    terms: [
      { en: "Static Routing", ar: "التوجيه الثابت", desc: "Manual configuration of routes by an administrator." },
      { en: "Dynamic Routing", ar: "التوجيه الديناميكي", desc: "Automatic path discovery and update using protocols." },
      { en: "Administrative Distance (AD)", ar: "المسافة الإدارية", desc: "A value used by Cisco routers to select the best path when there are multiple routing sources. Lower is better." },
      { en: "Optimality", ar: "الأمثلية", desc: "Finding the best/shortest path based on a specific metric." }
    ],
    examQuestions: [
      {
        question: "Why do we use Administrative Distance?",
        answer: "AD is used when a router learns about the same destination network from two or more different routing protocols. The router uses AD to determine which path to install in the routing table (the one with the lower AD)."
      },
      {
        question: "Compare Static and Dynamic Routing in terms of scalability.",
        answer: "Static routing is suitable for small, simple networks but becomes complex as the network grows. Dynamic routing is highly scalable and automatically adapts to topology changes."
      }
    ]
  },
  {
    id: 4,
    title: "RIP (Router Information Protocol)",
    priority: "High",
    englishExplanation: "RIP is a Distance-Vector routing protocol that uses 'hop count' as its metric. It is simple to configure but limited to a maximum of 15 hops (16 is unreachable). It discusses RIPv1 (classful) vs RIPv2 (classless, supports VLSM) and techniques like Split Horizon to prevent routing loops.",
    arabicExplanation: "بروتوكول RIP هو بروتوكول توجيه يعتمد على 'ناقل المسافة' ويستخدم 'عدد القفزات' كمقياس له. هو بسيط في الإعداد ولكنه محدود بحد أقصى 15 قفزة (16 تعتبر غير قابلة للوصول). تناقش المحاضرة الفرق بين RIPv1 (صنفي) و RIPv2 (لا صنفي، يدعم VLSM) وتقنيات مثل 'Split Horizon' لمنع حلقات التوجيه.",
    examTrap: "Thinking RIPv2 is link-state. No, it is still Distance-Vector. The main improvement is being Classless (sending subnet masks).",
    howToAnswer: "If asked about the 'Count to Infinity' problem, explain that RIP uses a max hop count of 15 to stop the loop.",
    terms: [
      { en: "Distance-Vector", ar: "ناقل المسافة", desc: "A routing algorithm where routers share their entire routing table with neighbors." },
      { en: "Hop Count", ar: "عدد القفزات", desc: "The number of routers a packet must pass through." },
      { en: "Split Horizon", ar: "الأفق المنقسم", desc: "A method to prevent routing loops by not advertising a route back out the same interface it was learned from." },
      { en: "Poison Reverse", ar: "السم العكسي", desc: "Advertising a failed route with a metric of 16 (unreachable) to neighbors." }
    ],
    formulas: "Metric: Hop Count (Max 15). Updates: 30s. AD: 120",
    examQuestions: [
      {
        question: "What is the maximum hop count for RIP and why?",
        answer: "The maximum hop count is 15. A hop count of 16 is considered unreachable. This limit prevents routing loops from continuing indefinitely (Count to Infinity problem)."
      },
      {
        question: "What are the differences between RIPv1 and RIPv2?",
        answer: "RIPv1 is classful (doesn't send subnet masks), while RIPv2 is classless (supports VLSM/CIDR). RIPv2 also supports authentication and uses multicast (224.0.0.9) instead of broadcast."
      },
      {
        question: "How does Split Horizon work?",
        answer: "It prevents a router from advertising a route back out the same interface it learned it from, preventing simple 2-node routing loops."
      }
    ]
  },
  {
    id: 5,
    title: "OSPF (Open Shortest Path First)",
    priority: "High",
    formulas: "Cost = 10^8 / Bandwidth. AD: 110",
    englishExplanation: "OSPF is a Link-State routing protocol that uses the Dijkstra SPF algorithm. It is more scalable than RIP and converges faster. It uses the concept of 'Areas' (Area 0 is the backbone). Key concepts include Hello packets for adjacency, Link-State Advertisements (LSAs), and the Link-State Database (LSDB).",
    arabicExplanation: "بروتوكول OSPF هو بروتوكول توجيه يعتمد على 'حالة الوصلة' ويستخدم خوارزمية ديجكسترا (SPF). هو أكثر قابلية للتوسع من RIP ويتقارب بشكل أسرع. يستخدم مفهوم 'المناطق' (المنطقة 0 هي العمود الفقري). المفاهيم الرئيسية تشمل حزم Hello للمجاورة، وإعلانات حالة الوصلة (LSAs)، وقاعدة بيانات حالة الوصلة (LSDB).",
    examTrap: "Thinking LSDB is different for every router. Within an Area, all OSPF routers MUST have the exact same LSDB.",
    howToAnswer: "Mention the 3 tables: Neighbor (Hello), Topology (LSDB/LSA), and Routing (SPF results).",
    terms: [
      { en: "Link-State", ar: "حالة الوصلة", desc: "A routing algorithm where each router builds a complete map (topology) of the network." },
      { en: "Dijkstra SPF", ar: "خوارزمية ديجكسترا", desc: "Shortest Path First algorithm used to calculate the best route from the LSDB." },
      { en: "Area 0", ar: "المنطقة 0", desc: "The mandatory backbone area in OSPF that connects all other areas." },
      { en: "ABR", ar: "موجه حدود المنطقة", desc: "Area Border Router: A router connected to multiple OSPF areas." },
      { en: "Hello Packet", ar: "حزمة الترحيب", desc: "Used to discover and maintain neighbor relationships (sent to 224.0.0.5)." }
    ],
    examQuestions: [
      {
        question: "Why is OSPF preferred over RIP for large networks?",
        answer: "OSPF is faster to converge, has no hop-count limit (uses cost based on bandwidth), supports hierarchical design with areas to reduce routing overhead, and only sends triggered updates rather than the full table."
      },
      {
        question: "List the three OSPF databases and their purpose.",
        answer: "1. Neighbor Table (Adjacency Database): List of neighbors. 2. Topology Table (LSDB): Complete map of the network. 3. Routing Table (Forwarding Database): Best paths calculated by SPF."
      }
    ]
  },
  {
    id: 8,
    title: "Routing Packets (Layer 2 vs Layer 3)",
    priority: "Medium",
    englishExplanation: "This lecture demonstrates how packets travel through switches and routers. It contrasts MAC address learning and flooding in switches (Layer 2) with IP-based forwarding in routers (Layer 3). It also touches on TCP session management (SYN, SYN-ACK, ACK).",
    arabicExplanation: "توضح هذه المحاضرة كيفية انتقال الحزم عبر المبدلات والموجهات. تقارن بين تعلم عناوين MAC والتدفق في المبدلات (الطبقة 2) مع التوجيه القائم على IP في الموجهات (الطبقة 3). كما تتطرق إلى إدارة جلسات TCP (المصافحة الثلاثية).",
    examTrap: "Thinking IP addresses change at every hop. No! Source/Dest IPs remain constant. It is the Source/Dest MAC addresses that change at each router hop.",
    howToAnswer: "Use the term 'Longest Prefix Match' when explaining how a router chooses a route from multiple matches in its table.",
    terms: [
      { en: "MAC Address Table", ar: "جدول عناوين MAC", desc: "A table in a switch mapping MAC addresses to physical ports." },
      { en: "Flooding", ar: "التدفق", desc: "When a switch sends a frame out all ports except the source port because the destination MAC is unknown." },
      { en: "Three-way Handshake", ar: "المصافحة الثلاثية", desc: "The process of establishing a TCP connection: SYN -> SYN-ACK -> ACK." },
      { en: "Longest Prefix Match", ar: "أطول مطابقة للبادئة", desc: "The algorithm used by routers to find the most specific route in the routing table." }
    ],
    formulas: "L2: Forwarding based on MAC. L3: Forwarding based on IP.",
    examQuestions: [
      {
        question: "What happens when a switch receives a frame with an unknown destination MAC?",
        answer: "The switch floods the frame out all ports except the port it was received on."
      },
      {
        question: "Describe the TCP 3-way handshake.",
        answer: "1. Client sends SYN. 2. Server responds with SYN-ACK. 3. Client responds with ACK. The connection is then established."
      },
      {
        question: "What information in the packet header does a router use for forwarding?",
        answer: "The Destination IP Address."
      }
    ]
  },
  {
    id: "vlan",
    title: "VLAN (Virtual Local Area Networks)",
    priority: "High",
    formulas: "802.1Q: 4-byte tag. VLAN ID: 12 bits (0-4095).",
    englishExplanation: "VLANs solve LAN issues like lack of traffic isolation and broadcast storms. They allow logical segmentation of a network regardless of physical location. Key topics: Access vs Trunk ports, 802.1Q tagging, and the benefits of security and performance.",
    arabicExplanation: "تعالج الشبكات المحلية الافتراضية (VLANs) مشاكل الشبكات المحلية مثل نقص عزل حركة المرور وعواصف البث. تسمح بالتقسيم المنطقي للشبكة بغض النظر عن الموقع المادي. المواضيع الرئيسية: منافذ الوصول مقابل منافذ الجذع (Trunk)، ووسم 802.1Q، وفوائد الأمان والأداء.",
    examTrap: "Thinking Access ports need tags. No, Access ports are untagged. Only Trunk ports use 802.1Q tags to carry multiple VLANs.",
    howToAnswer: "Highlight that VLANs 'break broadcast domains'. This is a key technical benefit.",
    terms: [
      { en: "VLAN ID", ar: "معرف VLAN", desc: "A 12-bit field in the 802.1Q tag (0-4095) identifying the VLAN." },
      { en: "Trunk Link", ar: "وصلة الجذع", desc: "A link that can carry traffic for multiple VLANs using tagging." },
      { en: "Access Link", ar: "وصلة الوصول", desc: "A link belonging to a single VLAN; usually connects to end devices." },
      { en: "802.1Q", ar: "معيار 802.1Q", desc: "The industry-standard protocol for VLAN tagging on Ethernet frames." },
      { en: "Broadcast Domain", ar: "نطاق البث", desc: "A logical division of a computer network in which all nodes can reach each other by broadcast at the data link layer." }
    ],
    examQuestions: [
      {
        question: "What are the benefits of using VLANs?",
        answer: "Security (isolating sensitive traffic), Performance (reducing broadcast traffic), Simplified Administration (moving users logically), and Reduced Cost (more efficient use of switches)."
      },
      {
        question: "What is the role of an 802.1Q tag?",
        answer: "It is a 4-byte header inserted into the Ethernet frame on trunk links to identify which VLAN the frame belongs to."
      }
    ]
  }
];

export default lectureContent;
