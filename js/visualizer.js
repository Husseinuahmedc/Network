function renderStepCards(containerId, title, steps) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="step-visual">
      <div class="step-visual-title">${title}</div>
      <div class="step-card-grid">
        ${steps
          .map(
            (step, index) => `
              <article class="step-card">
                <div class="step-number">0${index + 1}</div>
                <h5>${step.heading}</h5>
                <p>${step.en}</p>
                <p class="arabic-text">${step.ar}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </div>
  `;
}

const visualizer = {
  renderPacketPath: (containerId) =>
    renderStepCards(containerId, 'Packet Forwarding Flow', [
      {
        heading: 'Receive Frame',
        en: 'Router accepts the Layer 2 frame only if the destination MAC matches the local interface.',
        ar: 'يقبل الموجه إطار الطبقة الثانية فقط إذا كان MAC الوجهة يطابق الواجهة المحلية.'
      },
      {
        heading: 'Read IP Header',
        en: 'The router removes the Ethernet header and inspects destination IP, TTL, and checksum.',
        ar: 'يزيل الموجه ترويسة الإيثرنت ويفحص IP الوجهة وTTL وchecksum.'
      },
      {
        heading: 'Route Lookup',
        en: 'Longest prefix match chooses the best outgoing interface and next hop.',
        ar: 'تختار أطول مطابقة للبادئة أفضل واجهة خروج وأفضل قفزة تالية.'
      },
      {
        heading: 'Re-encapsulate',
        en: 'The packet is wrapped in a new Layer 2 frame with the next-hop MAC and forwarded.',
        ar: 'تُغلف الحزمة في إطار جديد للطبقة الثانية بعنوان MAC للقفزة التالية ثم تُمرر.'
      }
    ]),
  renderVlanTag: (containerId) =>
    renderStepCards(containerId, 'VLAN Tagging Flow', [
      {
        heading: 'Access Ingress',
        en: 'A host sends an untagged frame into an access port that belongs to one VLAN.',
        ar: 'يرسل المضيف إطاراً غير موسوم إلى منفذ access ينتمي إلى VLAN واحدة.'
      },
      {
        heading: 'Internal VLAN Mark',
        en: 'The switch associates the frame internally with VLAN 10 or VLAN 20.',
        ar: 'يربط المبدل الإطار داخلياً بـ VLAN 10 أو VLAN 20.'
      },
      {
        heading: 'Trunk Transit',
        en: 'When the frame crosses a trunk, the switch inserts an 802.1Q tag carrying the VLAN ID.',
        ar: 'عندما يعبر الإطار trunk يضيف المبدل وسم 802.1Q الذي يحمل VLAN ID.'
      },
      {
        heading: 'Access Egress',
        en: 'At the destination access port, the tag is removed before the frame reaches the end device.',
        ar: 'عند منفذ access الوجهة تتم إزالة الوسم قبل وصول الإطار إلى الجهاز النهائي.'
      }
    ]),
  renderMacLearning: (containerId) =>
    renderStepCards(containerId, 'MAC Learning Across Switches', [
      {
        heading: 'Learn Source',
        en: 'S1 receives a frame from PC1 and stores PC1-MAC on the ingress port.',
        ar: 'يستقبل S1 إطاراً من PC1 ويخزن MAC الخاص بـ PC1 على منفذ الدخول.'
      },
      {
        heading: 'Flood Unknown',
        en: 'Because the destination MAC is unknown, S1 floods the frame to all other ports in the VLAN.',
        ar: 'لأن MAC الوجهة غير معروف يقوم S1 بعمل flooding إلى باقي المنافذ في نفس VLAN.'
      },
      {
        heading: 'Second Switch Learns',
        en: 'S2 learns PC1-MAC on its uplink and also floods if PC2 is still unknown.',
        ar: 'يتعلم S2 عنوان PC1-MAC على منفذ الربط ويقوم أيضاً بـ flooding إذا كان PC2 ما يزال غير معروف.'
      },
      {
        heading: 'Reply Creates Unicast',
        en: 'The reply frame teaches both switches where PC2 lives, so later traffic is unicasted.',
        ar: 'يعلم إطار الرد كلا المبدلين مكان PC2، لذلك تصبح الحركة اللاحقة unicast.'
      }
    ]),
  renderRipHop: (containerId) =>
    renderStepCards(containerId, 'RIP Update Walk', [
      {
        heading: 'Local Network',
        en: 'R1 is directly connected to 10.10.10.0/24 and knows it as a local route.',
        ar: 'الموجه R1 متصل مباشرة بالشبكة 10.10.10.0/24 ويعرفها كمسار محلي.'
      },
      {
        heading: 'First Update',
        en: 'R1 advertises the route to R2, and R2 records it with hop count 1.',
        ar: 'يعلن R1 المسار إلى R2 فيسجله R2 بعدد قفزات يساوي 1.'
      },
      {
        heading: 'Next Neighbor',
        en: 'R2 advertises it to R3, so R3 records hop count 2.',
        ar: 'يعلن R2 المسار إلى R3 فيسجله R3 بعدد قفزات يساوي 2.'
      },
      {
        heading: 'Failure Handling',
        en: 'If the route fails, RIP can poison it with metric 16 to signal unreachable.',
        ar: 'إذا فشل المسار يمكن لـ RIP أن يسممه بالمقياس 16 للإشارة إلى أنه غير قابل للوصول.'
      }
    ]),
  renderOspfProcess: (containerId) =>
    renderStepCards(containerId, 'OSPF LSDB to SPF', [
      {
        heading: 'Hello',
        en: 'Routers discover each other and verify that key OSPF parameters match.',
        ar: 'تكتشف الموجهات بعضها وتتأكد من تطابق المعلمات الأساسية لـ OSPF.'
      },
      {
        heading: 'DBD and LSR',
        en: 'They compare database summaries and request any missing LSAs.',
        ar: 'تقارن ملخصات قواعد البيانات وتطلب أي LSA مفقودة.'
      },
      {
        heading: 'LSU and LSAck',
        en: 'Missing LSAs are delivered and acknowledged until the LSDB is synchronized.',
        ar: 'تُسلم LSAs المفقودة وتُؤكد حتى تتم مزامنة LSDB.'
      },
      {
        heading: 'SPF Result',
        en: 'Each router runs Dijkstra SPF on the LSDB and installs best routes in the routing table.',
        ar: 'يشغل كل موجه Dijkstra SPF على LSDB ويثبت أفضل المسارات في جدول التوجيه.'
      }
    ])
};

export default visualizer;
