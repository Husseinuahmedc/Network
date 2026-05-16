const lectureContent = [
  {
    id: "packet-switching-network-layer",
    lectureNo: 1,
    title: "Packet Switching and Network Layer",
    priority: "Core",
    overviewEn: "The network layer moves packets between different networks without reserving a dedicated path for each user.",
    overviewAr: "طبقة الشبكة تنقل الحزم بين الشبكات المختلفة بدون حجز مسار ثابت لكل مستخدم.",
    tags: ["packet switching", "network layer", "ip", "statistical multiplexing"],
    concept: {
      en: "Packet switching breaks data into packets. Each packet carries addressing information, shares links with other traffic, and may wait in queues before being forwarded by Layer 3 devices.",
      ar: "تبديل الحزم يقسم البيانات إلى حزم. كل حزمة تحمل معلومات العنوان وتشارك الروابط مع المرور الآخر وقد تنتظر في الطوابير قبل أن يمررها جهاز الطبقة الثالثة."
    },
    whyItMatters: {
      en: "Final questions often test why the Internet uses packet switching: efficiency, scalability, and support for bursty traffic. It is the foundation behind IP routing, congestion, delay, and packet loss.",
      ar: "أسئلة الامتحان تختبر غالباً سبب استخدام الإنترنت لتبديل الحزم: الكفاءة وقابلية التوسع ودعم الحركة المتقطعة. وهو الأساس وراء توجيه IP والازدحام والتأخير وفقدان الحزم."
    },
    howItWorks: {
      en: "Hosts encapsulate data into IP packets. Routers inspect the destination IP, choose the next hop from the routing table, and forward the packet toward the destination. Resources are shared using statistical multiplexing instead of fixed reservation.",
      ar: "الأجهزة تغلف البيانات داخل حزم IP. الموجهات تفحص عنوان IP الوجهة وتختار القفزة التالية من جدول التوجيه ثم تمرر الحزمة نحو الوجهة. تتم مشاركة الموارد إحصائياً بدلاً من الحجز الثابت."
    },
    keyIdeas: [
      {
        en: "The network layer provides logical addressing with IP, not physical delivery with MAC alone.",
        ar: "طبقة الشبكة توفر عنونة منطقية باستخدام IP وليس التسليم الفيزيائي باستخدام MAC فقط."
      },
      {
        en: "Packet switching is connectionless by default in IP networks.",
        ar: "تبديل الحزم في شبكات IP يكون عديم الاتصال بشكل افتراضي."
      },
      {
        en: "Bandwidth is shared on demand, which improves utilization but can create queues.",
        ar: "عرض النطاق يُشارك عند الحاجة مما يحسن الاستفادة لكنه قد يسبب طوابير."
      }
    ],
    example: {
      title: "File chunk moving from PC A to Web Server B",
      steps: [
        {
          en: "PC A splits a file into packets and adds destination IP 203.0.113.20.",
          ar: "يقسم الجهاز A الملف إلى حزم ويضيف عنوان IP الوجهة 203.0.113.20."
        },
        {
          en: "The first router receives the packet, checks the destination network, and chooses the best next hop.",
          ar: "يستقبل الموجه الأول الحزمة ويفحص شبكة الوجهة ثم يختار أفضل قفزة تالية."
        },
        {
          en: "If the output link is busy, the packet waits in a queue.",
          ar: "إذا كان رابط الخرج مشغولاً تنتظر الحزمة في طابور."
        },
        {
          en: "Each router repeats the same Layer 3 decision until the packet reaches the destination network.",
          ar: "كل موجه يكرر قرار الطبقة الثالثة نفسه حتى تصل الحزمة إلى شبكة الوجهة."
        }
      ]
    },
    commands: [
      { cmd: "show ip route", desc: "Check which destination networks the router knows and how it reaches them." },
      { cmd: "show interfaces", desc: "Verify interface state, bandwidth, and packet counters that affect forwarding." }
    ],
    mistakes: [
      {
        title: "Treating packet switching like circuit switching",
        detail: "There is no permanent reserved path in normal IP forwarding.",
        ar: "لا يوجد مسار محجوز دائم في تمرير IP العادي."
      },
      {
        title: "Ignoring queueing",
        detail: "Shared links can create variable delay and packet loss during congestion.",
        ar: "الروابط المشتركة قد تسبب تأخيراً متغيراً وفقداناً للحزم عند الازدحام."
      }
    ],
    compare: {
      title: "Packet Switching Snapshot",
      columns: ["Point", "Packet Switching"],
      rows: [
        ["Path setup", "Not required for IP"],
        ["Resource use", "Shared statistically"],
        ["Delay behavior", "Variable because of queues"],
        ["Main devices", "Routers and Layer 3 switches"]
      ]
    },
    examQuestions: [
      {
        question: "Why is packet switching more efficient than dedicated circuits for bursty traffic?",
        answer: "Because users share the same links only when they have data to send, so idle bandwidth is not wasted on reserved but unused circuits."
      },
      {
        question: "What is the main job of the network layer?",
        answer: "To provide logical addressing and move packets across multiple networks from source to destination."
      }
    ]
  },
  {
    id: "routing-vs-forwarding",
    lectureNo: 2,
    title: "Routing vs Forwarding",
    priority: "Core",
    overviewEn: "Routing chooses the path. Forwarding performs the actual packet move at each router.",
    overviewAr: "التوجيه يختار المسار. أما التمرير فينفذ نقل الحزمة فعلياً عند كل موجه.",
    tags: ["routing", "forwarding", "control plane", "data plane"],
    concept: {
      en: "Routing is the control-plane process of learning and calculating paths. Forwarding is the data-plane action of sending one received packet out the correct interface.",
      ar: "التوجيه هو عملية مستوى التحكم لتعلّم المسارات وحسابها. أما التمرير فهو عملية مستوى البيانات لإخراج الحزمة المستلمة من الواجهة الصحيحة."
    },
    whyItMatters: {
      en: "This difference appears in short-definition questions, compare tables, and scenario questions about routing protocols versus routing-table lookup.",
      ar: "هذا الفرق يظهر في أسئلة التعريف والمقارنة وأسئلة السيناريو حول بروتوكولات التوجيه مقابل البحث في جدول التوجيه."
    },
    howItWorks: {
      en: "Routing protocols such as RIP or OSPF populate the routing table. When a packet arrives, the router performs longest prefix match and forwards the packet using the selected outgoing interface and next-hop information.",
      ar: "بروتوكولات مثل RIP وOSPF تملأ جدول التوجيه. وعندما تصل الحزمة يجري الموجه أطول مطابقة للبادئة ثم يمرر الحزمة باستخدام منفذ الخروج ومعلومة القفزة التالية."
    },
    keyIdeas: [
      {
        en: "Routing is network-wide and slower-changing; forwarding is local and per-packet.",
        ar: "التوجيه على مستوى الشبكة كلها ويتغير أبطأ؛ أما التمرير فمحلي ويتم لكل حزمة."
      },
      {
        en: "Routing protocols build knowledge; forwarding uses that knowledge immediately.",
        ar: "بروتوكولات التوجيه تبني المعرفة؛ والتمرير يستخدم هذه المعرفة فوراً."
      },
      {
        en: "Forwarding depends on destination IP and longest prefix match.",
        ar: "التمرير يعتمد على عنوان IP الوجهة وأطول مطابقة للبادئة."
      }
    ],
    example: {
      title: "Route learning before a packet move",
      steps: [
        {
          en: "OSPF runs and installs 10.20.0.0/16 via next hop 192.0.2.2.",
          ar: "يعمل OSPF ويثبت الشبكة 10.20.0.0/16 عبر القفزة التالية 192.0.2.2."
        },
        {
          en: "A packet for 10.20.5.9 arrives on G0/0.",
          ar: "تصل حزمة إلى G0/0 موجهة إلى 10.20.5.9."
        },
        {
          en: "The router matches 10.20.0.0/16 in the table and selects the egress interface.",
          ar: "يطابق الموجه الشبكة 10.20.0.0/16 في الجدول ويحدد واجهة الخروج."
        },
        {
          en: "The packet is re-encapsulated and sent toward 192.0.2.2.",
          ar: "تُغلف الحزمة من جديد وتُرسل باتجاه 192.0.2.2."
        }
      ]
    },
    commands: [
      { cmd: "show ip route", desc: "See routes learned by static config or dynamic protocols." },
      { cmd: "show ip protocols", desc: "Check which routing protocols are active on the router." }
    ],
    mistakes: [
      {
        title: "Using the words as synonyms",
        detail: "Routing is path calculation; forwarding is packet transfer.",
        ar: "التوجيه هو حساب المسار؛ والتمرير هو نقل الحزمة."
      },
      {
        title: "Thinking forwarding uses MAC only",
        detail: "Switches use MAC tables, but routers forward based on destination IP and route lookup.",
        ar: "المبدلات تستخدم جداول MAC لكن الموجهات تمرر اعتماداً على IP الوجهة والبحث في جدول التوجيه."
      }
    ],
    compare: {
      title: "Routing vs Forwarding",
      columns: ["Aspect", "Routing", "Forwarding"],
      rows: [
        ["Plane", "Control plane", "Data plane"],
        ["Scope", "Whole network", "Single router"],
        ["Changes", "When topology changes", "For every packet"],
        ["Input", "Protocols and topology", "Routing table entry"]
      ]
    },
    examQuestions: [
      {
        question: "Give one sentence that compares routing and forwarding.",
        answer: "Routing decides the best path through the network, while forwarding sends each packet to the correct outgoing interface at a router."
      },
      {
        question: "Which one uses longest prefix match?",
        answer: "Forwarding uses longest prefix match during the route lookup step."
      }
    ]
  },
  {
    id: "datagram-vs-virtual-circuit",
    lectureNo: 3,
    title: "Datagram vs Virtual Circuit",
    priority: "High",
    overviewEn: "A datagram network sends packets independently; a virtual-circuit network establishes a path first and keeps state.",
    overviewAr: "شبكة الداتاغرام ترسل الحزم بشكل مستقل؛ أما الدائرة الافتراضية فتنشئ مساراً أولاً وتحتفظ بحالة للمسار.",
    tags: ["datagram", "virtual circuit", "connectionless", "connection-oriented"],
    concept: {
      en: "Datagram service is connectionless. Every packet can be routed independently. Virtual circuit service is connection-oriented, so a setup phase creates a logical path before data transfer begins.",
      ar: "خدمة الداتاغرام عديمة الاتصال، ويمكن توجيه كل حزمة بشكل مستقل. أما خدمة الدائرة الافتراضية فهي موجهة بالاتصال لذلك توجد مرحلة إعداد تنشئ مساراً منطقياً قبل بدء نقل البيانات."
    },
    whyItMatters: {
      en: "Exams use this topic to test path setup, router state, ordering, QoS expectations, and why the Internet IP model is considered datagram based.",
      ar: "الامتحانات تستخدم هذا الموضوع لاختبار إعداد المسار وحالة الموجه وترتيب الحزم وتوقعات جودة الخدمة وسبب اعتبار الإنترنت قائماً على الداتاغرام."
    },
    howItWorks: {
      en: "In a datagram network, the destination IP in each packet is enough for forwarding. In a VC network, devices install per-session state and packets follow the established logical path, often identified by a short label or VC identifier.",
      ar: "في شبكة الداتاغرام يكفي عنوان IP الوجهة في كل حزمة للتمرير. أما في شبكة VC فتثبت الأجهزة حالة خاصة بكل جلسة وتسلك الحزم المسار المنطقي المنشأ وغالباً يُعرّف بوسم قصير أو معرف VC."
    },
    keyIdeas: [
      {
        en: "Datagram = no call setup, flexible path, little per-flow state.",
        ar: "الداتاغرام يعني عدم وجود إعداد اتصال ومسار مرن وحالة قليلة لكل تدفق."
      },
      {
        en: "Virtual circuit = setup required, common path, per-connection state.",
        ar: "الدائرة الافتراضية تعني وجود إعداد مطلوب ومسار مشترك وحالة لكل اتصال."
      },
      {
        en: "IP is the classic example of datagram service.",
        ar: "يعد IP المثال الكلاسيكي لخدمة الداتاغرام."
      }
    ],
    example: {
      title: "Same two hosts under two models",
      steps: [
        {
          en: "Datagram case: packet 1 and packet 2 can take different routes if the routing table changes.",
          ar: "في حالة الداتاغرام يمكن أن تسلك الحزمة 1 والحزمة 2 مسارين مختلفين إذا تغير جدول التوجيه."
        },
        {
          en: "VC case: the network first creates a logical path such as R1-R3-R5.",
          ar: "في حالة VC تنشئ الشبكة أولاً مساراً منطقياً مثل R1-R3-R5."
        },
        {
          en: "After setup, later packets follow the same VC path until teardown.",
          ar: "بعد الإعداد تسلك الحزم اللاحقة مسار VC نفسه حتى إنهاء الاتصال."
        }
      ]
    },
    commands: [
      { cmd: "show ip route", desc: "Useful to observe that IP forwarding is destination based and does not require per-session setup." }
    ],
    mistakes: [
      {
        title: "Saying datagram guarantees order",
        detail: "Packets may arrive out of order because each packet is independent.",
        ar: "قد تصل الحزم بترتيب مختلف لأن كل حزمة مستقلة."
      },
      {
        title: "Saying virtual circuits have no state",
        detail: "Routers or switches maintain VC-related state after setup.",
        ar: "الموجهات أو المبدلات تحتفظ بحالة مرتبطة بالدائرة الافتراضية بعد الإعداد."
      }
    ],
    compare: {
      title: "Datagram vs Virtual Circuit",
      columns: ["Feature", "Datagram", "Virtual Circuit"],
      rows: [
        ["Setup", "Not required", "Required"],
        ["Path", "Can vary per packet", "Fixed for the session"],
        ["Router state", "Minimal per flow", "Per-VC state kept"],
        ["Internet example", "IP", "ATM/Frame Relay conceptually"]
      ]
    },
    examQuestions: [
      {
        question: "Why is IP called connectionless?",
        answer: "Because routers do not establish a dedicated end-to-end path before forwarding packets; each packet is handled independently."
      },
      {
        question: "Name one advantage of a virtual-circuit approach.",
        answer: "It can provide more predictable handling because the path and per-connection state are established before sending data."
      }
    ]
  },
  {
    id: "router-forwarding-process",
    lectureNo: 4,
    title: "Router Forwarding Process",
    priority: "Core",
    overviewEn: "A router receives a frame, removes the Layer 2 header, checks the Layer 3 destination, decrements TTL, updates the checksum, and sends a new frame toward the next hop.",
    overviewAr: "يستقبل الموجه إطاراً ثم يزيل ترويسة الطبقة الثانية ويفحص وجهة الطبقة الثالثة ويُنقص TTL ويحدّث checksum ثم يرسل إطاراً جديداً نحو القفزة التالية.",
    tags: ["forwarding process", "ttl", "checksum", "route lookup"],
    concept: {
      en: "Forwarding is a repeated per-hop process. The router does not simply relay the original frame; it builds a new Layer 2 frame for the next link after making an IP-level decision.",
      ar: "التمرير عملية تتكرر في كل قفزة. الموجه لا يمرر الإطار الأصلي فقط بل يبني إطار طبقة ثانية جديداً للرابط التالي بعد اتخاذ قرار على مستوى IP."
    },
    whyItMatters: {
      en: "This topic is heavily tested in sequence questions: what fields stay the same, what fields change, and when a packet is dropped.",
      ar: "هذا الموضوع يُختبر كثيراً في أسئلة التسلسل: ما الحقول التي تبقى ثابتة وما الحقول التي تتغير ومتى تُسقط الحزمة."
    },
    howItWorks: {
      en: "The router verifies the incoming frame, decapsulates it, looks up the destination IP using longest prefix match, checks TTL, chooses an egress interface, resolves the next-hop MAC if needed, and re-encapsulates the packet for the outgoing link.",
      ar: "يتحقق الموجه من الإطار الداخل ويفك تغليفه ثم يبحث عن IP الوجهة باستخدام أطول مطابقة للبادئة ويفحص TTL ويحدد واجهة الخروج ويستعلم عن MAC القفزة التالية عند الحاجة ثم يعيد تغليف الحزمة للرابط الخارج."
    },
    keyIdeas: [
      {
        en: "Source and destination IP usually stay the same end to end.",
        ar: "عنوانا IP المصدر والوجهة يبقيان غالباً ثابتين من البداية إلى النهاية."
      },
      {
        en: "Source and destination MAC change at every routed hop.",
        ar: "عنوانا MAC المصدر والوجهة يتغيران عند كل قفزة موجهة."
      },
      {
        en: "TTL decreases by 1 at each router to stop infinite loops.",
        ar: "يقل TTL بمقدار 1 عند كل موجه لمنع الحلقات اللانهائية."
      }
    ],
    example: {
      title: "Packet from 10.1.1.10 to 172.16.5.20",
      steps: [
        {
          en: "The frame arrives on G0/0 with destination MAC equal to the router interface MAC.",
          ar: "يصل الإطار إلى G0/0 ويكون MAC الوجهة هو عنوان واجهة الموجه."
        },
        {
          en: "The router strips the Ethernet header and reads destination IP 172.16.5.20.",
          ar: "يزيل الموجه ترويسة الإيثرنت ويقرأ IP الوجهة 172.16.5.20."
        },
        {
          en: "Longest prefix match selects 172.16.0.0/16 via G0/1 next hop 192.0.2.9.",
          ar: "تختار أطول مطابقة للبادئة الشبكة 172.16.0.0/16 عبر G0/1 والقفزة التالية 192.0.2.9."
        },
        {
          en: "TTL becomes 63 instead of 64, checksum is updated, and a new frame is sent with the next-hop MAC.",
          ar: "يصبح TTL يساوي 63 بدلاً من 64 ويتم تحديث checksum ثم يرسل إطار جديد بعنوان MAC للقفزة التالية."
        }
      ]
    },
    commands: [
      { cmd: "show ip route 172.16.5.20", desc: "Check which entry will be used for a destination." },
      { cmd: "show arp", desc: "Verify the Layer 2 next-hop mapping used after route lookup." },
      { cmd: "show interfaces counters", desc: "Observe ingress and egress packet counters." }
    ],
    mistakes: [
      {
        title: "Saying the router forwards the same Ethernet frame",
        detail: "The router creates a new Layer 2 frame for the outgoing network.",
        ar: "الموجه ينشئ إطار طبقة ثانية جديداً للشبكة الخارجة."
      },
      {
        title: "Forgetting TTL and checksum changes",
        detail: "These are core Layer 3 processing steps at each router.",
        ar: "هذان خطوتان أساسيتان في معالجة الطبقة الثالثة عند كل موجه."
      }
    ],
    compare: {
      title: "Fields During Forwarding",
      columns: ["Field", "Behavior"],
      rows: [
        ["Destination IP", "Usually unchanged"],
        ["Source IP", "Usually unchanged"],
        ["Destination MAC", "Changes per hop"],
        ["TTL", "Decrements by 1"]
      ]
    },
    examQuestions: [
      {
        question: "Which addresses change when a router forwards a packet?",
        answer: "The Layer 2 source and destination MAC addresses change; the IP addresses normally stay the same."
      },
      {
        question: "Why does a router decrement TTL?",
        answer: "To prevent packets from looping forever in case of routing loops."
      }
    ]
  },
  {
    id: "store-forward-cut-through",
    lectureNo: 5,
    title: "Store-and-Forward vs Cut-Through Switching",
    priority: "High",
    overviewEn: "Store-and-forward waits for the full frame before sending. Cut-through starts forwarding earlier as soon as the destination is known.",
    overviewAr: "خزن وتمرير ينتظر الإطار كاملاً قبل الإرسال. أما القطع المباشر فيبدأ التمرير مبكراً بمجرد معرفة الوجهة.",
    tags: ["store and forward", "cut through", "crc", "switching"],
    concept: {
      en: "These are switching methods, mainly discussed at Layer 2. They differ in when the switch begins forwarding a frame and whether it can check the full frame for errors first.",
      ar: "هذه طرق تبديل تناقش غالباً في الطبقة الثانية. الاختلاف بينها يكون في وقت بدء تمرير الإطار وهل يمكن فحص الإطار كاملاً للأخطاء أولاً."
    },
    whyItMatters: {
      en: "Exam questions usually focus on the tradeoff: error checking and reliability versus lower latency.",
      ar: "أسئلة الامتحان تركز عادة على المقايضة بين فحص الأخطاء والاعتمادية من جهة وزمن التأخير الأقل من جهة أخرى."
    },
    howItWorks: {
      en: "Store-and-forward receives the complete frame, checks CRC, then forwards. Cut-through reads enough of the header to identify the destination port and begins forwarding immediately, even before the entire frame arrives.",
      ar: "خزن وتمرير يستقبل الإطار كاملاً ويفحص CRC ثم يمرره. أما القطع المباشر فيقرأ من الترويسة ما يكفي لتحديد منفذ الوجهة ويبدأ التمرير فوراً حتى قبل وصول الإطار بالكامل."
    },
    keyIdeas: [
      {
        en: "Store-and-forward supports error checking before forwarding.",
        ar: "خزن وتمرير يدعم فحص الأخطاء قبل التمرير."
      },
      {
        en: "Cut-through reduces switching delay but may forward damaged frames.",
        ar: "القطع المباشر يقلل تأخير التبديل لكنه قد يمرر إطارات تالفة."
      },
      {
        en: "Final answers should mention both latency and integrity.",
        ar: "الإجابة النهائية يجب أن تذكر كلا من التأخير وسلامة الإطار."
      }
    ],
    example: {
      title: "Large Ethernet frame crossing a switch",
      steps: [
        {
          en: "With store-and-forward, the switch waits until the last bit arrives.",
          ar: "في خزن وتمرير ينتظر المبدل حتى يصل آخر بت."
        },
        {
          en: "It checks the FCS/CRC to see whether the frame is corrupted.",
          ar: "يفحص FCS أو CRC لمعرفة ما إذا كان الإطار تالفاً."
        },
        {
          en: "With cut-through, forwarding starts once the destination field is identified.",
          ar: "في القطع المباشر يبدأ التمرير بعد تحديد حقل الوجهة."
        }
      ]
    },
    commands: [
      { cmd: "show interfaces", desc: "Use interface error counters to reason about corrupted frame behavior." }
    ],
    mistakes: [
      {
        title: "Saying cut-through is always better",
        detail: "It is lower latency, but not always better when frame integrity matters.",
        ar: "هو أقل زمناً لكنه ليس الأفضل دائماً عندما تكون سلامة الإطار مهمة."
      },
      {
        title: "Mixing switching method with routing algorithm",
        detail: "This topic is about frame handling timing, not path computation.",
        ar: "هذا الموضوع يتعلق بتوقيت معالجة الإطار وليس حساب المسار."
      }
    ],
    compare: {
      title: "Store-and-Forward vs Cut-Through",
      columns: ["Aspect", "Store-and-Forward", "Cut-Through"],
      rows: [
        ["Start time", "After full frame arrives", "After destination is read"],
        ["CRC check", "Yes before forwarding", "Not fully before forwarding"],
        ["Latency", "Higher", "Lower"],
        ["Bad frame risk", "Lower", "Higher"]
      ]
    },
    examQuestions: [
      {
        question: "Why is store-and-forward safer?",
        answer: "Because it receives the entire frame and verifies CRC before sending it onward."
      },
      {
        question: "What is the main advantage of cut-through switching?",
        answer: "Lower forwarding latency because the switch does not wait for the full frame."
      }
    ]
  },
  {
    id: "network-performance",
    lectureNo: 6,
    title: "Network Performance and Delay",
    priority: "Core",
    overviewEn: "Performance questions focus on delay components, throughput limits, and packet loss under congestion.",
    overviewAr: "أسئلة الأداء تركز على مكونات التأخير وحدود throughput وفقدان الحزم عند الازدحام.",
    tags: ["processing delay", "queuing delay", "transmission delay", "propagation delay", "throughput", "packet loss"],
    concept: {
      en: "Nodal delay is made of processing, queueing, transmission, and propagation delay. Throughput describes how much data is delivered per second. Packet loss appears when buffers overflow or errors occur.",
      ar: "التأخير عند العقدة يتكون من تأخير المعالجة والانتظار والنقل والانتشار. أما throughput فيصف كمية البيانات المسلمة في الثانية. ويظهر فقدان الحزم عند امتلاء الذاكرة المؤقتة أو حدوث أخطاء."
    },
    whyItMatters: {
      en: "This topic produces many calculations. Students lose marks by mixing formulas or by confusing throughput with link rate.",
      ar: "هذا الموضوع ينتج عنه الكثير من المسائل الحسابية. يفقد الطلاب درجات بسبب خلط القوانين أو الخلط بين throughput وسرعة الرابط."
    },
    howItWorks: {
      en: "Processing delay is the time to examine headers. Queueing delay is waiting time in buffers. Transmission delay is L/R. Propagation delay is d/s. End-to-end throughput is usually limited by the bottleneck link, and packet loss increases when arrival rate exceeds buffer capacity.",
      ar: "تأخير المعالجة هو زمن فحص الترويسات. وتأخير الانتظار هو زمن البقاء في الذاكرة المؤقتة. وتأخير النقل هو L على R. وتأخير الانتشار هو d على s. ويكون throughput من طرف إلى طرف محدوداً غالباً بأبطأ رابط، ويزداد فقدان الحزم عندما يتجاوز معدل الوصول سعة المخزن."
    },
    keyIdeas: [
      {
        en: "Transmission delay depends on packet size and link rate, not distance.",
        ar: "تأخير النقل يعتمد على حجم الحزمة وسرعة الرابط وليس على المسافة."
      },
      {
        en: "Propagation delay depends on distance and signal speed, not packet size.",
        ar: "تأخير الانتشار يعتمد على المسافة وسرعة الإشارة وليس على حجم الحزمة."
      },
      {
        en: "Queueing delay is the most variable component during congestion.",
        ar: "تأخير الانتظار هو المكون الأكثر تغيراً أثناء الازدحام."
      }
    ],
    example: {
      title: "Delay calculation on one link",
      steps: [
        {
          en: "Packet size L = 12,000 bits and rate R = 6 Mbps, so transmission delay = 12,000 / 6,000,000 = 0.002 s = 2 ms.",
          ar: "حجم الحزمة 12000 بت والسرعة 6 ميغابت/ثا، إذن تأخير النقل = 12000 على 6000000 = 0.002 ثانية = 2 ملي ثانية."
        },
        {
          en: "Distance d = 300 km and propagation speed s = 2 x 10^8 m/s, so propagation delay = 300,000 / 200,000,000 = 1.5 ms.",
          ar: "المسافة 300 كم وسرعة الانتشار 2 × 10^8 متر/ثا، إذن تأخير الانتشار = 300000 على 200000000 = 1.5 ملي ثانية."
        },
        {
          en: "Total nodal delay = processing + queueing + 2 ms + 1.5 ms.",
          ar: "التأخير الكلي عند العقدة = المعالجة + الانتظار + 2 ملي ثانية + 1.5 ملي ثانية."
        }
      ]
    },
    commands: [
      { cmd: "show interfaces", desc: "Check bandwidth, drops, queue counters, and error counters." },
      { cmd: "show processes cpu", desc: "Useful when processing delay is suspected on real devices." }
    ],
    mistakes: [
      {
        title: "Transmission vs propagation confusion",
        detail: "Transmission uses packet size and rate; propagation uses distance and signal speed.",
        ar: "النقل يعتمد على حجم الحزمة والسرعة؛ والانتشار يعتمد على المسافة وسرعة الإشارة."
      },
      {
        title: "Assuming throughput always equals link bandwidth",
        detail: "Actual throughput is limited by the bottleneck and protocol overhead.",
        ar: "الـ throughput الفعلي تحدده أبطأ وصلة إضافة إلى الحمل الإضافي للبروتوكولات."
      }
    ],
    compare: {
      title: "Delay Formula Sheet",
      columns: ["Metric", "Formula or Rule"],
      rows: [
        ["Transmission delay", "L / R"],
        ["Propagation delay", "d / s"],
        ["Total nodal delay", "proc + queue + trans + prop"],
        ["Throughput", "Limited by the bottleneck"]
      ]
    },
    examQuestions: [
      {
        question: "Which delay increases most when a router becomes congested?",
        answer: "Queueing delay increases the most because packets spend more time waiting in buffers."
      },
      {
        question: "Why can packet loss happen even if the physical link is up?",
        answer: "Because router or switch buffers can overflow during congestion, causing packets to be dropped."
      }
    ]
  },
  {
    id: "routing-algorithms",
    lectureNo: 7,
    title: "Routing Algorithms: Static vs Dynamic, Distance-Vector vs Link-State",
    priority: "High",
    overviewEn: "Routing algorithms differ in who computes paths, how much topology information is shared, and how fast the network reacts to change.",
    overviewAr: "تختلف خوارزميات التوجيه فيمن يحسب المسارات وكمية معلومات الطوبولوجيا المشتركة وسرعة تفاعل الشبكة مع التغيير.",
    tags: ["static routing", "dynamic routing", "distance vector", "link state", "bellman-ford", "dijkstra"],
    concept: {
      en: "Static routing is manually configured. Dynamic routing uses protocols to exchange information and adapt automatically. Distance-vector routers know directions and metrics from neighbors. Link-state routers build a full area map and run SPF.",
      ar: "التوجيه الثابت يضبط يدوياً. أما التوجيه الديناميكي فيستخدم بروتوكولات لتبادل المعلومات والتكيف تلقائياً. موجهات Distance-Vector تعرف الاتجاهات والمقاييس من الجيران. وموجهات Link-State تبني خريطة كاملة للمنطقة وتشغل SPF."
    },
    whyItMatters: {
      en: "This topic is the bridge into RIP and OSPF. It is also common in compare tables and architecture questions about scalability and convergence.",
      ar: "هذا الموضوع هو الجسر نحو RIP وOSPF، ويظهر كثيراً في جداول المقارنة وأسئلة المعمارية حول التوسع والتقارب."
    },
    howItWorks: {
      en: "Static routes are entered by the administrator and remain until changed. Dynamic protocols discover routes. Distance-vector protocols exchange route information with neighbors and often use Bellman-Ford logic. Link-state protocols flood LSAs, build the LSDB, and compute shortest paths with Dijkstra SPF.",
      ar: "المسارات الثابتة يدخلها المسؤول وتبقى حتى يتم تعديلها. أما البروتوكولات الديناميكية فتكتشف المسارات. بروتوكولات Distance-Vector تتبادل معلومات المسار مع الجيران وغالباً تستخدم منطق Bellman-Ford. وبروتوكولات Link-State تُغرق LSAs وتبني LSDB ثم تحسب أقصر المسارات بخوارزمية Dijkstra."
    },
    keyIdeas: [
      {
        en: "Static routing gives control but does not scale well in changing networks.",
        ar: "التوجيه الثابت يعطي تحكماً عالياً لكنه لا يتوسع جيداً في الشبكات المتغيرة."
      },
      {
        en: "Distance-vector is simpler but slower to converge and more loop-prone.",
        ar: "Distance-Vector أبسط لكنه أبطأ في التقارب وأكثر عرضة للحلقات."
      },
      {
        en: "Link-state is more complex but converges faster and scales better.",
        ar: "Link-State أكثر تعقيداً لكنه أسرع في التقارب وأفضل في التوسع."
      }
    ],
    example: {
      title: "One link failure under two approaches",
      steps: [
        {
          en: "With static routing, an administrator must manually change the affected route.",
          ar: "في التوجيه الثابت يجب على المسؤول تغيير المسار المتأثر يدوياً."
        },
        {
          en: "With dynamic routing, routers exchange updates and compute a replacement path automatically.",
          ar: "في التوجيه الديناميكي تتبادل الموجهات التحديثات وتحسب مساراً بديلاً تلقائياً."
        },
        {
          en: "A distance-vector protocol may take longer because information moves hop by hop.",
          ar: "قد يستغرق بروتوكول Distance-Vector وقتاً أطول لأن المعلومات تنتقل قفزة بعد قفزة."
        },
        {
          en: "A link-state protocol floods the change and quickly runs SPF again.",
          ar: "بروتوكول Link-State يغرق التغيير ويشغل SPF بسرعة مرة أخرى."
        }
      ]
    },
    commands: [
      { cmd: "show ip route", desc: "View route sources and compare static versus dynamic entries." },
      { cmd: "show running-config | section ip route", desc: "Check manually configured static routes." }
    ],
    mistakes: [
      {
        title: "Thinking lower metric means higher protocol preference",
        detail: "When multiple protocols advertise the same route, administrative distance is checked before that protocol's metric.",
        ar: "عند إعلان المسار نفسه من أكثر من بروتوكول يتم فحص المسافة الإدارية أولاً قبل المقياس الداخلي للبروتوكول."
      },
      {
        title: "Calling RIP link-state",
        detail: "RIP is distance-vector. OSPF is link-state.",
        ar: "RIP هو Distance-Vector بينما OSPF هو Link-State."
      }
    ],
    compare: {
      title: "Algorithm Comparisons",
      columns: ["Feature", "Static", "Dynamic", "Distance-Vector", "Link-State"],
      rows: [
        ["Updates", "Manual", "Automatic", "Neighbor route exchange", "Flooded LSAs"],
        ["Scalability", "Low in large networks", "Higher", "Moderate", "High"],
        ["Convergence", "Manual", "Automatic", "Slower", "Faster"],
        ["Core logic", "Admin choice", "Protocol logic", "Bellman-Ford style", "Dijkstra SPF"]
      ]
    },
    examQuestions: [
      {
        question: "Why is link-state usually preferred in larger enterprises?",
        answer: "Because it converges faster, scales better, and gives routers a full topology view for accurate shortest-path computation."
      },
      {
        question: "What is the main weakness of static routing?",
        answer: "It does not adapt automatically to failures or topology changes."
      }
    ]
  },
  {
    id: "rip",
    lectureNo: 8,
    title: "RIP: Hop Count, Versions, Classful vs Classless, Convergence",
    priority: "Core",
    overviewEn: "RIP is a distance-vector protocol that counts routers, not bandwidth, and treats 16 hops as unreachable.",
    overviewAr: "RIP هو بروتوكول Distance-Vector يعدّ عدد الموجهات وليس عرض النطاق ويعتبر 16 قفزة غير قابلة للوصول.",
    tags: ["rip", "ripv1", "ripv2", "hop count", "classful", "classless", "convergence"],
    concept: {
      en: "RIP uses hop count as its metric. RIPv1 is classful and does not send subnet masks. RIPv2 is classless, supports VLSM/CIDR, uses multicast, and is the version expected in most practical labs.",
      ar: "يستخدم RIP عدد القفزات كمقياس. الإصدار RIPv1 صنفي ولا يرسل أقنعة الشبكات الفرعية. أما RIPv2 فهو لا صنفي ويدعم VLSM وCIDR ويستخدم multicast وهو الإصدار المتوقع غالباً في المختبرات العملية."
    },
    whyItMatters: {
      en: "RIP is often used for exam comparisons because it is simple and exposes classic distance-vector problems such as slow convergence and count to infinity.",
      ar: "يستخدم RIP كثيراً في المقارنات الامتحانية لأنه بسيط ويظهر مشكلات Distance-Vector الكلاسيكية مثل بطء التقارب والعد إلى اللانهاية."
    },
    howItWorks: {
      en: "Every router shares routes with neighbors periodically. A directly connected network has metric 0 on the local router and becomes metric 1 on the first neighbor, metric 2 on the next, and so on. When a route fails, RIP uses mechanisms such as route poisoning and split horizon to reduce loops, but convergence is still slower than OSPF.",
      ar: "كل موجه يشارك المسارات مع جيرانه بشكل دوري. الشبكة المتصلة مباشرة تكون مقياسها 0 على الموجه المحلي ثم تصبح 1 عند الجار الأول و2 عند التالي وهكذا. وعند فشل المسار يستخدم RIP آليات مثل تسميم المسار وSplit Horizon لتقليل الحلقات لكن التقارب يبقى أبطأ من OSPF."
    },
    keyIdeas: [
      {
        en: "Maximum usable hop count is 15; 16 means infinity or unreachable.",
        ar: "أقصى عدد قفزات قابل للاستخدام هو 15 أما 16 فتعني اللانهاية أو غير قابل للوصول."
      },
      {
        en: "RIPv1 is classful; RIPv2 is classless and supports subnet masks.",
        ar: "RIPv1 صنفي أما RIPv2 فلا صنفي ويدعم أقنعة الشبكات الفرعية."
      },
      {
        en: "RIP converges slowly because information spreads hop by hop and periodic updates are used.",
        ar: "يتقارب RIP ببطء لأن المعلومات تنتشر قفزة بعد قفزة وتستخدم تحديثات دورية."
      }
    ],
    example: {
      title: "Metric growth across three routers",
      steps: [
        {
          en: "R1 is directly connected to 10.10.10.0/24, so metric on R1 is 0 for that local network.",
          ar: "الموجه R1 متصل مباشرة بالشبكة 10.10.10.0/24 لذلك يكون المقياس على R1 هو 0 لهذه الشبكة المحلية."
        },
        {
          en: "R1 advertises the route to R2. R2 stores it with metric 1.",
          ar: "يعلن R1 المسار إلى R2 فيحفظه R2 بمقياس 1."
        },
        {
          en: "R2 advertises to R3. R3 stores the route with metric 2.",
          ar: "يعلن R2 المسار إلى R3 فيحفظه R3 بمقياس 2."
        },
        {
          en: "If the route fails and is advertised as 16, neighbors mark it unreachable.",
          ar: "إذا فشل المسار وتم إعلانه بالمقياس 16 فإن الجيران يعتبرونه غير قابل للوصول."
        }
      ]
    },
    commands: [
      { cmd: "router rip", desc: "Enter RIP configuration mode." },
      { cmd: "version 2", desc: "Use RIPv2 for classless routing and multicast updates." },
      { cmd: "network 10.0.0.0", desc: "Enable RIP on matching interfaces." },
      { cmd: "no auto-summary", desc: "Disable classful summarization in discontiguous/VLSM networks." },
      { cmd: "show ip route rip", desc: "View only RIP-learned routes." }
    ],
    mistakes: [
      {
        title: "Forgetting no auto-summary",
        detail: "That creates wrong summarization in VLSM or discontiguous networks.",
        ar: "نسيان no auto-summary يسبب تلخيصاً خاطئاً في شبكات VLSM أو الشبكات غير المتصلة."
      },
      {
        title: "Calling hop count a bandwidth metric",
        detail: "RIP does not care about link speed in its path metric.",
        ar: "RIP لا يهتم بسرعة الرابط في مقياسه للمسار."
      }
    ],
    compare: {
      title: "RIP Exam Table",
      columns: ["Feature", "RIPv1", "RIPv2"],
      rows: [
        ["Addressing model", "Classful", "Classless"],
        ["Subnet mask sent", "No", "Yes"],
        ["Update type", "Broadcast", "Multicast 224.0.0.9"],
        ["VLSM support", "No", "Yes"]
      ]
    },
    examQuestions: [
      {
        question: "Why is 16 treated specially in RIP?",
        answer: "Because RIP defines 16 as infinity, meaning the destination is unreachable."
      },
      {
        question: "Why is RIPv2 preferred over RIPv1?",
        answer: "Because it is classless, supports VLSM/CIDR, and sends updates more efficiently using multicast."
      }
    ]
  },
  {
    id: "ospf",
    lectureNo: 9,
    title: "OSPF: Packets, Tables, SPF, Areas, Router ID, Passive Interface",
    priority: "Core",
    overviewEn: "OSPF is a link-state protocol that forms neighbor relationships, synchronizes LSDBs, and runs SPF to build best routes.",
    overviewAr: "OSPF هو بروتوكول Link-State ينشئ علاقات الجوار ويزامن LSDB ويشغل SPF لبناء أفضل المسارات.",
    tags: ["ospf", "hello", "dbd", "lsr", "lsu", "lsack", "lsdb", "spf", "area 0", "abr", "router id", "passive interface"],
    concept: {
      en: "OSPF builds a map of the network inside an area. Routers discover neighbors with Hello packets, exchange database summaries with DBD packets, request missing LSAs with LSR, send them with LSU, acknowledge with LSAck, then run Dijkstra SPF to populate the routing table.",
      ar: "يبني OSPF خريطة للشبكة داخل المنطقة. تكتشف الموجهات الجيران بحزم Hello ثم تتبادل ملخصات قاعدة البيانات بحزم DBD وتطلب LSAs الناقصة بحزم LSR وترسلها بحزم LSU وتؤكدها بحزم LSAck ثم تشغل Dijkstra SPF لملء جدول التوجيه."
    },
    whyItMatters: {
      en: "This is a major final topic because it combines concepts, protocol sequence, tables, area design, and CLI verification.",
      ar: "هذا موضوع رئيسي في النهائي لأنه يجمع المفاهيم وتسلسل البروتوكول والجداول وتصميم المناطق وأوامر التحقق."
    },
    howItWorks: {
      en: "Routers in the same area become neighbors if critical settings match. They synchronize LSDBs so every router in the area has the same topology database. Then each router runs SPF locally, computes shortest paths using interface costs, and installs results in the routing table. Area 0 is the backbone, and ABRs connect other areas to it. Passive interfaces advertise a network without sending Hellos on that interface.",
      ar: "تصبح الموجهات في المنطقة نفسها جيراناً إذا تطابقت الإعدادات الأساسية. ثم تزامن LSDB بحيث يمتلك كل موجه في المنطقة قاعدة طوبولوجيا نفسها. بعد ذلك يشغل كل موجه SPF محلياً ويحسِب أقصر المسارات باستخدام تكاليف الواجهات ويثبت النتائج في جدول التوجيه. المنطقة 0 هي العمود الفقري وABR يربط المناطق الأخرى بها. أما passive interface فيعلن الشبكة دون إرسال Hello على تلك الواجهة."
    },
    keyIdeas: [
      {
        en: "Neighbor table, LSDB, and routing table are three different OSPF views.",
        ar: "جدول الجيران وLSDB وجدول التوجيه هي ثلاث رؤى مختلفة داخل OSPF."
      },
      {
        en: "Area 0 is mandatory as the backbone in multi-area OSPF.",
        ar: "المنطقة 0 إلزامية كعمود فقري في OSPF متعدد المناطق."
      },
      {
        en: "Router ID is a unique 32-bit identifier; passive interface stops Hellos but still advertises the network.",
        ar: "Router ID هو معرف فريد من 32 بت، وpassive interface توقف Hello لكنها تستمر في إعلان الشبكة."
      }
    ],
    example: {
      title: "Single-area OSPF adjacency and route creation",
      steps: [
        {
          en: "R1 and R2 send Hello packets and confirm matching area, timers, subnet, and authentication settings.",
          ar: "يرسل R1 وR2 حزم Hello ويتأكدان من تطابق المنطقة والمؤقتات والشبكة الفرعية وإعدادات التوثيق."
        },
        {
          en: "They exchange DBD packets to compare database summaries.",
          ar: "يتبادلان حزم DBD لمقارنة ملخصات قواعد البيانات."
        },
        {
          en: "If R2 is missing an LSA, it sends LSR and receives the LSA inside an LSU from R1.",
          ar: "إذا كان R2 يفتقد LSA فإنه يرسل LSR ويستقبل LSA داخل LSU من R1."
        },
        {
          en: "R2 sends LSAck, both routers now share the same LSDB, and each runs SPF to fill the routing table.",
          ar: "يرسل R2 حزمة LSAck، ويصبح لدى الموجهين LSDB نفسها، ثم يشغل كل منهما SPF لملء جدول التوجيه."
        }
      ]
    },
    commands: [
      { cmd: "router ospf 1", desc: "Start OSPF process 1." },
      { cmd: "router-id 1.1.1.1", desc: "Set a stable OSPF router ID." },
      { cmd: "network 10.0.0.0 0.0.0.255 area 0", desc: "Enable OSPF on matching interfaces in Area 0." },
      { cmd: "passive-interface g0/0", desc: "Advertise the network but do not form neighbors on G0/0." },
      { cmd: "show ip ospf neighbor", desc: "Check adjacency state and neighbor IDs." },
      { cmd: "show ip ospf database", desc: "Inspect LSDB contents." },
      { cmd: "show ip route ospf", desc: "Display OSPF-installed routes." }
    ],
    mistakes: [
      {
        title: "Confusing Hello with LSU",
        detail: "Hello discovers and maintains neighbors; LSU carries LSAs.",
        ar: "Hello تكتشف وتحافظ على الجيران بينما LSU تحمل LSAs."
      },
      {
        title: "Thinking passive interface removes the network from OSPF",
        detail: "It suppresses Hellos on that link but can still advertise the connected network.",
        ar: "هي توقف Hello على الرابط لكنها قد تستمر في إعلان الشبكة المتصلة."
      }
    ],
    compare: {
      title: "OSPF Packet and Table Roles",
      columns: ["Item", "Role"],
      rows: [
        ["Hello", "Neighbor discovery and keepalive"],
        ["DBD", "Database summary exchange"],
        ["LSR / LSU / LSAck", "Request, send, and acknowledge LSAs"],
        ["LSDB", "Area topology database"],
        ["SPF", "Computes best paths from LSDB"]
      ]
    },
    examQuestions: [
      {
        question: "Why must routers in the same OSPF area have matching LSDBs?",
        answer: "Because each router runs SPF on that area database, so inconsistent LSDBs would produce inconsistent routing decisions."
      },
      {
        question: "What is the role of an ABR?",
        answer: "An Area Border Router connects Area 0 to one or more non-backbone areas and exchanges inter-area information."
      }
    ]
  },
  {
    id: "vlan",
    lectureNo: 10,
    title: "VLAN: Broadcast Domains, Access, Trunk, 802.1Q, Inter-VLAN Routing",
    priority: "Core",
    overviewEn: "VLANs create logical Layer 2 separation, shrink broadcast domains, and require Layer 3 routing for communication between VLANs.",
    overviewAr: "تنشئ VLANs فصلاً منطقياً في الطبقة الثانية وتقلص نطاقات البث وتتطلب توجيهاً من الطبقة الثالثة للاتصال بين شبكات VLAN.",
    tags: ["vlan", "broadcast domain", "access port", "trunk port", "802.1q", "inter-vlan routing", "router on a stick"],
    concept: {
      en: "A VLAN groups switch ports into separate broadcast domains even if devices are on the same physical switch. Access ports carry one VLAN and send untagged frames. Trunk ports carry multiple VLANs and use 802.1Q tags.",
      ar: "تجمع VLAN منافذ المبدل في نطاقات بث منفصلة حتى لو كانت الأجهزة على المبدل الفيزيائي نفسه. منفذ access يحمل VLAN واحدة ويرسل إطارات غير موسومة. أما trunk فيحمل عدة VLANs ويستخدم وسم 802.1Q."
    },
    whyItMatters: {
      en: "This topic is central in lab exams because it combines switchport configuration, tagging, and the need for inter-VLAN routing.",
      ar: "هذا الموضوع أساسي في الامتحانات العملية لأنه يجمع إعداد منافذ المبدل والوسم والحاجة إلى التوجيه بين VLANs."
    },
    howItWorks: {
      en: "Frames entering an access port are associated with that VLAN internally. When those frames cross a trunk, the switch inserts an 802.1Q tag showing the VLAN ID. To communicate between VLAN 10 and VLAN 20, a router or Layer 3 switch must route between their subnets. Router-on-a-stick uses one physical router interface with multiple subinterfaces, each tagged for a VLAN.",
      ar: "الإطارات الداخلة إلى منفذ access تُربط داخلياً بتلك الـ VLAN. وعندما تعبر هذه الإطارات trunk يضيف المبدل وسم 802.1Q يوضح VLAN ID. وللاتصال بين VLAN 10 وVLAN 20 يجب أن يقوم موجه أو مبدل طبقة ثالثة بالتوجيه بين الشبكتين الفرعيتين. أما router-on-a-stick فيستخدم واجهة فيزيائية واحدة على الموجه مع عدة واجهات فرعية، كل منها موسومة لـ VLAN معينة."
    },
    keyIdeas: [
      {
        en: "Each VLAN is its own broadcast domain.",
        ar: "كل VLAN هي نطاق بث مستقل."
      },
      {
        en: "Access ports are untagged; trunk ports carry tags for multiple VLANs.",
        ar: "منافذ access غير موسومة؛ أما trunk فتنقل وسوماً لعدة VLANs."
      },
      {
        en: "Different VLANs cannot talk without Layer 3 routing.",
        ar: "لا يمكن لشبكات VLAN المختلفة أن تتواصل بدون توجيه من الطبقة الثالثة."
      }
    ],
    example: {
      title: "Inter-VLAN communication with router-on-a-stick",
      steps: [
        {
          en: "PC1 is in VLAN 10 on S1 access port Fa0/1. PC2 is in VLAN 20 on S1 access port Fa0/2.",
          ar: "الجهاز PC1 في VLAN 10 على منفذ access Fa0/1 في S1 والجهاز PC2 في VLAN 20 على منفذ access Fa0/2."
        },
        {
          en: "The switch-to-router link is configured as trunk so both VLAN tags can cross one physical link.",
          ar: "يتم ضبط الرابط بين المبدل والموجه كـ trunk لكي تعبر وسوم VLANs المختلفة على رابط فيزيائي واحد."
        },
        {
          en: "The router has subinterfaces G0/0.10 and G0/0.20 with dot1Q encapsulation and gateway IPs.",
          ar: "يمتلك الموجه الواجهتين الفرعيتين G0/0.10 وG0/0.20 مع dot1Q وعناوين البوابة."
        },
        {
          en: "PC1 sends to its default gateway in VLAN 10, the router routes to VLAN 20, and the switch delivers the new frame to PC2.",
          ar: "يرسل PC1 إلى البوابة الافتراضية في VLAN 10 ثم يوجه الموجه إلى VLAN 20 ويسلم المبدل الإطار الجديد إلى PC2."
        }
      ]
    },
    commands: [
      { cmd: "vlan 10", desc: "Create VLAN 10." },
      { cmd: "switchport mode access", desc: "Set an interface as an access port." },
      { cmd: "switchport access vlan 10", desc: "Assign the access port to VLAN 10." },
      { cmd: "switchport mode trunk", desc: "Set an interface as a trunk." },
      { cmd: "encapsulation dot1Q 10", desc: "Assign VLAN 10 tagging on a router subinterface." },
      { cmd: "show vlan brief", desc: "Verify VLAN membership." },
      { cmd: "show interfaces trunk", desc: "Verify active trunk links and allowed VLANs." }
    ],
    mistakes: [
      {
        title: "Putting 802.1Q tags on access-port traffic in explanations",
        detail: "End-host access traffic is untagged unless special cases are configured.",
        ar: "مرور الأجهزة الطرفية على access يكون غير موسوم عادةً ما لم توجد حالة خاصة."
      },
      {
        title: "Assuming a Layer 2 switch alone performs inter-VLAN routing",
        detail: "You need a router or Layer 3 switch for communication between VLANs.",
        ar: "تحتاج إلى موجه أو مبدل طبقة ثالثة للاتصال بين VLANs المختلفة."
      }
    ],
    compare: {
      title: "Access vs Trunk",
      columns: ["Feature", "Access Port", "Trunk Port"],
      rows: [
        ["VLANs carried", "One", "Multiple"],
        ["Tagging", "Untagged", "802.1Q tagged"],
        ["Typical device", "PC, printer", "Switch, router, AP uplink"],
        ["Main purpose", "Host connection", "Transport VLANs"]
      ]
    },
    examQuestions: [
      {
        question: "Why does adding VLANs reduce broadcast traffic?",
        answer: "Because each VLAN becomes a separate broadcast domain, so broadcasts stay inside that VLAN instead of reaching all switch ports."
      },
      {
        question: "What is router-on-a-stick?",
        answer: "It is an inter-VLAN routing design where one physical router interface uses multiple 802.1Q-tagged subinterfaces."
      }
    ]
  },
  {
    id: "routing-packets",
    lectureNo: 11,
    title: "Routing Packets: MAC Learning, Flooding, and Two-Switch Forwarding",
    priority: "High",
    overviewEn: "This topic follows Layer 2 frame movement through two switches: MAC learning, unknown-destination flooding, filtering, and later unicast forwarding.",
    overviewAr: "يتتبع هذا الموضوع حركة إطار الطبقة الثانية عبر مبدلين: تعلم MAC، إغراق الوجهة غير المعروفة، الترشيح، ثم التمرير الأحادي لاحقاً.",
    tags: ["mac learning", "flooding", "switching", "two switches", "filtering"],
    concept: {
      en: "Switches learn source MAC addresses and build MAC tables. Unknown destination MAC addresses cause flooding inside the same VLAN. Across two switches, each switch learns incrementally as frames traverse the path.",
      ar: "تتعلم المبدلات عناوين MAC المصدر وتبني جداول MAC. وعنوان MAC الوجهة غير المعروف يسبب flooding داخل نفس VLAN. وعبر مبدلين يتعلم كل مبدل تدريجياً أثناء عبور الإطارات."
    },
    whyItMatters: {
      en: "Finals often combine this topic into path-walk questions where you must explain exactly what each switch or router learns and forwards.",
      ar: "النهائي يدمج هذا الموضوع كثيراً في أسئلة تتبع المسار حيث يجب شرح ما الذي يتعلمه كل مبدل أو موجه وما الذي يمرره."
    },
    howItWorks: {
      en: "When a frame enters a switch, the switch records the source MAC on that port. If the destination MAC is known, the frame is unicasted to one port; otherwise it is flooded out all other ports in the same VLAN except the incoming port. Through two switches, the first unknown frame may be flooded, but the reply teaches both switches the missing MAC locations.",
      ar: "عندما يدخل إطار إلى المبدل يسجل المبدل عنوان MAC المصدر على ذلك المنفذ. وإذا كانت وجهة MAC معروفة يرسل الإطار بشكل unicast إلى منفذ واحد، وإلا فيتم flooding إلى كل المنافذ الأخرى ضمن VLAN نفسها ما عدا منفذ الدخول. وعبر مبدلين قد يُغرق الإطار الأول غير المعروف، لكن الرد يعلّم كلا المبدلين مواقع MAC الناقصة."
    },
    keyIdeas: [
      {
        en: "A switch learns from the source MAC, not the destination MAC.",
        ar: "يتعلم المبدل من MAC المصدر وليس من MAC الوجهة."
      },
      {
        en: "Flooding happens only when the destination MAC is unknown in that VLAN.",
        ar: "يحدث flooding فقط عندما تكون وجهة MAC غير معروفة داخل تلك الـ VLAN."
      },
      {
        en: "Filtering means the switch does not send the frame back out the port where it arrived.",
        ar: "الترشيح يعني أن المبدل لا يعيد إرسال الإطار من نفس المنفذ الذي وصل منه."
      }
    ],
    example: {
      title: "PC1 to PC2 through two switches",
      steps: [
        {
          en: "PC1 sends a frame to PC2. Switch S1 learns PC1 MAC on Fa0/1.",
          ar: "يرسل PC1 إطاراً إلى PC2 فيتعلم المبدل S1 عنوان MAC الخاص بـ PC1 على Fa0/1."
        },
        {
          en: "S1 does not know PC2 MAC, so it floods the frame toward all other ports including the link to S2.",
          ar: "لا يعرف S1 عنوان MAC الخاص بـ PC2 لذلك يقوم بـ flooding إلى كل المنافذ الأخرى بما فيها الرابط إلى S2."
        },
        {
          en: "S2 receives the frame, learns PC1 MAC on its uplink port, and floods if PC2 MAC is still unknown.",
          ar: "يستقبل S2 الإطار ويتعلم MAC الخاص بـ PC1 على منفذ الربط ثم يقوم بـ flooding إذا كان MAC الخاص بـ PC2 ما يزال غير معروف."
        },
        {
          en: "PC2 replies. Now S2 learns PC2 MAC on its access port, S1 learns PC2 MAC on the uplink, and future traffic becomes unicast.",
          ar: "يرد PC2. الآن يتعلم S2 عنوان MAC الخاص بـ PC2 على منفذ الوصول ويتعلم S1 عنوان MAC الخاص بـ PC2 على منفذ الربط وتصبح الحركة اللاحقة unicast."
        }
      ]
    },
    commands: [
      { cmd: "show mac address-table", desc: "Inspect learned MAC-to-port mappings." },
      { cmd: "show interfaces status", desc: "Check active switch ports involved in the path." },
      { cmd: "show ip arp", desc: "Correlate IP addresses with MAC addresses when following packet delivery." }
    ],
    mistakes: [
      {
        title: "Saying the switch learns destination MAC first",
        detail: "Learning always comes from the source MAC of the incoming frame.",
        ar: "التعلم يأتي دائماً من MAC المصدر في الإطار الداخل."
      },
      {
        title: "Forgetting that unknown unicast flooding stays inside the VLAN",
        detail: "Flooding is not sent to every VLAN, only relevant ports in the same broadcast domain.",
        ar: "الـ flooding لا يذهب إلى كل VLAN بل إلى المنافذ المناسبة داخل نطاق البث نفسه."
      }
    ],
    compare: {
      title: "Switching Frame-Forwarding Basics",
      columns: ["Item", "Key Point"],
      rows: [
        ["MAC learning", "Source MAC to ingress port"],
        ["Flooding", "Unknown destination MAC only"],
        ["Known unicast", "Single output port"],
        ["Filtering", "Do not send back out incoming port"]
      ]
    },
    examQuestions: [
      {
        question: "When does a switch flood a frame?",
        answer: "When the destination MAC address is unknown in the switch MAC table for that VLAN."
      },
      {
        question: "What changes after the first successful reply across two switches?",
        answer: "Both switches learn the destination MAC locations, so later frames can be forwarded as unicast instead of flooded."
      }
    ]
  }
];

const examEnhancements = {
  "packet-switching-network-layer": {
    memorize: [
      "Packet switching divides a message into packets and shares links statistically.",
      "IP network-layer service is connectionless/datagram based in the lecture scope.",
      "Routers forward packets hop by hop; congestion can create queueing delay and packet loss."
    ],
    questionStyles: [
      { type: "MCQ", prompt: "Choose the service where packets are treated independently." },
      { type: "SA", prompt: "Define packet switching and mention one advantage." },
      { type: "Explain", prompt: "Explain why shared links improve utilization but may increase delay." }
    ]
  },
  "routing-vs-forwarding": {
    memorize: [
      "Routing = find/build best path knowledge; forwarding = choose output interface for an arriving packet.",
      "Routing protocols build routing tables; forwarding uses the table per packet.",
      "Forwarding table lookup is local to each router."
    ],
    questionStyles: [
      { type: "Compare", prompt: "Routing vs Forwarding by plane, scope, timing, and table use." },
      { type: "SA", prompt: "What does a router do when a packet arrives?" },
      { type: "MCQ", prompt: "Identify whether a statement describes routing or forwarding." }
    ]
  },
  "datagram-vs-virtual-circuit": {
    memorize: [
      "Connectionless/datagram: no setup; each packet carries destination address and can take different paths.",
      "Connection-oriented/virtual circuit: setup first; packets follow a pre-established logical path.",
      "VC forwarding can use a flow label or VC identifier instead of a full destination decision each time."
    ],
    questionStyles: [
      { type: "Compare", prompt: "Connectionless vs Connection-Oriented by setup, path, router state, and packet order." },
      { type: "MCQ", prompt: "Which service requires a virtual connection before data transfer?" },
      { type: "Explain", prompt: "Explain why datagram packets may arrive out of order." }
    ]
  },
  "router-forwarding-process": {
    memorize: [
      "Forwarding uses destination IP/header label plus the forwarding or routing table.",
      "Longest prefix match chooses the most specific matching route.",
      "No matching route means drop unless a default /0 route exists."
    ],
    questionStyles: [
      { type: "Steps", prompt: "Write the packet forwarding decision process from frame receive to output interface." },
      { type: "SA", prompt: "Define longest prefix match." },
      { type: "MCQ", prompt: "Given several prefixes, choose which route matches a destination IP." }
    ]
  },
  "store-forward-cut-through": {
    memorize: [
      "Store-and-forward receives the whole packet/frame before forwarding.",
      "Cut-through starts forwarding before receiving the whole packet/frame.",
      "Store-and-forward has more checking and usually more delay; cut-through reduces delay."
    ],
    questionStyles: [
      { type: "Compare", prompt: "Store-and-Forward vs Cut-Through by start time, delay, and error checking." },
      { type: "MCQ", prompt: "Which switching method can verify the complete frame before forwarding?" },
      { type: "Explain", prompt: "Explain the delay tradeoff between the two switching methods." }
    ]
  },
  "network-performance": {
    memorize: [
      "Transmission delay = L / R, where L is packet length in bits and R is link rate in bits/second.",
      "Propagation delay = distance / propagation speed.",
      "Queueing delay changes with congestion; packet loss happens when buffers overflow."
    ],
    questionStyles: [
      { type: "MCQ", prompt: "Match each delay type with its formula or cause." },
      { type: "SA", prompt: "Define throughput, delay, and packet loss." },
      { type: "Steps", prompt: "Calculate transmission delay from packet size and link rate." }
    ]
  },
  "routing-algorithms": {
    memorize: [
      "Static routes are manually configured; dynamic protocols learn and maintain routes automatically.",
      "Administrative Distance compares route sources; metric compares paths inside the same protocol.",
      "Distance vector shares routes with neighbors; link state builds topology and runs Dijkstra/SPF."
    ],
    questionStyles: [
      { type: "Compare", prompt: "Static vs Dynamic Routing." },
      { type: "Compare", prompt: "Distance Vector vs Link State." },
      { type: "SA", prompt: "Explain AD vs metric and give examples RIP/OSPF." }
    ]
  },
  rip: {
    memorize: [
      "RIP is a dynamic distance-vector protocol for small to medium networks.",
      "Metric is hop count; maximum valid hop count is 15, and 16 means unreachable.",
      "RIPv1 is classful; RIPv2 is classless and supports VLSM/CIDR with subnet masks in updates."
    ],
    questionStyles: [
      { type: "MCQ", prompt: "What is RIP metric and maximum hop count?" },
      { type: "Compare", prompt: "RIPv1 vs RIPv2." },
      { type: "Steps", prompt: "Show how hop count increases when a route is advertised across routers." }
    ]
  },
  ospf: {
    memorize: [
      "OSPF is a link-state protocol developed as an alternative to RIP; it converges faster and scales better.",
      "Five packets: Hello, DBD, LSR, LSU, LSAck.",
      "Three databases: neighbor/adjacency table, LSDB/topology table, routing/forwarding table.",
      "Single-area best practice uses area 0; multi-area requires all areas to connect to backbone area 0."
    ],
    questionStyles: [
      { type: "MCQ", prompt: "Identify OSPF packet type or database role." },
      { type: "Steps", prompt: "Describe adjacency, LSDB synchronization, SPF, and route installation." },
      { type: "Compare", prompt: "Single-Area vs Multi-Area OSPF." }
    ]
  },
  vlan: {
    memorize: [
      "A VLAN is a logical Layer 2 broadcast domain independent of physical location.",
      "Access link carries one VLAN, usually untagged; trunk link carries multiple VLANs, usually tagged.",
      "802.1Q inserts a 4-byte tag; TPID is 0x8100 and VLAN ID is 12 bits.",
      "Different VLANs need Layer 3 routing to communicate."
    ],
    questionStyles: [
      { type: "MCQ", prompt: "Identify 802.1Q fields, tag size, or VLAN ID purpose." },
      { type: "Compare", prompt: "VLAN Access link vs Trunk link." },
      { type: "Explain", prompt: "Explain VLAN broadcast-domain isolation." }
    ]
  },
  "routing-packets": {
    memorize: [
      "Switches learn from source MAC addresses on incoming frames.",
      "Unknown destination MAC is flooded out other ports in the same VLAN.",
      "Known destination MAC is forwarded to the learned port; non-destination hosts discard frames."
    ],
    questionStyles: [
      { type: "Steps", prompt: "Trace the first frame and return frame through two switches." },
      { type: "MCQ", prompt: "When does flooding occur?" },
      { type: "SA", prompt: "Define MAC learning and filtering." }
    ]
  }
};

const commandEnhancements = {
  "show ip route": {
    solves: "Confirms which prefixes are installed and which next hop or exit interface will be used.",
    output: "Look for route source codes such as C, S, R, O, the prefix length, AD/metric, next hop, and outgoing interface.",
    exam: "Read the prefix, route source, AD/metric, and next hop; do not memorize every output line."
  },
  "show ip route 172.16.5.20": {
    solves: "Tests which route would match a specific destination address.",
    output: "The selected prefix, route source, AD/metric, next hop, and exit interface for that destination.",
    exam: "Use it to explain longest prefix match and routing-table reading."
  },
  "show arp": {
    solves: "Checks the Layer 3 to Layer 2 address mapping needed before Ethernet forwarding.",
    output: "IP-to-MAC mappings learned by ARP.",
    exam: "Support detail only; the main exam point is that each hop uses a new Layer 2 frame."
  },
  "show interfaces counters": {
    solves: "Checks traffic counters and errors that can indicate congestion or packet loss.",
    output: "Packet counts, drops, and error counters by interface.",
    exam: "Relate counters to delay, throughput, and loss concepts."
  },
  "show processes cpu": {
    solves: "Checks whether router processing load may contribute to delay.",
    output: "CPU utilization and active processes.",
    exam: "Optional lab support; lecture focus is delay types, not CPU tuning.",
    optional: true
  },
  "show running-config | section ip route": {
    solves: "Shows configured static route statements only.",
    output: "Manual ip route entries from the running configuration.",
    exam: "Static routes are manually configured and do not adapt automatically."
  },
  "show interfaces": {
    solves: "Checks interface state and counters that can explain forwarding or performance problems.",
    output: "Interface up/down state, bandwidth, errors, and packet counters.",
    exam: "Useful for linking delay/loss theory to congestion or interface faults."
  },
  "show ip protocols": {
    solves: "Shows which dynamic routing protocol is active and what networks it advertises.",
    output: "Protocol name, networks, timers, passive interfaces, and routing sources.",
    exam: "Know that routing protocols populate the table; use this only as verification."
  },
  "show ip route rip": {
    solves: "Filters the routing table to RIP-learned routes.",
    output: "Routes marked R with AD/metric, where RIP AD is 120 and metric is hop count.",
    exam: "Metric value is hop count; 16 is unreachable."
  },
  "router rip": {
    solves: "Starts RIP routing configuration mode.",
    output: "Router enters RIP config context where version and network statements are added.",
    exam: "Concept first: RIP shares routing information with neighbors using hop count."
  },
  "network 10.0.0.0": {
    solves: "Adds matching connected networks to the RIP routing process.",
    output: "RIP advertises the classful network and associated subnets depending on version/summary behavior.",
    exam: "Know the concept: network statements enable protocol participation on matching interfaces."
  },
  "version 2": {
    solves: "Enables RIPv2 classless behavior.",
    output: "RIP updates include subnet mask information.",
    exam: "RIPv2 supports VLSM/CIDR; RIPv1 is classful."
  },
  "no auto-summary": {
    solves: "Stops automatic classful summarization at major network boundaries.",
    output: "Subnets and their proper masks are advertised instead of classful summaries.",
    exam: "Important when explaining why RIPv2 works with discontiguous/VLSM networks."
  },
  "router ospf 10": {
    solves: "Starts an OSPFv2 process with a locally significant process ID.",
    output: "Router enters OSPF config context.",
    exam: "The process ID does not need to match on all routers."
  },
  "router ospf 1": {
    solves: "Starts an OSPFv2 process with a locally significant process ID.",
    output: "Router enters OSPF configuration mode.",
    exam: "Process ID is local; OSPF neighbor formation depends on area/timers/authentication, not matching process ID."
  },
  "router-id 1.1.1.1": {
    solves: "Manually sets the 32-bit OSPF router ID.",
    output: "OSPF uses that ID to identify the router after process restart if needed.",
    exam: "Router ID uniquely identifies an OSPF router and participates in database sync and DR/BDR election."
  },
  "network 10.0.0.0 0.0.0.255 area 0": {
    solves: "Enables OSPF on interfaces matching the wildcard mask and places them in area 0.",
    output: "Matching interfaces send/receive OSPF packets and advertise their networks.",
    exam: "Area 0 is the backbone and single-area best-practice area in the slides."
  },
  "passive-interface g0/0": {
    solves: "Stops OSPF Hello packets on an interface that should not form neighbors.",
    output: "The connected network can still be advertised, but no adjacency forms on that interface.",
    exam: "Passive interface suppresses Hellos; it does not automatically remove the network from OSPF."
  },
  "show ip route ospf": {
    solves: "Filters the routing table to OSPF-learned routes.",
    output: "Routes marked O with AD/metric, commonly [110/cost].",
    exam: "OSPF metric is cost; lower cost is preferred."
  },
  "show ip ospf neighbor": {
    solves: "Verifies OSPF neighbor adjacency.",
    output: "Neighbor router ID, state, dead timer, address, and interface.",
    exam: "Hello packets discover/maintain neighbors; Full means adjacency is complete."
  },
  "show ip ospf database": {
    solves: "Displays the OSPF LSDB built from LSAs.",
    output: "LSA entries that represent topology information for the area.",
    exam: "LSDB is identical for routers inside the same area."
  },
  "show ip ospf interface": {
    solves: "Checks OSPF settings on an interface.",
    output: "Area, cost, network type, timers, and neighbor information.",
    exam: "OSPF cost is the metric; lower cost is better."
  },
  "show vlan brief": {
    solves: "Verifies VLAN existence and access-port membership.",
    output: "VLAN IDs, names, status, and assigned access ports.",
    exam: "Access ports belong to one VLAN/broadcast domain."
  },
  "vlan 10": {
    solves: "Creates or selects VLAN 10 on a switch.",
    output: "VLAN 10 appears in the VLAN database/show vlan brief.",
    exam: "VLANs are logical Layer 2 broadcast domains."
  },
  "switchport mode access": {
    solves: "Configures a port as an access link for one VLAN.",
    output: "The port operates as an untagged end-device port.",
    exam: "Access link carries one VLAN."
  },
  "switchport access vlan 10": {
    solves: "Assigns an access port to VLAN 10.",
    output: "show vlan brief lists the port under VLAN 10.",
    exam: "Port membership decides which broadcast domain the host belongs to."
  },
  "switchport mode trunk": {
    solves: "Configures a link to carry multiple VLANs between network devices.",
    output: "show interfaces trunk reports trunking status and allowed VLANs.",
    exam: "Trunk link carries multiple VLANs, normally with 802.1Q tags."
  },
  "show interfaces trunk": {
    solves: "Verifies trunk links and allowed VLANs.",
    output: "Trunking status, encapsulation, native VLAN, and allowed VLAN list.",
    exam: "Trunks carry multiple VLANs using tagging such as 802.1Q."
  },
  "encapsulation dot1Q": {
    solves: "Associates a router subinterface with an 802.1Q VLAN tag for router-on-a-stick.",
    output: "Traffic on that subinterface is matched to the configured VLAN ID.",
    exam: "Inter-VLAN communication needs Layer 3 routing, not only a Layer 2 switch.",
    optional: true
  },
  "encapsulation dot1Q 10": {
    solves: "Binds a router subinterface to VLAN 10 using an 802.1Q tag.",
    output: "Frames for VLAN 10 are processed by that subinterface.",
    exam: "Router-on-a-stick is a practical method for inter-VLAN routing.",
    optional: true
  },
  "show mac address-table": {
    solves: "Shows what MAC addresses the switch has learned and on which ports.",
    output: "MAC address, VLAN, type, and port.",
    exam: "Switches learn source MAC addresses; unknown destination causes flooding."
  },
  "show interfaces status": {
    solves: "Quickly checks switch port status and VLAN assignment.",
    output: "Port, name, status, VLAN, duplex, speed, and type.",
    exam: "Useful lab verification; concept is access/trunk membership."
  },
  "show ip arp": {
    solves: "Maps IP addresses to MAC addresses when tracing local delivery.",
    output: "IP address, MAC address, age, and interface.",
    exam: "Optional support command; the lecture focus is MAC learning and forwarding."
  }
};

lectureContent.forEach((topic) => {
  Object.assign(topic, examEnhancements[topic.id] || {});
  topic.commands = (topic.commands || []).map((command) => ({
    ...command,
    ...(commandEnhancements[command.cmd] || {})
  }));
});

export default lectureContent;
